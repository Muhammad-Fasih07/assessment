export default () => ({
  port: parseInt(process.env.PORT ?? '3001', 10),
  mongodbUri: process.env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017/small-web',
  corsOrigin: process.env.CORS_ORIGIN ?? 'http://localhost:3000',
});
