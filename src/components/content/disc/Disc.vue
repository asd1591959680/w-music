<template>
  <transition name="slide">
    <music-list :title="title" :bgImage="bgImage" :songs="songs" /> 
  </transition>
</template>

<script>
import MusicList from '../musiclist/MusicList.vue'
import {mapGetters} from 'vuex'
import {getSongList,Song} from 'network/singerList.js'
export default {
  name:'Disc',
  components: {MusicList},
data() {
return {

 songs:[]
}
},
created () {
  this._getSongList()
},
computed: {
  ...mapGetters(['disc']),
 title(){
   return this.disc.title
 },
 bgImage(){
   return this.disc.cover
 }
},
methods: {
  _getSongList(){
    if(!this.disc.content_id){
      this.$router.push('/recommend')
      return
    }
    getSongList(this.disc.content_id).then((res) => {
      if(res.result === 100){
        this.songs = this._noramlizeSongs(res.data.songlist)
      }
    })
  },
  _noramlizeSongs(list){
    let ret = []
    list.forEach((item) => {
      ret.push(new Song({
        id:item.songid,
        mid:item.songmid,
        singer:item.singer,
        name:item.songname,
        album:item.albumid,
        duration:item.interval,
        image:`https://y.gtimg.cn/music/photo_new/T002R300x300M000${item.albummid}.jpg?max_age=2592000`,
      }))
    })
    return ret
  },
},
}
</script>
<style lang='stylus' scoped>
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)

</style>