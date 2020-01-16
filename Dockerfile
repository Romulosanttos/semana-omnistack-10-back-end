FROM node:lts
LABEL maintainer="https://github.com/romulosanttos"

# Criando diretorio para aplicações
RUN mkdir -p /home/app/
WORKDIR /home/app/

# Copiando arquivos
COPY . .
COPY package.json yarn.lock ./
RUN yarn

EXPOSE 3000

CMD [ "yarn","dev"]

