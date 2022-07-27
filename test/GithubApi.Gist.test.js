const axios = require('axios');
const { expect } = require('chai');
const { StatusCodes } = require('http-status-codes');

const url = 'https://api.github.com';
const auth = axios.create({
  path: url,
  headers: { Authorization: `token ${process.env.ACCESS_TOKEN}` }
});

describe('Consuming a DELETE and a nonexistent resource', () => {
  const gistBody = {
    description: 'This is an example',
    public: false,
    files: {
      'README.md': {
        content: 'Text... '
      }
    }
  };

  let gists;
  it('Create a gists', async () => {
    gists = await auth.post(`${url}/gists`, gistBody);

    expect(gists.status).to.equal(StatusCodes.CREATED);
    expect(gists.data).to.containSubset(gistBody);
  });

  let gistsInf;
  it('Gists verification', async () => {
    gistsInf = await auth.get(gists.data.url);

    expect(gistsInf.status).to.be.equal(StatusCodes.OK);
  });

  let gistDelete;
  it('Gists delete', async () => {
    gistDelete = await auth.delete(gists.data.url);

    expect(gistDelete.status).to.be.equal(StatusCodes.NO_CONTENT);
  });

  it('Confirm deletion', async () => {
    try {
      await auth.get(gists.data.url);
    } catch (err) {
      expect(err.response.status).to.be.equal(StatusCodes.NOT_FOUND);
    }
  });
});
