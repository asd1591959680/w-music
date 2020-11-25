<template>
<div class="header">
  <div class="header-left"></div>
  <div class="header-center">
    <i class="img"></i>
    <p class="heade-text">Chicken Music</p>
  </div>
  <router-link to="/user" class="mine" tag="div">
  <i class="icon-mine"></i>
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
<style lang="stylus" scoped>
@import '~assets/stylus/variable.styl'
@import '~assets/stylus/mixin.styl'
  .header
    display flex
    align-items center
    justify-content center
    position relative
    height 44px
    z-index 1
    background-color $color-background
    .header-left
      
    .header-center
      display flex
      align-items center
      
      .img
        height 38px
        width 38px
        margin-right 10px
        bg-image('logo')
        background-repeat no-repeat
        background-size contain
      .heade-text
        font-size $font-size-large-x
        color $color-theme
    .mine
      position: absolute
      top: 0
      right: 0
      .icon-mine
        display: block
        padding: 12px
        font-size: 20px
        color: $color-theme
</style>