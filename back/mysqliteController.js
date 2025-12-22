import mysqliteInter from "./mysqliteInter.js";

export default class {
  constructor (basePath = 'db.sqlite') {
    this.conn = new mysqliteInter(basePath)
  }


  // NOT USE FOR NOW
  checkEmptyObject (obj) {
    return Object.keys(obj).length == 0 
      && obj.constructor === Object
  }


  select (table, req, res) {
    let emptyCheck = false

    if (req.body) {
      emptyCheck = Object.keys(req.body).length == 0 
    } 

    let data       = emptyCheck ? false : req.body
    let response   = this.conn.select(table, data)

    return res.send(response)
  }


  insert (table, req, res) {
    let data     = req.body
    let response = this.conn.insert(table, data)
    
    return res.send(response) 
  }


  update (table, req, res) {
    let data     = req.body.data
    let filter   = req.body.filter
    let response = this.conn.update(table, data, filter)

    return res.send(response) 
  }


  delete (table, req, res) {
    let filter   = req.body
    let response = this.conn.delete(table, filter)

    return res.send(response) 
  }
}