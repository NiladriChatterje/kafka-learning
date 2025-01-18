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
    clientId: 'sample-consumer',
    brokers: ['localhost:9092'],
});
const consumer = kafka.consumer({ groupId: 'notification-group' });
const consumer2 = kafka.consumer({ groupId: 'notification-group' });
const handleMessage = (_a) => __awaiter(void 0, [_a], void 0, function* ({ topic, partition, message }) {
    console.log(`Received message from topic '${topic}': ${message.value.toString()}`);
    if (topic === 'email-topic') {
        // Handle email notification
        console.log('Handling email notification:', message.value.toString());
    }
    else if (topic === 'sms-topic') {
        // Handle SMS notification
        console.log('Handling SMS notification:', message.value.toString());
    }
    else {
        console.log('Unknown topic:', topic);
    }
    yield consumer.commitOffsets([{ topic, partition, offset: message.offset }]);
});
const runConsumer = () => __awaiter(void 0, void 0, void 0, function* () {
    yield consumer.connect();
    yield consumer.subscribe({ topic: 'email-topic' });
    yield consumer.subscribe({ topic: 'sms-topic' });
    console.log('Consumer subscribed to topics: email-topic, sms-topic');
    yield consumer.run({
        eachMessage: handleMessage,
    });
});
runConsumer()
    .then(() => {
    console.log('Consumer is running...');
})
    .catch((error) => {
    console.error('Failed to run kafka consumer', error);
});
//# sourceMappingURL=consumer.js.map