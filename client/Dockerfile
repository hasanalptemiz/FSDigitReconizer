# Dockerfile

# Resmi Node.js imajını kullanın
FROM node:21.4.0

# Çalışma dizinini belirtin
WORKDIR /app

# Gerekli bağımlılıkları kopyalayın ve yükleyin
COPY package*.json ./
RUN npm install

# Geri kalan proje dosyalarını kopyalayın
COPY . .

# Uygulamayı başlatın
CMD ["npm", "start"]