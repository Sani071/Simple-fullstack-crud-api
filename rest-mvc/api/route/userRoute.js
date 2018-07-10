const router = require('express').Router()
const userController = require('../controller/userControllers')
//const Contact = require('../model/contactModel')
//const auth = require("../protector/protecor")
router.post("/signup", userController.signupUser)
router.post("/signin", userController.signinUser)
router.post("/", userController.addContact)
router.get('/', userController.viewAllContact)
router.get('/:id', userController.viewSingleContact)
router.patch("/:id", userController.updateContact)
router.delete('/:id', userController.deleteContact)
router.get('/find/:query', userController.searchContact)

module.exports = router
