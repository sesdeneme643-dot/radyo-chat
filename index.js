const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

app.get("/", (req, res) => {
  res.send(`
  <html>
  <head>
  <style>
    body {
      background: #0f172a;
      color: white;
      font-family: Arial;
    }
    #chat {
      height: 300px;
      overflow-y: scroll;
      border: 1px solid #444;
      padding: 10px;
      margin-bottom: 10px;
    }
    input {
      padding: 5px;
      margin: 5px;
    }
    button {
      padding: 5px 10px;
      background: #22c55e;
      border: none;
      color: white;
    }
    #users {
      background: #1e293b;
      padding: 10px;
      margin-top: 10px;
    }
  </style>
  </head>

  <body>

  <h2>🎧 Radyo Chat</h2>

  <input id="isim" placeholder="Adın">
  <button onclick="gir()">Giriş</button>

  <div id="chat"></div>

  <input id="mesaj" placeholder="Mesaj">
  <button onclick="gonder()">Gönder</button>

  <h3>👥 Online</h3>
  <ul id="users"></ul>

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
    socket
