# 1. 建立階段：安裝依賴並建構應用
FROM node:20-alpine AS builder
WORKDIR /app

COPY . .

# 如果有 .npmrc 可在這裡 COPY
RUN yarn install --frozen-lockfile
RUN yarn build

# 2. 生產階段：只留下靜態輸出
FROM nginx:alpine
COPY --from=builder /app/.output/public /usr/share/nginx/html

# 設定 Nginx 預設設定（可選）
COPY --from=builder /app/.output /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]