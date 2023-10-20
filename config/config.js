// 全局配置变量-备案信息
const config = {
  author: 'Static4u',
  authorEn: 'Static4u',
  email: '420048248@qq.com',
  pc: {
    site: 'https://static1014.github.io/pc_data/post_creator/'
  },
}

/**
 * 获取footer html
 * @param project config中的项目对象
 * @param isEn  是否英文
 * @returns {string} footer html
 */
function getFooterHtml(project, isEn = false) {
  let author = isEn ? 'Owner' : '主办单位'
  let email = isEn ? 'Email' : '邮箱'
  return "<span>" +
    author + "：" + getAuthor(isEn) + "&emsp;" +
    email + "：<a href='mailto:" + config.email + "'>" + config.email + "</a>" +
    "</span>"
}

function getAuthor(isEn = false) {
  return isEn ? config.authorEn : config.author
}