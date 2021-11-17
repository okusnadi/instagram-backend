import jwt from "jsonwebtoken";
import client from "../client";

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

export const protectedResolver = (resolver) => (root, args, context, info) => {
  if (context.loggedInUser === null) {
    return { ok: false, error: "로그인이 필요합니다." };
  }
  return resolver(root, args, context, info);
};
