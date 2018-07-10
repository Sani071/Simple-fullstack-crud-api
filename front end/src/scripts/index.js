import '../styles/index.scss'
import axios from 'axios'
import create from './tdom'
let start = document.querySelector("#root")
let welcome = document.querySelector("#welcome")
let admin = document.querySelector("#admin")
let user = document.querySelector("#user")
let userStatusArea = document.querySelector("#userStatusArea")
//let searchModal = document.querySelector("#searchModal")

// addmin area

admin.addEventListener('click', function () {
    start.style.display = "block"
    welcome.style.display = 'none'
    let adminPanel = `<form>
        <div class="form-group">
            <label class="col-form-label" for="adminEmail">Email :</label>
            <input id="adminEmail" type="email"> </div>
        <div class="form-group">
            <label class="col-form-label" for="adminPassword">Password :</label>
            <input id="adminPassword" type="password">
        </div>
    </form>
    <button class="btn
        btn-lg btn-success btn-lg" id="adminSignin">SignUp</button>`
    start.innerHTML = adminPanel

    let adminEmail = document.querySelector("#adminEmail")
    let adminPassword = document.querySelector("#adminPassword")
    let adminSignBtn = document.querySelector("#adminSignin")

    adminSignBtn.addEventListener("click", function () {
        let adminurl = "http://localhost:4000/admin/signin"
        if (adminEmail.value) {
            if (adminPassword.value) {
                let data = {
                    email: adminEmail.value,
                    password: adminPassword.value
                }
                axios.post(adminurl, data)
                    .then(res => {
                        let top = `
                                <h2 class = "display-2"> <span>
                                    <i class="fa fa-diamond" aria-hidden="true"></i>
                                </span>Admin Panel </h2>
                                <p>Total User: <span id="totalUser"></span></p>
                                <table class="table table-hover">
                                    <thead>
                                        <tr>
                                            <th>User Name</th>
                                            <th>User Email</th>
                                            <th>Option</th>
                                        </tr>
                                    </thead>
                                    <tbody id="userList">
                                    </tbody>
                                `
                               
                        root.innerHTML = top
                        console.log("Token =>  " + res.data.token)
                        const userList = document.querySelector("#userList")
                        const totalUser = document.querySelector("#totalUser")
                        let URL = 'http://localhost:4000/admin/'
                        axios
                            .get(URL)
                            .then(res => {
                                res.data.Users.forEach(user => {
                                    createTR(userList, user)
                                })
                                totalUser.innerHTML = res.data.Users.length
                            })
                            .catch(err => console.log(err))

                        function createTR(userList, user) {
                            let tr = create('tr')
                            let userName = create('td')
                            userName.innerHTML = user.user_name
                            tr.appendChild(userName)
                            let userEmail = create('td')
                            userEmail.innerHTML = user.email
                            tr.appendChild(userEmail)

                            let option = create('td')
                            let deleteBtn = create('button', {
                                'class': 'btn btn-danger'
                            })
                            deleteBtn.innerHTML = "Delete"
                            deleteBtn.addEventListener('click', function () {
                                totalUser.innerHTML = totalUser.innerHTML - 1
                                let url = 'http://localhost:4000/admin/'
                                axios
                                    .delete(url + '/' + user._id)
                                    .then(res => {
                                        userList.removeChild(tr)
                                    })
                                    .catch(err => console.log(err))
                            })
                            option.appendChild(deleteBtn)
                            tr.appendChild(option)
                            userList.appendChild(tr)
                        }
                    })
                    .catch(err => alert("Signin Failed"))

            } else {
                alert("Enter Password")
            }
        } else {
            alert("please fillup data")
        }
    })


})

// //user area

user.addEventListener('click', function () {
    welcome.style.display = 'none'
    let userStatusAreaAdd = ` <div class="jumbotron" id="userStatusArea">
        <h1>HI</h1><hr>
        <h4 class="mb-3">Have Account?</h4>
        <button class="btn btn-lg btn-success btn-lg px-5" id="signinBtn">Signin
        </button>
        <p class="mt-3">Not</p>
        <button class="btn btn-lg btn-primary btn-lg px-5" id="signupBtn">SignUp</button>
        <div class="container" id="uploadArea"></div>
    </div>`
    userStatusArea.innerHTML = userStatusAreaAdd

    //signin area

    let signinBtn = document.querySelector("#signinBtn")
    signinBtn.addEventListener("click", function () {
        // let insertArea = document.querySelector("#insertArea")
        let signinForm = `<form>
         <div class="form-group">
             <label class="col-form-label" for="userEmail">Email :</label>
             <input id="userEmail" type="email"> </div>
         <div class="form-group">
             <label class="col-form-label" for="userPassword">Password :</label>
             <input id="userPassword" type="password">
         </div>
     </form>
     <button class="btn
         btn-lg btn-success btn-lg" id="signin">Signin</button>`
        userStatusArea.innerHTML = signinForm
        let userEmail = document.querySelector("#userEmail")
        let userPassword = document.querySelector("#userPassword")
        let signin = document.querySelector("#signin")
        signin.addEventListener("click", function () {
            start.style.display = "block"
            //let insertArea = document.querySelector("#insertArea")
            let url = "http://localhost:4000/user/signin"
            if (userEmail.value) {
                if (userPassword.value) {
                    let data = {
                        email: userEmail.value,
                        password: userPassword.value
                    }
                    axios.post(url, data)
                        .then(res => {
                            
                            userStatusArea.innerHTML = ''
                            let top = `<form>
                                            <div class="form-group">
                                                <label for="addName"><h4>Name:</h4></label>
                                                <input type="text" class="form-control" id="addName" placeholder="Enter Contact name">
                                            </div>
                                            <div class="form-group">
                                                <label for="addPhone"><h4>Phone</h4></label>
                                                <input type="text" class="form-control" id="addPhone" placeholder="Enter phone number">
                                            </div>
                                    </form>
                                    <div class="row">
                                        <div class="col-6">
                                            <input type="text" class="mr-auto text-center lead" id="searchBtn" placeholder="Search by name">
                                        </div>
                                        <div class="col-6">
                                            <button class="btn btn-success btn-lg mr-4" id="addContactBtn">Add Contact</button>
                                        </div>
                                    </div>
                             <div class="col-12">
                                <h5>Total Contact:</h5>
                                <h5 id="totalValue"></h5>                      
                            </div>
                            <table class="table table-hover">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Phone</th>
                                            <th>Option</th>
                                         </tr>
                                      </thead>
                                    <tbody id="contactList"> </tbody>
                                </table> 
                               `
                       
                            start.innerHTML = top
                            console.log("Token =>  " + res.data.token)
                            let search = document.querySelector("#searchBtn")
                            search.addEventListener("keypress", function (e) {
                                if (event.keyCode == 13) {
                                    let searchUrl = 'http://localhost:4000/user/find'
                                    let name = e.target.value
                                    if (name) {
                                        let searchModal = $("#searchModal")

                                        axios.get(searchUrl + '/' + name)
                                            .then(res => {
                                                let searchName = document.querySelector("#serachContactName")
                                                let searchPhone = document.querySelector("#serachContactPhone")
                                                searchModal.modal("toggle")
                                                searchName.innerHTML = res.data.name
                                                searchPhone.innerHTML = res.data.phone
                                                e.target.value = ''
                                            })
                                            .catch(err => alert("Contact not found by this name"))
                                    }
                                }
                            })
                            const contactList = document.querySelector("#contactList")
                            let totalContact = document.querySelector('#totalValue')
                            let UserUrl = 'http://localhost:4000/user/'
                            axios
                                .get(UserUrl)
                                .then(res => {
                                    totalContact.innerHTML = res.data.total_contacts
                                    res.data.contacts.forEach(contact => {
                                        createTR(contactList, contact)
                                    })
                                })
                                .catch(err => console.log(err));

                            function createTR(contactList, contact) {
                                let tr = create("tr")
                                contactList.appendChild(tr)
                                let contactName = create('td')
                                contactName.innerHTML = contact.name
                                tr.appendChild(contactName)
                                let contactPhone = create('td')
                                contactPhone.innerHTML = contact.phone
                                tr.appendChild(contactPhone)
                                let option = create('td')
                                let deleteBtn = create('button', {
                                    'class': 'btn btn-danger m-2'
                                })
                                deleteBtn.innerHTML = "Delete"
                                deleteBtn.addEventListener('click', function () {
                                    let url = 'http://localhost:4000/user/'
                                    totalContact.innerHTML = totalContact.innerHTML - 1
                                    axios
                                        .delete(url + '/' + contact._id)
                                        .then(res => {
                                            contactList.removeChild(tr)
                                        })
                                        .catch(err => console.log(err))
                                })
                                option.appendChild(deleteBtn)

                                let editBtn = create('button', {
                                    'class': 'btn btn-danger'
                                })
                                editBtn.innerHTML = "EDIT"
                                editBtn.addEventListener('click', function () {
                                    let editModal = $("#editModal")
                                    editModal.modal("toggle")
                                    let editName = document.querySelector("#editName")
                                    let editPhone = document.querySelector("#editPhone")
                                    let saveEditBtn = document.querySelector("#saveEditBtn")
                                    editName.value = contact.name
                                    editPhone.value = contact.phone
                                    saveEditBtn.addEventListener("click", function () {
                                        let editModal = $("#editModal")
                                        let url = 'http://localhost:4000/user/'
                                        axios
                                            .patch(url + '/' + contact._id, {
                                                name: editName.value,
                                                phone: editPhone.value
                                            })
                                            .then(res => {
                                                //  console.log(contact._id)
                                                contactName.innerHTML = res.data.name
                                                contactPhone.innerHTML = res.data.phone
                                            })
                                            .catch(err => console.log(err))
                                        editModal.modal("hide")
                                    })
                                    editName.value = contactName.innerHTML
                                    editPhone.value = contactPhone.innerHTML
                                })
                                option.appendChild(editBtn)
                                let callBtn = create('button', {
                                    "class": "btn btn-success px-4 ml-2"
                                })
                                callBtn.innerHTML = "Call"
                                option.appendChild(callBtn)
                                tr.appendChild(option)
                            }
                            let addContactBtn = document.querySelector("#addContactBtn")
                            addContactBtn.addEventListener("click", function () {
                                let addName = document.querySelector("#addName")
                                let addPhone = document.querySelector("#addPhone")
                                if (addName.value) {
                                    if (addPhone.value) {
                                        //alert("Succesfully added")
                                        let newcontact = {
                                            name: addName.value,
                                            phone: addPhone.value
                                        }
                                        let addurl = 'http://localhost:4000/user/'
                                        axios
                                            .post(addurl, newcontact)
                                            .then(res => {
                                                let contactlist = document.querySelector('#contactlist')
                                                createTR(contactlist, res.data)
                                            })
                                            .catch(err => console.log(err))
                                        addName.value = ''
                                        addPhone.value = ''
                                    } else {
                                        alert("please enter phone")
                                    }
                                } else {
                                    alert("please enter name")
                                }
                            })
                        })
                        .catch(err => {
                            console.log(err)
                            alert("email or password are not valid")
                        })

                    userEmail.value = ''
                    userPassword.value = ''
                } else {
                    alert("Plese enter password")
                }
            } else {
                alert("please fillup the requirement")
            }

        })
    })

    //signup area

    let signupBtn = document.querySelector("#signupBtn")
    signupBtn.addEventListener('click', function () {
        let signupForm = `<form>
        <div class="form-group">
            <label class="col-form-label" for="userName">User Name </label>
            <input id="userName" type="text">
        </div>
        <div class="form-group">
            <label class="col-form-label" for="userEmail">Email :</label>
            <input id="userEmail" type="email"> </div>
        <div class="form-group">
            <label class="col-form-label" for="userPassword">Password :</label>
            <input id="userPassword" type="password">
        </div>
    </form>
    <button class="btn
        btn-lg btn-success btn-lg" id="signup">SignUp</button>`
        userStatusArea.innerHTML = signupForm

        let userName = document.querySelector("#userName")
        let userEmail = document.querySelector("#userEmail")
        let userPassword = document.querySelector("#userPassword")
        let signup = document.querySelector("#signup")
        let go = `<h2>Successfully Create Your account</h2>
               <h4>Now you can login</h4>
       `
        signup.addEventListener("click", function () {
            let url = "http://localhost:4000/user/signup"
            if (userName.value) {
                if (userEmail.value) {
                    if (userPassword.value) {
                        let newUser = {
                            user_name: userName.value,
                            email: userEmail.value,
                            password: userPassword.value
                        }
                        axios.post(url, newUser)
                            .then(doc => {
                                userStatusArea.innerHTML = go
                            })
                            .catch(err => {
                                console.log(err)
                                //alert("something worng")
                            })
                        userName.value = ''
                        userEmail.value = ''
                        userPassword.value = ''

                    } else {
                        alert("please enter user password")
                    }
                } else {
                    alert("please enter user email")
                }
            } else {
                alert("please filup the requirment")
            }
        })
    })
})