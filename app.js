import express from "express"
import { configDotenv } from "dotenv"
import { addSchool, getSchoolnearestTofarest } from "./db/db.js"
import cors from "cors"
configDotenv()
const app = express()
app.use(express.json())
app.use(cors())

app.post("/addschool", async (req, res) => {
    const { name, address, latitude, longitude } = await req.body
    addSchool(name, address, latitude, longitude)
    res.send("School added successfully")
})
app.get("/getSchoolnearestTofarest", (req, res) => {
    const { latitude, longitude } = req.query
    getSchoolnearestTofarest(latitude, longitude)
        .then((data) => {
            res.send(data)
        })
        .catch((error) => {
            res.send(error)
        })
})

app.listen(process.env.PORT, () => {
    console.log("Server is running on port 3000")
})
