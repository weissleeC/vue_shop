import axios from 'axios'
import { Message } from 'element-ui'

// 响应拦截器
axios.interceptors.response.use(
  (success) => {
    // 业务接口逻辑
    if (success.status && success.status == 200) {
      if (
        success.data.code == 500 ||
        success.data.code == 401 ||
        success.data.code == 403
      ) {
        Message.error({ message: success.data.message })
        return
      }
      if (success.data.message) {
        Message.success({ message: success.data.message })
      }
    }

    return success.data
  },
  (error) => {
    if (error.response.code == 504 || error.response.code == 404) {
      Message.error({ message: '服务器出问题啦～' })
    } else if (error.response.code == 403) {
      Message.error({ message: '访问权限出错，请联系管理员' })
    } else if (error.response.code == 401) {
      Message.error({ message: '尚未登陆，请登录' })
      this.$router.push('/login')
    } else {
      if (error.response.data.message) {
        Message.error({ message: error.response.data.message })
      } else {
        Message.error({ message: '未知错误！' })
      }
    }
    return
  }
)

// 前置预设
let base = ''

export const postRequest = (url, params) => {
  return axios({
    method: 'post',
    url: `${base}${url}`,
    data: params,
  })
}
