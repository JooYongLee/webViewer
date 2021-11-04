const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app){
  app.use(
      createProxyMiddleware('/so', {
          target: 'http://localhost:3005',
          changeOrigin: true
      })
  )
};


