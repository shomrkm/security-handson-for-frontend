const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const router = express.Router();

router.use(
    session({
        secret: "session",
        resave: false,
        saveUninitialized: true,
        cookie: {
            httpOnly: true,  // セッションの Cookie は JS で操作する必要はない
            secure: false,   // 実際のアプリケーションでは true にすべき
            maxAge: 60 * 1000 * 5,
        },
    })
);
// フォームデータを読み取るために URLエンコードを有効にする
router.use(express.urlencoded({ extended: true }));
// Cookie の読み書きをするために cookieParser を登録する
router.use(cookieParser());

// セッションデータを保持
let sessionData = {}

router.post("/login", (req, res) => {
    const { username, password } = req.body;
    // 検証用のため、ユーザ名とパスワードは固定
    // 実際にはDBの値を比較して検証する必要がある
    if( username !== "user1" || password !== "Passw0rd!#") {
        res.status(403);
        res.send("ログイン失敗");
        return;
    }
    // セッションにユーザ名を格納
    sessionData = req.session;
    sessionData.username = username;
    // CSRF 検証用ページへリダイレクト
    res.redirect("/csrf_test.html");
});

router.post("/remit", (req, res) => {
    // セッションに保存した情報からログイン済みか確認する
    if(!req.session.username || req.session.username !== sessionData.username) {
            res.status(403);
            res.send("ログインしていません。");
            return;
    }

    // 本来は DB の書き換えなど重要な処理が行われる
    const { to, amount } = req.body;
    res.send(`「${to}」へ「${amount}」円を送金しました。`);
});

module.exports = router;