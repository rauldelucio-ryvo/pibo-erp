# Pibo ERP - Enterprise Resource Planning System

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)
![Docker](https://img.shields.io/badge/docker-ready-blue.svg)

Complete ERP system built with microservices architecture, featuring 11 specialized services for comprehensive business management.

## 🌟 Features

### Core Modules
- **Authentication & Authorization** - JWT-based auth with RBAC and multi-tenancy
- **Sales Management** - Complete sales order processing and tracking
- **Stock/Inventory** - Real-time inventory management and tracking
- **Fiscal/Tax** - NFe generation and fiscal compliance
- **CRM** - Customer relationship management and lead tracking
- **Finance** - Accounts payable/receivable management
- **Workflow** - Business process automation and rules engine
- **Contracts** - Recurring billing and contract management
- **Purchasing** - Purchase order management
- **Configuration** - System-wide settings and parameters
- **Frontend** - Modern Next.js web application

### Technical Features
- ✅ Microservices architecture with Docker Compose
- ✅ PostgreSQL database with TypeORM
- ✅ RabbitMQ for async messaging
- ✅ Nginx API Gateway
- ✅ Swagger/OpenAPI documentation
- ✅ JWT authentication
- ✅ Role-based access control (RBAC)
- ✅ Multi-tenancy support
- ✅ Database migrations
- ✅ Input validation
- ✅ Comprehensive logging

## 🚀 Quick Start

### Prerequisites
- Docker & Docker Compose
- Node.js 18+ (for local development)
- Git

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/rauldelucio-ryvo/pibo-erp.git
cd pibo-erp
```

2. **Configure environment variables**
```bash
cp .env.example .env
# Edit .env with your configuration
```

3. **Start with Docker Compose**
```bash
docker compose up -d
```

4. **Access the application**
- Frontend: http://localhost:3000
- Auth API: http://localhost:3001
- API Documentation: http://localhost:3001/api/docs
- Gateway: http://localhost:8080

## 📚 API Documentation

Each service provides Swagger/OpenAPI documentation:

- **Auth Service**: http://localhost:3001/api/docs
- **Sales Service**: http://localhost:3002/api/docs
- **Stock Service**: http://localhost:3003/api/docs
- And more...

### Default Credentials

**Admin User:**
- Email: `admin@pibo.app`
- Password: `admin123`

**Demo User:**
- Email: `demo@pibo.app`
- Password: `demo123`

> ⚠️ **Security Warning**: Change these credentials in production!

## 🏗️ Architecture

```
pibo-erp/
├── apps/
│   ├── pibo-auth-service/       # Authentication & Authorization
│   ├── pibo-vendas-service/     # Sales Management
│   ├── pibo-estoque-service/    # Stock/Inventory
│   ├── pibo-fiscal-service/     # Fiscal/Tax (NFe)
│   ├── pibo-crm-service/        # CRM
│   ├── pibo-financeiro-service/ # Finance
│   ├── pibo-workflow-service/   # Workflow Engine
│   ├── pibo-contratos-service/  # Contracts
│   ├── pibo-compras-service/    # Purchasing
│   ├── pibo-config-service/     # Configuration
│   └── pibo-frontend-web/       # Next.js Frontend
├── gateway/
│   └── nginx.conf               # API Gateway Configuration
├── docker-compose.yml           # Docker orchestration
└── complete_deploy.sh           # Automated deployment script
```

## 🛠️ Development

### Local Development

1. **Install dependencies**
```bash
cd apps/pibo-auth-service
npm install
```

2. **Run in development mode**
```bash
npm run start:dev
```

3. **Run migrations**
```bash
npm run migration:run
```

4. **Seed database**
```bash
npm run seed
```

### Database Migrations

```bash
# Generate a new migration
npm run migration:generate -- src/migrations/MigrationName

# Run migrations
npm run migration:run

# Revert last migration
npm run migration:revert
```

## 🚢 Deployment

### DigitalOcean Deployment

Use the automated deployment script:

```bash
# On your DigitalOcean Droplet
chmod +x complete_deploy.sh
./complete_deploy.sh
```

This script will:
1. Update system packages
2. Install Node.js, Docker, and Docker Compose
3. Install dependencies in all services
4. Build Docker images
5. Start all services
6. Display access information

### Manual Deployment

1. **Install Docker and Docker Compose**
```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh
apt install docker-compose-plugin
```

2. **Clone and configure**
```bash
git clone https://github.com/rauldelucio-ryvo/pibo-erp.git
cd pibo-erp
cp .env.example .env
```

3. **Build and start**
```bash
docker compose build
docker compose up -d
```

### SSL Configuration (Production)

```bash
# Install Certbot
apt install certbot python3-certbot-nginx

# Get SSL certificate
certbot --nginx -d pibo.app -d www.pibo.app

# Auto-renewal
certbot renew --dry-run
```

## 📊 Monitoring

### View Logs

```bash
# All services
docker compose logs -f

# Specific service
docker compose logs -f pibo-auth-service

# Last 100 lines
docker compose logs --tail=100 pibo-auth-service
```

### Service Status

```bash
# Check running services
docker compose ps

# Check resource usage
docker stats
```

## 🧪 Testing

```bash
# Run unit tests
npm run test

# Run e2e tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## 🔒 Security

- All passwords are hashed with bcrypt
- JWT tokens for authentication
- CORS enabled with configurable origins
- Input validation on all endpoints
- SQL injection protection via TypeORM
- Rate limiting (recommended for production)

### Security Checklist for Production

- [ ] Change default database passwords
- [ ] Update JWT secret key
- [ ] Configure proper CORS origins
- [ ] Enable HTTPS/SSL
- [ ] Set up firewall rules
- [ ] Configure rate limiting
- [ ] Enable audit logging
- [ ] Regular security updates

## 📝 Environment Variables

```env
# Database
DATABASE_URL=postgres://user:password@host:5432/dbname
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=admin
DB_PASSWORD=your_password
DB_NAME=pibo_erp

# Authentication
JWT_SECRET=your_jwt_secret_key

# RabbitMQ
RABBITMQ_URL=amqp://rabbitmq:5672

# Services
ESTOQUE_SERVICE_URL=http://pibo-estoque-service:3000
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **Pibo ERP Team** - [support@pibo.app](mailto:support@pibo.app)
- **Website** - [https://pibo.app](https://pibo.app)

## 🙏 Acknowledgments

- NestJS for the amazing framework
- Next.js for the frontend framework
- TypeORM for database management
- Docker for containerization
- All open-source contributors

## 📞 Support

For support, email support@pibo.app or join our Slack channel.

---

Made with ❤️ by the Pibo ERP Team
