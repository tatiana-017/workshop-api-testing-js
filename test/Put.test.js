const axios = require("axios");
const { expect } = require("chai");
const { StatusCodes } = require("http-status-codes");

describe("PUT Tests", () => {
    it("Consume PUT Service", async () => {
        const data = {
            name: "Tatiana",
            age: "22",
            city: "Bogota",
          };

        const response = await axios.put("https://httpbin.org/put",data);

        expect(response.status).to.equal(StatusCodes.OK);
        expect(JSON.parse(response.data.data)).to.eql(data);
      });
});
