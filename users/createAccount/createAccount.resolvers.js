import bcrypt from "bcrypt";
import client from "../../client";

export default {
  Mutation: {
    // 계정 생성
    createAccount: async (_, { firstName, lastName, username, email, password }) => {
      try {
        // 1. username과 email을 가지고 있는 유저가 존재하는지 DB에서 체크 (존재한다면 에러를 출력)
        const existingUser = await client.user.findFirst({ where: { OR: [{ username }, { email }] } });
        if (existingUser) {
          throw new Error("이미 존재하는 유저명 또는 이메일입니다.");
        }

        // 2. 유저가 존재하지 않으면 받은 비밀번호를 해시화해서 저장
        const hashedPassword = await bcrypt.hash(password, 10);

        // 3. 파라미터로 받은 값들과 해시화한 비밀번호를 이용해서 유저 모델 생성
        const newUser = await client.user.create({ data: { firstName, lastName, username, email, password: hashedPassword } });
        return newUser;
      } catch (error) {
        console.log("createAccount error", error);
        return error;
      }
    },
  },
};
