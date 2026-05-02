const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

app.get("/", (req, res) => {
  res.send("Radyo Chat çalışıyor");
});

let users = [];

io.on("connection", (socket) => {

  socket.on("kullanici", (isim) => {
    users.push({ id: socket.id, isim });
    io.emit("kullanicilar", users);
  });

  socket.on("mesaj", (data) => {
    io.emit("mesaj", data);
  });

  socket.on("disconnect", () => {
    users = users.filter(u => u.id !== socket.id);
    io.emit("kullanicilar", users);
  });
});

http.listen(process.env.PORT || 3000);
