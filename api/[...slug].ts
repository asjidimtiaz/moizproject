import app from '../artifacts/api-server/src/app.js';

// Configure Vercel to not parse the body natively, 
// allowing Express's express.json() to consume the raw stream.
export const config = {
  api: {
    bodyParser: false,
  },
};

// Export the Express app as a Vercel Serverless Function handler.
// Vercel intercepts requests and passes them to this Express app instance.
export default app;
