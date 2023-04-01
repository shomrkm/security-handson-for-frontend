const express = require('express');

const app = express();
const PORT = 3000;

app.get("/", (req, res, next) => {
    res.end("Top Page")
});

app.listen(PORT, ()=> {
    console.log(`Server is running on http//localhost:${PORT}`)
});