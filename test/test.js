'use strict';

const assert = require('chai').assert;
const http = require('http');

const port = 3000;

describe('/users.json', () => {
    it('should respond with 200', (done) => {
        http.get(`http://localhost:${port}/users.json`, (res) => {
            assert.equal(res.statusCode, 200);
            done();
        });
    });

    it('should respond with a json file', (done) => {
        http.get(`http://localhost:${port}/users.json`, (res) => {
            assert.equal(res.headers['content-type'], 'application/json');
            done();
        });
    });

    it('should contain 3 items', (done) => {
        http.get(`http://localhost:${port}/users.json`, (res) => {
            res.on('data', (chunk) => {
                let json = JSON.parse(chunk);
                assert.equal(json.length, 3);
                done();
            });
        });
    });
});

describe('/users', () => {
    it('should respond with 200', (done) => {
        http.get(`http://localhost:${port}/users`, (res) => {
            assert.equal(res.statusCode, 200);
            done();
        });
    });

    it('should respond with an HTML page', (done) => {
        http.get(`http://localhost:${port}/users`, (res) => {
            assert.include(res.headers['content-type'], 'text/html');
            done();
        });
    });
});

describe('/users.html', () => {
    it('should respond with 200', (done) => {
        http.get(`http://localhost:${port}/users.html`, (res) => {
            assert.equal(res.statusCode, 200);
            done();
        });
    });

    it('should respond with an HTML page', (done) => {
        http.get(`http://localhost:${port}/users.html`, (res) => {
            assert.include(res.headers['content-type'], 'text/html');
            done();
        });
    });
});

describe('/users/admin.json', () => {
    it('should respond with 200', (done) => {
        http.get(`http://localhost:${port}/users/admin.json`, (res) => {
            assert.equal(res.statusCode, 200);
            done();
        });
    });

    it('should respond with a json file', (done) => {
        http.get(`http://localhost:${port}/users/admin.json`, (res) => {
            assert.equal(res.headers['content-type'], 'application/json');
            done();
        });
    });

    it('should contain 1 item', (done) => {
        http.get(`http://localhost:${port}/users/admin.json`, (res) => {
            res.on('data', (chunk) => {
                let json = JSON.parse(chunk);
                assert.equal(json.length, 1);
                done();
            });
        });
    });
});

describe('/users/user.json', () => {
    it('should respond with 200', (done) => {
        http.get(`http://localhost:${port}/users/user.json`, (res) => {
            assert.equal(res.statusCode, 200);
            done();
        });
    });

    it('should respond with a json file', (done) => {
        http.get(`http://localhost:${port}/users/user.json`, (res) => {
            assert.equal(res.headers['content-type'], 'application/json');
            done();
        });
    });

    it('should contain 1 item', (done) => {
        http.get(`http://localhost:${port}/users/user.json`, (res) => {
            res.on('data', (chunk) => {
                let json = JSON.parse(chunk);
                assert.equal(json.length, 2);
                done();
            });
        });
    });
});

describe('/users/admin', () => {
    it('should respond with 200', (done) => {
        http.get(`http://localhost:${port}/users/admin`, (res) => {
            assert.equal(res.statusCode, 200);
            done();
        });
    });

    it('should respond with an HTML page', (done) => {
        http.get(`http://localhost:${port}/users/admin`, (res) => {
            assert.include(res.headers['content-type'], 'text/html');
            done();
        });
    });
});

describe('/users/user', () => {
    it('should respond with 200', (done) => {
        http.get(`http://localhost:${port}/users/user`, (res) => {
            assert.equal(res.statusCode, 200);
            done();
        });
    });

    it('should respond with an HTML page', (done) => {
        http.get(`http://localhost:${port}/users/user`, (res) => {
            assert.include(res.headers['content-type'], 'text/html');
            done();
        });
    });
});

describe('/users/admin.html', () => {
    it('should respond with 200', (done) => {
        http.get(`http://localhost:${port}/users/admin.html`, (res) => {
            assert.equal(res.statusCode, 200);
            done();
        });
    });

    it('should respond with an HTML page', (done) => {
        http.get(`http://localhost:${port}/users/admin.html`, (res) => {
            assert.include(res.headers['content-type'], 'text/html');
            done();
        });
    });
});

describe('/users/user.html', () => {
    it('should respond with 200', (done) => {
        http.get(`http://localhost:${port}/users/user.html`, (res) => {
            assert.equal(res.statusCode, 200);
            done();
        });
    });

    it('should respond with an HTML page', (done) => {
        http.get(`http://localhost:${port}/users/user.html`, (res) => {
            assert.include(res.headers['content-type'], 'text/html');
            done();
        });
    });
});

describe('/status/log.json', () => {
    it('should respond with 200', (done) => {
        http.get(`http://localhost:${port}/status/log.json`, (res) => {
            assert.equal(res.statusCode, 200);
            done();
        });
    });

    it('should respond with a json file', (done) => {
        http.get(`http://localhost:${port}/status/log.json`, (res) => {
            assert.equal(res.headers['content-type'], 'application/json');
            done();
        });
    });
});

describe('/status/log.html', () => {
    it('should respond with 200', (done) => {
        http.get(`http://localhost:${port}/status/log.html`, (res) => {
            assert.equal(res.statusCode, 200);
            done();
        });
    });

    it('should respond with an HTML page', (done) => {
        http.get(`http://localhost:${port}/status/log.html`, (res) => {
            assert.include(res.headers['content-type'], 'text/html');
            done();
        });
    });
});

describe('/status', () => {
    it('should add another record to the database', (done) => {
        http.get(`http://localhost:${port}/status/log.json`, (firstRes) => {
            firstRes.on('data', (firstChunk) => {
                http.get(`http://localhost:${port}/status`, () => {
                    http.get(`http://localhost:${port}/status/log.json`, (secondRes) => {
                        secondRes.on('data', (secondChunk) => {
                            assert.notEqual(JSON.parse(firstChunk)[0]['id'], JSON.parse(secondChunk)[0]['id']);
                            done();
                        });
                    });
                });
            });
        });
    });
});
