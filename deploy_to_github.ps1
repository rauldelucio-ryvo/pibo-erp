# Script para configurar e enviar o projeto para o GitHub
# Execute como: .\deploy_to_github.ps1

Write-Host "=== Pibo ERP - Deploy to GitHub ===" -ForegroundColor Cyan

# 1. Criar .gitignore
Write-Host "`n[1/5] Criando .gitignore..." -ForegroundColor Yellow
$gitignoreContent = @"
# Node
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*
package-lock.json

# Build
dist/
build/
.next/
out/

# Environment
.env
.env.local
.env.production
.env.*.local

# Docker
.dockerignore

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Logs
logs/
*.log
"@

Set-Content -Path ".gitignore" -Value $gitignoreContent
Write-Host "✓ .gitignore criado" -ForegroundColor Green

# 2. Criar README.md
Write-Host "`n[2/5] Criando README.md..." -ForegroundColor Yellow
$readmeContent = @"
# Pibo ERP

Sistema ERP completo desenvolvido com microserviços.

## Tecnologias

- **Backend**: NestJS (Node.js/TypeScript)
- **Frontend**: Next.js (React)
- **Banco de Dados**: PostgreSQL
- **Mensageria**: RabbitMQ
- **Gateway**: Nginx
- **Containerização**: Docker

## Módulos

- Auth (Autenticação e RBAC)
- Vendas
- Estoque
- Fiscal
- CRM
- Financeiro
- Workflow
- Contratos
- Compras
- Configurações

## Como Rodar

\`\`\`bash
docker-compose up --build
\`\`\`

Acesse: http://localhost:3000

## Licença

Proprietário
"@

Set-Content -Path "README.md" -Value $readmeContent
Write-Host "✓ README.md criado" -ForegroundColor Green

# 3. Inicializar Git
Write-Host "`n[3/5] Inicializando Git..." -ForegroundColor Yellow
if (Test-Path ".git") {
    Write-Host "✓ Git já inicializado" -ForegroundColor Green
} else {
    git init
    Write-Host "✓ Git inicializado" -ForegroundColor Green
}

# 4. Adicionar arquivos
Write-Host "`n[4/5] Adicionando arquivos..." -ForegroundColor Yellow
git add .
git commit -m "Initial commit - Pibo ERP complete system"
Write-Host "✓ Arquivos commitados" -ForegroundColor Green

# 5. Instruções para o usuário
Write-Host "`n[5/5] Próximos passos:" -ForegroundColor Yellow
Write-Host @"

Para enviar ao GitHub:

1. Crie um repositório em: https://github.com/new
   Nome sugerido: pibo-erp
   Tipo: Private

2. Execute os comandos (substitua SEU-USUARIO):

   git remote add origin https://github.com/SEU-USUARIO/pibo-erp.git
   git branch -M main
   git push -u origin main

3. Quando solicitar credenciais:
   - Username: seu-usuario-github
   - Password: use um Personal Access Token
     (Crie em: https://github.com/settings/tokens)

"@ -ForegroundColor Cyan

Write-Host "`n✓ Projeto preparado para GitHub!" -ForegroundColor Green
