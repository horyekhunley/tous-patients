const express = require('express')
require('dotenv').config()
const cors = require('cors')

const patientRoutes = require('./routes/patient_routes')

const app = express()
const port = process.env.PORT || 5000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({ origin: '*' }))

app.use('/api/patients', patientRoutes)

app.get('/', (req, res) => {
    res.send('Hello, there')
})

app.listen(port, () => {
    console.log(`Server running on port: ${port}`)
})