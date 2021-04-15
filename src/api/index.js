import ajax from './ajax'
const BASE_URL = '';


//登录
export const reqLogin = (username,password)=>ajax(BASE_URL+'/reqlogin',{username,password});

//用户注册
export const reqRegister = (username,password)=>ajax(BASE_URL+'/reqregister',{username,password},'POST')

//获取所有文章
export const getAllBlog = (pageNum, pageSize)=> ajax(BASE_URL+'/getallcontent',{pageNum, pageSize});

//阅读数增加
export const updateReadCount = (readconut,id)=>ajax(BASE_URL+'/readconut',{readconut,id});


//获取热门文章
export const getHotArticle = (limitcount)=> ajax(BASE_URL+'/getHotArticle',{limitcount});

//获取个人博客
export const getOwnBlog = (author,pageNum,pageSize)=>ajax(BASE_URL+'/getowncontent',{author,pageNum,pageSize})

//文章发表
export const publicArticle=(title,content,label,mold,currentime,author,image)=>ajax(BASE_URL+'/release',{title,content,label,mold,currentime,author,image},'POST');

//文章编辑
export const editArticle = (id,title,content,label,mold,currentime)=>ajax(BASE_URL+'/editarticle',{id,title,content,label,mold,currentime},'POST');

//文章删除
export const deleteArticle=(id)=>ajax(BASE_URL+'/delarticle',{id},'POST');

//评论发表
export const publicComment =(blogimg,bloguser,blogid,tousername,status,blogcomment,commentime)=>ajax(BASE_URL+'/commit',{blogimg,bloguser,blogid,tousername,status,blogcomment,commentime},'POST')

//获取相对于的评论
export const getcommit = (blogid) =>ajax(BASE_URL+'/getcommit',{blogid});

//修改用户信息

export const changeUserInfo = (username,birthday,location,information,realname,job,sex)=>ajax(BASE_URL+'/modifyingdata',{username,birthday,location,information,realname,job,sex},'POST');


//修改密码
export const changePassword = (id,changepassword)=>ajax(BASE_URL+'/changepassword',{id,changepassword},'POST')

//图片更改
export const submitImage = (image,username)=>ajax(BASE_URL+'/submitImage',{image,username},'POST');

//文章用户头像修改
export const blogUserImage = (image,username)=>ajax(BASE_URL+'/blogUserImage',{image,username},'POST');