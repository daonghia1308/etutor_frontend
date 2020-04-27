import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        user: []
    },
    getters: {
        user(state) {
            return state.user
        }
    },
    mutations: {
        fetchUser(state, u) {
            state.user.push(u)
        }
    },
    actions: {
        fetchUser: ({ commit }, u) => {
            commit("fetchUser", u)
        }
    }
})