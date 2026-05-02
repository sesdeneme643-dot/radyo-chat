const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

let users = [];

app.get("/", (req, res) => {
  res.send(`
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Radyo Chat</title>

<style>
body {
  background:#0f172a;
  color:white;
  font-family:Arial;
}

#chat {
  height:300px;
  overflow:auto;
  border:1px solid #444;
  padding:10px;
  margin-bottom:10px;
}

input {
  padding:6px;
  margin:5px;
}

button {
  padding:6px 12px;
  background:#22c55e;
  border:none;
  color:white;
  cursor:pointer;
}

#users {
  background:#1e293b;
  padding:10px;
  margin-top:10px;
}
</style>

</head>

<body>

<h2>🎧 Radyo Chat</h2>

<input id="isim" placeholder="Adın">
<button onclick="gir()">Giriş</button>

<div id="chat"></div>

<input
