const express = require("express");
const app = express()
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser")

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

app.delete("/api/remove/:id", (req, res) => {
    const {id} = req.params
    const sqlRemove = 
        "DELETE FROM contact_db WHERE id=? "
    db.query(sqlRemove, id,(error,result)=> {
        if(error) {
            console.log(error)
        }
    })
})

app.get("/api/get/:id", (req,res)=> {
    const {id} = req.params
    const sqlGet = "SELECT * FROM contact_db WHERE id = ?"
    db.query(sqlGet, id, (error,result)=> {
        if(error) {
            console.log(error)
        }
        res.send(result)
    })
})

app.put("/api/update/:id", (req,res)=> {
    const {id} = req.params
    const {name,email,contact} =req.body
    const sqlUpdate = "UPDATE contact_db SET name = ?, email=?, contact=? WHERE id = ?"
    db.query(sqlUpdate, [name,email,contact,id], (error,result)=> {
        if(error) {
            console.log(error)
        }
        res.send(result)
    })
})


const port = 8000;


app.listen(port, () => {
  console.log(`listening on port ${port} `);
});
