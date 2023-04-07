const service = require("./tables.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

const validFields = ["table_name", "capacity"];

function validateFields(req, res, next) {

  const { data } = req.body;
  if (!data) {
    next({ status: 400, message: "No data entered" });
  } 
  validFields.forEach((field) => {
    if (!data[field]) {
      return next({ status: 400, message: `Insert ${field} field` });
    }
  })
  if (typeof data["capacity"] !== "number") {
    return next({
      status: 400,
      message: "capacity must be a number greater than 0",
    });
  }

  if (data["table_name"].length < 2) {
    return next({
      status: 400,
      message: "table_name must be at least two characters long.",
    });
  }

  next();
}

async function tableExists(req, res, next) {
  
  const { table_id } = req.params

  const table = await service.read(table_id)

  if (table) {
    res.locals.table = table;
    return next();
  }
  next({
    status: 404,
    message: "Table does not exist",
  });
}

async function reservationExists(req, res, next) {
  if (!req.body.data){
    return next({status:400, message: "Insert table data"})
  }
  const { reservation_id } = req.body.data
if (!reservation_id) {
  return next({
    status: 400,
    message: `A reservation_id is required to seat table`,
  })
}
  const reservation = await service.readRes(reservation_id);

  if (!reservation) {
    return next({
      status: 404,
      message: `${reservation_id} does not exist`
    });
  }
  res.locals.reservation = reservation;
  next()
}

function tableVacant(req, res, next) {


  const table = res.locals.table;
  if (table.reservation_id) {
    return next({
      status: 400,
      message: `table_id '${table.table_id}' is occupied by reservation_id '${table.reservation_id}'.`,
    });
  }else{
  next()
}
}

// function lowCapacity() {
//   const { reservation, table} = res.locals
//   if (table.capacity < reservation.people){
//     return next()
//   }
// next({status:400, message: "Capacity is less than reservation size"})
// }

// function tableStatus(req, res, next){
//     const {status} = res.locals.table

//     if (status === "occupied"){
//         next({status: 400, message: "table is occupied"})
//     }
//   }

async function list(req, res) {
  
  const list = await service.list();
  res.json({ data: list });
}

async function read(req, res) {
    res.json({ data: res.locals.table });
  }

async function update(req, res, next){
const updatedData = {...req.body.data, table_id: res.locals.table.table_id}
const updatedTable= await service.update(updatedData)
res.json({data: updatedTable})
}

async function create(req, res, next) {
  const newTab = req.body.data;
  const createdTab = await service.create(newTab);
  res.status(201).json({ data: createdTab });
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  create: [validateFields, asyncErrorBoundary(create)],
  read: [
    validateFields,
    asyncErrorBoundary(tableExists),
    asyncErrorBoundary(read),
  ],
  update: [ asyncErrorBoundary(tableExists), tableVacant, asyncErrorBoundary(reservationExists), asyncErrorBoundary(update)]
};
