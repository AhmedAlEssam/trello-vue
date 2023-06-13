 
## Installation

Please follow the steps below to install the project on your machine:

1. Install Node.js from the official website:  [https://nodejs.org](https://nodejs.org)
2. Install MongoDB from the official website:  [https://www.mongodb.com](https://www.mongodb.com)
3. Clone the project from GitHub using the following command in the command line: git clone  [https://github.com/AhmedAlEssam/VueChattest](https://github.com/AhmedAlEssam/VueChattest) it may change in feature to https://github.com/AhmedAlEssam/VueToDoList 
4. Navigate to the cloned project folder: ``` cd VueChattest ``` or ``` cd VueToDoList ```


## Platforms and Libraries Required

The project requires the following platforms and libraries to be installed:

- Node.js
- Express
- MongoDB
- Nodemon (optional - helps with automatic server restart on changes)
- Axios
- Cors
- Body Parser
- Cli-table
- Tailwind CSS
- Vuedraggable

Make sure to install these platforms and libraries on your machine before running the project, using : ``` npm install ```

## Using Seeds

The project provides Seeds for inserting default data into the database. To use them, uncomment seeds line in server.js

This will insert default data into the database associated with the project.

## Setting Up MongoDB
To run your project locally, you'll need to set up MongoDB on your machine. Here are the steps to follow:

1. Install MongoDB: Visit the MongoDB download page   [ https://www.mongodb.com/try/download/community]( https://www.mongodb.com/try/download/community) and download the appropriate version of MongoDB for your operating system. Follow the installation instructions specific to your OS.
2. Start MongoDB: After installation, you need to start the MongoDB server. Open a terminal or command prompt and run the following command: mongod
3. Create a Database: Once the MongoDB server is running, you can create a database for your project. Open another terminal or command prompt and run the following command to start the MongoDB shell:  ``` mongo ```
   In the MongoDB shell, run the following command to create a new database: use trello
   Replace your_database_name with the desired name for your database.

4. Connect to MongoDB: In your Node.js application, you need to establish a connection to MongoDB. You can use the mongoose library for this purpose. Install it by running the following command in your project directory: ``` npm install mongoose ```
In your code, use the following snippet to connect to MongoDB:
``` const mongoose = require('mongoose');
// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/trello', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.error('Failed to connect to MongoDB', error));

```

 Replace your_database_name with the name of your MongoDB database.
 your database should contain at least two collections called columns and tasks with the following schema:
 columns
 ```
{
  "_id": {
    "$oid": "645caeaca879fb3971c31978"
  },
  "title": "ToDO",
  "tasks": [
    {
      "$oid": "645c9d3221b303196be38f75"
    },
    {
      "$oid": "645f6e8940bf922c26933496"
    }
  ],
  "__v": 18
}
 ```
 tasks
 ```
{
  "_id": {
    "$oid": "645f786222884a84668f1311"
  },
  "title": "Task 1 ",
  "__v": 0
}
 ```

## Running the Project

After installing the project and the required libraries, you can run the project using the following steps:

1. Start the MongoDB database.
2. In the command line, run the server using the following command: npm run dev
   This will start the server and the project will be accessible at the specified URL.

 
