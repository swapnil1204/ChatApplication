var app = require('../server');
var expect = require('chai');
const request = require('supertest');
describe("##### chech login()" ,() => {
    it("login successfull" ,(done) =>{
        request(app)
        .post('/login')
        .send({
            "email":"cshrome@gmail.com",
            "password":"chrome"
        })
        .expect(200)
        .end(function(err,res){
            let response=JSON.parse(res.text)
        //  console.log(response)
        //    expect(response.data.email).equal("ramesh@gmail.com");
        //    expect(response.status).equal(true);
            done();
        });
    })
})