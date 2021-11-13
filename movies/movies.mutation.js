import client from "../client";

export default {
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
