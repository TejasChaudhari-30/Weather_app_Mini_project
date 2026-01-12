import express from "express";
import axios from "axios";


const app=express();
const port =4000;
const key="e5b139915f75bb9b81e6f01c501a0f27";
const base_api=`https://api.openweathermap.org/data/2.5/weather`;
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/",(req,res)=>{
    res.render("index.ejs", {  heading:"Get the weather details of your location" 

    })


})
app.post("/getdetails",async (req,res)=>{


    try{
        // console.log(req.body.units); 
        const coordinates= await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${req.body.city}&limit=1&appid=${key}`)

        
        const response= await axios.get(base_api,{
            params:{
                lat:coordinates.data[0].lat,
                lon:coordinates.data[0].lon,
                appid:key,
                units:req.body.units
            }
        })

        // console.log(response.data);

        res.render("display.ejs",{
             name:response.data.name,
             coord:response.data.coord,
             weather:response.data.weather,
             main:response.data.main


        })
    }
    catch(error){
       res.status(500).send("Failed to fetch weather");
    }
})

app.listen(port,"0.0.0.0",()=>{
    console.log("server is running on port: ", port);
})
