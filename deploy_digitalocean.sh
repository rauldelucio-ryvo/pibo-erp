#!/bin/bash
# Script de Deploy Automatizado - Pibo ERP no DigitalOcean
# Execute este script no servidor após conectar via SSH

set -e

echo "========================================="
echo "  Pibo ERP - Deploy Automatizado"
echo "========================================="

# 0. Configurar Swap (Memória Virtual) para evitar erro de memória
echo "[0/7] Configurando Swap de 4GB..."
if [ ! -f /swapfile ]; then
    fallocate -l 4G /swapfile
    chmod 600 /swapfile
    mkswap /swapfile
    swapon /swapfile
    echo '/swapfile none swap sw 0 0' | tee -a /etc/fstab
    echo "Swap criado com sucesso."
else
    echo "Swap já existe."
fi

# 1. Atualizar sistema
echo "[1/7] Atualizando sistema..."
apt update && apt upgrade -y

# 2. Instalar Docker
echo "[2/7] Instalando Docker..."
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh
rm get-docker.sh

# 3. Instalar Docker Compose
echo "[3/7] Instalando Docker Compose..."
apt install docker-compose-plugin -y

# 4. Instalar Git
echo "[4/7] Instalando Git..."
apt install git -y

# 5. Clonar repositório
echo "[5/7] Clonando repositório do GitHub..."
cd /root

# Verificar se o token já foi definido, senão solicitar
if [ -z "$GITHUB_TOKEN" ]; then
    echo "⚠️  Este repositório parece ser privado."
    echo "Por favor, insira seu Personal Access Token do GitHub (começa com ghp_...):"
    read -s GITHUB_TOKEN
    echo "Token recebido."
fi

if [ -d "pibo-erp" ]; then
    echo "Diretório pibo-erp já existe. Atualizando..."
    cd pibo-erp
    git pull
else
    # Usar o token na URL para autenticação
    git clone https://$GITHUB_TOKEN@github.com/rauldelucio-ryvo/pibo-erp.git
    cd pibo-erp
fi

# CORREÇÃO AUTOMÁTICA: Corrigir dependências ausentes (Review Geral)
echo "Aplicando correções de dependências nos serviços..."

# 1. pibo-contratos-service: Adicionar @nestjs/schedule
cat > apps/pibo-contratos-service/package.json << 'EOF'
{
  "name": "pibo-contratos-service",
  "version": "0.0.1",
  "private": true,
  "license": "UNLICENSED",
  "scripts": {
    "build": "nest build",
    "format": "prettier --write \"src/**/*.ts\" \"test/**/*.ts\"",
    "start": "nest start",
    "start:dev": "nest start --watch",
    "start:debug": "nest start --debug --watch",
    "start:prod": "node dist/main",
    "lint": "eslint \"{src,apps,libs,test}/**/*.ts\" --fix"
  },
  "dependencies": {
    "@nestjs/common": "^10.0.0",
    "@nestjs/core": "^10.0.0",
    "@nestjs/platform-express": "^10.0.0",
    "@nestjs/typeorm": "^10.0.0",
    "@nestjs/jwt": "^10.0.0",
    "@nestjs/passport": "^10.0.0",
    "@nestjs/schedule": "^4.0.0",
    "passport": "^0.6.0",
    "passport-jwt": "^4.0.0",
    "pg": "^8.11.0",
    "typeorm": "^0.3.0",
    "reflect-metadata": "^0.1.13",
    "rxjs": "^7.8.1"
  },
  "devDependencies": {
    "@nestjs/cli": "^10.0.0",
    "@nestjs/schematics": "^10.0.0",
    "@nestjs/testing": "^10.0.0",
    "@types/express": "^4.17.17",
    "@types/jest": "^29.5.2",
    "@types/node": "^20.3.1",
    "@types/supertest": "^2.0.12",
    "@typescript-eslint/eslint-plugin": "^6.0.0",
    "@typescript-eslint/parser": "^6.0.0",
    "eslint": "^8.42.0",
    "jest": "^29.5.0",
    "source-map-support": "^0.5.21",
    "supertest": "^6.3.3",
    "ts-jest": "^29.1.0",
    "ts-loader": "^9.4.3",
    "ts-node": "^10.9.1",
    "tsconfig-paths": "^4.2.0",
    "typescript": "^5.1.3"
  }
}
EOF

# 2. pibo-auth-service: Adicionar bcrypt e @types/bcrypt
cat > apps/pibo-auth-service/package.json << 'EOF'
{
  "name": "pibo-auth-service",
  "version": "0.0.1",
  "private": true,
  "license": "UNLICENSED",
  "scripts": {
    "build": "nest build",
    "format": "prettier --write \"src/**/*.ts\" \"test/**/*.ts\"",
    "start": "nest start",
    "start:dev": "nest start --watch",
    "start:debug": "nest start --debug --watch",
    "start:prod": "node dist/main",
    "lint": "eslint \"{src,apps,libs,test}/**/*.ts\" --fix"
  },
  "dependencies": {
    "@nestjs/common": "^10.0.0",
    "@nestjs/core": "^10.0.0",
    "@nestjs/platform-express": "^10.0.0",
    "@nestjs/typeorm": "^10.0.0",
    "@nestjs/jwt": "^10.0.0",
    "@nestjs/passport": "^10.0.0",
    "passport": "^0.6.0",
    "passport-jwt": "^4.0.0",
    "pg": "^8.11.0",
    "typeorm": "^0.3.0",
    "reflect-metadata": "^0.1.13",
    "rxjs": "^7.8.1",
    "bcrypt": "^5.1.0"
  },
  "devDependencies": {
    "@nestjs/cli": "^10.0.0",
    "@nestjs/schematics": "^10.0.0",
    "@nestjs/testing": "^10.0.0",
    "@types/express": "^4.17.17",
    "@types/jest": "^29.5.2",
    "@types/node": "^20.3.1",
    "@types/supertest": "^2.0.12",
    "@typescript-eslint/eslint-plugin": "^6.0.0",
    "@typescript-eslint/parser": "^6.0.0",
    "eslint": "^8.42.0",
    "jest": "^29.5.0",
    "source-map-support": "^0.5.21",
    "supertest": "^6.3.3",
    "ts-jest": "^29.1.0",
    "ts-loader": "^9.4.3",
    "ts-node": "^10.9.1",
    "tsconfig-paths": "^4.2.0",
    "typescript": "^5.1.3",
    "@types/bcrypt": "^5.0.0"
  }
}
EOF

# 3. pibo-vendas-service: Adicionar axios
cat > apps/pibo-vendas-service/package.json << 'EOF'
{
  "name": "pibo-vendas-service",
  "version": "0.0.1",
  "private": true,
  "license": "UNLICENSED",
  "scripts": {
    "build": "nest build",
    "format": "prettier --write \"src/**/*.ts\" \"test/**/*.ts\"",
    "start": "nest start",
    "start:dev": "nest start --watch",
    "start:debug": "nest start --debug --watch",
    "start:prod": "node dist/main",
    "lint": "eslint \"{src,apps,libs,test}/**/*.ts\" --fix"
  },
  "dependencies": {
    "@nestjs/common": "^10.0.0",
    "@nestjs/core": "^10.0.0",
    "@nestjs/platform-express": "^10.0.0",
    "@nestjs/typeorm": "^10.0.0",
    "@nestjs/jwt": "^10.0.0",
    "@nestjs/passport": "^10.0.0",
    "passport": "^0.6.0",
    "passport-jwt": "^4.0.0",
    "pg": "^8.11.0",
    "typeorm": "^0.3.0",
    "reflect-metadata": "^0.1.13",
    "rxjs": "^7.8.1",
    "axios": "^1.6.0"
  },
  "devDependencies": {
    "@nestjs/cli": "^10.0.0",
    "@nestjs/schematics": "^10.0.0",
    "@nestjs/testing": "^10.0.0",
    "@types/express": "^4.17.17",
    "@types/jest": "^29.5.2",
    "@types/node": "^20.3.1",
    "@types/supertest": "^2.0.12",
    "@typescript-eslint/eslint-plugin": "^6.0.0",
    "@typescript-eslint/parser": "^6.0.0",
    "eslint": "^8.42.0",
    "jest": "^29.5.0",
    "source-map-support": "^0.5.21",
    "supertest": "^6.3.3",
    "ts-jest": "^29.1.0",
    "ts-loader": "^9.4.3",
    "ts-node": "^10.9.1",
    "tsconfig-paths": "^4.2.0",
    "typescript": "^5.1.3"
  }
}
EOF

# 6. Configurar variáveis de ambiente
echo "[6/7] Configurando variáveis de ambiente..."
cat > .env << EOF
DATABASE_URL=postgres://admin:PiboSecure2025@postgres:5432/pibo_erp
JWT_SECRET=PiboJWT2025SecretKeyChangeThis
RABBITMQ_URL=amqp://rabbitmq:5672
ESTOQUE_SERVICE_URL=http://pibo-estoque-service:3000
EOF

# 7. Iniciar sistema
echo "[7/7] Iniciando Pibo ERP..."
docker compose up -d

echo ""
echo "========================================="
echo "  ✅ Deploy Concluído com Sucesso!"
echo "========================================="
echo ""
echo "Acesse o sistema em: http://$(curl -s ifconfig.me)"
echo ""
echo "Para ver os logs: docker compose logs -f"
echo "Para parar: docker compose down"
echo "Para reiniciar: docker compose restart"
echo ""
