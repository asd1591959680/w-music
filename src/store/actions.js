import {SET_SINGER,
  SET_PLAYING,
  SET_FULL_SCREEN,
  SET_PLAY_LIST,
  SET_SEQUENCE_LIST,
  SET_MODE,
  SET_CURRENT_INDEX,
  SET_SEARCH_HISTORY,
  SET_PLAY_HISTORY,
  SET_FAVORITE
  } from './mutations_type.js'
import {playMode} from 'common/config.js'
import {shuffle} from 'common/utils.js'
import {saveSearch,deleteSearch,clearSearch,savePlay,saveFavorite,deleteFavorite} from 'common/cache.js'
function findIndex(list,song){
  return list.findIndex((item) => {
    return item.id ===song.id
  })
}
  export default {
    selectPlay({commit,state},{list,index}){
      commit(SET_SEQUENCE_LIST,list)
      if(state.mode === playMode.random){
        let randomList = shuffle(list)//list还是原来顺序的list
        commit(SET_PLAY_LIST,randomList)
        index = findIndex(randomList,list[index])
      }else{
        commit(SET_PLAY_LIST,list)
      }
     
      commit(SET_CURRENT_INDEX,index)
      commit(SET_FULL_SCREEN,true)
      commit(SET_PLAYING,true)
    },
    randomPlay({commit},{list}){
      commit(SET_MODE,playMode.random)
      commit(SET_SEQUENCE_LIST,list)
      let randonList = shuffle(list)
      commit(SET_PLAY_LIST,randonList)
      commit(SET_CURRENT_INDEX,0)
      commit(SET_FULL_SCREEN,true)
      commit(SET_PLAYING,true)
    },

    insertSong({commit,state},song){
      let playList = state.playList.slice()
      let sequenceList = state.sequenceList.slice()
      let currentIndex = state.currentIndex
      //记录当前歌曲
      let currentSong = playList[currentIndex]
      //查找当前列表中是否有待插入歌曲并返回索引
      let fpIndex = findIndex(playList,song)
      //因为是插入歌曲，所以索引加1
      currentIndex++
      //插入这首歌到当前索引位置
      playList.splice(currentIndex,0,song)
      //如果包含了这首歌
      if(fpIndex > -1){
        //如果当前插入序号大于列表中序号
        if(currentIndex > fpIndex){
          playList.splice(fpIndex,1)
          currentIndex--
        }else{//小于
          playList.splice(fpIndex + 1,1)
        }
      }
      
      let currentSIndex = findIndex(sequenceList,currentSong) + 1
      let fsIndex = findIndex(sequenceList,song)
      sequenceList.splice(currentSIndex,0,song)
      if (fsIndex > -1){
        if(currentIndex > fpIndex){
          //如果当前插入序号大于列表中序号
          sequenceList.splice(fpIndex,1)
          currentIndex--
        }else{//小于
          sequenceList.splice(fpIndex + 1,1)
        }
      }
      commit(SET_PLAY_LIST,playList)
     
      commit(SET_SEQUENCE_LIST,sequenceList)
      commit(SET_CURRENT_INDEX,currentIndex)

      commit(SET_FULL_SCREEN,true)
      commit(SET_PLAYING,true)
    },
    deleteSong({commit,state},song){
      let playList = state.playList.slice()
      let sequenceList = state.sequenceList.slice()
      let currentIndex = state.currentIndex
      let pIndex = findIndex(playList,song)
      playList.splice(pIndex,1)
      let sIndex = findIndex(sequenceList,song)
      sequenceList.splice(sIndex,1)

      if(currentIndex > pIndex || currentIndex === playList.length){//边界处理
        currentIndex--
      }
      commit(SET_PLAY_LIST,playList)
      commit(SET_SEQUENCE_LIST,sequenceList)
      commit(SET_CURRENT_INDEX,currentIndex)
      const PlayList = playList.length > 0
      commit(SET_PLAYING,PlayList)
      
    },
    saveSearchHistory({commit},query){
      commit(SET_SEARCH_HISTORY,saveSearch(query))
    },
    deleteSearchHistory({commit},query){
      commit(SET_SEARCH_HISTORY,deleteSearch(query))
    },
    clearSearchHistory({commit}){
      commit(SET_SEARCH_HISTORY,clearSearch())
    },
    
    deleteList({commit}){
      commit(SET_PLAY_LIST,[])
      commit(SET_SEQUENCE_LIST,[])
      commit(SET_CURRENT_INDEX,-1)
      commit(SET_PLAYING,false)
    },
    savePlayHistory({commit},song){
      commit(SET_PLAY_HISTORY,savePlay(song))
    },

    saveFavorite({commit},song){
      commit(SET_FAVORITE,saveFavorite(song))
    },
    deleteFavorite({commit},song){
      commit(SET_FAVORITE,deleteFavorite(song))

    }
    
  }


