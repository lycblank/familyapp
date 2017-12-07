import axios from 'axios'
import * as types from './mutation-types'
import crypto from 'crypto'
import StoreCache from '../utils/storeCache'

export function getLoginUser({commit}) {
  //axios.get('/user_login.json').then(res => {
  axios.get('/v1/user/10001').then(res => {
    let user = res.data.user
    commit(types.INIT_USER_INFO, {
      user
    })
  })
}

export function setLang({ commit }, lang) {
  commit(types.UPDATE_LANG, lang)
}

export function getContacts({commit}) {
  //axios.get('/contacts.json').then(res => {
  axios.get('/v1/user/contacts').then(res => {
    let contacts = res.data
    commit(types.INIT_CONTACTS, {
      contacts
    })
  })
}

export function publishTopic({commit}, text) {
  let cache = new StoreCache('vuex')
  let uid = cache.get('login:uid') || ''
  let token = cache.get('login:token') || ''
  var params = {
    content: text
  }
  axios.post(`/v1/user/${uid}/publish/topic`, JSON.stringify(params), {headers:{'Content-Type':'application/json','Authorization': token}}).then(res => {
    if (res.errCode === 0) {
      let nickname = cache.get('login:nickname') || ''
      // 发布成功 插入数据到首页中
      commit(types.INSERT_TIMETIME, {
        idx: 0,
        timeline: {
          id: parseInt(res.tid),
          nickname,
          text,
          original_pic: '',
          comment_count: 0,
          like_count: 0,
          created_at: res.createTime
        }
      })
    }
  })
}

export function commentTopic({commit}, {text, tid, successCallback, failedCallback}) {
  let cache = new StoreCache('vuex')
  let uid = cache.get('login:uid') || ''
  let token = cache.get('login:token') || ''
  var params = {
    content: text
  }
  axios.post(`/v1/user/${uid}/topic/${tid}/comment`, JSON.stringify(params), {headers:{'Content-Type':'application/json','Authorization': token}}).then(res => {
    if (res.errCode === 0) {
      let nickname = cache.get('login:nickname') || ''
      // 发布成功 插入数据到首页中
      commit(types.INSERT_COMMENT, {
        idx: 0,
        comment: {
          avatar: '1',
          name: nickname,
          text,
          time: res.createTime
        }
      })
      successCallback()
      return
    }
    failedCallback()
  })
}

export function initComments({commit}, {tid,successCallback,failedCallback}) {
  let cache = new StoreCache('vuex')
  let token = cache.get('login:token') || ''
  axios.get(`/v1/topic/${tid}/comments`, {headers:{'Authorization': token}}).then(res => {
    if (res.errCode === 0) {
      commit(types.INIT_COMMENTS, {
        comments: res.data
      })
      successCallback()
      return
    }
    failedCallback()
  })
}

export function getTimeline({commit}, {successCallback, failedCallback}) {
  let cache = new StoreCache('vuex')
  let token = cache.get('login:token') || ''
  let uid = cache.get('login:uid') || ''
  axios.get(`/v1/user/${uid}/dynamic`, {headers:{'Authorization': token}}).then(res => {
    if (res.errCode === 401000) {
      failedCallback()
    }
    console.log(res.errCode === 0)
    console.log(res)
    if (res.errCode === 0) {
      let timeline = res.data
      commit(types.INIT_TIMETIME, {
        timeline
      })
      successCallback()
    }
  })
}

export function autoLogin({commit}, {successCallback, failedCallback}) {
  console.log('auto login')
  let cache = new StoreCache('vuex')
  let email = cache.get('email') || ''
  let md5pwd = cache.get('password') || ''
  if (email === '' || md5pwd === '') {
    failedCallback()
    return
  }
  // 执行登陆逻辑
  inlogin({
    username: email,
    password: md5pwd,
    successCallback,
    failedCallback
  })
}

export function login({commit}, {username, password, successCallback, failedCallback}) {
  // 登陆操作
  inlogin({
    username,
    password: getmd5({
      str:password
    }),
    successCallback,
    failedCallback
  })
}

export function register({commit}, {nickname, password, mail, callback}) {
  var params = {
    nickname,
    password: getmd5({
      str: password
    }),
    email:mail
  }
  // 注册成功 路由到登陆界面
  axios.post('/v1/user/register', JSON.stringify(params), {headers:{'Content-Type':'application/json'}}).then(res => {
    console.log(res)
    if (res.errCode === 0) {
      console.log('注册成功')
      callback()
    }
  })
}

export function updateTimeline({commit}, { mid, type }) {
  commit(types.UPDATE_TIMETIME, {
    mid,
    type
  })
}

function getmd5({str}) {
  var md5 = crypto.createHash('md5')
  md5.update(str)
  return md5.digest('hex')
}

function inlogin({username, password, successCallback, failedCallback}) {
  var params = {
    username,
    password
  }
  axios.post('/v1/user/login', JSON.stringify(params), {headers:{'Content-Type':'application/json'}}).then(res => {
    if (res.errCode === 0) {
      let cache = new StoreCache('vuex')
      cache.set('login:email', username)
      cache.set('login:password', password)
      cache.set('login:uid', res.uid)
      cache.set('login:token', res.token)
      cache.set('login:nickname', res.nickname)
      successCallback()
      return
    }
    failedCallback()
  })
}

