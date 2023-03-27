const knex = require("../db/connection")

function listByDate(date){
    return knex("reservations")
    .select("*")
    .where({reservation_date: date})
    .orderBy("reservations.reservation_time")
}

function list(){
    return knex("reservations")
    .select("*")
}

function read(reservation_id){
    return knex("reservations")
    .select("*")
    .where({reservation_id: reservation_id})
    .first()
}

function create(newReservation){
return knex("reservations")
.insert(newReservation)
.returning("*")
.then(result=>result[0])
}

module.exports={
    list,
    listByDate,
    read,
    create
}