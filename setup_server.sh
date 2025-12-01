#!/bin/bash

# 1. Update and Install Dependencies
echo "Updating system and installing dependencies..."
sudo apt-get update
sudo apt-get install -y openjdk-17-jdk mariadb-server nginx

# 2. Configure Database
echo "Configuring Database..."
sudo systemctl start mariadb
sudo systemctl enable mariadb

# Create DB and User (Idempotent)
sudo mysql -e "CREATE DATABASE IF NOT EXISTS verduleria_db;"
sudo mysql -e "CREATE USER IF NOT EXISTS 'verduleria_user'@'localhost' IDENTIFIED BY 'testpasswd';"
sudo mysql -e "GRANT ALL PRIVILEGES ON verduleria_db.* TO 'verduleria_user'@'localhost';"
sudo mysql -e "FLUSH PRIVILEGES;"

# 3. Configure Nginx
echo "Configuring Nginx..."

# Create directory for frontend
sudo mkdir -p /home/ubuntu/frontend
sudo chown -R ubuntu:ubuntu /home/ubuntu/frontend

# Create Nginx Config
cat << 'EOF' | sudo tee /etc/nginx/sites-available/verduleria
server {
    listen 80;
    server_name _;

    # Frontend (React)
    location / {
        root /home/ubuntu/frontend;
        index index.html index.htm;
        try_files $uri $uri/ /index.html;
    }

    # Backend (Spring Boot API)
    location /api {
        proxy_pass http://localhost:9090;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
    
    # Swagger UI
    location /doc {
        proxy_pass http://localhost:9090;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
    
    location /v3/api-docs {
        proxy_pass http://localhost:9090;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
EOF

# Enable Site
sudo ln -sf /etc/nginx/sites-available/verduleria /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default

# Test and Restart Nginx
sudo nginx -t && sudo systemctl restart nginx

# 4. Create Backend Directory
echo "Creating backend directory..."
mkdir -p /home/ubuntu/backend

echo "Setup Complete! 🚀"
echo "1. Push your code to GitHub."
echo "2. Ensure GitHub Actions run successfully."
echo "3. Your app should be live at http://$(curl -s ifconfig.me)"
