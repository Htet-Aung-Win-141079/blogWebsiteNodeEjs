const express=require("express");
const bodyParser=require("body-parser");
const ejs=require("ejs");
const _=require("lodash");

const app=express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");

const homeContent="Hi I'm Htet Aung Win,This is my personal blog website's home page!!";
const aboutContent="I created this website to upload knowledge sharing blogs";
const contactContent="You can DM me and call my phone number to integrate with me";

let posts=[];

app.get("/",function(req,res){
    res.render("home",{hcontent:homeContent,posts:posts});
})
app.get("/about",function(req,res){
    res.render("about",{acontent:aboutContent});
})
app.get("/contact",function(req,res){
    res.render("contact",{ccontent:contactContent});
})
app.get("/compose",function(req,res){
    res.render("compose");
})
app.post("/compose",function(req,res){
    const contentTitle=req.body.contentTitle;
    const contentBody=req.body.contentBody;

    var post={
        title:contentTitle,
        body:contentBody
    };
    posts.push(post);
    res.redirect("/");
})
app.get("/posts/:postid",function(req,res){
    const RequestedTitle=_.lowerCase(req.params.postid);

    posts.forEach(post=>{
        if(RequestedTitle===_.lowerCase(post.title)){
            res.render("post",{postTitle:post.title,postBody:post.body});
        }
    });
});
app.listen(3000,function(req,res){
    console.log("Server is running on port 3000");
})





