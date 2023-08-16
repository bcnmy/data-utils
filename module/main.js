const KafkaProducer = require('./kafka-producer');
require('dotenv').config();

const config = {
  kafkaClientConfig: {
    kafkaHost: process.env.KAFKA_HOST || 'localhost:9092',
  },
  schemaRegistryConfig: {
    registryUrl: process.env.SCHEMA_REGISTRY_URL || 'localhost:8081',
  },
};

const producer = new KafkaProducer(config);

// Example schema
const schema = JSON.stringify({
  type: 'record',
  name: 'user',
  fields: [
    { name: 'id', type: 'int' },
    { name: 'name', type: 'string' },
    { name: 'age', type: 'int' },
  ],
});

// Register the schema
producer.registerSchema(schema);

// Example data
const data = {
  id: 1,
  name: 'John Doe',
  age: 30,
};

// Example topic
const topic = 'my-topic'; // Change this to your desired Kafka topic

// Push the data to Kafka with the schema
producer.pushData(topic, schema, data);
