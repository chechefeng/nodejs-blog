const express = require("express");
const expressStatic = require("express-static");
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");
const bodyParser = require("body-parser");//只能解析post数据不能解析文件上传
const ejs = require("ejs");
const multer = require("multer");//上传文件
const consolidate = require("consolidate");//整合模板引擎
const mysql = require("mysql");
const util  = require("./util/date")

var objmulter = multer({dest: "./www/upload"})//目标文件
//连接池
const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "root",
    database: "blog"
});
var server = express();
//1解析cookie

server.use(cookieParser("sdddddghhhh"))

//2使用session
server.use(cookieSession({name: "lpwzhi", keys: ["sdss", "sdsdd", "Sdss"], maxAge: 20 * 3600 * 1000}))
//3post数据

server.use(bodyParser.urlencoded({extended: false}));
server.use(objmulter.any());
//配置模板引擎

//1.输出什么东西
server.set("view engine", "html");
// 2.模板文件在哪
server.set("views", "./views");
// 1.哪种模板引擎
server.engine("html", consolidate.ejs);

server.get("/", function (req, res, next) {
    //查询banner
    db.query("select * from banner_table", (err, data) => {
        if (err) {
            res.status(500).send("错了");
            res.end()

        } else {
            // res.render("index.ejs", {banners: data})
            res.banners = data;
            next()
        }

    });

});
server.get("/", function (req, res,next) {
    //新闻列表
    db.query("select ID,title,summary from article_table", (err, data) => {
        if (err) {
            res.status(500).send("错了");
            res.end()

        } else {
            // console.log(data);
            res.article = data

            next()
        }
    })
});
server.get("/", function (req, res) {
    res.render("index.ejs", {
        banners: res.banners,
        article:res.article
    });
});
server.get("/article",(req, res)=>{
    console.log(req.query);
    if (req.query.id){
        if (req.query.act=="like"){
            db.query(`update article_table set n_link=n_link+1 where ID = ${req.query.id}`,(err,data)=>{
                if (err){
                    res.status(500).send("错了");
                    res.end()
                }else {
                    db.query(`select * from article_table where ID = ${req.query.id}`,(err,data)=>{
                        if (err) {
                            res.status(500).send("错了");
                            res.end()

                        } else {
                            // console.log(data);
                            var articleinfo = data[0];
                            // console.log( util.formDate(articleinfo.post_time*1000));
                            articleinfo.newDate =  util.formDate(articleinfo.post_time*1000)
                            res.render("article.ejs", {articleinfo:articleinfo,id:req.query.id});

                        }
                    });
                }
            })
        }else {
            db.query(`select * from article_table where ID = ${req.query.id}`,(err,data)=>{
                if (err) {
                    res.status(500).send("错了");
                    res.end()

                } else {
                    // console.log(data);
                    var articleinfo = data[0];
                    // console.log( util.formDate(articleinfo.post_time*1000));
                    articleinfo.newDate =  util.formDate(articleinfo.post_time*1000)
                    res.render("article.ejs", {articleinfo:articleinfo,id:req.query.id});

                }
            });
        }

    }

});

//5expressStatic数据
server.use(expressStatic("./www"));
server.listen(3000)