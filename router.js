const express = require("express")
const app = express()
const router = express.Router()
const url = require('url');
const User = require("./model/user")



router.post("/create-user",(req,res) => {
    const user = User.add({
        name:req.body.name,
        email:req.body.email, 
        password:req.body.password,
        tags:req.body.lang
    }).then( (success) => {
        res.redirect("/user/list")
    }).catch(e => {
        console.log(e)
        res.send("error")
    })
})

router.get("/create-user",(req,res) => {
    res.render("user/create")
})
router.get("/user/list",(req,res) => {
    User.get().then( (success) => {
        let list =  success.docs.map( (doc) => {
            return { id: doc.id , ...doc.data() }
        } )
        res.render("user/list",{
            users:list ,
            req:req
        })
    } )
    .catch((e) => {
        console.log(e)
        res.send("error")
    })
    // User.find().then( (users) => {
    //     res.render("user/list",{
    //         users:users ,
    //         req:req
    //     })
    // })
    // .catch((e) => {
    //     console.log(e)
    // })
   
})

router.get("/user/edit/:id",(req,res) => {
    User.doc(req.params.id).get().then((user) => {
        res.render("user/edit",{
            user:{
                id:user.id,
                ...user.data()
            }
        })
    })
    .catch((e) => {})
})
router.post("/user/update",(req,res) => {
    User.doc(req.body.id).update(req.body)
    .then((success) => {
        res.redirect("/user/list")
    })
    .catch((e) => {
        res.send("Error")
    })
})

router.get("/user/delete/:id",(req,res) => {
    User.doc(req.params.id).delete().then((success) => {
        res.redirect("/user/list")
    })
    .catch((e) => {  
        res.send("error")
    })
})

router.get("/user/search",(req,res) => {

    User
    // .where("name","==",req.query.str)
    .orderBy('name')
    .startAt(req.query.str.toUpperCase() )
    .endAt(req.query.str.toLowerCase() + "\uf8ff")
    // .where('tags','array-contains-any',['C++'])
    // .where("password","<=",18000)
    .get().then((success) => {
         let list = success.docs.map(element => {
             return {
                 id:element.id ,
                 ...element.data()
             }
         });
         res.render("user/list",{
            users:list,
            req:req
        })
    }).catch((e) => {
        res.send("error")
    })
    
    // let expersion = ".*"+ req.query.str +".*"
    // User
    // .find({name: { $regex: expersion , $options:"i" } })
    // // .where("password").gte(20000).lte(30000)
    // // .where('tags').in(['JAVA'])
    // .then((result) => {
    //     res.render("user/list",{
    //         users:result,
    //         req:req
    //     })
    // })
    // res.send("hello")
})

module.exports = router