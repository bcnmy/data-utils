# data-utils
Before using this Kafka producer, ensure you have the following:

- Node.js and npm installed
- Access to a running Kafka broker
- Access to a Confluent Schema Registry service
- Knowledge of Avro schemas and schema registry concepts

# Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/bcnmy/data-utils.git
   
2. Install the dependencies
    npm install

# Usage
1. Configure the project:
Set the appropriate values in the .env file for your Kafka broker and Schema Registry URL.

2. Run the Kafka producer:
cd module
node main.js
The producer will push sample data to the Kafka topic, using schema validation and serialization.

# Configuration
Configure the project by setting values in the .env file:

KAFKA_HOST: The Kafka broker host and port (default: localhost:9092).
SCHEMA_REGISTRY_URL: The URL of the Confluent Schema Registry (default: localhost:8081).