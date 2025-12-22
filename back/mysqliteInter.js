import { DatabaseSync } from "node:sqlite"


export default class {
  constructor (basePath = 'db.sqlite') {
    this.conn = new DatabaseSync(basePath)
  }


  select (table, where = false) {
    let query, keys, values, 
    whereString

    if (where) {
      keys        = Object.keys(where)
      values      = Object.values(where)
      whereString = keys.map(item => `${item} = ?`).join(', ')
      query       = `SELECT * FROM ${table} WHERE ${whereString}`
      return this.conn.prepare(query).all(...values)
    }

    else {
      query = `SELECT * FROM ${table}`
      return this.conn.prepare(query).all()
    }
  }

  
  delete (table, where = false) {
    let query, keys, 
    values, whereString

    if (where) {
      keys        = Object.keys(where)
      values      = Object.values(where)
      whereString = keys.map(item => `${item} = ?`).join(', ')
      query       = `DELETE FROM ${table} WHERE ${whereString}`
      return this.conn.prepare(query).run(...values)
    }

    return false
  }



  insert (table, data) {
    let query, keys, values,
    keysString, bindString

    keys        = Object.keys(data)
    values      = Object.values(data)
    keysString  = keys.join(', ')
    bindString  = keys.map(item => '?').join(', ')
    query       = `INSERT INTO ${table} (${keysString}) VALUES (${bindString})`
    return this.conn.prepare(query).run(...values)
  }


  update (table, data, where = null) {
    let query, dataKeys, dataValues, res,
    whereKeys, whereValues,
    whereString, bindString, keysString

    dataKeys    = Object.keys(data)
    dataValues  = Object.values(data)
    keysString  = dataKeys.join(', ')
    bindString  = dataKeys.map(item => `${item} = ?`).join(', ')
    query       = `UPDATE ${table} SET ${bindString}`

    if (where) {
      whereKeys   = Object.keys(where)
      whereValues = Object.values(where)
      whereString = whereKeys.map(item => `${item} = ?`).join(' AND ')
      query       = `UPDATE ${table} SET ${bindString} WHERE ${whereString}`
      return this.conn.prepare(query).run(...dataValues, ...whereValues)
    }

    return this.conn.prepare(query).run(...dataValues)
  }

  
  close () { this.conn.close() }
}