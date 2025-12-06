#!/bin/bash

# Pibo ERP - Complete Deployment Script for DigitalOcean
# This script automates the entire deployment process

set -e  # Exit on error

echo "🚀 Starting Pibo ERP Deployment..."
echo "=================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Step 1: Update system
echo -e "${YELLOW}📦 Step 1: Updating system packages...${NC}"
apt update && apt upgrade -y

# Step 2: Install Node.js and npm (if not already installed)
echo -e "${YELLOW}📦 Step 2: Installing Node.js and npm...${NC}"
if ! command -v node &> /dev/null; then
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
    apt install -y nodejs
fi
echo "Node version: $(node --version)"
echo "NPM version: $(npm --version)"

# Step 3: Install Docker (if not already installed)
echo -e "${YELLOW}🐳 Step 3: Installing Docker...${NC}"
if ! command -v docker &> /dev/null; then
    curl -fsSL https://get.docker.com -o get-docker.sh
    sh get-docker.sh
    rm get-docker.sh
fi
echo "Docker version: $(docker --version)"

# Step 4: Install Docker Compose plugin
echo -e "${YELLOW}🐳 Step 4: Installing Docker Compose...${NC}"
if ! docker compose version &> /dev/null; then
    apt install -y docker-compose-plugin
fi
echo "Docker Compose version: $(docker compose version)"

# Step 5: Navigate to project directory
echo -e "${YELLOW}📂 Step 5: Navigating to project directory...${NC}"
cd ~/pibo-erp || { echo -e "${RED}Error: pibo-erp directory not found${NC}"; exit 1; }

# Step 6: Pull latest changes from Git
echo -e "${YELLOW}🔄 Step 6: Pulling latest changes from Git...${NC}"
git pull origin main || echo "Warning: Git pull failed, continuing with existing code"

# Step 7: Fix dependencies in all services
echo -e "${YELLOW}📦 Step 7: Installing dependencies in all microservices...${NC}"
for dir in apps/pibo-*-service; do
    if [ -f "$dir/package.json" ]; then
        echo "  → Installing dependencies in $dir"
        cd "$dir"
        npm install --save @nestjs/typeorm typeorm pg reflect-metadata rxjs class-validator class-transformer @nestjs/swagger 2>&1 | grep -v "npm WARN" || true
        cd ../..
    fi
done

# Step 8: Create .env file if it doesn't exist
echo -e "${YELLOW}⚙️  Step 8: Configuring environment variables...${NC}"
if [ ! -f .env ]; then
    cat > .env << 'EOF'
DATABASE_URL=postgres://admin:PiboSecure2025@postgres:5432/pibo_erp
JWT_SECRET=PiboJWT2025SecretKeyChangeThis
RABBITMQ_URL=amqp://rabbitmq:5672
ESTOQUE_SERVICE_URL=http://pibo-estoque-service:3000
EOF
    echo -e "${GREEN}✓ .env file created${NC}"
else
    echo -e "${GREEN}✓ .env file already exists${NC}"
fi

# Step 9: Stop existing containers
echo -e "${YELLOW}🛑 Step 9: Stopping existing containers...${NC}"
docker compose down 2>&1 | grep -v "WARN" || true

# Step 10: Build Docker images
echo -e "${YELLOW}🔨 Step 10: Building Docker images (this may take 10-15 minutes)...${NC}"
docker compose build --no-cache 2>&1 | grep -E "^(=>|#|Successfully)" || true

# Step 11: Start all services
echo -e "${YELLOW}🚀 Step 11: Starting all services...${NC}"
docker compose up -d

# Step 12: Wait for services to be ready
echo -e "${YELLOW}⏳ Step 12: Waiting for services to start...${NC}"
sleep 10

# Step 13: Check service status
echo -e "${YELLOW}✅ Step 13: Checking service status...${NC}"
docker compose ps

# Step 14: Display logs
echo ""
echo -e "${GREEN}=================================="
echo "✅ Deployment Complete!"
echo "==================================${NC}"
echo ""
echo "📊 Service Status:"
docker compose ps --format "table {{.Name}}\t{{.Status}}\t{{.Ports}}"
echo ""
echo "🌐 Access Points:"
echo "  - Frontend: http://$(curl -s ifconfig.me):3000"
echo "  - Auth API: http://$(curl -s ifconfig.me):3001"
echo "  - Auth API Docs: http://$(curl -s ifconfig.me):3001/api/docs"
echo "  - Gateway: http://$(curl -s ifconfig.me):8080"
echo ""
echo "📝 Useful Commands:"
echo "  - View logs: docker compose logs -f [service-name]"
echo "  - Restart service: docker compose restart [service-name]"
echo "  - Stop all: docker compose down"
echo "  - View status: docker compose ps"
echo ""
echo -e "${YELLOW}⚠️  Security Reminder:${NC}"
echo "  - Change default passwords in .env file"
echo "  - Configure SSL/HTTPS with Certbot"
echo "  - Set up firewall rules"
echo ""
