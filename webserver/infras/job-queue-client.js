const amqp = require('amqplib/callback_api');
const { CreateTaskError } = require('../utils');

const connect = () => {
    return new Promise((resolve, reject) => {
        amqp.connect(process.env.JOB_QUEUE_URL, (err, conn) => {
            if (err) reject(err);
            resolve(conn)
        });
    })
};

class Queue {
    constructor() {
        this.connection = null;
    }

    async createChannel() {
        if (!this.connection)
            this.connection = await connect();
        return new Promise((resolve, reject) => {
            this.connection.createChannel((err, channel) => {
                if (err) reject(err);
                resolve(channel);
            })
        })
    };

    async sendToQueue (msg, queue=process.env.TASK_QUEUE_NAME) {
        try {
            const channel = await this.createChannel();
            console.log('Send message to job queue');
            return channel.sendToQueue(queue, Buffer.from(msg), { persistent: true });
        } catch (e) {
            console.log(`Error on sending message: ${e}`);
            throw new CreateTaskError();
        }
    }
}

module.exports = Queue;
