const axios = require('axios');
const { expect } = require('chai');
const { StatusCodes } = require('http-status-codes');

const url = 'https://api.github.com';
const auth = axios.create({
  path: url,
  headers: { Authorization: `token ${process.env.ACCESS_TOKEN}` }
});

describe('Consume POST and PATCH service on Github', () => {
  let loggedIn;
  it('User logged in', async () => {
    loggedIn = await auth.get(`${url}/user`);

    expect(loggedIn.status).to.equal(StatusCodes.OK);
    expect(loggedIn.data.public_repos).to.be.greaterThan(1);
  });

  let repositories;
  let repoConfirm;
  it('List of all repositories', async () => {
    repositories = await auth.get(`${loggedIn.data.repos_url}`);
    repoConfirm = repositories.data.find((repo) => repo.name === 'garage');

    expect(repositories.status).to.equal(StatusCodes.OK);
    expect(repoConfirm.name).to.equal('garage');
  });

  let issue;
  it('POST test on Github', async () => {
    issue = await auth.post(
      `${url}/repos/${repoConfirm.owner.login}/${repoConfirm.name}/issues`,
      {
        title: 'Issue'
      }
    );

    expect(issue.status).to.equal(StatusCodes.CREATED);
    expect(issue.data.title).to.equal('Issue');
    expect(issue.data.body).to.equal(null);
  });

  it('PATCH test on Github', async () => {
    const addBodyIssue = await auth.patch(
      `${url}/repos/${repoConfirm.owner.login}/${repoConfirm.name}/issues/${issue.data.number}`,
      {
        body: 'Body issue'
      }
    );

    expect(addBodyIssue.status).to.equal(StatusCodes.OK);
    expect(addBodyIssue.data.title).to.equal('Issue');
    expect(addBodyIssue.data.body).not.equal(null);
  });
});
