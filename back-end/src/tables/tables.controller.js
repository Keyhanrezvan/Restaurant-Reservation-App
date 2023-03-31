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
}
function validateCapacity(req, res, next){
    const {capacity}=req.body.data
  if (capacity > 0 && typeof capacity === "number"){
    next()
  } else {
    next({status:400, message: 'Capacity must be whole number greater than 0'})
  }
}

function validateName(req, res, next) {
  const { table_name } = req.body.data;
  if (table_name.length >= 2) {
    next();
  }
  next({ status: 400, message: "Name needs to be atleast 2 letters" });
}

function lowCapacity() {
  const { reservation, table} = res.locals
  if (table.capacity <= reservation.people){
    return next()
  }
next({status:400, message: "Capacity is less than reservation size"})
}

async function reservationExists(req, res, next) {
    const { reservation_id } = req.params;
  
    const reservation = await service.readRes(reservation_id);
  
    if (reservation) {
      res.locals.reservation = reservation;
      return next();
    }
    next({
      status: 404,
      message: "Reservation does not exist",
    });
  }

function tableStatus(req, res, next){
    const {status} = res.locals.table

    if (status === "occupied"){
        next({status: 400, message: "table is occupied"})
    }
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

async function list(req, res) {
  
  const list = await service.list();
  res.json({ data: list });
}

async function read(req, res) {
    res.json({ data: res.locals.table });
  }

async function update(req, res, next){
const updatedData = req.body.data

const updatedTable= await service.update(updatedData)
res.json({data: updatedTable})
}

async function create(req, res) {
  const newTab = req.body.data;
  const createdTab = await service.create(newTab);
  res.status(201).json({ data: createdTab });
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  create: [validateFields, validateName, validateCapacity, lowCapacity, asyncErrorBoundary(create)],
  read: [
    validateFields,
    asyncErrorBoundary(tableExists),
    asyncErrorBoundary(read),
  ],
  update: [validateFields, lowCapacity, asyncErrorBoundary(tableExists), asyncErrorBoundary(reservationExists), asyncErrorBoundary(update)]
};
