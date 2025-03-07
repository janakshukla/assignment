import { configDotenv } from 'dotenv'
import {createPool} from 'mysql2/promise'
configDotenv()
const pool = createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
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