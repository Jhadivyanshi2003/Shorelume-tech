Write-Host "Installing Frontend dependencies..."
Set-Location frontend
npm install

Set-Location ..

Write-Host "Installing Backend dependencies..."
Set-Location backend
npm install

Write-Host "Dependencies installed successfully."
