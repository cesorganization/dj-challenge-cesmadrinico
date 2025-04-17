const path = require('path');
require('module-alias/register');
require('dotenv').config();

module.exports = {
  testDir: 'tests',
  timeout: 30000,
  expect: {
    timeout: 5000
  },
  reporter: [['html', { outputFolder: 'test-results', open: 'never' }]],
  use: {
    baseURL: process.env.BASE_URL || 'https://www.saucedemo.com',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'UI Tests',
      testMatch: ['**/ui/*.spec.js']
    },
    {
      name: 'API Tests',
      testMatch: ['**/api/*.spec.js']
    }
  ]
};
