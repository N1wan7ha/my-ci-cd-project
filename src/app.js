const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Store some metrics in memory (in production, use a proper database)
const requestCounts = {
  total: 0,
  byEndpoint: {}
};

// Middleware to track requests
app.use((req, res, next) => {
  requestCounts.total++;
  const endpoint = req.path;
  requestCounts.byEndpoint[endpoint] = (requestCounts.byEndpoint[endpoint] || 0) + 1;
  
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path} - ${req.ip} - Total: ${requestCounts.total}`);
  next();
});

app.use(express.json());

// Add CORS for frontend compatibility
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Routes
app.get('/', (req, res) => {
  res.json({
    message: '🚀 Hello from CI/CD Pipeline deployed on Railway!',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    version: '1.0.0',
    deployed: true,
    monitoring: 'Active'
  });
});

app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    service: 'CI/CD Demo App',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    node_version: process.version
  });
});

// Enhanced Metrics Endpoint
app.get('/metrics', (req, res) => {
  const memoryUsage = process.memoryUsage();
  
  res.json({
    timestamp: new Date().toISOString(),
    system: {
      uptime: process.uptime(),
      memory: {
        rss: `${Math.round(memoryUsage.rss / 1024 / 1024)} MB`,
        heapTotal: `${Math.round(memoryUsage.heapTotal / 1024 / 1024)} MB`,
        heapUsed: `${Math.round(memoryUsage.heapUsed / 1024 / 1024)} MB`,
        external: `${Math.round(memoryUsage.external / 1024 / 1024)} MB`
      },
      cpu: process.cpuUsage(),
      pid: process.pid,
      platform: process.platform,
      node_version: process.version
    },
    requests: {
      total: requestCounts.total,
      by_endpoint: requestCounts.byEndpoint
    },
    environment: {
      NODE_ENV: process.env.NODE_ENV || 'development',
      PORT: process.env.PORT || 3000
    }
  });
});

// New endpoint to test security headers
app.get('/security', (req, res) => {
  // Add security headers
  res.set({
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains'
  });
  
  res.json({
    message: 'Security headers check',
    headers: {
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block'
    },
    timestamp: new Date().toISOString()
  });
});

app.get('/api/info', (req, res) => {
  res.json({
    name: 'CI/CD Demo API',
    version: '1.0.0',
    description: 'A simple API to demonstrate CI/CD pipeline',
    deployment: 'Railway',
    status: 'operational',
    features: ['monitoring', 'security-scanning', 'metrics']
  });
});

// Performance test endpoint
app.get('/performance', async (req, res) => {
  const start = process.hrtime();
  
  // Simulate some work
  await new Promise(resolve => setTimeout(resolve, 100));
  
  const end = process.hrtime(start);
  const responseTime = (end[0] * 1000 + end[1] / 1000000).toFixed(2);
  
  res.json({
    response_time: `${responseTime} ms`,
    timestamp: new Date().toISOString(),
    performance: 'tested'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString()
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Route not found',
    path: req.path,
    method: req.method,
    available_endpoints: ['/', '/health', '/metrics', '/security', '/performance', '/api/info']
  });
});

// Start server
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📦 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🌐 Access URL: http://0.0.0.0:${PORT}`);
  console.log(`📊 Monitoring: http://0.0.0.0:${PORT}/metrics`);
  console.log(`🔒 Security: http://0.0.0.0:${PORT}/security`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  server.close(() => {
    console.log('Process terminated');
  });
});

module.exports = app;