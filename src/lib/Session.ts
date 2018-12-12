import User from 'model/User'

const ls = localStorage
const NS = 'MP.USER'

// Loads the user session and returns a User object if the user is logged in
export const loadSession = (): User | null => {
  const res = JSON.parse(ls.getItem(NS))
  return res ? new User(res) : null
}

// Update and Save the current User session
export const saveSession = (user: User): User => {
  ls.setItem(NS, JSON.stringify(user))
  ls.setItem(NS + '.TOKEN', user.token)
  return user
}
