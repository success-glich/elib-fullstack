import express from "express";

const app = express();

// routes HTTP Method -> PUT,POST, PUT,PATCH, DELETE
app.get('/',(req,res)=>{

    res.status(200).json({
        success:true,
        message:"Welcome to elib apis."
    })

})

export default app;