const router = require('express').Router()
const adminController = require("../controller/adminController")
//const auth = require("../protector/protecor")
router.post("/signup", adminController.signup)
router.post("/signin", adminController.signin)
router.get('/', adminController.getAllUser)
//router.get('/:id', adminController.getSingleUser)
router.delete('/:id', adminController.deleteUser)
module.exports = router

