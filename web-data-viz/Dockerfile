# ═════════════════════════════════════════════════════════════
# DOCKERFILE — APLICAÇÃO NODE.JS (DASHBOARD WEB)
# Instala dependências e roda o site na porta 3333
# Build: docker build -t nexus-site ./NEXUS/web-data-viz
# ═════════════════════════════════════════════════════════════

FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3333
CMD ["npm", "start"]
