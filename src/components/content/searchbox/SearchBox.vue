<template>
  <div class="search-box">
    <i class="icon-search"></i>
    <input class="box" v-model="query" :placeholder="placeholder" ref="input" />
    <i v-show="query" class="icon-dismiss" @click="clear"></i>
  </div>
</template>

<script>
import {debouce} from 'common/utils.js'
export default {
props:{
  placeholder:{
    type:String,
    default:'搜索歌曲、歌手'
  }
},
components: {},
data() {
return {
  query:''
}
},
methods: {
  clear(){
    this.query = ''
  },
  setQuery(query){
    this.query = query
  },
  blur(){
    this.$refs.input.blur()//让input失去焦点
  }
},
created() {
  this.$watch('query',debouce((newQuery) => {
    this.$emit('query',(newQuery))
  },300))
},
}
</script>
<style lang='stylus' scoped>
  @import "~assets/stylus/variable"

  .search-box
    display: flex
    align-items: center
    box-sizing: border-box
    width: 100%
    padding: 0 6px
    height: 40px
    background: $color-highlight-background
    border-radius: 6px
    .icon-search
      font-size: 24px
      color: $color-background
    .box
      flex: 1
      margin: 0 5px
      line-height: 18px
      background: $color-highlight-background
      color: $color-text
      font-size: $font-size-medium
      
      &::placeholder
        color: $color-text-d
    .icon-dismiss
      font-size: 16px
      color: $color-background
</style>