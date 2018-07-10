const Admin = require('../model/adminModel')
const User = require('../model/userModels')
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const signup = (req, res) => {
    Admin.find({
        email: req.body.email
    })
        .then(result => {
            if (result.length < 2) {
                bcrypt.hash(req.body.password, 14, (err, hash) => {
                    if (err) {
                        res.json({
                            msg: "Auth faild"
                        })
                    } else {
                        const admin = new Admin({
                            email: req.body.email,
                            password: hash
                        })
                        admin.save()
                            .then(doc => {
                                if (doc.length < 1) {
                                    res.json({
                                    c
                                    })
                                } else {
                                    res.json({
                                        msg: "Not add more admin"
                                    })
                                }
                            })
                            .catch((err) => {
                                //res.status(500).json(err)
                                res.status(500).json(err)
                            })
                    }
                })
            } else {
                re.status(400).json({
                    'msg': "Not Permit"
                })
            }
        }

        )

}

const signin = (req, res) => {
    const email = req.body.email
    const password = req.body.password

    Admin.findOne({
        email
    })
        .then(doc => {
            bcrypt.compare(password, doc.password, (err, result) => {
                //console.log(doc.password)
                if (err) {
                    res.json({
                        msg: "1st failed"
                    })
                } else {
                    if (result) {
                        const token = jwt.sign({
                            email
                        }, 'shaan', {
                                expiresIn: '2h'
                            })
                        res.json({
                            msg: "Login successful",
                            token,

                        })

                    } else {
                        res.json({
                            msg: " 2nd FAILED"
                        })
                    }
                }
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                msg: "email or password is invalid"
            })
        })
}

const getAllUser = (req, res) => {
    User.find()
        .then(users => {
            res.json({
                length: users.length,
                Users: users
            })
        })
}

const deleteUser = (req, res) => {
    const id = req.params.id
    User.findByIdAndRemove({
        _id: id
    })
        .then(user => {
            res.json({
                msg: user.user_name + "  (" + user.id + ") " + "is deleted successfully"
            })
        })
}

module.exports = {
    signup,
    signin,
    getAllUser,
    deleteUser
}