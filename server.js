import "dotenv/config";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { graphqlUploadExpress } from "graphql-upload";
import { typeDefs, resolvers } from "./schema";
import { handleGetUser } from "./users/users.utils";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";

const PORT = process.env.PORT;

const startServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
      const loggedInUser = await handleGetUser(req.headers.token);
      return { loggedInUser };
    },
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground],
  });
  await server.start();

  const app = express();
  app.use(graphqlUploadExpress());
  server.applyMiddleware({ app });
  await new Promise((anonymousFunction) => app.listen({ port: PORT }, anonymousFunction));
  console.log(`🚀 Apollo Server: http://localhost:${PORT}${server.graphqlPath}`);
};

startServer();
