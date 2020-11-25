import {SET_SINGER,
  SET_PLAYING,
  SET_FULL_SCREEN,
  SET_PLAY_LIST,
  SET_SEQUENCE_LIST,
  SET_MODE,
  SET_CURRENT_INDEX,
  } from './mutations_type.js'

export default {
  SET_SINGER(state,singer){
    state.singer = singer
  },
  SET_PLAYING(state,flag){
    state.playing = flag
  },
  SET_FULL_SCREEN(state,flag){
    state.fullScreen = flag
  },
  SET_PLAY_LIST(state,list){
    state.playList = list
  },
  SET_SEQUENCE_LIST(state,list){
    state.sequenceList = list
  },
  SET_MODE(state,mode){
    state.mode = mode
  },
  SET_CURRENT_INDEX(state,index){
    state.currentIndex = index
  },
  SET_DISC(state,disc){
    state.disc = disc
  },
  SET_UNIQUELIST(state,list){
    state.uniqueList = list
  },
  SET_SEARCH_HISTORY(state,list){
    state.searchHistory = list
  },
  SET_PLAY_HISTORY(state,list){
    state.playHistory = list
  },
  SET_FAVORITE(state,list){
    state.favorite = list
  }
}