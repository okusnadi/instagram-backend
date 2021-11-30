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
    // resolver함수의 4번째 인자인 info에서 현재 GraphQL에 request한 것이 Query인지 Mutation인지 알 수 있다.
    // 그래서 Query일 때는, 다른 값을 리턴하게 할 수 있다.
    const {
      operation: { operation },
    } = info;

    if (operation === "query") {
      return { ok: false, error: "피드를 보려면 로그인이 필요합니다." };
    }

    return { ok: false, error: "로그인이 필요합니다." };
  }
  return resolver(root, args, context, info);
};
