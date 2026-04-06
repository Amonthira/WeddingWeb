require('dotenv').config();

const http = require('http');
const { Server } = require('socket.io');

const app = require('./app');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();

  // ✅ เปลี่ยนจาก app.listen → http server
  const server = http.createServer(app);

  // ✅ สร้าง socket.io
  const io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.on('connection', (socket) => {
    console.log('User connected');
  });

  // ✅ ส่ง io ไปใช้ใน controller
  app.set("io", io);

  // ✅ start server
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

startServer();