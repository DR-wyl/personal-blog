<template>
    <div class="testPage">
        <div class="container">
            <we-swiper :list="list" :is-auto="true"></we-swiper>
            <!-- <el-carousel height="150px">
                <el-carousel-item v-for="v of list" :key="v">
                    <h3 class="small justify-center" text="2xl">
                        <img :src="v" />
                    </h3>
                </el-carousel-item>
            </el-carousel> -->
        </div>
    </div>
</template>
  
<script setup>
import WeSwiper from './WeSwiper.vue'
const list = ['https://picsum.photos/400/300?1', 'https://picsum.photos/400/300?2', 'https://picsum.photos/400/300?3', 'https://picsum.photos/400/300?4']
</script>
<style lang="scss" scoped>
.testPage {
    // width: 1790px;
    box-sizing: border-box;
    padding: 2px;

    .container {
        margin: 20px auto;
        width: 800px;
        height: 600px;
        box-shadow: 0px 0px 10px #ffffff;
        border-radius: 20px;
    }
}
</style>
  