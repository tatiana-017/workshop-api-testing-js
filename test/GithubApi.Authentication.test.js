const { StatusCodes } = require('http-status-codes');
const { expect } = require('chai');
const axios = require('axios');

const urlBase = 'https://api.github.com';
const githubUserName = 'tatiana-017';
const repository = 'workshop-api-testing-js';

describe('Github Api Test', () => {
  describe('Authentication', () => {
    it('Via OAuth2 Tokens by Header', async () => {
      const response = await axios.get(
        `${urlBase}/repos/${githubUserName}/${repository}`,
        {
          headers: {
            Authorization: `token ${process.env.ACCESS_TOKEN}`
          }
        }
      );

      expect(response.status).to.equal(StatusCodes.OK);
      expect(response.data.description).equal(
        'This is a Workshop about Api Testing in JavaScript'
      );
    });

    // Test authentication by parameters
    it('Via OAuth2 Tokens by parameter', async () => {
      const response = await axios.get(
        `${urlBase}/repos/${githubUserName}/${repository}`,
        { access_token: process.env.ACCESS_TOKEN }
      );

      expect(response.status).to.equal(StatusCodes.OK);
      expect(response.data.description).equal(
        'This is a Workshop about Api Testing in JavaScript'
      );
    });
  });
});
