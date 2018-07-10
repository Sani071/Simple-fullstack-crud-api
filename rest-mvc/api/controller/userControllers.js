const Contact = require('../model/contactModel')
const User = require('../model/userModels')
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const signupUser = (req, res) => {
    User
        .find({
            email: req.body.email
        })
        .then(result => {
            if (result.length > 0) {
                res
                    .status(500)
                    .json({
                        msg: "Email or User name exist"
                    })
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        console.log(err)
                        res.json({
                            msg: "Auth faild new"
                        })
                    } else {
                        const user = new User({
                            user_name: req.body.user_name,
                            email: req.body.email,
                            password: hash
                        })
                        user
                            .save()
                            .then(doc => {
                                res.json({
                                    msg: "Account createed successfully"
                                })
                            })
                    }
                })
            }
        })
        .catch(err => {
            res.json({
                err,
                msg: "Failed"
            })
        })
}
const signinUser = (req, res) => {
    const email = req.body.email
    const password = req.body.password
    User.findOne({
            email
        })
        .then(doc => {
            bcrypt.compare(password, doc.password, (err, result) => {
                //console.log(doc.password)
                if (err) {
                    res.json({
                        msg: err
                    })
                } else {
                    if(result){
                        const token = jwt.sign({
                            email
                        }, 'shaan', {
                                expiresIn: '2h'
                            })
                        res.json({
                            msg: "Login successful",
                            doc,
                            token
                        })
                    }
                    }                
            })
        })
        .catch((err) => {
            res
                .status(500)
                .json({
                    msg: "email or password is invalid",
                    err
                })
        })
}

const viewAllContact = (req, res) => {
    Contact
        .find()
        .then(contacts => {
            if (contacts.length > 0) {
                res.json({
                    msg: "Contact Founded Successfully",
                    total_contacts: contacts.length,
                    contacts
                })
            } else {
                res.json({
                    msg: "Not found any contact"
                })
            }
        })
        .catch(err => {
            res
                .status(502)
                .json(err)
        })
}
const viewSingleContact = (req, res) => {
    const id = req.params.id
    Contact
        .findOne({
            _id: id
        })
        .then(user => {
            if (user) {
                res.json(user)
            } else {
                res
                    .status(502)
                    .json({
                        msg: "not Found"
                    })
            }
        })
}
const addContact = (req, res) => {
    const contact = new Contact({
        name: req.body.name,
        phone: req.body.phone
    })
    contact
        .save()
        .then(data => {
            res.json({
                data
            })
        })
        .catch(err => console.log(err))

}
const updateContact = (req, res) => {
    const id = req.params.id
    Contact
        .findByIdAndUpdate(id, {
            $set: req.body
        })
        .then(() => {
            //console.log(Userr)
            const newContact = {
                name: req.body.name,
                phone: req.body.phone
            }
            res
                .status(200)
                .json(newContact)
        })
        .catch(err => {
            res
                .status(500)
                .josn(err)
        })
}
const deleteContact = (req, res) => {
    const id = req.params.id
    Contact
        .findByIdAndRemove({
            _id: id
        })
        .then(doc => {
            res.json({
                msg: doc.name + "  (" + doc.id + ") is deleted successfully"
            })
        })
        .catch(err => {
            res
                .status(500)
                .json({
                    err
                })
        })
}
const searchContact = (req, res) => {
 
    Contact
        .find({
            name: req.params.query 
        })
        .then(doc => {
            res.json({  
              name:doc[0].name,
              phone:doc[0].phone
              
            })
        })
        .catch((err) => {
            
               res.status(500).json({
                   err
               })
        })
}
module.exports = {
    signupUser,
    signinUser,
    addContact,
    viewAllContact,
    viewSingleContact,
    updateContact,
    deleteContact,
    searchContact
}