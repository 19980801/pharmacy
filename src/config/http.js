import axios from 'axios'
import { Message } from 'iview'
axios.defaults.baseURL = '/uc'
let http = {}

http.ajax = axios.create();
http.get = (url, data) => {
  return new Promise((resolve, reject) => {
    http.ajax.get(url, data || {}).then((res) => {
      if (res.status == 200) {
        if (res.data.code == 0) {
          resolve(res.data)
        } else {
          Message.error(res.data.message)
          reject(res.data.message)
        }
      } else {
        reject(res.status)
        Message.error(res.status)
      }
    }).catch((error) => {
      reject(error)
      Message.error(error)
    })
  })
}
http.post = (url, data) => {
  return new Promise((resolve, reject) => {
    http.ajax.post(url, data).then((res) => {
      if (res.status == 200) {
        if (res.data.code == 0) {
          resolve(res.data)
        } else {
          Message.error(res.data.message)
          reject(res.data.message)
        }
      } else {
        reject(res.status)
        Message.error(res.status)
      }
    }).catch((error) => {
      reject(error)
      Message.error(error)
    })
  })
}

export default http