const graphql = require("graphql");

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLSchema,
  GraphQLNonNull,
} = graphql;

// Scalar Type
const Person = new GraphQLObjectType({
  name: "Person",
  description: "Represents a Person Type",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: new GraphQLNonNull(GraphQLString) },
    age: { type: new GraphQLNonNull(GraphQLInt) },
    isMarried: { type: GraphQLBoolean },
    gpa: { type: GraphQLFloat },

    justAType: {
      type: Person,
      resolve(parent, args) {
        return parent;
      },
    },
  }),
});

// RootQuery
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  description: "Description",
  fields: {
    person: {
      type: Person,
      resolve(parent, args) {
        let personObj = {
          name: "Antonio",
          age: 35,
          isMarried: true,
          gpa: 4.0,
        };
        return personObj;
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
