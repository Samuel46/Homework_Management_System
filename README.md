# Homework__APP
- MERN homework management system


### Quick Start ###
 #### Install dependencies server/client ####
 * npm install
 * cd client
 * npm install

### Serve on localhost:3000 ###
 * npm run dev
 
# Databse Integration
- Connecting MongoDB to the app 


### Quick Start ###

 * npm install config
 * create a config folder in server add the following
 
   * create a DB file include initialize the as shown in the source code
    * - const mongoose = require("mongoose");
     -  const config = require("config");
     -  const db = config.get("mongoURL");
     -  const connectDB = async () => {
       try {
       await mongoose.connect(db, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      });

      - console.log("MongoDb is Connected...");
    }  catch (err) {
      console.error(err.message);
      / /    exit this process
      process.exit(1);
    }
   };
 - module.exports = connectDB;
*
  * create a default.json file in add the MongoDB URL provided after creating a cluster
   * - {
  "mongoURL": "mongodb+srv://USER__NAME:HTi7H4UkzGCT0iCB@homeworkapp.dzqur.mongodb.net/DATABSE__NAME?retryWrites=true&w=majority",
  "
}
*
* connect the DB to the app in the server.js as shown in the source code  

 - const connectDB = require("./config/db");
 - // connect database
-     connectDB();

### Creating a MongoDB Cluster ###
 * Login to MongoDB strat a new project follows the standard procedure
 * Create a cluster in your current project
 * In the network setting allow all IP for development purposes
 * Connect to the app> add the current user and database name in the provided URL.
 * Copy the URL in the default.json file in the config folder.
