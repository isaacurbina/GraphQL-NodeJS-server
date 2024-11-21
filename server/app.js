//#region constants
const express = require('express')
const app = express()
const graphqlHTTP = require('express-graphql')
const schema = require('./schema/schema');
const testSchema = require('./schema/types_schema')
//#endregion

//#region setup
app.use('/graphql', graphqlHTTP({
    schema: testSchema,
    graphiql: true
}))

app.listen(4000, () => { // localhost:4000
    console.log('Listening for requests on my awesome port 4000')
})
//#endregion
