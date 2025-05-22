import express from 'express';

const app = express();
const PORT = 5000; // Using port 5000 instead

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Test Server</title>
        <style>
          body { 
            font-family: Arial, sans-serif; 
            text-align: center; 
            margin-top: 50px; 
            background: #f0f0f0;
          }
          h1 { color: #8B0000; }
          .status {
            background: #4CAF50;
            color: white;
            padding: 10px 20px;
            border-radius: 5px;
            display: inline-block;
          }
        </style>
      </head>
      <body>
        <h1>Melbourne Wine School</h1>
        <div class="status">Server is running on port ${PORT} 🚀</div>
        <p>Try the test endpoint: <a href="/api/test">/api/test</a></p>
      </body>
    </html>
  `);
});

app.get('/api/test', (req, res) => {
  res.json({ status: 'success', message: 'API is working!', timestamp: new Date() });
});

app.listen(PORT, () => {
  console.log(`\n✅ Server is running on http://localhost:${PORT}`);
  console.log(`🔍 Test the API at http://localhost:${PORT}/api/test\n`);
});
