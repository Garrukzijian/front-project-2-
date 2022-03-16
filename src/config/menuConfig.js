const menuList = [
    {
      title: 'Homepage', 
      key: '/home', 
      isPublic: true, 
    },
    {
      title: 'products',
      key: '/products',
      children: [ 
        {
          title: 'category management',
          key: '/category',
        },
        {
          title: 'product management',
          key: '/product',
        },
      ]
    },
  
    {
      title: 'user management',
      key: '/user',
    },
    {
      title: 'role management',
      key: '/role',
    },
  
    {
      title: 'charts',
      key: '/charts',
      children: [
        {
          title: 'bar',
          key: '/charts/bar',
        },
        {
          title: 'line',
          key: '/charts/line',
        },
        {
          title: 'pie',
          key: '/charts/pie',
        },
      ]
    },
  
    {
      title: 'order management',
      key: '/order',
    },
  ]
  
  export default menuList