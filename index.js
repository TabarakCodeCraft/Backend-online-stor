const express = require("express");
const app = express();
const dashboard = require("./routes/dashboard");
const client =require("./routes/client");
const bodyParser = require('body-parser');
app.use(express.json()); 
const port=3000;

app.get("/", (req, res) => {
    res.send("This is my Backend online stor");
  });

  app.use("/Dashbooard", dashboard);
  app.use("/client", client);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });