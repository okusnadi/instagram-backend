import "dotenv/config";
import { ApolloServer } from "apollo-server";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import schema from "./schema";
import { handleGetUser } from "./users/users.utils";

const server = new ApolloServer({
  schema,
  context: async ({ req }) => {
    const loggedInUser = await handleGetUser(req.headers.token);
    return { loggedInUser };
  },
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground],
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
