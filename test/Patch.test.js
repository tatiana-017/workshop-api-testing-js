const axios = require("axios");
const { expect } = require("chai");
const { StatusCodes } = require("http-status-codes");

describe("PATCH Tests", () => {
    it("Consume PATCH Service", async () => {
        const data = {
            name: "Luis",
            age: "22",
            city: "Florida",
          };

        const response = await axios.patch("https://httpbin.org/patch",data);

        expect(response.status).to.equal(StatusCodes.OK);
        expect(JSON.parse(response.data.data)).to.eql(data);
      });
});
