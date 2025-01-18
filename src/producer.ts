import { type EachMessagePayload, Kafka, Producer } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'sample-producer',
  brokers: ['localhost:9092'],
});

const producer: Producer = kafka.producer();

const runProducer = async (): Promise<void> => {
  await producer.connect();

  const sendMessage = async (topic: string, message: string): Promise<void> => {
    await producer.send({
      topic,
      messages: [{ value: message,partition:Math.trunc((Math.random()*3)) }],
    });
  };

  const sendNotification = async (topic: string, payload: any): Promise<void> => {
    const message = JSON.stringify(payload);
    await sendMessage(topic, message);
    console.log(`Message sent to ${topic}: ${message}`);
  };

  // Usage example
  const emailPayload = {
    to: 'niladri@example.com',
    from: 'abc@example.com',
    subject: 'Sample Email',
    body: 'This is a sample email notification',
  };
  await sendNotification('email-topic', emailPayload);

  const smsPayload = {
    phoneNumber: '9330038859',
    message: 'This is a sample SMS notification',
  };
  await sendNotification('sms-topic', smsPayload);

  await producer.disconnect();
};

runProducer()
  .then(() => {
    console.log('producer is running...');
  })
  .catch((error) => {
    console.error('Failed to run kafka consumer', error);
  });