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
  }

  async pushData(topic, schema, data) {
    const subject = `${topic}-value`;
    var schemaId = undefined;
    // check if schema exists for this topic already
    try {
      console.log(`Schema found for topic ${topic}. Not registering schema again`);
      schemaId = await this.schemaRegistry.getLatestSchemaId(subject);
    } catch(error) {
      console.log(`Schema not found for topic ${topic}`);
    }
    if (schemaId === undefined) {
      const options = {
        subject: subject
      } 
      const { id } = await this.schemaRegistry.register({
        type: SchemaType.AVRO,
        schema,
      }, options);
      schemaId = id;
    }
    await this.producer.connect();
    const outgoingMessage = {
      value: await this.schemaRegistry.encode(schemaId, data)
    }
    await this.producer.send({
      topic: topic,
      messages: [ outgoingMessage ]
    })
    await this.producer.disconnect();
  }
}

module.exports = KafkaProducer;
