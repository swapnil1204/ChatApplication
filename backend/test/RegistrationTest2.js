
const app=require('../server');
const {expect}=require('chai')
const request=require('supertest')
describe("to test the chatApp apis",()=>{
   it("should check the register api", (done) => {
        request(app)
           .post('/register')
           .send(
               {

                   "firstname" :"madhur",
                   "lastname":"madhur",
                   "email":"madhur@gmail.com",
                   "password":"madhur"
               }
               )
           .expect(200)
           .expect("Content-type",/json/)
           .end(function(err,res){
               let responsedata=JSON.parse(res.text)
               console.log(responsedata)
            //    expect(responsedata.data.email).equal("ramesh@gmail.com");
            //    expect(responsedata.status).equal(true);
               done();
           });
   })
})