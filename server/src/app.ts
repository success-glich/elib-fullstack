import express from "express";
import { config } from "./config/config";
import globalErrorHandler from "./middlewares/global.error.handler";
import userRouter from "./user/user.router";
import bookRouter from "./book/book.router";
import cors from "cors";
import reviewRouter from "./review/review.routes";

const app = express();

// const data = JSON.parse(fs.readFileSync('./data.json','utf-8'));    


// const classifier = trainClassifier("./src/data/review.csv");


// routes HTTP Method -> PUT,POST, PUT,PATCH, DELETE
app.get('/',(req,res)=>{
        //   const error=  throw new Error('something wen wrong')
    // const error = createHttpError(400,"something went wrong")
    // throw error;
    res.status(200).json({
        success:true,
        message:"Welcome to elib apis."
    })

})
// app.get('/:msg',(req,res)=>{

//     const {msg}  =req.params;
//     const sentiment = classifier.classify(msg);
//     res.json({msg:sentiment})
// })

// *  train the model:


app.use(cors({
    origin:[config.frontendDomain,"http://localhost:3000"],}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/users",userRouter);
app.use('/api/v1/books',bookRouter);
app.use("/api/v1/reviews",reviewRouter);

// * Global error handler
 app.use(globalErrorHandler);

export default app;