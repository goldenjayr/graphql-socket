module.exports = `
    type Query {
        messages: [String]
    }

    type Subscription {
        newMessage: String
    }
`;
