// main.js
"use strict";

// @TODO: 웹 서버를 만들고 실행한다.
//먼저 모든 상수변수 정리
const port = 3000,
    express = require('express'),
    layouts = require('express-ejs-layouts'),
    homeController = require('./controllers/homeController'),
    errorController = require('./controllers/errorController'),
    app = express();

    //2단계 앱 설정(set 함수, 그 다음에 usㄷ함수)
app.set("port", process.env.PORT || port);
app.set("view engine", "ejs");

app.use(layouts);
app.use(express.static("public"));

//get라우트 먼저, 그다음에 post 라우트
app.get("/", homeController.getHome);
app.get("/name/:myMane", homeController.respondWithName)
app.get("/test", (req, res) =>{
    res.sendFile("./public/test.html");
});

//순서 때문에 errorController app.ues()은 마지막 listen 전
app.use(errorController.logErrors);
app.use(errorController.resNotFound); //404
app.use(errorController.resInternalError); //500 마지막

    //마지막 listen함수
app.listen(app.get("port"), () => {
    console.log(`Server at : http//localhost:${app.get("port")}`)
});