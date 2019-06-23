const BaseRouter = require('./base');
const middleware = require('./../middleware');
const { ImageCtrl } = require('./../controllers');

class Router extends BaseRouter {

    constructor() {
        super();
    }

    config() {
        this.imageCtrl = new ImageCtrl();
        this.router.post('/image', middleware.singleUpload, this.imageCtrl.save.bind(this.imageCtrl));
        this.router.get('/image/:imageId/thumbnail', this.imageCtrl.get.bind(this.imageCtrl));
    }
}
module.exports = Router;