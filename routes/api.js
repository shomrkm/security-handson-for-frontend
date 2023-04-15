const express = require("express");
const router = express.Router();

const allowlist = [
    "http://localhost:3000",
    "http://site.example:3000",
];

router.use(express.json());

router.use((req, res, next) => {
    // Origin がヘッダに存在している、かつリクエスト許可するリスト内に Origin ヘッダの値が含まれているかチェック
    if(req.headers.origin && allowlist.includes(req.headers.origin)) {
        res.header("Access-Control-Allow-Origin", req.headers.origin)
    }

    if(req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Headers", "X-Token");
    }
    next();
});

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