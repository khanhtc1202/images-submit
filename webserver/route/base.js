const express = require('express');
class BaseRoute {
    constructor() {
        this.router = express.Router();
        this.config();
        this.loadInvalidRoute(); 
    }
    getRouter() {
        return this.router;
    }
    config() {}
    loadInvalidRoute() {
        this.router.get('*', (req, res) => { res.status(404).contentType("text/plain").end('Invalid GET request') });
        this.router.post('*', (req, res) => { res.status(404).contentType("text/plain").end('Invalid POST request') });
        this.router.delete('*', (req, res) => { res.status(404).contentType("text/plain").end('Invalid DELETE request') });
    }
}
module.exports = BaseRoute;