const { buildSchema } = require('graphql')
const schema = buildSchema(`
  type RootQuery {
    messages: [String]
  }

  type Subscription {
    newMessage: String
  }

  schema {
    query: RootQuery
    subscription: Subscription
  }
`)

module.exports = schema