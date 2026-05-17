Add-Type -AssemblyName System.Drawing

# Source images (with the weird names the user saved them as)
$mensSource = "assets\assetsmens_products.jpg.png"
$womensSource = "assets\assetswomens_products.jpg.png"

# --- Crop Men's Products ---
# Layout from screenshot: 4 columns top row, 2 columns bottom row (6 products total)
# Products match:
# mens_1 = Necklace (top-left),  mens_2 = Bracelet (top-2nd), mens_3 = Ring (top-3rd), mens_4 = Earrings (top-4th)
# mens_5 = Bracelet (bottom-1st), mens_6 = Ring (bottom-2nd)

$mensImg = [System.Drawing.Image]::FromFile((Resolve-Path $mensSource).Path)
$mW = $mensImg.Width
$mH = $mensImg.Height

Write-Host "Mens image size: $mW x $mH"

# Row heights: two rows roughly split at 50%
$rowH = [int]($mH / 2)

# Top row: 4 columns
$colW_top = [int]($mW / 4)

# Bottom row: 2 columns 
$colW_bot = [int]($mW / 2)

$mensProducts = @(
    @{ name="mens_1"; x=0;          y=0;     w=$colW_top; h=$rowH },  # Necklace
    @{ name="mens_2"; x=$colW_top;  y=0;     w=$colW_top; h=$rowH },  # Bracelet
    @{ name="mens_3"; x=($colW_top*2); y=0;  w=$colW_top; h=$rowH },  # Ring
    @{ name="mens_4"; x=($colW_top*3); y=0;  w=$colW_top; h=$rowH },  # Earrings
    @{ name="mens_5"; x=0;          y=$rowH; w=$colW_bot; h=$rowH },  # Bracelet
    @{ name="mens_6"; x=$colW_bot;  y=$rowH; w=$colW_bot; h=$rowH }   # Ring
)

foreach ($p in $mensProducts) {
    $rect = New-Object System.Drawing.Rectangle($p.x, $p.y, $p.w, $p.h)
    $crop = $mensImg.Clone($rect, $mensImg.PixelFormat)
    $outPath = "assets\$($p.name).jpg"
    $crop.Save((Join-Path (Get-Location) $outPath), [System.Drawing.Imaging.ImageFormat]::Jpeg)
    $crop.Dispose()
    Write-Host "Saved $outPath"
}
$mensImg.Dispose()

# --- Crop Women's Products ---
# Layout: 3 columns, 2 rows (6 products)
# womens_1 = Ring (top-left), womens_2 = Necklace (top-mid), womens_3 = Ring (top-right)
# womens_4 = Bracelet (bot-left), womens_5 = Earrings (bot-mid), womens_6 = Necklace (bot-right)

$womensImg = [System.Drawing.Image]::FromFile((Resolve-Path $womensSource).Path)
$wW = $womensImg.Width
$wH = $womensImg.Height

Write-Host "Womens image size: $wW x $wH"

$wRowH = [int]($wH / 2)
$wColW = [int]($wW / 3)

$womensProducts = @(
    @{ name="womens_1"; x=0;         y=0;      w=$wColW; h=$wRowH },  # Ring
    @{ name="womens_2"; x=$wColW;    y=0;      w=$wColW; h=$wRowH },  # Necklace
    @{ name="womens_3"; x=($wColW*2); y=0;     w=$wColW; h=$wRowH },  # Ring
    @{ name="womens_4"; x=0;         y=$wRowH; w=$wColW; h=$wRowH },  # Bracelet
    @{ name="womens_5"; x=$wColW;    y=$wRowH; w=$wColW; h=$wRowH },  # Earrings
    @{ name="womens_6"; x=($wColW*2); y=$wRowH; w=$wColW; h=$wRowH }  # Necklace
)

foreach ($p in $womensProducts) {
    $rect = New-Object System.Drawing.Rectangle($p.x, $p.y, $p.w, $p.h)
    $crop = $womensImg.Clone($rect, $womensImg.PixelFormat)
    $outPath = "assets\$($p.name).jpg"
    $crop.Save((Join-Path (Get-Location) $outPath), [System.Drawing.Imaging.ImageFormat]::Jpeg)
    $crop.Dispose()
    Write-Host "Saved $outPath"
}
$womensImg.Dispose()

Write-Host "All images cropped successfully!"
