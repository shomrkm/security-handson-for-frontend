const express = require("express");
const router = express.Router();

router.use(express.json());

router.get('/', (req, res) => {
    res.setHeader("X-Timestamp", Date.now());
    const message = req.query.message;
    const lang = req.headers["x-lang"];

    if(message === "") {
        res.status(400);
        if(lang === "en"){
            return res.send({ message: "message is empty"});
        }else{
            return res.send({ message: "messageの値が空です"});
        }
    };

    res.send({ message });
});

router.post('/', (req, res) => {
    const body = req.body;
    console.log(body);
    res.end();
});

module.exports = router;