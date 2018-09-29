var express = require('express');
var app = express();
var parser =require('body-parser');
var cors = require('cors');
const fs =require('fs');

//Fetching the data from the mobile.json file and displaying all the data
app.get('/getdata', function (req, res) {
  res.header("Access-Control-Allow-Origin","*");
  res.header("Access-Control-Allow-Headers","Origin,X-Requested-With,Content-Type,Accept");
  res.send(JSON.parse(fs.readFileSync('mobile.json')));
  var mobArray=JSON.parse(fs.readFileSync('mobile.json'));
  console.log(mobArray.mobile);   //displaying the data on the console
});

//displaying the mobiles belonging to a specific range from 10,000 to 50,000
app.get('/rangedata',(req,res)=>{
  res.header("Access-Control-Allow-Origin","*");
  res.header("Acess-Control-Allow-Headers","Origin,X-Requsted-Width,Content-Type,Accept")
  var arrayOfmobiles =JSON.parse(fs.readFileSync("mobile.json"));
  var newArray=[];
  for (let a=0;a<arrayOfmobiles.mobile.length;a++){
  if (arrayOfmobiles.mobile[a].mobPrice<=50000 && arrayOfmobiles.mobile[a].mobPrice>=10000 ){
  newArray.push(arrayOfmobiles.mobile[a]);}
  }
  res.send(newArray);  
});

//updating the mobile name based on mobile Id, In the URL enter the mobile Id whose name is to be updated
app.get('/updatedata/:id/:name',function(req,res){
    var id=req.params.id;
    var name=req.params.name;
    console.log(name);
    console.log(id);
    fs.readFile('mobile.json',function(err,data){
        if(err) throw err;
        var arrayOfmobiles=JSON.parse(data);
        for(i=0;i<arrayOfmobiles.mobile.length;i++)
        {
         if(arrayOfmobiles.mobile[i].mobId==id)
            {
                arrayOfmobiles.mobile[i].mobName=name;
            }
        }
    (fs.writeFileSync('mobile.json',JSON.stringify(arrayOfmobiles)));
    res.send(JSON.parse(fs.readFileSync('mobile.json')));    
    });
});


//Adding a new Mobile in the json file, the data entered in the req.body will be added in the json file
app.post('/addmobile',function(req,res){
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","Origin,X-Requested-With,Content-Type,Accept");
    req.body={"mobID": 1008,"mobName": "Blackberry","mobPrice": 10000000};
    fs.readFile('mobile.json', 'utf-8', function(err, data) {
	if (err) throw err;
	var arrayOfmobiles = JSON.parse(data);
    arrayOfmobiles.mobile.push(req.body);
    fs.writeFileSync('mobile.json',JSON.stringify(arrayOfmobiles),function(err){
    if (err) throw err;
    console.log("Done");
});
});
}); //run in the postman to see the added data in the json file

//starting the server
app.use(cors()).listen(1234,()=>{
    console.log('express started');
})