const kafka = require('kafka-node');
const avro = require('avsc');
const { SchemaRegistry } = require('@kafkajs/confluent-schema-registry');


class KafkaProducer {
  constructor(config) {
    this.producer = new kafka.Producer(new kafka.KafkaClient(config.kafkaClientConfig));
    this.schemaRegistry = new SchemaRegistry(config.schemaRegistryConfig);
  }

  registerSchema(schemaString) {
    this.schema = avro.parse(schemaString);
  }

  pushData(topic, schema, data) {
    const payload = {
      topic,
      messages: this.schema.toBuffer(data), // Serialize data using the registered schema
    };

    this.producer.send([payload], (err, data) => {
      if (err) {
        console.error('Error sending message to Kafka:', err);
      } else {
        console.log('Message sent to Kafka:', data);
      }
    });
  }
}

module.exports = KafkaProducer;
