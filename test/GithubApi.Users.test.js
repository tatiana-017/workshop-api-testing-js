const axios = require('axios');
const chai = require('chai');
const { StatusCodes } = require('http-status-codes');

const { expect } = chai;

const url = 'https://api.github.com/users';
const auth = axios.create({
  path: url,
  headers: {
    Authorization: `token ${process.env.ACCESS_TOKEN}`
  }
});

describe('Query parameters', () => {
  let params;
  let users;

  it('Github users - 30 per page', async () => {
    users = await auth.get(`${url}`);

    expect(users.status).to.be.eql(StatusCodes.OK);
    expect(users.data).to.have.length(30);
  });

  it('10 users', async () => {
    params = {
      per_page: 10
    };
    users = await auth.get(`${url}`, { params });

    expect(users.status).to.be.eql(StatusCodes.OK);
    expect(users.data).to.have.length(10);
  });

  it('100 users', async () => {
    params = {
      per_page: 100
    };
    users = await auth.get(`${url}`, { params });

    expect(users.status).to.be.eql(StatusCodes.OK);
    expect(users.data).to.have.length(100);
  });
});
