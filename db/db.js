import {createPool} from 'mysql2/promise'

const pool = createPool({
    host: 'sql12.freesqldatabase.com',
    user: 'sql12766416',
    password: '5HY1BpQK7w',
    database: 'sql12766416'
})

// const result = await pool.query("create table schools (id int primary key auto_increment, name varchar(255), address varchar(255), latitude float, longitude float)")
// console.log(result.json())

export const addSchool = async (name, address, latitude, longitude) => {
    const result = await pool.query("insert into schools (name, address, latitude, longitude) values (?, ?, ?, ?)", [name, address, latitude, longitude])
    return result[0].insertId
}
export const getSchoolnearestTofarest = async (latitude, longitude) => {
    const result = await pool.query("select * from schools order by (latitude - ?) * (latitude - ?) + (longitude - ?) * (longitude - ?)", [latitude, latitude, longitude, longitude])
    return result[0]
}