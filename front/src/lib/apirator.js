export default {
  apiUrl:  'http://localhost:3000',

  setPostOpts (data) {
    return { 
      method  : 'POST', 
      body    : JSON.stringify(data),
      headers : { 'Content-Type': 'application/json', }
    }
  },

  
  async get (table, filter ) {
    let link = `${this.apiUrl}/api/${table}/get`
    let opts = this.setPostOpts(filter)
    let req = await fetch(link, opts)

    return await req.json()
  },


  async insert (table, data) {
    let link = `${this.apiUrl}/api/${table}/insert`
    let opts = this.setPostOpts(data)
    let req = await fetch(link, opts)

    return await req.json()
  },


  async update (table, data, filter) {
    let link = `${this.apiUrl}/api/${table}/update`
    let opts = this.setPostOpts({ data, filter })
    let req = await fetch(link, opts)

    return await req.json()
  },


  async delete (table, filter) {
    let link = `${this.apiUrl}/api/${table}/delete`
    let opts = this.setPostOpts(filter)
    let req = await fetch(link, opts)

    return await req.json()
  }
}