const crypto = require('crypto');
const express = require('express');
const api = require('./routes/api');

const app = express();
const PORT = 3000;

app.set("view engine", "ejs");

app.use(express.static("public"));

app.use("/api", api)

app.get("/csp", (req, res) => {
    // Note:デフォルトだと views フォルダからの相対パスがレンダリング対象となる

    // リクエストのたびに毎回ランダムな文字列を生成し、CSP ヘッダ値に設定する
    const nonceValue = crypto.randomBytes(16).toString("base64");
    res.header("Content-Security-Policy", `script-src 'nonce-${nonceValue}'`);

    // 明示的に unsafe-inline, nonce-source, hash-source などが指定されていないページでは、HTML内のインラインスクリプトなどは実行されない
    // res.header("Content-Security-Policy", "script-src 'self'");


    // 第2引数で nonce 値を HTML へ渡す
    res.render("csp", { nonce: nonceValue });
});

app.listen(PORT, ()=> {
    console.log(`Server is running on http//localhost:${PORT}`)
});