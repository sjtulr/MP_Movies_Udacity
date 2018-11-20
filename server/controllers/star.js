const DB = require('../utils/db.js')

module.exports = {

  /**
   * 添加收藏
   */
  add: async ctx => {

    let user = ctx.request.body.user
    let comment_id = +ctx.request.body.comment_id

    await DB.query('INSERT INTO star(user, comment_id) VALUES (?, ?)', [user, comment_id])

    ctx.state.data = {}
  },

  /**
   * 获取收藏列表
   */
  star: async ctx => {
    let user = ctx.params.user

    ctx.state.data = await DB.query('select * from star where star.user = ?', [user])
  },
}