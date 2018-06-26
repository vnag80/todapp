var expect = require('expect');
var request = require('supertest');
var { ObjectID } = require('mongodb');
const  _ = require('lodash');
var { todo } = require('./../models/todo');
const { user } = require('./../models/user');
const { app } = require('./../server');
//const {mongoose} = require('./../db/mongoose');
const todos = [{ _id: new ObjectID(), text: "first row for test" },
{ _id: new ObjectID(), text: "second row for test" }];
  
beforeEach((done) => {

    todo.remove().then(() => {
        return todo.insertMany(todos);
    }).then(() => { done(); })
     
        .catch((err) => { done(err); });


});

describe("/POST test", () => {
    it('It should send response with text', (done) => {
        var text = "Testing post";
        request(app)
            .post('/todo')
            .send({ text })
            .expect(200).end((err, res) => {
                if (err) {
                    return done(e);
                }

                todo.find({ text }).then((todos) => {
                    //  console.log("Venkat",todos);
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    return done();
                }).catch((e) => done(e));
            });


    });
    it('It should not create todo', (done) => {
        var text = "";
        request(app)
            .post('/todo')
            .send({ text })
            .expect(400).end((err, res) => {
                if (err) {
                    return done(e);
                }

                todo.find().then((todos) => {
                    //  console.log("Venkat",todos);
                    expect(todos.length).toBe(2);

                    return done();
                }).catch((e) => done(e));
            });


    });

});
describe("/GET test", () => {
    it('It should retrieve 2 texts', (done) => {

        request(app)
            .get('/todo')
            .expect(200).end((err, res) => {
                if (err) {
                    return done(err);
                }

                todo.find({}).then((todos) => {
                    //  console.log("Venkat",todos);
                    expect(todos.length).toBe(2);
                    return done();
                }).catch((e) => done(e));
            });


    });



});
describe("/GET BY ID test", () => {
    it('It should retrieve 1 doc', (done) => {  
        var url = '/todo/' + todos[0]._id.toHexString(); 
        request(app)
        .get(url)
        .expect(200)
        .end((err,res)=>
    {
      if (err)
      {
          return done(err);
      }
      console.log(res.body);
      expect(res.body.doc._id).toBe(todos[0]._id.toHexString());
      done();
    }
    );
    });
    it('It should not retrieve any document', (done) => {  
        var url = '/todo/123'  
        request(app)
        .get(url)
        .expect(404)
        .end((err,res)=>
    {
      if (err)
      {
          return done(err);
      }
      console.log(res.body);
      expect(res.body.doc).toNotExist();
      done();
    }
    );
    });
    it('ID not exist', (done) => {  
        
        var url = '/todo/' + new ObjectID().toHexString();  
        request(app)
        .get(url)
        .expect(404)
        .end((err,res)=>
    {
      if (err)
      {
          return done(err);
      }
      console.log(res.body);
      expect(res.body.doc).toNotExist();
      done();
    }
    );
    });
});
describe("/DEL BY ID test", () => {
    it('It should delete 1 doc', (done) => {  
        var url = '/todo/' + todos[0]._id.toHexString(); 
        request(app)
        .delete(url)
        .expect(200)
        .end((err,res)=>
    {
      if (err)
      {
          return done(err);
      }
      console.log(res.body);
      expect(res.body.doc._id).toBe(todos[0]._id.toHexString());
      done();
    }
    );
    });
    it('It should not delete any document', (done) => {  
        var url = '/todo/123'  
        request(app)
        .delete(url)
        .expect(404)
        .end((err,res)=>
    {
      if (err)
      {
          return done(err);
      }
      console.log(res.body);
      expect(res.body.doc).toNotExist();
      done();
    }
    );
    });
    it('ID not exist', (done) => {  
        
        var url = '/todo/' + new ObjectID().toHexString();  
        request(app)
        .delete(url)
        .expect(404)
        .end((err,res)=>
    {
      if (err)
      {
          return done(err);
      }
      console.log(res.body);
      expect(res.body.doc).toNotExist();
      done();
    }
    );
    });
});
 
// describe("/GET BY ID test", () => {
//     it('It should retrieve 1 doc', (done) => {
//         var url = '/todo/' + todos[0]._id.toHexString();
//         console.log('url :' + url);
//         request(app)
//             .get(url)
//             .expect(200).end((err, res) => {
//                 if (err) {
//                     return done(err);
//                 }

//                 todo.findById(res._id).then((todos) => {
//                     //  console.log("Venkat",todos);
//                     expect(todos).toBeDefined().expect(todos.length).tobe(1);
//                     return done();
//                 }).catch((e) => done(e));
//             });
//         it('It should retrieve 1 doc', (done) => {
//             var url = '/todo/' + todos[0]._id.toHexString();
//             console.log('url :' + url);
//             request(app)
//                 .get(url)
//                 .expect(200).end((err, res) => {
//                     if (err) {
//                         return done(err);
//                     }

//                     todo.findById(res._id).then((todos) => {
//                         //  console.log("Venkat",todos);
//                         expect(todos.length).toBe(1);
//                         return done();
//                     }).catch((e) => done(e));
//                 });

//         });



//     });
// });
// describe("/Delete BY ID test", () => {
//     it('It should retrieve 1 doc', (done) => {
//         var url = '/todo/' + todos[0]._id.toHexString() + 1;
//         console.log('url :' + url);
//         request(app)
//             .delete(url)
//             .expect(404).end((err, res) => {
//                 if (err) {
//                     return done(err);
//                 }

//                 todo.findById(res._id).then((todos) => {
//                     //  console.log("Venkat",todos);
//                     expect(todos).toNotExist();
//                     return done();
//                 }).catch((e) => done(e));
//             });


//     });



// });

