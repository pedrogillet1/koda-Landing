const http = require('http');

const PORT = 3001;

const server = http.createServer((req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // API endpoints
  if (req.url === '/api/health' || req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      status: 'ok',
      message: 'Koda Landing Backend is running',
      timestamp: new Date().toISOString()
    }));
  } else if (req.url === '/api/status' || req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      service: 'Koda Landing Backend',
      version: '1.0.0',
      status: 'active',
      endpoints: [
        '/api/health',
        '/api/status'
      ]
    }));
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      error: 'Not Found',
      message: 'The requested endpoint does not exist'
    }));
  }
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Koda Landing Backend Server is running!`);
  console.log(`🌐 Backend API: http://localhost:${PORT}/`);
  console.log(`💚 Health check: http://localhost:${PORT}/api/health`);
});
