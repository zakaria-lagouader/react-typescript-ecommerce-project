# install dependencies

yarn add express zod config cors express pino pino-pretty dayjs bcrypt jsonwebtoken lodash nanoid prisma @prisma/client

yarn add @types/body-parser @types/config @types/cors @types/express @types/node @types/pino @types/bcrypt @types/jsonwebtoken @types/lodash @types/nanoid ts-node-dev typescript -D

# initialize tsconfig

npx tsc --init

# setup prisma with sqlite

npx prisma init --datasource-provider sqlite

# migrate

npx prisma migrate dev --name init
