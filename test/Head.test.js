const axios = require("axios");
const { expect } = require("chai");
const { StatusCodes } = require("http-status-codes");

describe("HEAD test", () => {
    it("Consume HEAD service", async () => {
        const response = await axios.head("https://httpbin.org");

        expect(response.status).to.equal(StatusCodes.OK);
    });

});
