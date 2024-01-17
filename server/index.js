const express = require("express");
const app = express()
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser")
const path = require("path")

const db = mysql.createPool({
host: "localhost",
  user: "root",
  password: "",
  database: "crud_contact",
})

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}))

app.get("/api/get", (req,res)=> {
    const sqlGet = "SELECT * FROM contact_db"
    db.query(sqlGet, (error,result)=> {
        res.send(result)
    })
})

app.post("/api/post", (req, res) => {
    const {name, email, contact} = req.body
    const sqlInsert = "INSERT INTO contact_db (name, email, contact) VALUES(?,?,?)"
    db.query(sqlInsert, [name,email,contact], (error,result)=> {
        if(error) {
            console.log(error)
        }
    })
})
// app.get("/", (req,res)=>{
//     
//         
//    
//         console.log("error", err)
//         console.log("result",result)
//         res.send("Connected to Express backend")
//     })
    
// })

const port = 8000;


app.listen(port, () => {
  console.log(`listening on port ${port} `);
});
