const express = require('express')
const { get_patients, create_patient, get_patient, update_patient, delete_patient } = require('../controllers/patient_controllers')

const router = express.Router()

router.route('/')
.get(get_patients).post(create_patient)

router.route('/:id')
.get(get_patient).put(update_patient).delete(delete_patient)

module.exports = router