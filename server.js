import { PrismaClient } from "@prisma/client";
import { ApolloServer, gql } from "apollo-server";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";

const client = new PrismaClient();

const typeDefs = gql`
  type Movie {
    id: Int!
    title: String!
    year: Int!
    genre: String
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    movies: [Movie]
    movie(id: Int!): Movie
  }

  type Mutation {
    createMovie(title: String!, year: Int!, genre: String): Movie
    deleteMovie(id: Int!): Movie
    updateMovie(id: Int!, title: String!): Movie
  }
`;

const resolvers = {
  Query: {
    movies: () => client.movie.findMany(),
    movie: async (_, { id }) => {
      const foundMovie = await client.movie.findUnique({ where: { id } });
      return foundMovie;
    },
  },

  Mutation: {
    createMovie: async (_, { title, year, genre }) => {
      const createdMovie = await client.movie.create({ data: { title, year, genre } });
      return createdMovie;
    },
    deleteMovie: async (_, { id }) => {
      const deletedMovie = await client.movie.delete({ where: { id } });
      return deletedMovie;
    },
    updateMovie: async (_, { id, title }) => {
      const updatedMovie = await client.movie.update({ where: { id }, data: { title } });
      console.log("updatedMovie", updatedMovie);
      return updatedMovie;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground],
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
