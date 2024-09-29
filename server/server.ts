import app from "./src/app";
import { config } from "./src/config/config";
import connectToDB from "./src/config/dbConnect";
import { loadAndTrainModel } from "./src/helper/SentimentalAnalysis";


(async ()=>{
    // * connect to Database
    await connectToDB();
    const port =config.port || 4000;
// Train the model when the server starts
loadAndTrainModel()
  .then(() => {
    console.log('Model trained successfully.');
  })
  .catch((error) => {
    console.error('Error training model:', error);
  });
    app.listen(port,()=>{
        console.log(`Server is running on port ${port}`);
    });

})();
