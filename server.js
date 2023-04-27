const crypto = require('crypto');
const express = require('express');
const api = require('./routes/api');
const csrf = require('./routes/csrf');

const app = express();
const PORT = 3000;

app.set("view engine", "ejs");

app.use(express.static("public", {
    setHeaders: (res, path, stat) => {
        res.header("X-Frame-Options", "SAMEORIGIN");
    },
}));

app.use("/api", api);
app.use("/csrf", csrf);

app.get("/csp", (req, res) => {
    // Note:デフォルトだと views フォルダからの相対パスがレンダリング対象となる

    // リクエストのたびに毎回ランダムな文字列を生成し、CSP ヘッダ値に設定する
    const nonceValue = crypto.randomBytes(16).toString("base64");
    // object-src: Flash などのプラグインに対する制限をするディレクティブ
    // base-uri: <base> 要素に対する制限をするディレクティブ
    res.header("Content-Security-Policy",
        `script-src 'nonce-${nonceValue}' 'strict-dynamic';` + 
        "object-src 'none';" + 
        "base-uri 'none';" +
        "require-trusted-types-for 'script';"
        );

    // 明示的に unsafe-inline, nonce-source, hash-source などが指定されていないページでは、HTML内のインラインスクリプトなどは実行されない
    // res.header("Content-Security-Policy", "script-src 'self'");

    // 第2引数で nonce 値を HTML へ渡す
    res.render("csp", { nonce: nonceValue });
});

app.listen(PORT, ()=> {
    console.log(`Server is running on http//localhost:${PORT}`)
});