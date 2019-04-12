import { store } from '../store'

export default (to, from, next) => {
  if (store.getters.userIsAdmin) {
    next()
  } else {
    next('/')
  }

  // if (process.env.NODE_ENV = 'production') {
  // }
}
