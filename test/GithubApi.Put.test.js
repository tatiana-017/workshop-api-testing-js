const axios = require('axios');
const { expect } = require('chai');
const { StatusCodes } = require('http-status-codes');

const url = 'https://api.github.com/user/following';
const username = 'aperdomob';

const auth = axios.create({
  path: url,
  headers: { Authorization: `token ${process.env.ACCESS_TOKEN}` }
});

describe('Consume PUT service on Github', () => {
  let followResponse;
  it('Follow the user aperdomob', async () => {
    followResponse = await auth
      .put(`${url}/${username}`);

    expect(followResponse.status).to.equal(StatusCodes.NO_CONTENT);
    expect(followResponse.data).to.eql('');
  });

  let response;
  let followers;
  it('List of followers', async () => {
    response = await auth.get(`${url}`);
    followers = await response.data.find((object) => object.login === 'aperdomob');

    expect(response.status).to.equal(StatusCodes.OK);
    expect(followers.login).to.equal('aperdomob');
  });

  it('Idempotence', async () => {
    followResponse = await auth
      .put(`${url}/${username}`);

    expect(followResponse.status).to.equal(StatusCodes.NO_CONTENT);
    expect(followResponse.data).to.eql('');
  });

  it('Idempotence list of followers', async () => {
    response = await auth.get(`${url}`);
    followers = await response.data.find((object) => object.login === 'aperdomob');

    expect(response.status).to.equal(StatusCodes.OK);
    expect(followers.login).to.equal('aperdomob');
  });
});
