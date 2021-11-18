import jwt from "jsonwebtoken";
import client from "../client";

// 받은 토큰을 이용해서 로그인한 사용자의 정보를 가져오는 함수
export const handleGetUser = async (token) => {
  try {
    if (!token) {
      return null;
    }
    const { id } = await jwt.verify(token, process.env.SECRET_KEY);
    const loggedInUser = await client.user.findUnique({ where: { id } });

    if (loggedInUser) {
      return loggedInUser;
    } else {
      return null;
    }
  } catch (error) {
    console.log("handleGetUser error", error);
    return null;
  }
};

// 로그인을 하지 않은 유저가 Mutation을 했을 때, 예외 처리를 해주기 위한 함수
export const protectedResolver = (resolver) => (root, args, context, info) => {
  if (context.loggedInUser === null) {
    return { ok: false, error: "로그인이 필요합니다." };
  }
  return resolver(root, args, context, info);
};
