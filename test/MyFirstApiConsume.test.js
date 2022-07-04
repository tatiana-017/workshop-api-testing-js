const axios = require("axios");
const { expect } = require("chai");
const { StatusCodes } = require("http-status-codes");

describe("First Api Tests", () => {
  it("Consume GET Service", async () => {
    const response = await axios.get("https://httpbin.org/ip");

    expect(response.status).to.equal(StatusCodes.OK);
    expect(response.data).to.have.property("origin");
  });

  it("Consume GET Service with query parameters", async () => {
    const query = {
      name: "John",
      age: "31",
      city: "New York",
    };

    const response = await axios.get("https://httpbin.org/get", {
      params: query,
    });

    expect(response.status).to.eql(StatusCodes.OK);
    expect(response.data.args).to.eql(query);
  });

  it("Consume HEAD service", async () => {
    const response = await axios.head("https://httpbin.org");

    expect(response.status).to.equal(StatusCodes.OK);
  });

  it("Consume PATCH Service", async () => {
    const data = {
      name: "Luis",
      age: "22",
      city: "Florida",
    };

    const response = await axios.patch("https://httpbin.org/patch", data);

    expect(response.status).to.equal(StatusCodes.OK);
    expect(JSON.parse(response.data.data)).to.eql(data);
  });

  it("Consume PUT Service", async () => {
    const data = {
      name: "Tatiana",
      age: "22",
      city: "Bogota",
    };

    const response = await axios.put("https://httpbin.org/put", data);

    expect(response.status).to.equal(StatusCodes.OK);
    expect(JSON.parse(response.data.data)).to.eql(data);
  });

  it("Consume DELETE service", async () => {
    const response = await axios.delete("https://httpbin.org/delete");
    expect(response.status).to.eql(StatusCodes.OK);
  });
});
