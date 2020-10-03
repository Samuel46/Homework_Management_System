const express = require("express");

// initiate the app // api config
const app = express();

// api routes
app.get("/", (req, res) => res.send("Api by samuel is running"));

// middleware

// listerner
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
