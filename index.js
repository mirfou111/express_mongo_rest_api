require ('dotenv').config()
const express = require("express");
const app = express();
const mongoose = require("mongoose");

//Configuration du port d'ecoute 
app.listen(3000, ()=>{ console.log("App running on port 3000 !"); })

//Configuration de mongodb et des logs inherants
mongoose.connect(process.env.DB_URL) ;
const db = mongoose.connection;
db.on("error",(error)=>console.error())
db.once("open", ()=>{
    console.log("Connected to database !");
})

//Configuration du serveur pour accepter des donnees json
app.use(express.json());

//Appel de la configuration des routes
const subscribersRoutes = require('./routes/subscribers');

app.use('/user', subscribersRoutes)
