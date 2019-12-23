const kafka = require("kafka-node");
const { PubSub } = require("graphql-subscriptions");

// Initialize Graphql Subcscriptions
const pubsub = new PubSub();
const newMessageTopic = "newMessageTopic";

// Initialize kafka client / consumer
const consumerOptions = {
  kafkaHost: "localhost:9092,localhost:9093,localhost:9094",
  groupId: "graphqlConsumer",
  sessionTimeout: 15000,
  protocol: ["roundrobin"],
  fetchMaxBytes: 1024 * 1024 * 10,
  fromOffset: "latest",
  outOfRangeOffset: "earliest"
};
const consumer = new kafka.ConsumerGroup(consumerOptions, "graphql");

consumer.on("message", data => {
  pubsub.publish(newMessageTopic, { newMessage: data.value });
});

const messages = ["hahaha", "orayt"];
module.exports = {
  Query: {
    messages: () => messages
  },
  Subscription: {
    newMessage: {
      subscribe: () => pubsub.asyncIterator(newMessageTopic)
    }
  }
};
