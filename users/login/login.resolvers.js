import bcrypt from "bcrypt";
import client from "../../client";

export default {
  Mutation: {
    // 로그인
    login: async (_, { username, password }) => {
      // 1. username으로 DB에 유저가 존재하는지 체크 (존재한다면 에러를 반환)
      const existingUser = await client.user.findFirst({ where: { username } });
      if (!existingUser) {
        return { ok: false, error: "유저를 찾을 수 없습니다." };
      }

      // 2. 받은 password와 해당 유저의 비밀번호가 일치하는지 체크 (맞다면 true, 틀리면 false반환)
      const passwordOk = await bcrypt.compare(password, existingUser.password);
      if (passwordOk === false) {
        return { ok: false, error: "잘못된 비밀번호입니다." };
      }

      // 3. username과 password가 일치하면 토큰을 생성 및 싸인해서 유저에게 주고, 로그인시킴
      const token = await jwt.sign({ id: existingUser.id, potato: "hello" }, process.env.SECRET_KEY);
      console.log("token", token);

      return { ok: true, token };
    },
  },
};
