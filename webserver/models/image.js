const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const { DBClient } = require('../infras');
const {
    DatabaseError,
    NotFoundError,
    PersistentStoreError
} = require('../utils');

class Image {
    constructor() {
        this.storage = process.env.FILE_STORE || path.join(__dirname, './media');
    }

    async persistentStore(imageId, buffer) {
        const fileName = `${imageId}.png`;
        const filePath = this.filepath(fileName);
        try {
            await sharp(buffer).toFile(filePath);
            return fileName;
        } catch (e) {
            throw new PersistentStoreError(e.toString());
        }
    }

    async save(imageId, fileName) {
        try {
            await DBClient.setAsync(imageId, JSON.stringify({'id': imageId, 'name': fileName}));
            return;
        } catch (e) {
            throw new DatabaseError(e.toString());
        }
    }

    async getById(imageId) {
        const isExistedImage = await DBClient.existAsync(imageId);
        if (!isExistedImage) {
            throw new NotFoundError('Image not found');
        }

        try {
            const raw = await DBClient.getAsync(imageId);
            const imageInfo = JSON.parse(raw);
            const thumbnailImageName = `thumbnail_${imageInfo.id}.png`;
            return fs.createReadStream(this.filepath(thumbnailImageName));
        } catch (e) {
            throw new DatabaseError(e.toString());
        }
    }

    filepath(filename) {
        return path.resolve(`${this.storage}/${filename}`);
    }
}

module.exports = Image;
