# 🚀 CI/CD Demo Project with Node.js & Railway

A comprehensive demonstration of modern CI/CD practices using Node.js, GitHub Actions, and Railway.

![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/your-username/my-ci-cd-project/ci-cd.yml?branch=main)
![Node.js Version](https://img.shields.io/badge/Node.js-18-green)
![Express Version](https://img.shields.io/badge/Express-4.x-lightgrey)
![License](https://img.shields.io/badge/License-MIT-blue)

## ✨ Features

- 🚀 Automated CI/CD Pipeline with GitHub Actions
- 🔒 Security Scanning & Monitoring
- 🐳 Docker Containerization
- 🧪 Comprehensive Testing
- 📊 Real-time Metrics

## � Quick Start

```bash
# Clone and install
git clone https://github.com/n1wan7ha/my-ci-cd-project.git
cd my-ci-cd-project
npm install

# Run development server
npm run dev

# Run tests
npm test
```

## 📡 API Endpoints

- `GET /` - Welcome message
- `GET /health` - Health status
- `GET /metrics` - System metrics
- `GET /security` - Security headers
- `GET /api/info` - API information
- `GET /performance` - Performance test

## 🔄 CI/CD Pipeline

- Automated testing (Node.js 16.x, 18.x)
- Code linting & security scanning
- Performance metrics
- Automated Railway deployment

## 📊 Monitoring

Access metrics at `/metrics` endpoint:
```json
{
  "system": {
    "uptime": "...",
    "memory": "...",
  },
  "requests": {
    "total": "...",
    "by_endpoint": "..."
  }
}
```

## 🛡️ Environment Variables

- `PORT` - Server port (default: 3000)
- `NODE_ENV` - Environment (development/production)

## 📝 License

MIT

## 🤝 Contributing

1. Fork repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request
