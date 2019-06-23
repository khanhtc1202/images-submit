const uuid = require('uuid/v4');
const validate = require('uuid-validate');
const Image = require('../models/image');
const { JobQueue } = require('../infras');
const {
    NotFoundError,
    BadParameterError
} = require('../utils');

class ImageCtrl {
    constructor() {
        this.imageModel = new Image();
        this.jobQueue = new JobQueue();
    }

    async save(req, res, next) {
        try {
            const imageId = uuid();
            const file = req.file;
            if (!file) {
                next(new BadParameterError('Missing file in form upload'));
                return;
            }

            const storedFileName = await this.imageModel.persistentStore(imageId, file.buffer);
            await this.imageModel.save(imageId, storedFileName);

            await this.jobQueue.sendToQueue(imageId);

            return res.status(201).send(`${imageId}`);
        } catch (e) {
            next(e);
        }
    }

    async get(req, res, next) {
        try {
            const { imageId } = req.params;
            if (!validate(imageId)) {
                next(new BadParameterError('Invalid image id'));
                return;
            }

            const stream = await this.imageModel.getById(imageId);
            stream.on('open', () => {
                res.status(200).contentType('image/png');
                stream.pipe(res);
            });
            stream.on('error', () => {
                next(new NotFoundError('Image not found'));
            });
        } catch (e) {
            next(e);
        }
    }
}

module.exports = ImageCtrl;
