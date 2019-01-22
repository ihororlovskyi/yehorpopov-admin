import { store } from '../store'

export default (to, from, next) => {
  if (store.getters.userIsAdmin) {
    next()
  } else {
    next('/')
  }
}
