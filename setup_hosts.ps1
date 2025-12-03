$hostsPath = "$env:windir\System32\drivers\etc\hosts"
$domain = "pibo.app"
$entry = "127.0.0.1 $domain"

if (-not (Test-Path $hostsPath)) {
    New-Item -Path $hostsPath -ItemType File -Force
}

$content = Get-Content $hostsPath
if ($content -notcontains $entry) {
    Add-Content -Path $hostsPath -Value "`r`n$entry"
    Write-Host "Added $domain to hosts file." -ForegroundColor Green
} else {
    Write-Host "$domain already exists in hosts file." -ForegroundColor Yellow
}

Write-Host "Setup Complete! You can now access http://$domain" -ForegroundColor Cyan
