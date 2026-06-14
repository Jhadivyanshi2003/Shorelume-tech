$ErrorActionPreference = "Stop"

Write-Host "Setting up Frontend..."
npx -y create-vite@latest frontend --template react
Set-Location frontend
npm install
npm install react-router-dom axios react-hook-form yup tailwindcss postcss autoprefixer lucide-react react-hot-toast framer-motion
npx -y tailwindcss init -p

$dirs = @("src/assets", "src/components/common", "src/components/forms", "src/components/layout", "src/config", "src/context", "src/hooks", "src/pages/public", "src/pages/user", "src/pages/admin", "src/routes", "src/services", "src/utils")
foreach ($dir in $dirs) {
    New-Item -ItemType Directory -Force -Path $dir | Out-Null
}

Set-Location ..

Write-Host "Setting up Backend..."
New-Item -ItemType Directory -Force -Path backend | Out-Null
Set-Location backend
npm init -y
npm install express mongoose dotenv cors helmet morgan jsonwebtoken bcryptjs multer exceljs nodemailer cloudinary razorpay
npm install --save-dev nodemon

$bDirs = @("src/config", "src/controllers", "src/middlewares", "src/models", "src/routes", "src/services", "src/utils", "uploads")
foreach ($dir in $bDirs) {
    New-Item -ItemType Directory -Force -Path $dir | Out-Null
}

Write-Host "Setup Complete."
