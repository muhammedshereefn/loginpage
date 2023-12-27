var express = require('express')
var router = express.Router();

const creadential = {
    email : "admin@gmail.com",
    password : "admin123"
}

//login user


router.post('/login',(req,res) => {
    if(req.body.email=== creadential.email && req.body.password == creadential.password){
        req.session.user = req.body.email;
        res.redirect('/route/dashboard')
        // res.end("Login Successfull")
    }else{
        let errorMessage 
        if (req.body.email !== creadential.email) {
            errorMessage = "Username not found";
        } else if (req.body.password !== creadential.password) {
            errorMessage = "Password is incorrect";
        }
        res.render('base', { title: "Home | Login", errorMessage })
    }
})

//route for dashboard

router.get("/dashboard",(req,res) => {
    if(req.session.user){
        res.render('dashboard',{user : req.session.user})
    }else{
        req.session.errorMessage = "Login again";
        res.redirect('/');
    }
})




//route for logout

router.get('/logout',(req,res)=>{
    req.session.destroy(function(err){
        if(err){
            console.log(err);
            res.send("Error")
        }else{
            res.render("base",{title:"Express",logout:"Logout Successfully...!"})
        }
    })
})


 module.exports=router;


// var express = require('express');
// var router = express.Router();
// var session = require('express-session');

// // Initialize session middleware
// router.use(session({
//     secret: 'your-secret-key', // Change this to a random string
//     resave: false,
//     saveUninitialized: true
// }));

// const credential = {
//     email: "admin@gmail.com",
//     password: "admin123"
// }

// // Middleware to check if the user is logged in
// function requireLogin(req, res, next) {
//     if (req.session.user) {
//         next(); // User is authenticated, continue with the request
//     } else {
//         res.redirect('/login'); // User is not logged in, redirect to the login page
//     }
// }

// // Login route
// router.post('/login', (req, res) => {
//     if (req.body.email === credential.email && req.body.password === credential.password) {
//         req.session.user = req.body.email;
//         res.redirect('/dashboard');
//     } else {
//         res.end("Invalid Username");
//     }
// });

// // Dashboard route
// router.get("/dashboard", requireLogin, (req, res) => {
//     res.render('dashboard', { user: req.session.user });
// });


// // Logout route
// router.get('/logout', (req, res) => {
//     req.session.destroy(function (err) {
//         if (err) {
//             console.log(err);
//             res.send("Error");
//         } else {
//             res.redirect('/login'); // Redirect to the login page after logout
//         }
//     });
// });

// module.exports = router;


