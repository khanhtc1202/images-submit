const path = require('path');
const chai = require('chai');
const chaiHttp = require('chai-http');
const chaiFiles = require('chai-files');

const server = `http://localhost:5555`;

chai.use(chaiHttp);
chai.use(chaiFiles);
chai.should();

describe("routing", () => {
    it('should get err bad request when request to invalid path', (done) => {
        chai.request(server)
            .get('/invalid')
            .end((err, res) => {
                res.should.have.status(404);
                res.text.should.equal('Invalid GET request');
                done();
            });
    });
    it('should get err bad request when request post to invalid path', (done) => {
        chai.request(server)
            .post('/invalid')
            .end((err, res) => {
                res.should.have.status(404);
                res.text.should.equal('Invalid POST request');
                done();
            });
    });
});

describe("images post endpoint", () => {
    it('should get an uuid for uploaded image', (done) => {
        chai.request(server)
            .post(`/image`)
            .attach('file', path.resolve(__dirname, './dummy/carbon.png'))
            .end((err, res) => {
                res.should.have.status(201);
                res.text.should.be.a('string');
                const uploadedImage = path.resolve(__dirname, `../../media/${res.text}.png`);
                chai.expect(chaiFiles.file(uploadedImage)).to.exist;
                done();
            });
    });

    it('should get error when missing file in form upload', (done) => {
        chai.request(server)
            .post(`/image`)
            .end((err, res) => {
                res.should.have.status(400);
                done();
            })
    });
});

describe("image get endpoint", () => {
    it('should get err not found when try to get by not existed image id', (done) => {
        const notExistedImageId = '4e2c315c-8547-47b8-bce5-a9b8d1831029';
        chai.request(server)
            .get(`/image/${notExistedImageId}/thumbnail`)
            .end((err, res) => {
                res.should.have.status(404);
                done();
            });
    });

    it('should get err when try to get image by invalid image id', (done) => {
        const invalidImageId = 'invalid-image-id';
        chai.request(server)
            .get(`/image/${invalidImageId}/thumbnail`)
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });
});
