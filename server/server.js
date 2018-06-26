var express = require('express');
var {ObjectID}= require('mongodb');
const  _ = require('lodash');
var bodyParser = require('body-parser');
var {mongoose} = require('./db/mongoose');
var {todo} = require('./models/todo');
var {user} = require('./models/user');
 var app = express();
 module.exports = {app};
 app.listen(3000,() =>
{
    console.log("started lisening posrt 3000")
});
app.use(bodyParser.json());
app.post('/todo',(req,res)=>
{
  var todot = new todo({
      text:req.body.text
  });
  todot.save().then((doc) =>
  {
      res.status(200).send(doc);
      
  },(e) =>{
      res.status(400).send(e);
    
  });
}
);

app.get('/todo',(req,res)=>
{
  
  todo.find().then((docs) =>
  {
      res.status(200).send(docs);
       
  },(e) =>{
      res.status(400).send(e);
    
  });
}
);
app.get('/todo/:id',(req,res)=>
{
  var {id} = req.params
 if (!ObjectID.isValid(id))
 {
   return res.status(404).send(id);
 }  
 
 todo.findById(id).then((doc) =>
 {
   if (!doc) 
   {
    return res.status(404).send();
   }
   return res.status(200).send({doc})
 }).catch((e) =>{
  return res.status(400).send();
 });
});
app.delete('/todo/:id',(req,res)=>
{
  var {id} = req.params 
  console.log(id);
 if (!ObjectID.isValid(id))
 {
   
   return res.status(404).send(id);
 }  
//var id = new ObjectID(id);  

todo.findByIdAndRemove(id).then((doc) =>
 {
   if (!doc) 
   {
    return res.status(404).send();
   }
   return res.status(200).send({doc})
 }).catch((e) =>{
  return res.status(400).send();
 });
});
app.patch('/todo/:id',(req,res)=>
{
  var {id} = req.params 
  console.log(id);
 if (!ObjectID.isValid(id))
 {
   
   return res.status(404).send();
 }  
 var body = _.pick(req.body,['completed','text']);
   
if (_.isBoolean(body.completed) && body.completed)
{
  body.completeAt = Date.now();
  
} else
{
  body.completeAt = null;

}
console.log(body); 
todo.findByIdAndUpdate(id,{$set:body},{new:true}).then((todo) =>{
   if (!todo)
   {
     return res.status(404).send( );
   }
    return res.status(200).send(todo);
}).catch((err) =>{ return res.status(404).send();})
 
});
                        
 /* var newtodo = new todo({text:"complete the program"});
 newtodo.save().then((doc)=>
 {
   console.log("data saved", doc);
 },(e) =>{
    console.log("Unable to do save", e);
 } );  
 /*var othertodo = new Todo({text:"  Validators check "});
othertodo.save().then((doc)=>
  {
    console.log("data saved", JSON.stringify(doc));
  },(e) => {
    console.log("Unable to do save", e);
  }
);*/

  /*var user = mongoose.model('user',
   {
    Email:{
    type:String,
    required: true,
    trim:true,
    minLength: 1
    }
  });*/
  /*var newuser = new user({Email:"vnag80@gmail.com"});
  newuser.save().then((doc)=>
{
    console.log('DATA SAVED',doc);
},(e)=>{
   console.log('Unable to save', e); 
});*/




                    
 