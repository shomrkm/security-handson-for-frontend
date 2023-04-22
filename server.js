const express = require('express');
const api = require('./routes/api');

const app = express();
const PORT = 3000;

app.set("view engine", "ejs");

app.use(express.static("public"));

app.use("/api", api)

app.get("/csp", (req, res) => {
    // 明示的に unsafe-inline が指定されて居ないページでは、HTML内のインラインスクリプトなどは実行されない
    res.header("Content-Security-Policy", "script-src 'self'");

    // デフォルトだと views フォルダからの相対パスがレンダリング対象となる
    res.render("csp");
});

app.listen(PORT, ()=> {
    console.log(`Server is running on http//localhost:${PORT}`)
});