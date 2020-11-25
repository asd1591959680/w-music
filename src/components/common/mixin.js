import {mapMutations, mapGetters, mapActions} from 'vuex'
import {playMode} from 'common/config.js'
import {shuffle} from 'common/utils.js'

//自适应迷你播放器高度
export const playlistMixin = {
  computed: {
    ...mapGetters([
      'playList'
    ])
  },
  methods: {
    handlePlaylist(){
      throw new Error('component must implement handlePlaylist method')
    },
    
  },
  mounted() {
    this.handlePlaylist(this.playList)
  },
  activated() {
    this.handlePlaylist(this.playList)
  },
  watch: {
    playList(newVal){
      this.handlePlaylist(newVal)
    }
  },

}

export const playingMixin = {
  computed: {
    iconMode(){
      return this.mode === playMode.sequence ? 'icon-sequence' : 
      this.mode === playMode.loop ? 'icon-loop':'icon-random'
    },
    ...mapGetters([
      'sequenceList',
      'currentSong',
      'mode',
      'playList',
      'favorite'
    
    ]),
  },
  methods: {
    changeMode(){
      const mode = (this.mode +1)%3
      this.SET_MODE(mode)
      let list = null
      if( mode === playMode.random){
        list = shuffle(this.sequenceList)
      }else{
        list = this.sequenceList
      }
      this.resetCurrentIndex(list)
      this.SET_PLAY_LIST(list)
      
    },
    resetCurrentIndex(list){
      let index = list.findIndex((item) => {
        return item.id === this.currentSong.id
      })
      this.SET_CURRENT_INDEX(index)
    },

    getFavorite(song){
      if(this.isFavorite(song)){
        return 'icon-favorite'
      }
        return 'icon-not-favorite'
    },
    toggleFavorite(song){
      if(this.isFavorite(song)){
        this.deleteFavorite(song)
      }else{
        this.saveFavorite(song)
      }

    },
    isFavorite(song){
      const index = this.favorite.findIndex((item) => {
        return item.id === song.id
      })
      return index > -1
    },
    ...mapMutations([
      'SET_PLAYING',
      'SET_CURRENT_INDEX',
      'SET_MODE',
      'SET_PLAY_LIST',
    ]),
    ...mapActions([
      'saveFavorite',
      'deleteFavorite'
    ])
  },
}

//search组件里的没删，留作参考方便
export const searchMixin = {
  data() {
    return {
      query:'',
      refreshDelay:100
    }
  },
  computed: {
    ...mapGetters(['searchHistory']),
  },
  methods: {
    selectItem(query){//给搜索框设置点击的query
      this.$refs.box.setQuery(query)
    },
    onQuery(query){
      this.query = query //返回搜索结果
    },
    blurInput(){
      this.$refs.box.blur()
    },
    saveSearch(){
      this.saveSearchHistory(this.query)//历史记录
    },
    ...mapActions([
      'saveSearchHistory',
      'deleteSearchHistory',
    ])
  },
}