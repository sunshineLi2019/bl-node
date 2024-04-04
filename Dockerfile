# 使用 Node.js 14 镜像作为基础镜像
FROM node:20

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json 到工作目录
COPY package*.json ./

# 安装项目依赖
RUN npm install --production

# 全局安装 TypeORM CLI
RUN npm install -g typeorm

# 将 TypeORM CLI 添加到 PATH 环境变量中
ENV PATH /app/node_modules/.bin:$PATH

# 复制 TypeORM 配置文件到工作目录
COPY ormconfig.json ./

# 复制项目代码到工作目录
COPY  dist/ ./

# 暴露 APP 的默认端口
EXPOSE 5432
