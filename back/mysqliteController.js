import mysqliteInter from "./mysqliteInter.js";

export default class {
  constructor (basePath = 'db.sqlite') {
    this.conn = new mysqliteInter(basePath)
  }

  select (table, req, res) {
    let data = req.body
    let response = this.conn.select(table, data)
    return res.send(response)
  }

  insert (table, req, res) {
    let data = req.body
    let response = this.conn.insert(table, data)
    res.send(response) 
  }

  update (table, req, res) {
    let data = req.body.data
    let filter = req.body.filter
    let response = this.conn.update(table, data, filter)
    res.send(response) 
  }

  delete (table, req, res) {
    let filter = req.body
    let response = this.conn.delete(table, filter)
    res.send(response) 
  }

}