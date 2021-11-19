import "dotenv/config";
import express from "express";
import morgan from "morgan";
import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { graphqlUploadExpress } from "graphql-upload";
import { typeDefs, resolvers } from "./schema";
import { handleGetUser } from "./users/users.utils";

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
  app.use(morgan("dev"));
  app.use("/uploads", express.static(`${process.cwd()}/uploads`));
  app.use(graphqlUploadExpress());
  server.applyMiddleware({ app });
  app.listen(PORT, () => {
    console.log(`🚀 Server: http://localhost:${PORT}${server.graphqlPath}`);
  });
};

startServer();
