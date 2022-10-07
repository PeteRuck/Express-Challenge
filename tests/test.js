const chai = require("chai")

const test = "Once upon a midnight dreary!";

describe("Chai Demo", function(){

    this.beforeAll("'Chai Demo' BeforeAll", function(){
        console.log("BeforeAll")
    })
    this.afterAll("'Chai Demo' AfterAll", function(){
        console.log("AfterAll")
    })
    this.beforeEach("'Chai Demo' BeforeEach", function(){
        console.log("BeforeEach")
    })
    this.afterEach("'Chai Demo' AfterEach", function(){
        console.log("AfterEach")
    })

    it("Expect", function(){
        chai.expect(test).to.equal("Once upon a midnight dreary!")
    })

    it("Property", function(){
        const testObject = {test};
        chai.expect(testObject).to.have.property("test")
        chai.expect(testObject.test).to.equal("Once upon a midnight dreary!")
    })
    
    it("Not", function(){
        chai.expect(test).not.to.equal("while I pondered, weak and weary!")
    })
})