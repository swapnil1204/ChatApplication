// const chai = require('chai');

// const chaihttp = require('chai-http');

// chai.use(chaihttp);

// chai.should();

// var server = require('../server');

// var fs = require('fs');

// function test() {
//     var data = fs.readFileSync('/home/admin1/Bridgelabz_workspace/ChatApp/backend/test/TestData.json');
//     var data1 = JSON.parse(data);
//     return data1;
// }

// describe('Testing chat appplication for registration', function () {
//     var data2 = test();
//     console.log('data2' + data2);

//     describe('registration page', function () {
//         it('user registered successfully', done => {
//             chai.request(server).post('/register').send(data2.register).end((err, res) => {
//                 if (err) {
//                     err.should.have.status(500);
//                 } else {
//                     res.should.have.status(200);
//                 }
//                 done();
//             })
//         })

//     })
// })
var fs = require('fs')
function test() {
        var data = fs.readFileSync('/home/admin1/Bridgelabz_workspace/ChatApp/backend/test/TestData.json');
        var data1 = JSON.parse(data);
        return data1;
    }

var data2 = test()
var assertObj = require('chai').assert
var anyObj = require('../controller/UserController');
describe('registration page', function () {
            it('firstname is a string ', done => {
                 var first = data2.register.firstname;
                 assertObj.isString(first);
                 done();
                })
                it('lastname is a string ', done => {
                    var last = data2.register.lastname;
                    assertObj.isString(last);
                    done();
                   })
                   it('email is email', done => {
                    var email = data2.register.email;
                    assertObj.isNotEmpty(email);
                    done();
                   })
                   it('lastname is a string ', done => {
                    var pass = data2.register.password;
                    assertObj.isString(pass);
                    done();
                   })
                 //Error: Timeout of 2000ms exceeded. For async tests and hooks,
                 // ensure "done()" is called; if returning a Promise, ensure it resolves
                 
                var result =  anyObj.registration(data2)
                console.log(result)
            })
    