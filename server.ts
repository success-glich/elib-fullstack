import app from "./src/app";
import { config } from "./src/config/config";
import connectToDB from "./src/config/dbConnect";


(async ()=>{
    // * connect to Database
    await connectToDB();
    const port =config.port || 4000;

    app.listen(port,()=>{
        console.log(`Server is running on port ${port}`);
    });

})();
