const request = require('supertest');
const assert = require('assert');
const app = require('../app')

describe('GET /api', function() {
    it("should return successfully", function(done) {
        request(app)
            .get('/api')
            .expect(302)
            .end(done)
    })
    it("should return plain text", function(done){
        request(app)
            .get('/api')
            .expect("Content-Type", "text/plain; charset=utf-8")
            .end(done)
    })
})

describe('POST /api', function() {
    it("should have a post body", function(done) {
        request(app)
            .post('/api')
            .expect(function(err, res, body) {
                if (err) done(err);
                assert(JSON.parse(body).username)
            })
            .end(done)
    })git 
})

describe('GET /api/snippet', function() {
    it("should return json", function(done) {
        request(app)
            .get('/api/snippet')
            .expect("Content-Type", "/json")
            .end(done);
    })
})

describe('POST /api/snippet', function() {
    it("should contain body with json", function(done) {
        request(app)
            .post('/api/snippet')
            .expect("Content-Type", "/json")
            .end(done)
    })
    it("should contain a snippet title", function(done) {
        request(app)
            .post('/api/snippet')
            .expect(function(err, res, body) {
                if (err) done(err);
                assert(JSON.parse(body).title)
            })
            .end(done)
    })
})


describe('GET /api/snippet/:id', function() {
    it("should return json", function(done) {
        request(app)
            .get('/ap/snippet/:id')
            .expect("Content-Type", "/json")
            .end(done)
    })
})

describe('GET /api/snippet/language/:lang', function() {
    it("should return json", function(done) {
        request(app)
            .get('/ap/snippet/language/:lang')
            .expect("Content-Type", "/json")
            .end(done)
    })
})

describe('GET /api/snippet/tag/:tag', function() {
    it("should return json", function(done) {
        request(app)
            .get('/ap/snippet/tag/:tag')
            .expect("Content-Type", "/json")
            .end(done)
    })
})
