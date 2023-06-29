const express=require("express")
const bodyparser=require("body-parser")
const request=require("request");
const https=require("https")
const { log } = require("console");
const app=express();

app.use(bodyparser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");

});
app.use(express.static("public"))


app.post("/",function(req,res){
    var name=req.body.name;
    var email=req.body.email
    var password=req.body.password
    var data ={
    
        members:[
            {
                email_address:email,
                status:"subscribed",
                mergr_fields:{
                    FNAME:name,
                    LNAME:password
                }
            }

        ]
    };
const jsonData=JSON.stringify(data);

const url="https://us21.api.mailchimp.com/3.0/lists/a7f2e86bc4";
const options={
    method:"POST",
    auth:"ragul:cf0dda3331e4e71f141494e1327adbe1-us21"
}

const request=https.request(url,options,function(response){

if(response.statusCode===200){
res.sendFile(__dirname+"/success.html");
}
else{
    res.sendFile(__dirname+"/failure.html");
}
    response.on("data",function(data){
        console.log(JSON.parse(data))
    })
    
})
request.write(jsonData);
request.end();


});


app.post("/failure",function(req,res){
    res.redirect("/")
})







app.listen(process.env.PORT || 3000,function(){
    console.log("server running on 3000");
});
//api key cf0dda3331e4e71f141494e1327adbe1-us21  
//  a7f2e86bc4. list id