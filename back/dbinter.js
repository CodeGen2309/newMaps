import mysql from "mysql2/promise"

export default class {
  constructor() {
    this.db
    this.setConnection()
  }

  async setConnection() {
    this.db = await mysql.createConnection({
      host: "localhost",
      user: "aia",
      port: 8306,
      password: "AZ2ZA*sFsEv@Eq7V",
      database: "aia"
    })
  }

  async query(sql) {
    let [rows, fields] = await this.db.query(sql)
    return rows
  }


  async saveTransation(tgid, summ, tag, timestamp) {
    let query = `
      INSERT INTO transactions (tgid, summ, tag, timestamp) 
      VALUES ('${tgid}', '${summ}', '${tag}', '${timestamp}')
    `

    return await this.db.query(query)
  }

  // USER 
  async getUser(tgid) {
    let query = `SELECT * FROM users WHERE tgid=${tgid}`
    let [rows, fields] = await this.db.query(query)
    return rows
  }


  async getAllUsers () {
    let query = `SELECT * FROM users`
    console.log(this);
    
    let [rows, fields] = await this.db.query(query)
    return rows
  }


  async saveUser(username, tgid, locale) {
    let query = `
      INSERT INTO users (username, tgid, locale) 
      VALUES ('${username}', ${tgid}, '${locale}')
    `

    return await this.db.query(query)
  }


  async updateUser(tgid, key, value) {
    let query = `UPDATE users SET ${key} = '${value}' WHERE tgid = '${tgid}'`
    return await this.db.query(query)
  }


  async updateUserScene(tgID, sceneID, reset_time) {
    let query = `
      UPDATE users SET 
      scenario_id = '${sceneID}', scene_reset_time = '${reset_time}'
      WHERE tgid = '${tgID}'
    `

    return await this.db.query(query)
  }


  async refreshFreeUserLimits() {
    let query = `
      UPDATE users 
      SET free_messages = 20 
      WHERE premium = 0 AND free_messages < 40
    `

    return await this.db.query(query)
  }


  async checkUsersPremium() {
    let timestamp = new Date().toISOString()

    let query = `
      UPDATE users 
      SET premium = 0
      WHERE premium_end < '${timestamp}'
    `

    return await this.db.query(query)
  }


  // SCENES
  async getScene(sceneID) {
    let query = `SELECT * FROM scenes WHERE id = ${sceneID}`
    let [rows, fields] = await this.db.query(query)

    return rows
  }


  async getAllScenes() {
    let query = "SELECT * FROM scenes ORDER BY `order` ASC"
    let [rows, fields] = await this.db.query(query)

    return rows
  }


  // CHATS
  async getChat(tgid) {
    let user = await this.getUser(tgid)

    let query = `
      SELECT role, content FROM chats 
      WHERE tgid='${tgid}'
      AND datetime > '${user[0]['scene_reset_time']}'
      ORDER BY id DESC LIMIT 10
    `

    let [rows, fields] = await this.db.query(query)
    return rows.reverse()
  }


  async saveMessage(tgid, content, role) {
    let timestamp = new Date().toISOString()

    let query = `
      INSERT INTO chats (tgid, role, content, datetime) 
      VALUES ("${tgid}", "${role}", "${content}", "${timestamp}")
    `

    return await this.db.query(query)
  }


  async close() {
    await this.db.end()
  }
}