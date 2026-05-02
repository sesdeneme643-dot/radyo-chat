const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

app.get("/", (req, res) => {
  res.send(`
<h2>Radyo Chat</h2>

<input id="isim" placeholder="Adın">
<button onclick="gir()">Giriş</button>

<ul id="users"></ul>

<div id="chat"></div>

<input id="mesaj" placeholder="Mesaj">
<button onclick="gonder()">Gönder</button>

<script src="/socket.io/socket.io.js"></script>

<script>
const socket = io();
let isim = "";

function gir(){
  isim = document.getElementById("isim").value;
  socket.emit("kullanici", isim);
}

function gonder(){
  let mesaj = document.getElementById("mesaj").value;
  socket.emit("mesaj", isim + ": " + mesaj);
}

socket.on("mesaj", (data)=>{
  document.getElementById("chat").innerHTML += "<p>"+data+"</p>";
});

socket.on("kullanicilar", (users)=>{
  let html = "";
  users.forEach(u=>{
    html += "<li>"+u.isim+"</li>";
  });
  document.getElementById("users").innerHTML = html;
});
</script>
`);
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
