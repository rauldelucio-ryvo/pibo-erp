#!/bin/bash
set -e

cd /root/pibo-erp

echo "========================================="
echo "  Deploy Completo do Pibo ERP"
echo "========================================="

echo "[1/5] Atualizando código..."
git reset --hard HEAD
git pull

echo "[2/5] Rebuild do frontend..."
docker compose build --no-cache pibo-frontend-web

echo "[3/5] Reiniciando frontend..."
docker compose restart pibo-frontend-web

echo "[4/5] Gerando hash da senha..."
HASH=$(docker compose exec -T pibo-auth-service node -e "const bcrypt = require('bcrypt'); bcrypt.hash('admin123', 10).then(hash => console.log(hash));" 2>/dev/null | tr -d '\r\n')

echo "[5/5] Criando super admin..."
docker compose exec -T postgres psql -U admin -d pibo_erp << EOF
INSERT INTO users (id, email, "passwordHash", role, "tenantId")
VALUES (gen_random_uuid(), 'admin@piboerp.com', '$HASH', 'admin', NULL)
ON CONFLICT (email) DO UPDATE SET "passwordHash" = EXCLUDED."passwordHash", role = EXCLUDED.role;

SELECT id, email, role FROM users WHERE email = 'admin@piboerp.com';
EOF

echo ""
echo "========================================="
echo "  ✅ Deploy 100% Completo!"
echo "========================================="
echo ""
echo "Acesse: http://159.65.237.156:8080/login"
echo "Email: admin@piboerp.com"
echo "Senha: admin123"
echo ""
