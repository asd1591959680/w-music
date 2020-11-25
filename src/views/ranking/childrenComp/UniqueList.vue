<template>
  <transition name="slide">
    <music-list :title="title" 
    :bgImage="bgImage" :songs="songs" :rank="rank"/> 
  </transition>
</template>
<script>
import MusicList from 'content/musiclist/MusicList.vue'
import {mapGetters} from 'vuex'
import {Song} from 'network/singerList.js'
import {getTopList} from 'network/rank.js'
export default {
name: 'UniqueList',
components: {
  MusicList
},
data() {
return {
  songs:[],
  bgImage:'',
  rank:true
}
},
created() {
  this._getTopList()
},
computed: {
  ...mapGetters(['uniqueList']),
  title(){
    return this.uniqueList.label
  },
 

},
methods: {
  _getTopList(){
    if(!this.uniqueList.topId){
      this.$router.push('/ranking')
    }
    getTopList(this.uniqueList.topId).then((res) => {
      this.songs = this._noramlizeSongs(res.data.list)
      this.bgImage = this.songs[0].image
    })
  },
  _noramlizeSongs(list){
    let ret = []
    list.forEach((item) => {
      ret.push(new Song({
        id:item.id,
        mid:item.mid,
        singer:item.singer,
        name:item.name,
        album:item.albumMid,
        duration:item.interval,
        image:`https://y.gtimg.cn/music/photo_new/T002R300x300M000${item.albumMid}.jpg?max_age=2592000`,
      }))
    })
    return ret
  }
},
}
</script>
<style lang='stylus' scoped>
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)

</style>