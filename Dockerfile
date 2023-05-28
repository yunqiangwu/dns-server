# 使用 Node.js 作为基础镜像
FROM node:latest

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json 到工作目录
COPY package*.json ./

# 安装依赖包
RUN npm install

# 复制代码文件到工作目录
COPY . .

# 设置环境变量
ENV DNS_SERVER_PORT=53

# 暴露端口
EXPOSE 53/udp

# 运行应用程序
CMD [ "node", "app.js" ]

