# Steps to create a new project

## 1. install dependencies

```bash
yarn add express zod cors express bcrypt jsonwebtoken @prisma/client uuid cors dotenv cookie-parser helmet morgan
```

## 2. install dev dependencies

```bash
yarn add @types/body-parser @types/cors @types/express @types/node @types/bcrypt @types/jsonwebtoken prisma ts-node-dev typescript tsconfig-paths @types/morgan @types/cookie-parser @types/uuid  -D
```

# 3. initialize tsconfig

```bash
npx tsc --init
```

# 4. setup tsconfig.json

```json
{
	"compilerOptions": {
		"target": "ES2020",
		"module": "commonjs",
		"esModuleInterop": true,
		"strict": true,
		"moduleResolution": "node",
		"rootDir": "./src",
		"baseUrl": "./",
		"paths": {
			"@/*": ["src/*"]
		},
		"outDir": "./dist",
		"skipLibCheck": true,
		"forceConsistentCasingInFileNames": true
	},
	"include": ["src/**/*"]
}
```

# 5. add dev script to package.json

```json
{
	"scripts": {
		"dev": "ts-node-dev -r tsconfig-paths/register --respawn --transpile-only src/app.ts"
	}
}
```

# setup prisma with sqlite

```bash
npx prisma init --datasource-provider sqlite
```

# migrate

```bash
npx prisma migrate dev --name init
```
