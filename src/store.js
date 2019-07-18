import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

import router from './router'

Vue.use(Vuex)

const JWT_KEY = 'jwt'
const AUTH_HEADER = 'Authorization'

const request = axios.create({ baseURL: 'http://localhost:5000/' })

const setAuthHeader = (jwt) => {
  request.defaults.headers.common[AUTH_HEADER] = `Bearer ${jwt}`
}

const removeAuthHeader = () => {
  delete request.defaults.headers.common[AUTH_HEADER]
}

export default new Vuex.Store({
  state: {
    tweets: [],
    user: {},
    loginStatus: '',
    signupStatus: '',
    jwt: localStorage.getItem(JWT_KEY) || ''
  },
  mutations: {
    signupRequested (state) {
      state.signupStatus = 'requested'
    },

    signupCompleted (state) {
      state.signupStatus = 'complete'
    },

    signupFailed (state) {
      state.signupStatus = 'failed'
    },

    loginRequested (state) {
      state.loginStatus = 'requested'
    },

    loginCompleted (state, data) {
      state.jwt = data.jwt
      state.user = data.user
      state.loginStatus = 'complete'
    },

    loginFailed (state) {
      state.loginStatus = 'failed'
    },

    logout (state) {
      state.jwt = ''
      state.loginStatus = ''
      state.signupStatus = ''
    },

    tweetsFetched (state, data) {
      state.tweets = data
    },

    clearTweets (state) {
      state.tweets = []
    }
  },
  actions: {
    async initUser ({ commit, getters, state}) {
      try {
        if (getters.isAuthenticated) {
          setAuthHeader(state.jwt)
          const { data } = await request.get('/me')
          if (data.user) {
            commit('loginCompleted', data)
          }
        }
      } catch (error) {
        console.log(error)
      }
    },

    async signup ({ commit }, credentials) {
      try {
        commit('signupRequested')
        const { data } = await request.post('/signup', credentials)
        commit('signupCompleted')
        return data.user
      } catch (error) {
        commit('signupFailed', error)
        throw error
      }
    },

    async login ({ commit }, credentials) {
      try {
        commit('loginRequested')
        const { data } = await request.post('/login', credentials)

        setAuthHeader(data.jwt)
        localStorage.setItem(JWT_KEY, data.jwt)
        
        commit('loginCompleted', data)

        router.push('/board')
        return data.user
      } catch (error) {
        commit('loginFailed')
        localStorage.removeItem(JWT_KEY)
        throw error
      }
    },

    async logout ({ commit }) {
      commit('logout')
      localStorage.removeItem(JWT_KEY)
      removeAuthHeader()

      router.push('/login')
    },

    async fetchTweets ({ commit }, hashtags) {
      // commit('tweetsRequested')
      const params = { hashtags: hashtags.join(',') }
      const { data } = await request.get('/tweets', { params })

      commit('tweetsFetched', data.tweets)
    }
  },
  getters: {
    isAuthenticated: (state) => Boolean(state.jwt)
  }
})
