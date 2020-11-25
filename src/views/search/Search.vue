<template>
<div class="search">
  <div class="search-box-wrapper">
    <search-box ref="box" @query="onQuery"></search-box>
  </div>
  <div class="shortcut-wrapper" v-show="!query" ref="wrapper">
    <scroll class="shortcut" :data="shortConcat" 
    :pull-up-load="true" ref="scroll" :refreshDelay="refreshDelay">
      <div>
        <div class="hot-key">
          <h1 class="title">热门搜索</h1>
          <ul>
            <li @click="selectItem(item.k)" class="item" v-for="(item,index) in hotKey" :key="index">
              <span>{{item.k}}</span>
            </li>
          </ul>
        </div>
        <div class="search-history" v-show="searchHistory.length">
          <h1 class="title">
            <span class="text">搜索历史</span>
            <span class="clear" @click="showConfirm">
              <i class="icon-clear"></i>
            </span>
          </h1>
          <search-list :searches="searchHistory" 
          @selectItem="selectItem" @deleted="deleteOne">
          </search-list>
        </div>
      </div>
     
    </scroll>
  </div>
  <div class="search-result" v-show="query.length > 0" ref="result">
    <suggest @select="saveSearch" ref="suggest"
    :query="query" @listScroll="blurInput" />
  </div>
  <confirm ref="confirm" @clear="clearSearchHistory" 
  title='是否清空所有历史' />
</div>
</template>

<script>
import SearchBox from 'content/searchbox/SearchBox.vue'
import Suggest from 'content/suggest/Suggest.vue'
import SearchList from 'content/searchlist/SearchList.vue'
import Scroll from 'common/scroll/Scroll.vue'
import {getSearchHot} from 'network/search.js'
import {playlistMixin} from 'common/mixin.js'
import {mapActions,mapGetters} from 'vuex'
import Confirm from 'common/confirm/Confirm.vue'
export default {
  name:'Search',
components: {
  SearchBox,
  Suggest,
  SearchList,
  Confirm,
  Scroll
},
  computed: {
    ...mapGetters(['searchHistory']),
    shortConcat(){
      return this.hotKey.concat(this.searchHistory)
    }
  },
data() {
return {
  hotKey:[],
  query:'',
  refreshDelay:100
}
},
mixins: [playlistMixin],
methods: {
  _getSearchHot(){
    getSearchHot().then((res => {
      this.hotKey = res.data.slice(0,10)//拷贝前10条

    }))
  },
  selectItem(query){
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
  deleteOne(item){
    this.deleteSearchHistory(item)
  },
  showConfirm(){
    this.$refs.confirm.show()
  },
  handlePlaylist(playList){
    const bottom = playList.length > 0 ? '60px' : ''
    this.$refs.wrapper.style.bottom = bottom
    this.$refs.scroll.refresh()
    this.$refs.result.style.bottom = bottom
    this.$refs.suggest.refresh()
  },
  ...mapActions(
    [
    'saveSearchHistory',
    'deleteSearchHistory',
    'clearSearchHistory'
    ])
},
created() {
  this._getSearchHot()
},
watch: {
  query(newQuery){
    //从搜索列表到搜索界面时
    if(!newQuery){
      setTimeout(() => {
        this.$refs.scroll.refresh()
      },20)
      
    }
  }
},
}
</script>
<style scoped lang='stylus'>
  @import "~assets/stylus/variable"
  @import "~assets/stylus/mixin"

  .search
    .search-box-wrapper
      margin: 20px
    .shortcut-wrapper
      position: fixed
      top: 178px
      bottom: 0
      width: 100%
      .shortcut
        height: 100%
        overflow: hidden
        .hot-key
          margin: 0 20px 20px 20px
          .title
            margin-bottom: 20px
            font-size: $font-size-medium
            color: $color-text-l
          .item
            display: inline-block
            padding: 5px 10px
            margin: 0 20px 10px 0
            border-radius: 6px
            background: $color-highlight-background
            font-size: $font-size-medium
            color: $color-text-d
        .search-history
          position: relative
          margin: 0 20px
          
          .title
            display: flex
            align-items: center
            height: 40px
            font-size: $font-size-medium
            color: $color-text-l
            .text
              flex: 1
            .clear
              extend-click()
              .icon-clear
                font-size: $font-size-medium
                color: $color-text-d
    .search-result
      position: fixed
      width: 100%
      top: 178px
      bottom: 0
      
</style>