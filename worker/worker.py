#!/usr/bin/env python
import pika
import os, sys
import logging
from image_process import resize

logger = logging.getLogger('worker')
logger.setLevel(logging.DEBUG)
logger.addHandler(logging.StreamHandler(sys.stdout))

rabbitmq_server = os.getenv('JOB_QUEUE_URL')

def createChannel():
    try:
        connection = pika.BlockingConnection(
            pika.ConnectionParameters(host=rabbitmq_server))
    except pika.exceptions.AMQPConnectionError:
        log_msg = 'connect to {server} occurred error'.format(server=rabbitmq_server)
        logger.error(log_msg)
        sys.exit(1)
        
    channel = connection.channel()
    channel.queue_declare(queue='task_queue', durable=True)
    return channel
    

def callback(ch, method, properties, body):
    job_id = str(body, 'utf-8')
    logger.info(" [x] Received %s" % job_id)
    resize(job_id + '.png')
    logger.info(" [x] Done")
    ch.basic_ack(delivery_tag=method.delivery_tag)


def main():
    channel = createChannel()
    channel.basic_qos(prefetch_count=1)
    channel.basic_consume(queue='task_queue', on_message_callback=callback)
    channel.start_consuming()

if __name__ == "__main__":
    main()
