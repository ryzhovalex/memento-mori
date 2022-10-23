# Install dependencies only when needed
FROM node:16-alpine
WORKDIR /app

COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN yarn install

COPY . .
RUN yarn build

CMD ["yarn", "start"]