// 处理业务逻辑的中间件，读取某个json文件的数据
const path = require('path')
const fileUtils = require('../utils/file_utils')
module.exports = async (ctx, next) => {
    // 获取url
    const url = ctx.request.url //  如：/api/seller   要转化成 ../data/seller.json
    let filePath = url.replace('/api', '') //  /seller
    filePath = '../data' + filePath + '.json'    //  ../data/seller.json
    filePath = path.join(__dirname, filePath)  // 绝对路径
    try {
        const ret = await fileUtils.getFileJsonData(filePath)
        ctx.response.body = ret
    } catch (error) {
        const errorMsg = {
            message: '读取文件失败，文件资源不存在',
            status: 404
        }
        ctx.response.body = errorMsg
    }
    console.log(filePath)
    await next()
}