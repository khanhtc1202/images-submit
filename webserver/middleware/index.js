const multer = require('multer');
const {
    DatabaseError,
    NotFoundError,
    PersistentStoreError,
    BadParameterError
} = require('../utils');

module.exports = {
    singleUpload: multer({
        limits: {
            fileSize: 4 * 1024 * 1024,
        }
    }).single('file'),
    errorHandler: (err, req, res, next) => {
        console.log(err);
        if (err instanceof BadParameterError) {
            return res.status(400).end(err.message);
        }
        if (err instanceof NotFoundError) {
            return res.status(404).end(err.message);
        }
        if (err instanceof DatabaseError) {
            return res.status(503).end(err.message);
        }
        if (err instanceof PersistentStoreError) {
            return res.status(409).end(err.message);
        }
        res.status(500).end(err.toString());
    }
};
