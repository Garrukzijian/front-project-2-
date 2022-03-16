import ajax from './ajax'
const DBASE = process.env.REACT_APP_API_URL
// const DBASE = ''

// request login
export const reqLogin = (username, password) => ajax(DBASE + '/login', {username, password}, 'POST')

// request  categorys
export const reqCategorys = (parentId) => ajax(DBASE + '/manage/category/list', {parentId})

// add  category
export const reqAddCategory = (categoryName, parentId) => ajax(DBASE + '/manage/category/add', {categoryName, parentId}, 'POST')

// update  category
export const reqUpdateCategory = ({categoryId, categoryName}) => ajax(DBASE + '/manage/category/update', {categoryId, categoryName}, 'POST')

// request  category
export const reqCategory = (categoryId) => ajax(DBASE + '/manage/category/info', {categoryId})
