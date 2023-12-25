<template>
    <div class="testPage">
        <div class="container">
            <we-swiper :list="list" :is-auto="true"></we-swiper>
        </div>
    </div>
</template>
  
<script setup>
import WeSwiper from './WeSwiper.vue'
const list = ['https://picsum.photos/400/300?1','https://picsum.photos/400/300?2','https://picsum.photos/400/300?3']
</script>
<style lang="scss" scoped>
.testPage {
    // width: 1790px;
    box-sizing: border-box;
    padding: 2px;
    .container{
        margin: 20px auto;
        width: 800px;
        height: 600px;
        box-shadow: 0px 0px 10px #ffffff;
        border-radius: 20px;
    }
}
</style>
  