import ajax from './ajax.js'
const DBASE = process.env.REACT_APP_API_URL
// const DBASE = ''

// request login
export const reqLogin=(username,password)=>(
    ajax.post(DBASE +'/login',{username,password})
)
