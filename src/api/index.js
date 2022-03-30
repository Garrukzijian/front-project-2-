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

export const reqProducts = (pageNum, pageSize) => ajax(DBASE + '/manage/product/list', {pageNum, pageSize})

export const reqUpdateStatus = (productId, status) => ajax(DBASE + '/manage/product/updateStatus', {productId, status}, 'POST')

export const reqSearchProducts = ({pageNum, pageSize, searchName, searchType}) => ajax(DBASE + '/manage/product/search', {
    pageNum,
    pageSize,
    [searchType]: searchName,
  })
  
  export const reqDeleteImg = (name) => ajax(DBASE + '/manage/img/delete', {name}, 'POST')
  
  export const reqAddOrUpdateProduct = (product) => ajax(DBASE + '/manage/product/' + ( product._id?'update':'add'), product, 'POST')

  export const reqRoles = () => ajax(DBASE + '/manage/role/list')

  export const reqAddRole = (roleName) => ajax(DBASE + '/manage/role/add', {roleName}, 'POST')

  export const reqUpdateRole = (role) => ajax(DBASE + '/manage/role/update', role, 'POST')

  export const reqUsers = () => ajax(DBASE + '/manage/user/list')

  export const reqDeleteUser = (userId) => ajax(DBASE + '/manage/user/delete', {userId}, 'POST')
  
  export const reqAddOrUpdateUser = (user) => ajax(DBASE + '/manage/user/'+(user._id ? 'update' : 'add'), user, 'POST')
  