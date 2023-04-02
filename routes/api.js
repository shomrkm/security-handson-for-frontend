const express = require("express");
const router = express.Router();

router.use(express.json());

router.get('/', (req, res) => {
    res.send({ message: "Hello" });
});

router.post('/', (req, res) => {
    const body = req.body;
    console.log(body);
    res.end();
});

module.exports = router;