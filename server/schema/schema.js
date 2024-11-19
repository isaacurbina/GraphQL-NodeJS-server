const graphql = require('graphql')
var _ = require('lodash')

var usersData = [
    {id: '1', name: 'Bond', age: 36, profession: "Programmer"},
    {id: '13', name: 'Anna', age: 26, profession: "Baker"},
    {id: '211', name: 'Bella', age: 16, profession: "Mechanic"},
    {id: '19', name: 'Gina', age: 26, profession: "Painter"},
    {id: '158', name: 'Georgina', age: 36, profession: "Teacher"}
]

var hobbiesData = [
    {id: '1', title: 'Programming', description: 'Using computers to make the world a better place.'},
    {id: '2', title: 'Rowing', description: 'Sweat and feel better before eating donuts.'},
    {id: '3', title: 'Swimming', description: 'Get in the water and learn to become the water.'},
    {id: '4', title: 'Fencing', description: 'A hobby for fency people.'},
    {id: '5', title: 'Hiking', description: 'Wear hiking boots and explore the world.'},
]

const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema
} = graphql

// Create types
const UserType = new graphql.GraphQLObjectType({
    name: 'User',
    description: 'Documentation for user...',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        profession: {type: GraphQLString}
    })
})

const HobbyType = new graphql.GraphQLObjectType({
    name: "Hobby",
    description: "Hobby description",
    fields: () => ({
        id: {type: GraphQLID},
        title: {type: GraphQLString},
        description: {type: GraphQLString}
    })
})

// RootQuery
const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    description: "Description",
    fields: () => ({
        user: {
            type: UserType,
            args: {id: {type: GraphQLID}},

            resolve(parent, args) {
                return _.find(usersData, { id: args.id})
            }
        },
        hobby: {
            type: HobbyType,
            arg: {id: {type: GraphQLID}},

            resolve(parent, args) {
                return _.find(hobbiesData, {id: args.id})
            }
        }
    })
})

module.exports = new GraphQLSchema({
    query: RootQuery
})
