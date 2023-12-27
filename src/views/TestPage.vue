<template>
    <div class="testPage">
        <div class="container">
            <!-- <we-swiper :list="list" :is-auto="true"></we-swiper> -->
            <input v-focus type="text">
            <a href="http://127.0.0.1:3000/files" download="a.mp4">下载</a>
        </div>
    </div>
</template>
  
<script setup>
// import WeSwiper from './WeSwiper.vue'
// const list = ['https://picsum.photos/400/300?1', 'https://picsum.photos/400/300?2', 'https://picsum.photos/400/300?3', 'https://picsum.photos/400/300?4']


import { weRequest } from '@/util/werequest';
async function init() {
    const res = await weRequest(
        {
            method: 'GET',
            url: '/files',
            responseType: 'blob',
            // setRequestHeader: { 'Content-Type': 'application/json' },
        }
    );
    // const res = await weRequest(
    //     {
    //         method: 'GET',
    //         url: '/mysqltest',
    //     }
    // );
    console.log(res);
}
init()
</script>
<style lang="scss" scoped>
.testPage {
    // width: 1790px;
    box-sizing: border-box;
    padding: 2px;

    // .container {
    //     margin: 20px auto;
    //     width: 800px;
    //     height: 600px;
    //     box-shadow: 0px 0px 10px #ffffff;
    //     border-radius: 20px;
    // }
}
</style>
  