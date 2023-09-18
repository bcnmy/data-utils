const { Kafka } = require('kafkajs')
const avro = require('avsc');
const { SchemaRegistry, SchemaType } = require('@kafkajs/confluent-schema-registry')

class KafkaProducer {
  constructor(config) {
    this.kafka = new Kafka({
      brokers: [config.kafkaUrl],
      clientId: 'data-utils',
    });
    this.schemaRegistry = new SchemaRegistry({ host: config.schemaRegistryUrl });
    this.producer = this.kafka.producer();
    this.schemaId = 0
  }

  async pushData(topic, schema, data) {
    const options = {
        subject: `${topic}-value`
    }
    const { id } = await this.schemaRegistry.register({
        type: SchemaType.AVRO,
        schema,
    }, options);
    await this.producer.connect();
    const outgoingMessage = {
      value: await this.schemaRegistry.encode(id, data)
    }
    await this.producer.send({
      topic: topic,
      messages: [ outgoingMessage ]
    })
    await this.producer.disconnect();
  }
}

module.exports = KafkaProducer;
