import client from "../client";

export default {
  Query: {
    movies: () => client.movie.findMany(),
    movie: async (_, { id }) => {
      const foundMovie = await client.movie.findUnique({ where: { id } });
      return foundMovie;
    },
  },
};
