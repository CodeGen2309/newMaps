import { reactive } from 'vue'

export default reactive({
  login: 'jrj',  
  password: 'coder',
  sid: null,

  signIn (login, password) {
    if (this.login != login) {return false}
    if (this.password != password) {return false}

    this.sid = 3943938
    return true
  },

  isLoggedIn () {
    if (this.sid == null) {return false}
    return true
  }
})