<template>
  <scroll class="suggest" :data="result" 
  :pull-up-load="true" @pullingUp="searchMore" 
  ref="scroll" :beforeScroll="true" @beforeScroll="listScroll">
    <ul class="suggest-list">
      <li  class="suggest-item" @click="selectItem(item)"
      v-for="(item,index) in result" :key="index">
        <div class="icon">
          <i class="icon-music"></i>
        </div>
        <div class="name">
          <p class="text" v-html="getDisplayName(item)"></p>
        </div>
      </li>
      <loading v-show="hasMore" />
    </ul>
    <div v-show="!hasMore && !result.length" class="no-result-wrapper">
      <no-result title='抱歉，暂无搜索结果' />
    </div>
    
  </scroll>
  
</template>

<script type="text/ecmascript-6">
import {getSearch,filterSinger} from 'network/search.js'
import {mapActions} from 'vuex'
import {Song} from 'network/singerList.js'

import Scroll from 'common/scroll/Scroll.vue'
import Loading from 'common/loading/Loading.vue'
import NoResult from 'common/no-result/NoResult.vue'
const pageSize = 20
const EVENT_SELECT = 'select'
  export default {
    name:'Suggest',
    props: {
      query:{
        type:String,
        default:''
      },
      searchType:{
        type:Number,
        default:0
      }
    },
    components: {
      Scroll,
      Loading,
      NoResult
    },

    data() {
      return {
        pageNo:1,
        result:[],
        hasMore:true
      }
    },
    methods: {
      _search(){
        this.pageNo = 1//query变化页码重置到1
        this.hasMore = true
        this.$refs.scroll.scrollTo(0,0)//query变化重置到顶部
        getSearch(this.query,this.pageNo,this.searchType,pageSize).then((res) => {
          if(!this.query){
            return 
          }
          this.result = this._noramlizeSongs(res.data.list)
          this._checkMore(res.data)
        })
      },
      getDisplayName(item){
        
        return `${item.name}-${filterSinger(item.singer)}`
      },
      searchMore(){//加载更多
        if(!this.hasMore){
          return
        }
        this.pageNo++
        getSearch(this.query,this.pageNo,this.searchType,pageSize).then((res) => {
          if(!this.query){
            return 
          }
          this.result = this.result.concat(this._noramlizeSongs(res.data.list))
          this._checkMore(res.data)
        })
        this.$refs.scroll.finishPullUp()
      },
      _checkMore(data){
        const song = data
        if(!song.list.length || song.pageNo * pageSize >= song.total){
          this.hasMore = false
        }
      },
      selectItem(item){
       this.insertSong(item)
       this.$emit(EVENT_SELECT)
      },
      _noramlizeSongs(list){
        let ret = []
        list.forEach((item) => {
          ret.push(new Song({
            id:item.songid,
            mid:item.songmid,
            singer:item.singer,
            name:item.songname,
            album:item.albummid,
            duration:item.interval,
            image:`https://y.gtimg.cn/music/photo_new/T002R300x300M000${item.albummid}.jpg?max_age=2592000`,
          }))
        })
      return ret
      },
      listScroll(){
        this.$emit('listScroll')
      },
      refresh(){
        this.$refs.scroll.refresh()
      },
      ...mapActions(['insertSong'])
    },

    watch: {
      query(){
        this._search() 
      },
      result(){
         this._noramlizeSongs(this.result)
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~assets/stylus/variable"
  @import "~assets/stylus/mixin"

  .suggest
    height: 100%
    overflow: hidden
    .suggest-list
      padding: 0 30px
      .suggest-item
        display: flex
        align-items: center
        padding-bottom: 20px
      .icon
        flex: 0 0 30px
        width: 30px
        [class^="icon-"]
          font-size: 14px
          color: $color-text-d
      .name
        flex: 1
        font-size: $font-size-medium
        color: $color-text-d
        overflow: hidden
        .text
          no-wrap()
    .no-result-wrapper
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>