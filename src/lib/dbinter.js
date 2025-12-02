export default class {
  constructor () {
    this.apiUrl = 'http://localhost:3000'
  }


  setPostOpts (data) {
    return { 
      method  : 'POST', 
      body    : JSON.stringify(data), 
      headers : { 'Content-Type': 'application/json', }
    }
  }


  async insert (table, rows) {
    let link = `${this.apiUrl}/insert`
    let opts = this.setPostOpts({ table, rows })
    return await fetch(link, opts)
  }


  async update (table, where, what) {
    let link = `${this.apiUrl}/update`
    let opts = this.setPostOpts({ table, where, what })
    return await fetch(link, opts)
  }


  async delete (table, where) {
    let link = `${this.apiUrl}/delete`
    let opts = this.setPostOpts({ table, where })
    return await fetch(link, opts)
  }


  async select (table, where) {
    let link = `${this.apiUrl}/select`
    let opts = this.setPostOpts({ table, where })
    return await fetch(link, opts)
  }
}