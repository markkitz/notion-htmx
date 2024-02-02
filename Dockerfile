FROM oven/bun

WORKDIR /app

COPY package.json .
COPY bun.lockb .

RUN bun install

COPY src src
COPY tsconfig.json .
COPY public public
COPY main.tsx main.tsx

ENV NODE_ENV production
CMD ["bun", "main.tsx"]

EXPOSE 3030
