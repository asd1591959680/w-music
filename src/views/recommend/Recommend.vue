<template>
<div class="warpper" ref="warpper">
  <scroll class="content" :pull-up-load="true" ref="scroll" :data="hotlist">
    <swiper>
        <swiper-item v-for="(item,index) in banners" :key="index">
            <img :src="item.picUrl" alt="" @load="loadImg">
        </swiper-item>
    </swiper>
  <hot-list :hotlist="hotlist"></hot-list>
  </scroll>
</div>


</template>

<script>
  import {Swiper,SwiperItem} from "components/common/swiper"
  import {getBanner,getHotList} from 'network/recommend.js'
  import {playlistMixin} from 'common/mixin.js'
  import HotList from './childrenComp/HotList.vue'
  import Scroll from 'common/scroll/Scroll.vue'
export default {
  data() {
    return {
      banners:[],
      hotlist:[]
    }
  },
components: {
  Swiper,
  SwiperItem,
  HotList,
  Scroll
},
mixins: [playlistMixin],
created () {
  this._getBanner()
  this._getHotList()
},

methods: {
  _getBanner(){
    getBanner().then((res) => {
    this.banners = res.data
  })
  },
  _getHotList(){
    getHotList().then((res) => {
    this.hotlist = res.data.list
  })
  },
  
  loadImg(){
    if(!this.checkLoaded)
    {
      this.$refs.scroll.refresh()
      this.checkLoaded =true
    }
    
  },
  handlePlaylist(playList){
    if(playList[0]){
      this.$refs.scroll.$el.style.height = `calc(100% - 88px - 60px)`
      this.$refs.scroll.refresh()
    }
  },
}
}
</script>
<style lang="stylus" scoped>
.warpper
  height 100vh
  .content
    height calc(100% - 88px)
    overflow hidden
</style>