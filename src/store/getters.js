export default {
  singer(state){
    return state.singer
  },
  playing(state){
    return state.playing
  },
  fullScreen(state){
    return state.fullScreen
  },
  playList(state){
    return state.playList
  },
  sequenceList(state){
    return state.sequenceList
  },
  mode(state){
    return state.mode
  },
  currentIndex(state){
    return state.currentIndex
  },
  currentSong(state){
    return state.playList[state.currentIndex] || {}
  },
  disc(state){
    return state.disc
  },
  uniqueList(state){
    return state.uniqueList
  },
  searchHistory(state){
    return state.searchHistory
  },
  playHistory(state){
    return state.playHistory
  },
  favorite(state){
    return state.favorite
  }
}