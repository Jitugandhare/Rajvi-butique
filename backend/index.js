const express = require("express");
const app = express();
const { connection } = require("./config/db");
const  userroute = require("./routes/user.route");



app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", userroute);



app.listen('3030', async () => {
    try {
        console.log(`server is running on port 3030`);
        console.log("connected to DB");
        
    } catch (err) {
        console.log(err);
    }
});