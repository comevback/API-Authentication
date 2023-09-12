import express, { response } from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com/";

//TODO 1: Fill in your values for the 3 types of auth.
let yourUsername = "xingong1";
let yourPassword = "xingong1";
let yourAPIKey = "";
let yourBearerToken = "";

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/register", async (req, res) => {
  //TODO 2: Use axios to hit up the /random endpoint
  //The data you get back should be sent to the ejs file as "content"
  //Hint: make sure you use JSON.stringify to turn the JS object from axios into a string.
  const result = await axios.post(API_URL + "register", {
    username: "xingong1",
    password: "xingong1"
  });
  console.log(result.data);
  const cont = JSON.stringify(result.data);
  res.render("index.ejs", {
    content: cont
  })
});

app.get("/generate-api-key", async (req, res) => {
  //TODO 2: Use axios to hit up the /random endpoint
  //The data you get back should be sent to the ejs file as "content"
  //Hint: make sure you use JSON.stringify to turn the JS object from axios into a string.
  const result = await axios.get(API_URL + "generate-api-key");
  console.log(result.data);
  yourAPIKey = result.data.apiKey;
  console.log(yourAPIKey);
  const cont = JSON.stringify(result.data);
  res.render("index.ejs", {
    content: cont
  })
});

app.get("/get-auth-token", async (req, res) => {
  //TODO 2: Use axios to hit up the /random endpoint
  //The data you get back should be sent to the ejs file as "content"
  //Hint: make sure you use JSON.stringify to turn the JS object from axios into a string.
  const result = await axios.post(API_URL + "get-auth-token", {
    username: "xingong1",
    password: "xingong1"
  });
  console.log(result.data);
  yourBearerToken = "Bearer " + result.data.token;
  console.log("your token is " + yourBearerToken);
  const cont = JSON.stringify(result.data);
  res.render("index.ejs", {
    content: cont
  })
});



app.get("/noAuth", async (req, res) => {
  //TODO 2: Use axios to hit up the /random endpoint
  //The data you get back should be sent to the ejs file as "content"
  //Hint: make sure you use JSON.stringify to turn the JS object from axios into a string.
  const result = await axios.get(API_URL + "random");
  const cont = JSON.stringify(result.data);
  res.render("index.ejs", {
    content: cont
  })
});


app.get("/basicAuth", async(req, res) => {
  //TODO 3: Write your code here to hit up the /all endpoint
  //Specify that you only want the secrets from page 2
  //HINT: This is how you can use axios to do basic auth:
  // https://stackoverflow.com/a/74632908
  /*
   axios.get(URL, {
      auth: {
        username: "abc",
        password: "123",
      },
    });
  */
    const result = await axios.get(API_URL + "all", {
      auth: {
        username: yourUsername,
        password: yourPassword
      }
    });
    console.log(result.data);
    const cont = JSON.stringify(result.data);
    res.render("index.ejs", {
      content: cont
    });
});

app.get("/apiKey", (req, res) => {
  //TODO 4: Write your code here to hit up the /filter endpoint
  //Filter for all secrets with an embarassment score of 5 or greater
  //HINT: You need to provide a query parameter of apiKey in the request.
  axios.get(API_URL + "filter?score=6&apiKey=" + yourAPIKey)
  .then(response => {
    console.log(response.data);
    const cont = JSON.stringify(response.data);
    res.render("index.ejs", {
      content: cont
    });
  })
});

app.get("/bearerToken", async(req, res) => {
  //TODO 5: Write your code here to hit up the /secrets/{id} endpoint
  //and get the secret with id of 42
  //HINT: This is how you can use axios to do bearer token auth:
  // https://stackoverflow.com/a/52645402
  /*
  axios.get(URL, {
    headers: { 
      Authorization: `Bearer <YOUR TOKEN HERE>` 
    },
  });
  */
  const result = await axios.get(API_URL + "/secrets/41", {
    headers:{
      "Authorization": yourBearerToken
    }
  });
  const cont = JSON.stringify(result.data);
  res.render("index.ejs", {
    content: cont
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
