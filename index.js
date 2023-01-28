const express = require("express");
const cors = require("cors");
const formData = require("form-data");
const Mailgun = require("mailgun.js");
const { log } = require("console");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

/* MAILGUN CONFIGURATION */
const mailgun = new Mailgun(formData);
const client = mailgun.client({
  username: "SimonJ",
  key: process.env.API_KEY_MAILGUN,
});

app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome !!!" });
});

app.post("/form", async (req, res) => {
  try {
    // console.log("route /form");
    // console.log("FIRSTNAME===>", req.body);
    const messageData = {
      from: `${req.body.firstname} ${req.body.lastname} <${req.body.email}>`,
      to: "simon.m.jordan@gmail.com",
      subject: req.body.subject,
      text: req.body.message,
    };

    //Version async/await
    const response = await client.messages.create(
      process.env.DOMAIN_MAILGUN,
      messageData
    );

    //
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.all("*", (req, res) => {
  res.status(404).json({ message: "This route does not exist !" });
});

app.listen(process.env.PORT, () => {
  console.log("Server has started successfully !");
});
