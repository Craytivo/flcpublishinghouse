# Convert devotional-week pages
$files = @('devotionals-pages/devotional-week1-hope.html','devotionals-pages/devotional-week2-love.html','devotionals-pages/devotional-week3-peace.html','devotionals-pages/devotional-week4-joy.html')
foreach ($file in $files) {
  $path = Join-Path (Get-Location) $file
  $html = Get-Content -Raw -Path $path
  $html = $html -replace '  <!-- Static Header -->.*?</header>', "  <div id=`"headerContainer`" data-current-page=`"devotionals`" data-base-path=`"..`"></div>"
  $html = $html -replace '  <!-- Footer Container -->\s*<div id="footerContainer".*?script src="\.\./assets/js/components/footer-component\.js".*?</script>', "  <div id=`"footerContainer`" data-current-page=`"devotionals`" data-base-path=`"..`"></div>"
  $html = $html -replace '(?s)\s*<script>\s*// ========================================.*?</script>\s*', "`r`n"
  $html = $html -replace '<script src="\.\./assets/js/site-theme\.js"></script>', "<script type=`"module`" src=`"../assets/js/main.js`"></script>"
  Set-Content -Path $path -Value $html
}
