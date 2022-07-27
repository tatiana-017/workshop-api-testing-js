const axios = require('axios');
const { expect } = require('chai');
const { StatusCodes } = require('http-status-codes');
const chai = require('chai');
const chaiSubset = require('chai-subset');
const md5 = require('md5');
const data = require('./data.json');

const url = 'https://api.github.com/users';
const userName = 'aperdomob';

chai.use(chaiSubset);

describe('Github Api Repositories Test', () => {
  let responseData;
  let repoName;
  it('GET test', async () => {
    const response = await axios.get(`${url}/${userName}`);

    expect(response.status).to.equal(StatusCodes.OK);
    expect(response.data.name).to.equal(data.name);
    expect(response.data.location).to.equal(data.location);
    expect(response.data.company).to.equal(data.company);
    responseData = response;
  });

  it('search repository', async () => {
    const responseTwo = await axios.get(`${responseData.data.repos_url}`);
    const repository = responseTwo.data.find((repo) => repo.name === 'jasmine-json-report');

    expect(responseTwo.status).to.equal(StatusCodes.OK);
    expect(repository.name).to.equal('jasmine-json-report');
    expect(repository.private).to.equal(false);
    expect(repository.description).to.equal('A Simple Jasmine JSON Report');
    repoName = repository;
  });

  it('Dowload repository', async () => {
    const dowload = await axios.get(`${repoName.svn_url}/archive/${repoName.default_branch}.zip`);

    expect(dowload.status).to.equal(StatusCodes.OK);
    expect(dowload.headers['content-type']).to.equal('application/zip');
  });

  let readme;
  it('Repository files', async () => {
    const file = await axios.get(`${repoName.url}/contents`);
    const dataFile = file.data.find((content) => content.name === 'README.md');
    const dataReadme = {
      name: 'README.md',
      path: 'README.md',
      sha: '360eee6c223cee31e2a59632a2bb9e710a52cdc0'
    };
    expect(file.status).to.equal(StatusCodes.OK);
    expect(dataFile).to.containSubset(dataReadme);
    readme = dataFile;
  });

  it('Dowload README and confirm MD5', async () => {
    const dowReadme = await axios.get(readme.download_url);
    const md5Expect = '3449c9e5e332f1dbb81505cd739fbf3f';

    expect(dowReadme.status).to.equal(StatusCodes.OK);
    expect(dowReadme.headers['content-type']).to.equal('text/plain; charset=utf-8');
    expect(md5(dowReadme)).to.equal(md5Expect);
  });
});
