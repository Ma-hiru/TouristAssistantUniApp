FROM node:latest AS builder
LABEL author="Mahiru"
LABEL github="https://github.com/Ma-hiru/TouristAssistantUniApp"
WORKDIR /app
RUN yarn config set registry https://registry.npmmirror.com
COPY /package.json .
COPY /yarn.lock .
RUN yarn
COPY . .
RUN yarn build:mp-weixin

FROM scratch AS release
COPY --from=Builder /app/dist /app
