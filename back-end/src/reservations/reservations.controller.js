/**
 * List handler for reservation resources
 */
const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

const reservationFields = [
  "first_name",
  "last_name",
  "mobile_number",
  "reservation_date",
  "reservation_time",
  "people",
];
function validateTime(str) {
  const [hour, minute] = str.split(":");

  if (hour.length > 2 || minute.length > 2) {
    return false;
  }
  if (hour < 1 || hour > 23) {
    return false;
  }
  if (minute < 0 || minute > 59) {
    return false;
  }
  return true;
}

function validateFields(req, res, next) {
  const reservationData = req.body.data;

  if (!reservationData) {
    return next({ status: 400, message: "No data entered" });
  }
  reservationFields.forEach((field) => {
    if (!reservationData[field]) {
      return next({ status: 400, message: `Insert ${field} field` });
    }
    if (field === "people" && typeof reservationData[field] !== "number") {
      return next({
        status: 400,
        message: "Insert number of people in the party",
      });
    }
    if (field === "reservation_date" && !Date.parse(reservationData[field])) {
      return next({ status: 400, message: `${field} is not a valid date` });
    }
    if (field === "reservation_time" && !validateTime(reservationData[field])) {
      return next({ status: 400, message: `${field} is not a valid time` });
    }
  });
  next();
}

function notTuesday(req, res, next) {
  const { reservation_date } = req.body.data
  const [year, month, day] = reservation_date.split("-")
  const date = new Date(`${year}, ${month}, ${day}`)
  res.locals.date = date
  if (date.getUTCDay() === 2) {
    next({ status: 400, message: "closed" });
  }
  return next();
}

function futureDay(req, res, next) {
  const currentDate = new Date();
  if (res.locals.date < currentDate) {
    next({ status: 400, message: "Choose a future date" });
  }
  return next()
}

function timeFrame(req, res, next){
const {reservation_time} = req.body.data
const hours= Number(reservation_time.slice(0,2))
const minutes= Number(reservation_time.slice(3,5))
const time= hours * 100 + minutes
if (time < 1030 || time > 2130){
  next({status: 400, message: `Reservation is not allowed at selected time`})
}
return next()
}

async function reservationExists(req, res, next) {
  const { reservation_id } = req.params;

  const reservation = await service.read(reservation_id);

  if (reservation) {
    res.locals.reservation = reservation;
    return next();
  }
  next({
    status: 404,
    message: "Reservation does not exist",
  });
}


async function read(req, res) {
  res.json({ data: res.locals.reservation });
}

async function list(req, res) {
  const { date } = req.query;
  const list = date ? await service.listByDate(date) : await service.list();
  res.json({ data: list });
}

async function create(req, res) {
  const newRes = req.body.data;
  const createdRes = await service.create(newRes);
  res.status(201).json({ data: createdRes });
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  create: [
    asyncErrorBoundary(validateFields),
    timeFrame,
    notTuesday,
    futureDay,
    asyncErrorBoundary(create),
  ],
  read: [
    validateFields,
    asyncErrorBoundary(reservationExists),
    asyncErrorBoundary(read),
  ],
};
