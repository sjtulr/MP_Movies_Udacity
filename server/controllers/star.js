const DB = require('../utils/db.js')

module.exports = {

  /**
   * 添加收藏
   */
  add: async ctx => {

    let user = ctx.state.$wxInfo.userinfo.openId
    let username = ctx.state.$wxInfo.userinfo.nickName
    let avatar = ctx.state.$wxInfo.userinfo.avatarUrl
    let comment_id = +ctx.request.body.comment_id

    await DB.query('INSERT INTO star(user, comment_id) VALUES (?, ?)', [user, comment_id])

    ctx.state.data = {}
  },

  /**
   * 获取收藏列表
   */
  star: async ctx => {
    let user = ctx.state.$wxInfo.userinfo.openId
    let username = ctx.state.$wxInfo.userinfo.nickName
    let avatar = ctx.state.$wxInfo.userinfo.avatarUrl

    ctx.state.data = await DB.query('select * from star where star.user = ?', [user])
  },

  /**
 * 获取发布列表
 */
  list: async ctx => {
    let user = ctx.state.$wxInfo.userinfo.openId
    let username = ctx.state.$wxInfo.userinfo.nickName
    let avatar = ctx.state.$wxInfo.userinfo.avatarUrl

    ctx.state.data = await DB.query('select * from comment where comment.user = ?', [user])

    console.log(ctx)
  },

  /**
   * 取消收藏
   */
  cancel: async ctx => {
    let star_id = +ctx.request.body.star_id

    await DB.query('DELETE FROM star WHERE star.id = ?', [star_id])

    ctx.state.data = {msg: '取消成功'}
  },

  /**
 * 获取具体某一条收藏，用于取消收藏
 */
  detail: async ctx => {
    let user = ctx.state.$wxInfo.userinfo.openId
    let username = ctx.state.$wxInfo.userinfo.nickName
    let avatar = ctx.state.$wxInfo.userinfo.avatarUrl
    let comment_id = +ctx.request.body.comment_id

    ctx.state.data = await DB.query('select * from star where star.user = ? AND star.comment_id = ?', [user, comment_id])
  },

}