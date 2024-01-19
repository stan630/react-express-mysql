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

app.delete("/api/remove/:id", (req, res) => {
    const {id} = req.body
    const sqlRemove = 
        "DELETE FROM contact_db WHERE id=? "
    db.query(sqlInsert, [name,email,contact], (error,result)=> {
        if(error) {
            console.log(error)
        }
    })
})


const port = 8000;


app.listen(port, () => {
  console.log(`listening on port ${port} `);
});
