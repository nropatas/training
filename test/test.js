'use strict';

const assert = require('chai').assert;
const http = require('http');

const port = 3000;

describe('/status/log', () => {
    it('should respond with 200', () => {
        http.get('http://localhost:' + port, (res) => {
            assert.equal(res.statusCode, 200);
        });
    });
});
