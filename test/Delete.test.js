const axios = require("axios");
const { expect } = require("chai");
const { StatusCodes } = require("http-status-codes");

describe("DELETE test", () => {
    it("Consume DELETE service", async ()=>{
        
        const response = await axios.delete("https://httpbin.org/delete");
        expect(response.status).to.eql(StatusCodes.OK);

    })
})
