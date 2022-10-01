const pool = require('../config/mysql.config')
const QUERY = require('../query/patient_query')

exports.get_patients = (req, res) => {
    console.log(`${req.method} ${req.originalUrl}, fetching patients`)

    pool.query(QUERY.SELECT_PATIENTS, (err, data) => {
        if (!data) {
            res.status(404).send(`No patients found`)
        }else{
            res.status(200).send(`Patients found`, { patients: data })
        }
    })
}

exports.create_patient = (req, res) => {
    console.log(`${req.method} ${req.originalUrl}, creating patient`)

    pool.query(QUERY.CREATE_PATIENT, Object.values(req.body), (err, data) => {
        if (!data) {
            console.log(err.message)
            res.status(500).send(`Error occurred`)
        }else{
            const  patient = { id: data.insertedId, ...req.body, created_at: new Date()}
            res.status(200).send(`Patient created`, { patients: data })
        }
    })
}

exports.get_patient = (req, res) => {
    console.log(`${req.method} ${req.originalUrl}, getting a patient`)

    pool.query(QUERY.SELECT_PATIENT, [ req.params.id ], (err, data) => {
        if (!data[0]) {
            res.status(404).send(`Patient not found`)
        }else{
            res.status(200).send(`Patient found`, data[0])
        }
    })
}

exports.update_patient = (req, res) => {
    console.log(`${req.method} ${req.originalUrl}, getting a patient`)

    pool.query(QUERY.SELECT_PATIENT, [ req.params.id ], (err, data) => {
        if (!data[0]) {
            res.status(404).send(`Patient not found`)
        }else{
            console.log(`${req.method} ${req.originalUrl}, updating a patient`)
            pool.query(QUERY.UPDATE_PATIENT, [ req.params.id ], [...Object.values(req.body)], (err, data) => {
                if (!err){
                    res.status(200).send(`Patient updated`, { id: req.params.id, ...req.body })
                }else{
                    console.error(err.message)
                    res.status(500).send(`Error occurred`, err)
                }
            })
        }
    })
}
exports.delete_patient = (req, res) => {
    console.log(`${req.method} ${req.originalUrl}, deleting a patient`)

    pool.query(QUERY.DELETE_PATIENT, [ req.params.id ], (err, data) => {
        if (data.affectedRows > 0) {
            res.status(200).send(`Patient deleted`)
        }else{
            res.status(404).send(`Patient not found`)
        }
    })
}