const graphql = require("graphql");
var _ = require("lodash");

var usersData = [
  { id: "1", name: "Bond", age: 36, profession: "Programmer" },
  { id: "13", name: "Anna", age: 26, profession: "Baker" },
  { id: "211", name: "Bella", age: 16, profession: "Mechanic" },
  { id: "19", name: "Gina", age: 26, profession: "Painter" },
  { id: "158", name: "Georgina", age: 36, profession: "Teacher" },
];

var postsData = [
  { id: "1", comment: "Building a Mind.", userId: "1" },
  { id: "2", comment: "GraphQL is Amazing.", userId: "1" },
  { id: "3", comment: "How to Change the World.", userId: "19" },
  { id: "4", comment: "How to Change the World.", userId: "211" },
  { id: "5", comment: "How to Change the World.", userId: "1" },
];

var hobbiesData = [
  {
    id: "1",
    title: "Programming",
    description: "Using computers to make the world a better place.",
    userId: "1",
  },
  {
    id: "2",
    title: "Rowing",
    description: "Sweat and feel better before eating donuts.",
    userId: "1",
  },
  {
    id: "3",
    title: "Swimming",
    description: "Get in the water and learn to become the water.",
    userId: "158",
  },
  {
    id: "4",
    title: "Fencing",
    description: "A hobby for fency people.",
    userId: "211",
  },
  {
    id: "5",
    title: "Hiking",
    description: "Wear hiking boots and explore the world.",
    userId: "13",
  },
];

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
} = graphql;

// Create types
const UserType = new GraphQLObjectType({
  name: "User",
  description: "Documentation for user...",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    profession: { type: GraphQLString },

    posts: {
      type: GraphQLList(PostType),
      resolve(parent, args) {
        return _.filter(postsData, { userId: parent.id });
      },
    },

    hobbies: {
      type: GraphQLList(HobbyType),
      resolve(parent, args) {
        return _.filter(hobbiesData, { userId: parent.id });
      },
    },
  }),
});

const HobbyType = new GraphQLObjectType({
  name: "Hobby",
  description: "Hobby description",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    user: {
      type: UserType,

      resolve(parent, args) {
        return _.find(usersData, { id: parent.userId });
      },
    },
  }),
});

const PostType = new GraphQLObjectType({
  name: "Post",
  description: "Post description",
  fields: () => ({
    id: { type: GraphQLID },
    comment: { type: GraphQLString },
    user: {
      type: UserType,

      resolve(parent, args) {
        return _.find(usersData, { id: parent.userId });
      },
    },
  }),
});

// RootQuery
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  description: "Description",
  fields: () => ({
    user: {
      type: UserType,
      args: { id: { type: GraphQLID } },

      resolve(parent, args) {
        return _.find(usersData, { id: args.id });
      },
    },

    hobby: {
      type: HobbyType,
      args: { id: { type: GraphQLID } },

      resolve(parent, args) {
        return _.find(hobbiesData, { id: args.id });
      },
    },

    post: {
      type: PostType,
      args: { id: { type: GraphQLID } },

      resolve(parent, args) {
        return _.find(postsData, { id: args.id });
      },
    },

    users: {
      type: new GraphQLList(UserType),

      resolve(parent, args) {
        return usersData;
      },
    },

    hobbies: {
      type: new GraphQLList(HobbyType),

      resolve(parent, args) {
        return hobbiesData;
      },
    },

    posts: {
      type: new GraphQLList(PostType),

      resolve(parent, args) {
        return postsData;
      },
    },
  }),
});

// Mutations
const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    CreateUser: {
      type: UserType,
      args: {
        //id: { type: GraphQLID},
        name: { type: GraphQLNonNull(GraphQLString) },
        age: { type: GraphQLNonNull(GraphQLInt) },
        profession: { type: GraphQLString },
      },

      resolve(parent, args) {
        let user = new User({
          name: args.name,
          age: args.age,
          profession: args.profession,
        });
        return user.save();
      },
    },

    UpdateUser: {
      type: UserType,
      args: {
        id: { type: GraphQLNonNull(GraphQLString) },
        name: { type: GraphQLNonNull(GraphQLString) },
        age: { type: GraphQLInt },
        profession: { type: GraphQLString },
      },

      resolve(parent, args) {
        return (updatedUser = User.findByIdAndUpdate(
          args.id,
          {
            $set: {
              name: args.name,
              age: args.age,
              profession: args.profession,
            },
          },
          { new: true }
        ));
      },
    },

    RemoveUser: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
      },

      resolve(parent, args) {
        let removedUser = User.findByIdAndRemove(args.id).execute();
        if (!removedUser) {
          throw new "Error"();
        }
        return removedUser;
      },
    },

    CreatePost: {
      type: PostType,
      args: {
        //id: {type: GraphQLInt},
        comment: { type: GraphQLString },
        userId: { type: GraphQLID },
      },

      resolve(parent, args) {
        let post = Post({
          comment: args.comment,
          userId: args.userId,
        });
        return post.save();
      },
    },

    UpdatePost: {
      type: PostType,
      args: {
        id: { type: GraphQLNonNull(GraphQLString) },
        comment: { type: GraphQLNonNull(GraphQLString) },
        userId: { type: GraphQLNonNull(GraphQLString) },
      },

      resolve(parent, args) {
        return (updatedPost = Post.findByIdAndUpdate(
          args.id,
          {
            $set: {
              comment: args.comment,
            },
          },
          { new: true }
        ));
      },
    },

    RemovePost: {
      type: PostType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
      },

      resolve(parent, args) {
        let removedPost = Post.findByIdAndRemove(args.id).execute();
        if (!removedPost) {
          throw new "Error"();
        }
        return removedPost;
      },
    },

    CreateHobby: {
      type: HobbyType,
      args: {
        //id: {type: GraphQLID},
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        userId: { type: GraphQLID },
      },

      resolve(parent, args) {
        let hobby = {
          title: args.title,
          description: args.description,
          userId: args.userId,
        };
        return hobby;
      },
    },

    UpdateHobby: {
      type: HobbyType,
      args: {
        id: { type: GraphQLNonNull(GraphQLString) },
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        userId: { type: GraphQLID },
      },

      resolve(parent, args) {
        return (updatedHobby = Hobby.findByIdAndUpdate(
          args.id,
          {
            $set: {
              title: args.title,
              description: args.description,
            },
          },
          { new: true }
        ));
      },
    },

    RemoveHobby: {
      type: HobbyType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
      },

      resolve(parent, args) {
        let removedHobby = Hobby.findByIdAndRemove(args.id).execute();
        if (!removedHobby) {
          throw new "Error"();
        }
        return removedHobby;
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
