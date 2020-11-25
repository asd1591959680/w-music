<template>
<div id="tab-bar">
  <router-link tag="div" class="tab-item" to="/recommend">
    <span class="tab-link">推荐</span>
  </router-link>
  <router-link tag="div" class="tab-item" to="/singer">
    <span class="tab-link">歌手</span>
  </router-link>
  <router-link tag="div" class="tab-item" to="/ranking">
   <span class="tab-link">排行</span>
  </router-link>
  <router-link tag="div" class="tab-item" to="/search">
    <span class="tab-link">搜索</span>
  </router-link>
</div>
</template>

<script>

export default {
components: {},
data() {
return {

}
},
}
</script>
<style lang='stylus' scoped>
@import '~assets/stylus/variable.styl'
#tab-bar
  display flex
  align-items center
  justify-content space-around
  font-size: $font-size-medium
  height 44px
  position relative
  z-index 1
  background-color $color-background
  .tab-item
    .tab-link
      padding-bottom: 5px
      color: $color-text-l
    &.router-link-active
      .tab-link
        color: $color-theme
        border-bottom: 2px solid $color-theme
</style>