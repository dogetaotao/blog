let ipUrl = 'http://localhost:7001/admin/'

let servicePath = {
  checkLogin : ipUrl+'checkLogin' ,  //首页页接口
  getTypeInfo : ipUrl+'getTypeInfo' ,  //获得文章类别信息
  putArticle : ipUrl+'putArticle' , //发布文章
  updateArticle: ipUrl+'updateArticle' , //修改文章
  getArticleList: ipUrl+'getArticleList' ,//获取文章列表
  delArticle: ipUrl+'delArticle/' ,//删除文章
  getArticleById: ipUrl+'getArticleById/' //根据id获得文章详情
}

export default servicePath