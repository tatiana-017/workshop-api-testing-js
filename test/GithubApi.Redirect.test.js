const axios = require('axios');
const { expect } = require('chai');
const { StatusCodes } = require('http-status-codes');

const url = 'https://github.com/aperdomob/redirect-test';
const newUrl = 'https://github.com/aperdomob/new-redirect-test';
describe('Consuming HEAD and redirecting requests', () => {
  it('Consume HEAD method', async () => {
    const headConsume = await axios.head(`${url}`);

    expect(headConsume.status).to.equal(StatusCodes.OK);
    expect(headConsume.request.res.responseUrl).to.equal(newUrl);
  });

  it('Query URL', async () => {
    const getConsume = await axios.get(`${url}`);

    expect(getConsume.status).to.equal(StatusCodes.OK);
    expect(getConsume.request.res.responseUrl).to.equal(newUrl);
  });
});
