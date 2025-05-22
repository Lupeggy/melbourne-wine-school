console.log('Node.js is working!');
console.log('Current directory:', process.cwd());
console.log('Node version:', process.version);

const http = require('http');
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello from Node.js!');});

const PORT = 3003;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
  console.log('Try opening this in your browser!');
});
