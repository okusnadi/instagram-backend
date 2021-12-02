import { gql } from "apollo-server-core";

export default gql`
  type SeeRoomResult {
    ok: Boolean!
    error: String
    room: [Room]
  }

  type Query {
    seeRooms: SeeRoomResult!
  }
`;
