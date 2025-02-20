# Java Script Voting App

## Project for DataArt Winter IT Camp 2025

### Task Decription

A fun web application where users can vote on daily jokes using emojis! Think of it as "Daily news" but with emoji reactions.

- Project Overview

This project consists of two main parts:

1. A React frontend where users interact with jokes and vote

2. A Node.js backend API that handles data and voting logic

The full documentation can be found [here](https://dataartcom-my.sharepoint.com/:w:/g/personal/vadym_shevchenko_dataart_com/ETG5R1noPGJBsB52ecpQluIB44kDGSA97snmf8cI72AFkQ?e=h9UdaF).

### Technologies Used

- Node.js
- React
- JavaScript
- [Teehee Joke API](https://www.freepublicapis.com/teehee-joke-api)
- MongoDB


### Implementation

This is a React App that uses it for the front and running and hosting the app, but also Node.js is the thing that binds everything together. 

The Data Base used for storing the jokes, their number of votes and ID is MongoDB, which is a requirement to install before running the app. Personally, I used the MongoDB shell (as you can see in the picture) to check if the App worked properly.

![image](https://github.com/user-attachments/assets/6275e9fc-f886-4647-b000-4e48c2176cf0)
![image](https://github.com/user-attachments/assets/1ae84e1a-eff5-4b8a-b52f-f4f66593d619)

### Running the App

1. Firstly, you need to run MongoDB using the command
   ***mongod***
2. Then you should run the backend by entering the backend folder and typing
  ***npm start***
3. Finally, you run the frontend by entering the folder where _package.json_ is and also type
   ***npm start***


In case _npm start_ isn't working, try _npm install_ in both these folders.



