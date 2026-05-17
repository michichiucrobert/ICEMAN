const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // Serve static files
  if (req.method === 'GET') {
    let filePath = '';
    if (req.url === '/' || req.url === '/inspect') {
      filePath = path.join(__dirname, 'inspect.html');
    } else if (req.url.startsWith('/assets/')) {
      filePath = path.join(__dirname, req.url);
    }

    if (filePath && fs.existsSync(filePath)) {
      const ext = path.extname(filePath);
      let contentType = 'text/html';
      if (ext === '.png') contentType = 'image/png';
      else if (ext === '.jpg' || ext === '.jpeg') contentType = 'image/jpeg';
      else if (ext === '.js') contentType = 'application/javascript';
      else if (ext === '.css') contentType = 'text/css';

      res.writeHead(200, { 'Content-Type': contentType });
      fs.createReadStream(filePath).pipe(res);
      return;
    }
  }

  // Handle image saving
  if (req.method === 'POST' && req.url === '/save-image') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        const name = data.name;
        const base64Data = data.image.replace(/^data:image\/jpeg;base64,/, "");

        const filePath = path.join(__dirname, 'assets', name);
        fs.writeFileSync(filePath, base64Data, 'base64');
        console.log(`Successfully saved cropped image to ${filePath}`);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true }));
      } catch (err) {
        console.error("Error saving image:", err);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
      }
    });
    return;
  }

  res.writeHead(404);
  res.end();
});

server.listen(3100, () => {
  console.log('Crop server running on http://localhost:3100');
});
