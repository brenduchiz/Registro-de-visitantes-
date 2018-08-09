global.window = global;
global.assert = require('chai').assert;
global.fixtures = {
    users: require('../data/users.json'),
};
require('../src/js/data');
require('./data.spec.js');