import express from "express";
import cors from "cors";
import fs from "fs"

import mysqliteController from "./mysqliteController.js";
let controller = new mysqliteController()

// import dbase from "./dbinter.js"
// import swissKnife from "./swissKnife.js"
// const base = new dbase()

const app = express();
app.use(express.json());
app.use(cors());


// app.use('/', express.static(`public`));
app.listen(3000, () => console.log("Server is running"));
app.get("/", (req, res) => { controller.select('groups', req, res) })

app.post("/api/users/get",      (req, res) => { controller.select('users', req, res) })
app.post("/api/users/insert",   (req, res) => { controller.insert('users', req, res) })
app.post("/api/users/update",   (req, res) => { controller.update('users', req, res) })
app.post("/api/users/delete",   (req, res) => { controller.delete('users', req, res) })

app.post("/api/groups/get",     (req, res) => { controller.select('groups', req, res) })
app.post("/api/groups/insert",  (req, res) => { controller.insert('groups', req, res) })
app.post("/api/groups/update",  (req, res) => { controller.update('groups', req, res) })
app.post("/api/groups/delete",  (req, res) => { controller.delete('groups', req, res) })

app.post("/api/maps/get",       (req, res) => { controller.select('maps', req, res) })
app.post("/api/maps/insert",    (req, res) => { controller.insert('maps', req, res) })
app.post("/api/maps/update",    (req, res) => { controller.update('maps', req, res) })
app.post("/api/maps/delete",    (req, res) => { controller.delete('maps', req, res) })

app.post("/api/cameras/get",    (req, res) => { controller.select('cameras', req, res) })
app.post("/api/cameras/insert", (req, res) => { controller.insert('cameras', req, res) })
app.post("/api/cameras/update", (req, res) => { controller.update('cameras', req, res) })
app.post("/api/cameras/delete", (req, res) => { controller.delete('cameras', req, res) })