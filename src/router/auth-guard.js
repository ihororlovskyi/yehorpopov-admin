import { store } from '../store'

export default (to, from, next) => {
  if (store.getters.user) {
    next()
  } else {
    next('/user/login')
  }

  // if (process.env.NODE_ENV = 'production') {
  // }
}
