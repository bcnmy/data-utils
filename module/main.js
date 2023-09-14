const KafkaProducer = require('./kafka-producer');
require('dotenv').config();

const config = {
  kafkaUrl: process.env.KAFKA_HOST || 'localhost:9092',
  schemaRegistryUrl: process.env.SCHEMA_REGISTRY_URL || 'http://localhost:8081',
};

const producer = new KafkaProducer(config);

// Example schema
const schema = JSON.stringify({
  type: 'record',
  name: 'test',
  fields: [
    { name: 'id', type: 'int' },
    { name: 'name', type: 'string' },
    { name: 'age', type: 'int' },
  ],
});

// Example topic
const topic = 'my-topic'; // Change this to your desired Kafka topic

// Example data
const data = {
  id: 1,
  name: 'John Doe',
  age: 30,
};

// Push the data to Kafka with the schema
producer.pushData(topic, schema, data);
