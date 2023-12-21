FROM node:18.14.2

RUN mkdir /home/node/booking-frontend
WORKDIR /home/node/booking-frontend

COPY package*.json ./

RUN npm install

COPY . .

ENV NUXT_HOST=0.0.0.0
ENV NODE_ENV=production
ENV NUXT_PORT=${NUXT_PORT}
ENV API_URL=${API_URL}
ENV STRIPE_PUBLISHABLE_KEY=${STRIPE_PUBLISHABLE_KEY}
ENV STRIPE_SECRET_KEY=${STRIPE_SECRET_KEY}

EXPOSE 3000

RUN npm run build
CMD [ "npm", "run", "start" ]