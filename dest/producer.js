"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const kafkajs_1 = require("kafkajs");
const kafka = new kafkajs_1.Kafka({
    clientId: 'sample-producer',
    brokers: ['localhost:9092'],
});
const producer = kafka.producer();
const runProducer = () => __awaiter(void 0, void 0, void 0, function* () {
    yield producer.connect();
    const sendMessage = (topic, message) => __awaiter(void 0, void 0, void 0, function* () {
        yield producer.send({
            topic,
            messages: [{ value: message, partition: Math.trunc((Math.random() * 3)) }],
        });
    });
    const sendNotification = (topic, payload) => __awaiter(void 0, void 0, void 0, function* () {
        const message = JSON.stringify(payload);
        yield sendMessage(topic, message);
        console.log(`Message sent to ${topic}: ${message}`);
    });
    // Usage example
    const emailPayload = {
        to: 'niladri@example.com',
        from: 'abc@example.com',
        subject: 'Sample Email',
        body: 'This is a sample email notification',
    };
    yield sendNotification('first_topic', emailPayload);
    const smsPayload = {
        phoneNumber: '9330038859',
        message: 'This is a sample SMS notification',
    };
    yield sendNotification('sms-topic', smsPayload);
    yield producer.disconnect();
});
runProducer()
    .then(() => {
    console.log('producer is running...');
})
    .catch((error) => {
    console.error('Failed to run kafka consumer', error);
});
//# sourceMappingURL=producer.js.map