# Instagram Backend

### DATABASE CLI

- `CREATE DATABASE 데이터베이스명;`: 데이터베이스 생성
- `DROP DATABASE 데이터베이스명;`: 데이터베이스 삭제

### prisma CLI

- npx prisma init
  - prisma폴더 아래 schema.prisma파일을 만들고, 초기화해준다.
- npx prisma migration dev
  - schema.prisma파일 안에 있는 datasource와 model Movie를 읽고, migrations폴더 아래 migration.sql을 생성해준다.
  - migration.sql은 schema.prisma파일 안에 있는 Movie model을 SQL문으로 변환한 파일이다.
  - 또한 node_modules/@prisma/client경로에 Prisma Client를 생성한다.
  - 마지막으로 실제 데이터베이스 Movie model에 대한 테이블을 생성해준다.

### typeDefs, resolvers

- typeDefs는 그래프큐엘 쿼리들을 정의하는 파일이다.
- resolvers는 typeDefs파일에서 정의한 그래프큐엘 쿼리들에 대한 결과를 리턴하는 함수를 가지고 있는 파일이다.

### dotenv

- dotenv를 설치 후, 불러와서 사용할 때 아래와 같이 3가지 방법으로 dotenv의 config()메서드를 실행시킬 수 있다.

```js
// 방법1
require("dotenv").config();

// 방법2
import dotenv from "dotenv";
dotenv.config();

// 방법3
import "dotenv/config";
```

### AND, OR, NOR

- AND는 지정한 조건 모두에 해당하는 데이터만 찾아온다.
- OR는 지정한 조건을 통과하는 모든 데이터들을 찾아온다.
- NOR는 지정한 조건에 해당하지 않는 모든 데이터들을 찾아온다.
- https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#or

```js
// 자신이 팔로잉하는 유저들이 올린 모든 사진과 자신이 올린 모든을 사진 최신순으로 가져옴
const foundFollowingsPhoto = await client.photo.findMany({
  where: { OR: [{ user: { followers: { some: { id: loggedInUser.id } } } }, { userId: loggedInUser.id }] },
  orderBy: { createdAt: "desc" },
});
```

### Prisma client methods

- findUnique(): schema.prisma파일에서 @unique인 필드들만 데이터베이스에서 찾을 수 있다.
- findFirst(): @unique가 아닌 모든 필드들을 이용해서 데이터베이스에서 일치하는 가장 첫 번쨰 데이터를 찾을 수 있다.

### Token

- jwt.sign()을 통해 로그인을 성공적으로 했을 때, 토큰을 생성 및 싸인한다.
- sign()메서드의 첫 번째 인자인 payload에는 사용자의 정보 중 일부를 담고, 두 번째 인자에는 비밀키를 넣어준다.
- 비밀키를 이용해서 토큰에 싸인을 해서 발행하기 때문에, 비밀키가 노출되면 누구나 토큰을 위조해버릴 수 있다.
- 발행된 토큰을 이용해서 payload에 전달한 정보들을 볼 수 있기 때문에, payload에는 중요한 정보를 담지 않는 것이 중요하다.
- 클라이언트는 서버로부터 받은 토큰을 이용해서 서버에 request를 할 때마다 토큰을 함께 전달해줘서 서버로 하여금 어떤 클라이언트인지 확인할 수 있도록 해줘야 한다.
- 토큰의 목적은 다른 사람이 변경하지 못하게 하고, 클라이언트를 확인하기 위함이다.

```js
const token = await jwt.sign({ id: existingUser.id }, process.env.SECRET_KEY);
```

### 함수가 또 다른 함수를 리턴하는 형태 (Currying)

- Currying은 여러 개의 인자를 가진 함수를 호출 할 경우, 파라미터의 수보다 적은 수의 파라미터를 인자로 받으면 누락된 파라미터를 인자로 받는 기법을 말한다.

```js
const handleX = (handleY) => (root, args, context, info) => {
  return handleY(root, args, context, info);
};
```

### Apollo Server를 Apollo Express Server로 통합하기

- https://www.apollographql.com/docs/apollo-server/data/file-uploads/

### server.js 백업

```js
import "dotenv/config";
import { ApolloServer } from "apollo-server";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { typeDefs, resolvers } from "./schema";
import { handleGetUser } from "./users/users.utils";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const loggedInUser = await handleGetUser(req.headers.token);
    return { loggedInUser };
  },
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground],
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
```

### createReadStream()

- node.js의 fs패키지에서 가져온 createReadStream()메서드는 전달받은 파일을 스트림 형태로 읽어온다.
- 전달받은 파일을 스트림 형태로 읽어오게 되면, 해당 파일에 대한 정보가 담겨져 있는 하나의 큰 객체를 받아온다.
- 하지만 editProfile.resolvers.js파일에서는 createReadStream메서드를 fs가 아닌 Prisma의 Upload타입을 가진 avatar변수로부터 가져온 createReadStream이기 때문에 괄호 안에 파일을 전달해주지 않고도 해당 파일에 대한 정보를 스트림으로 가져올 수 있었다.

```js
import { createReadStream } from "fs";

const readStream = createReadStream(process.cwd() + "/users/editProfile/hello.txt");
```

### createWriteStream()

- createWriteStream()메서드는 전달받은 경로에 읽어온 스트림을 파일로 저장한다.
- ()괄호 안에는 파일의 경로와 저장할 파일의 이름을 지정해준다.
- readStream.pipe(writeStream)을 통해 readStream과 writeStream을 연결해준다.

```js
import { createWriteStream } from "fs";

const writeStream = createWriteStream("hello.txt");

readStream.pipe(writeStream);
```

### pipe()

- pipe()메서드는 여러 개의 스트림을 pipe를 이용해 연결할 수 있다.
- readStream과 writeStream을 pipe를 이용해서 연결해준다.

### include

- prisma클라이언트는 기본적으로 relation으로 연결된 필드들을 불러오게 되면 데이터를 불러오는 것이 아닌 null을 불러오게 된다.
- 왜냐하면 relation으로 연결되어 있는 필드들은 아주 큰 데이터들을 담고 있을 가능성이 높기 때문이다.
- 그래서 해당 데이터를 직접 불러오기 위해서는 include를 통해 불러올 relation 필드들을 직접 지정해주어야 한다.

```js
const foundUser = await client.user.findUnique({
  where: { username },
  include: { followers: true, followings: true },
});
```

### select

- select는 where을 통해 찾은 데이터 모델에서 모든 필드를 다 가져오는 것이 아닌 가져올 특정 필드만 선택할 때 사용한다.
- 아래는 like모델에서 photoId가 photoId인 like모델을 찾고, 그 찾은 like모델에서 user필드만 선택해온 것이다.

```js
const foundLikeUsers = await client.like.findMany({
  where: { photoId },
  select: { user: true },
});
```

### 팔로워 가져오기 (Pagination사용 X)

- 방법1) A라는 유저를 먼저 찾고, A유저가 가지고 있는 팔로워들을 찾아서 가져온다.
- 방법2) 데이터베이스의 전체 유저에서 A라는 유저를 팔로잉하고 있는 전체 유저들을 찾아서 가져온다.
- 방법1에서 followers()와 followins()메서드를 사용할 수 있는데 followers와 followings이 relation된 필드들이기 때문에 해당 필드들의 데이터들을 가져올 때는 아래처럼 찾아온 객체 뒤에 메서드를 연결해서 가져올 수 있다.
- 또한 followers()와 followins()메서드는 findUnique()같은 단일 객체(하나의 객체)에만 사용할 수 있다.
- await client.user.findMany().followers()처럼 여러 객체 뒤에는 사용은 불가능하다.

```js
// 방법1
const aFollowers = await client.user.findUnique({ where: { username } }).followers();
console.log("aFollowers", aFollowers);

// 방법2
const bFollowers = await client.user.findMany({ where: { followings: { some: { username } } } });
console.log("bFollowers", bFollowers);
```

### some, every, none

- some: 필터 조건 중 하나라도 부합되는 것이 있는 데이터들을 가져온다.
- every: 필터 조건에 완전히 부합하는 모든 데이터를 가져온다.
- none: 필터 조건에 부합하는 모든 데이터들을 제외한 데이터들을 가져온다.
- https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#some

```js
const result = await prisma.user.findMany({
  where: {
    post: {
      every: { published: true},
      some: { content: { contains: "Prisma" } }
    }
  }
}
```

### User Resolver

- seeProfile.typeDefs.js에서 type Query를 선언하고 seeProfile.resolvers.js애서 Query:{}안에 resolver함수를 생성한 것처럼 users.typeDefs.js에 있는 type User또한 resolvers를 생성할 수 있다.
- totalFollowers와 totalFollowings는 schema.prisma파일에 추가하지 않은 필드이기 때문에 실제 DB에는 올라가지 않는다.
- totalFollowers와 totalFollowings는 정해진 값이 아닌, 실시간으로 바뀌는 값이기 때문에 실제 DB에 올리지 않고, resolver함수를 통해 request가 일어날 때마다 실시간으로 계산해서 값을 반환해주도록 한다.
- 기본적으로 User를 반환할 때 DB에서 해당 필드에 대한 값을 찾는데, totalFollowers와 totalFollowings는 DB에 없다.
- 그렇게 되면 GraphQL은 DB가 아닌 resolver함수를 찾고 resolver함수에 있는 값을 반환하게 된다.
- 또한 resolver함수의 첫 번째 인자인 parent에는 DB에서 찾은 정보를 객체로 담는다. (여기서는 찾은 User모델이 담긴다.)

```js
export default {
  User: {
    totalFollowers: (parent) => {
      return 123;
    },
    totalFollowings: () => {
      return 456;
    },
  },
};
```

### isFollowing

```js
// 방법1
const existingFollowing = await client.user
  .findUnique({
    where: { id: loggedInUser.id },
  })
  .followings({ where: { id } });

// 방법2
const existingFollowing = await client.user.count({
  where: { id: loggedInUser.id, followings: { some: { id } } },
});
```

### @relation

- Photo모델은 user필드에 User를, User모델은 photos필드에 Photo[]을 가지게 되는데 이렇게 되면 두 모델 간에 relation(관계)이 생기게 된다.
- 관계가 생기긴 이 두 필드는 실제 DB에는 저장되지 않고, 프리즈마와 프리즈마 클라이언트가 기억하고 사용하게 된다.
- Photo모델은 user를 DB에 저장하지 않고, userId만 저장하게 된다.
- userId필드에는 이 Photo모델과 관계가 있는 User모델의 id를 가지게 된다.
- @relation(fields: [userId], references: [id])를 통해 user가 userId필드이고 userId필드는 id를 참조한다고 지정해줬다.

```js
model User {
  id         Int      @id @default(autoincrement())
  firstName  String
  lastName   String?
  username   String   @unique
  email      String   @unique
  password   String
  bio        String?
  avatar     String?
  photos     Photo[]
  followers  User[]   @relation(name: "FollowersFollowing", references: [id])
  followings User[]   @relation(name: "FollowersFollowing", references: [id])
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt
}

model Photo {
  id        Int      @id @default(autoincrement())
  user      User     @relation(fields: [userId], references: [id])
  userId    Int
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### 정규 표현식

- 정규 표현식을 통해 #가 붙은 문자열들만 추출해서 가져올 수 있다.
- 아래와 같이 문자열에 match()메서드를 사용해서 ()괄호 안에 정규표현식을 쓰면 해당 조건에 맞는 문자열들을 추출해서 새로운 배열로 리턴한다.
- `/#[\w]+/g`: #이 포함된 전체 문자열들을 가져온다. (영어)
- `/#[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|\w]+/g`: #이 포함된 전체 문자열들을 가져온다. (한글+영어)
- https://www.regexpal.com

```js
// ['#food', '#pizza', '#chicken']
"OMG I love this #food and #pizza and #chicken.".match(/#[\w]+/g);
```

### connectOrCreate

- connectOrCreate을 통해 where에는 찾을 데이터를 넣어주고, create에는 생성할 데이터를 넣어준다.
- 만약 찾을 데이터가 존재하면 데이터를 생성하지 않고, 존재하지 않으면 새로 생성한다.
- 첫 번째 where는 hashtags를 찾아주는 역할을 하고, 만약 hashtags가 없다면 두 번째 create은 새로운 hashtags를 생성해주는 역할을 한다.
- connectOrCreate은 id나 unique한 필드에만 사용할 수 있다.

```js
client.photo.create({
  data: {
    file,
    caption,
    hashtags: {
      connectOrCreate: {
        where: { hashtag: "#pizza" },
        create: { hashtag: "#pizza" },
      },
    },
  },
});
```

### onDelete, onUpdate

- onDelete는 프리즈마 2.26.0에서 나온 Referential actions으로 `onDelete: Cascade`를 사용하면 해당 필드와 연결되어 있는 일종의 부모 모델이 삭제되었을 때 해당 모델도 같이 삭제할 수 있다.
- 즉, relation으로 연결 되어 있는 부모 모델이 삭제될 때 현재 모델도 같이 삭제한다는 의미이다.
- 그래서 예를들어 아래와 같은 상황이라면 Like 모델과 `@relation`되어 있는 일종의 부모 모델인 Photo와 User모델이 삭제가 되면 Like모델도 자동으로 같이 삭제되게 된다.
- Photo가 삭제되거나, User가 삭제되면 Photo모델과 연결되어 있는 모든 Like모델도 같이 삭제된다.
- onDelete외에도 onUpdate도 있는데, onUpdate는 부모 모델에 데이터 업데이트(수정)가 발생할 시, 연결된 모델도 같이 업데이트할 수 있다.
- onUpdate는 명시하지 않을 경우 default로 Cascade옵션이 부여되고, onDelete는 default로 Cascade옵션이 부여되지 않기 때문에, 필요에 따라 지정해주면 된다.
- https://www.prisma.io/docs/concepts/components/prisma-schema/relations/referential-actions

```js
model Like {
  id        Int      @id @default(autoincrement())
  photo     Photo    @relation(fields: [photoId], references: [id], onDelete: Cascade)
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  photoId   Int
  userId    Int
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@unique([photoId, userId])
}
```

### Mutation Result공유하기

- 자주 쓰는 MutationResult들은 아래와 같이 따로 분류해서 만들어준 후 가져와서 사용할 수 있다.
- deleteComment.typeDefs.js에서 MutationResult를 import해오지 않아도 되는 이유는 모든 typeDefs.js와 resolvers.js를 schema.js에서 로드해와서 합쳐주기 때문이다.

```js
// mutationResult.typeDefs.js
import { gql } from "apollo-server-core";

export default gql`
  type MutationResult {
    ok: Boolean!
    error: String
  }
`;

// deleteComment.typeDefs.js
import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    deleteComment(commentId: Int!): MutationResult!
  }
`;
```
