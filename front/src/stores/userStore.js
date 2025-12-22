import { reactive } from 'vue'
import apirator from '@/lib/apirator'

export default reactive({
  user: {
    name :     null,
    login :    null,
    password : null,
    groups :   null,
    isAdmin :  false,
    id :       null,
  },


  setUser ({ name, login, password, groups, id, isAdmin }) {
    this.user.name     = name
    this.user.login    = login
    this.user.password = password
    this.user.isAdmin  = isAdmin
    this.user.groups   = JSON.parse(groups)
    this.user.id       = id

    $cookies.set('newMapsUser', id)
    return true
  },


  checkAdmin () {
    return this.isAdmin
  },


  async checkSesion () {
    let id, res, user

    id = $cookies.get('newMapsUser')

    if (id == "undefined") { return false }
    if (!id) { return false }

    res  = await apirator.get('users', { id })    
    user = res[0]
    
    this.setUser(user)
    return true
  },
})