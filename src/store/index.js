import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions.js'
import getters from './getters.js'
import mutations from './mutations.js'
import {playMode} from 'common/config.js'
import {loadSearch,loadPlay,loadFavorite} from 'common/cache.js'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    singer:{},
    playing:false,
    fullScreen:false,
    playList:[],
    sequenceList:[],
    mode:playMode.sequence,
    currentIndex:-1,
    disc:{},
    uniqueList:{},
    searchHistory:loadSearch(),//从本地存储读取数据
    playHistory:loadPlay(),
    favorite:loadFavorite()
  },
  mutations,
  actions,
  getters,
  modules:{}
})
