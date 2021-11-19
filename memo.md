# Instagram Backend

### DATABASE CLI

- CREATE DATABASE 데이터베이스명;: 데이터베이스 생성
- DROP DATABASE 데이터베이스명;: 데이터베이스 삭제

### prisma CLI

#### npx prisma init

- prisma폴더 아래 schema.prisma파일을 만들고, 초기화해준다.

#### npx prisma migration dev

- schema.prisma파일 안에 있는 datasource와 model Movie를 읽고, migrations폴더 아래 migration.sql을 생성해준다.
- migration.sql은 schema.prisma파일 안에 있는 Movie model을 SQL문으로 변환한 파일이다.
- 또한 node_modules/@prisma/client경로에 Prisma Client를 생성한다.
- 마지막으로 실제 데이터베이스 Movie model에 대한 테이블을 생성해준다.

### typeDefs

- typeDefs는 그래프큐엘 쿼리들을 정의하는 파일이다.

### resolvers

- resolvers는 typeDefs파일에서 정의한 그래프큐엘 쿼리들에 대한 결과를 리턴하는 함수를 가지고 있는 파일이다.

### dotenv

- dotenv를 설치 후, 불러와서 사용할 때 아래와 같이 3가지 방법으로 dotenv의 config()메서드를 실행시킬 수 있다.

```js
require('dotenv').config();

import dotenv from "dotenv"
dotenv.config();

import "dotenv/config";
```

### AND, OR, NOR

- https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#or

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

```javascript
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