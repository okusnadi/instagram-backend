import { gql } from "apollo-server-core";

export default gql`
  type SeeRoomsResult {
    ok: Boolean!
    error: String
    room: [Room]
  }

  type Query {
    seeRooms: SeeRoomsResult!
  }
`;
