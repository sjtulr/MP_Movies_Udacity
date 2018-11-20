const DB = require('../utils/db.js')

module.exports = {

  /**
   * 添加评论
   */
  add: async ctx => {
    let user = ctx.state.$wxInfo.userinfo.openId
    let username = ctx.state.$wxInfo.userinfo.nickName
    let avatar = ctx.state.$wxInfo.userinfo.avatarUrl

    let movieId = +ctx.request.body.movie_id
    let content = ctx.request.body.content || null

    if (!isNaN(movieId)) {
      await DB.query('INSERT INTO comment(user, username, avatar, content, movie_id) VALUES (?, ?, ?, ?, ?, ?)', [user, username, avatar, content, movieId])
    }

    ctx.state.data = {}
    console.log(ctx)
  },

  /**
   * 获取评论列表
   */
  list: async ctx => {
    let movieId = +ctx.params.id

    if (!isNaN(movieId)) {
      ctx.state.data = await DB.query('select * from comment where comment.movie_id = ?', [movieId])
    } else {
      ctx.state.data = []
    }   
    console.log(ctx)   
  },

  /**
 * 获取评论详情
 */
  detail: async ctx => {
    let commentId = +ctx.params.id

    if (!isNaN(commentId)) {
      ctx.state.data = await DB.query('select * from comment where comment.id = ?', [commentId])
    } else {
      ctx.state.data = {}
    }
  }
}