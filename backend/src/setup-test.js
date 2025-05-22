import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

// Get directory name in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3002;

// Basic middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Simple route to test server
app.get('/api/test', (req, res) => {
  res.json({
    status: 'success',
    message: 'Server is running!',
    timestamp: new Date().toISOString(),
  });
});

// Serve a simple HTML page at the root
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Melbourne Wine School - Setup Check</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            color: #333;
          }
          .container {
            background-color: #f9f9f9;
            border-radius: 8px;
            padding: 30px;
            margin-top: 30px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          }
          h1 {
            color: #8B0000;
            text-align: center;
          }
          .status {
            background-color: #4CAF50;
            color: white;
            padding: 10px 15px;
            border-radius: 4px;
            display: inline-block;
            margin: 10px 0;
          }
          .endpoint {
            background-color: #f0f0f0;
            padding: 15px;
            border-radius: 4px;
            margin: 20px 0;
            font-family: monospace;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Melbourne Wine School</h1>
          <h2>Backend Setup Check</h2>
          
          <div class="status">Server is running! 🚀</div>
          
          <h3>API Endpoints:</h3>
          <div class="endpoint">
            <strong>GET /api/test</strong> - Test API endpoint<br>
            <a href="/api/test" target="_blank">Try it</a>
          </div>
          
          <h3>Next Steps:</h3>
          <ol>
            <li>Check the browser console for any errors</li>
            <li>Verify the API test endpoint works</li>
            <li>Proceed with database setup and other configurations</li>
          </ol>
          
          <p>Environment: <strong>${process.env.NODE_ENV || 'development'}</strong></p>
          <p>Port: <strong>${PORT}</strong></p>
        </div>
      </body>
    </html>
  `);
});

// Start the server
app.listen(PORT, () => {
  console.log(`\n✅ Server is running on http://localhost:${PORT}`);
  console.log(`🔍 Test the API at http://localhost:${PORT}/api/test\n`);
  
  // Log environment info
  console.log('Environment:', process.env.NODE_ENV || 'development');
  console.log('Port:', PORT);
  console.log('\nPress Ctrl+C to stop the server\n');
});
