const knex = require("../db/connection")

function update(updatedData){
    return knex("tables")
    .select("*")
    .where({table_id:updatedData.table_id})
    .update(updatedData, "*")
    .then(updated=>updated[0])
}

function readRes(reservation_id){
    return knex("reservations")
    .select("*")
    .where({reservation_id})
    .then(res=>res[0])
}

function list(){
    return knex("tables")
    .select("*")
    .orderBy("table_name")
}

function read(table_id){
    return knex("tables")
    .select("*")
    .where({table_id: table_id})
    .first()
}

function create(newTab){
    return knex("tables")
    .insert(newTab)
    .returning("*")
    .then(result => result[0])
}

module.exports = {
list, 
create,
read,
readRes,
update,
}