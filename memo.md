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