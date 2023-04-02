const express = require('express');
const api = require('./routes/api');

const app = express();
const PORT = 3000;

app.use(express.static("public"));

app.use("/api", api)

app.get("/", (req, res, next) => {
    res.end("Top Page")
});

app.listen(PORT, ()=> {
    console.log(`Server is running on http//localhost:${PORT}`)
});