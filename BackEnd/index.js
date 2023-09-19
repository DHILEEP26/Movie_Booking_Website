const express = require("express");
const app = express();
const mysql=require("mysql2");
const bodyparser = require("body-parser");
const cors = require("cors");

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "*****",     //Your MYSQL Workbench Password
    database: "*****"      //Your Database name
});


app.use(cors());
app.use(express.json());
app.use(bodyparser.urlencoded({extended: true}));
app.get("/api/get",(req,res) => {
    const sqlGet = "SELECT * FROM info_db";
    db.query(sqlGet, (error,result) => {
        res.send(result);

    });
    

});

app.post("/api/posts",(req,res) => {
    const {sel_seats, sel_ticket, amount}= req.body;
    const sqlInsert = "INSERT INTO ticket_info (sel_seats,sel_ticket,amount) VALUES (?,?,?)";
    db.query(sqlInsert,[sel_seats, sel_ticket, amount],(error,result) => {
        if(error){
            console.log(error);
        }
    });
});
app.post("/api/post",(req,res) => {
    const {name, movie_name, rating}= req.body;
    const sqlInsert = "INSERT INTO info_db (name,movie_name,rating) VALUES (?,?,?)";
    db.query(sqlInsert,[name, movie_name, rating],(error,result) => {
        if(error){
            console.log(error);
        }
    });
});

app.delete("/api/remove/:id" , (req,res) => {
    const { id } = req.params;
    const sqlRemove = "DELETE FROM info_db WHERE id = ?";
    db.query(sqlRemove, id, (error,result) => {
        if(error){
            console.log(error);
        }
    });
});  

app.get("/api/get/:id",(req,res) => {
    const { id } = req.params;
    const sqlGet = "SELECT * FROM info_db WHERE id = ?";
    db.query(sqlGet, id, (error,result) => {
        if(error){
            console.log(error);
        }
        res.send(result);

    });
    

});

app.put("/api/update/:id",(req,res) => {
    const { id } = req.params;
    const {name, movie_name, rating} = req.body;
    const sqlUpdate = "UPDATE info_db SET name = ?, movie_name = ?, rating = ? WHERE id = ?";
    db.query(sqlUpdate, [name, movie_name, rating ,id], (error,result) => {
        if(error){
            console.log(error);
        }
        res.send(result);

    });
    

});

app.get("/", (req,res) => {
    // const sqlInsert = "INSERT INTO info_db (name,ticket_num,rating) VALUES ('Dhileep kumar',5634,7.0)";
    // db.query(sqlInsert, (error,result) => {
    //     console.log("error", error);
    //     console.log("result",result);
    //     res.send("Movies");
    // });
    
});

app.listen(5000 ,()=>{
    console.log("The server is running ");
})
