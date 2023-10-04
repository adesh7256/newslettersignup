const express=require("express");
const bodyParser=require('body-parser');
const https=require("https");
const request=require("request");
 const app=express();

 app.use(express.static("public"));
 app.use(bodyParser.urlencoded({extended:true}));

 app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");

     
     
  });
  app.post("/",function(req,res)
  {
        //  console.log(req.body.first);
        //  console.log(req.body.last);
        //  console.log(req.body.email);
         var data={
            members:[
                {
                    email_address: req.body.email,
                    status:"subscribed",
                    merge_fields:{
                        FNAME:req.body.first,
                        LNAME:req.body.last
                    }
                }
            ]
         };
         var jso=JSON.stringify(data);
         const url="https://us21.api.mailchimp.com/3.0/lists/49387f0704";
         const options={
            method:"POST",
            auth:"adesg1:9e46d1993c5f0c85f4da01188cedca4a-us21"

         }
       const request=  https.request(url,options,function(response)
         {
            if(response.statusCode === 404)
              res.send("error");
            else
            {
            
             response.on("data",function(data)
             {
                    
                   // console.log(JSON.parse(data)); 
                    //res.send("Congratulations");
             })
             res.sendFile(__dirname+"/sucess.html");
            
            }
              
         })
         request.write(jso);
         request.end();
        
        
         
        
  });
  app.post("/fail",function(req,res)
  {
          res.redirect("/");
  })


 app.listen(process.env.PORT|| 3000,function()
 {
    console.log("server is running");
 })
//9e46d1993c5f0c85f4da01188cedca4a-us21
//49387f0704.