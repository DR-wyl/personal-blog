<script setup>
import { ref, defineProps, watch } from 'vue';
// const vInit = {
//     mounted(el) {
//         console.log(el);
//         console.log(getComputedStyle(el).width);
//     },
//     updated(el) {
//         // console.log('触发', el);
//     }
// }
const props = defineProps(['list']);
const index = ref(0);
const maxIndex = props.list.length - 1;

function toLeftItem() {
    index.value = index.value === 0 ? maxIndex : index.value - 1;
}
function toRightItem() {
    index.value = index.value === maxIndex ? 0 : index.value + 1;
}
function setIndex(data) {
    index.value = data;
}
// watch(index, (newVal) => { });
</script>

<template>
    <div class="box">
        <div class="img-assets"  :style="{
            left: -index * 800 + 'px'
        }">
            <img v-for="v of props.list" :src="v">
        </div>
        <div class="control">
            <div class="left-item" @click="toLeftItem">←</div>
            <div class="right-item" @click="toRightItem">→</div>
        </div>
        <div class="pointer-list">
            <div v-for="v of maxIndex + 1" :class="['item', index === v - 1 ? 'active-item' : '']" @click="setIndex(v - 1)">
            </div>
        </div>
    </div>
</template>
  

<style lang="scss" scoped>
$point-item-width: 10px;
$point-item-height: 10px;
$point-item-left-and-right-space: 5px;
$control-item-width: 30px;
$control-item-height: 30px;

.box {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;

    .img-assets {
        position: absolute;
        display: flex;
        height: 100%;
        left: 0;
        transition: left 0.5s;
    }

    .pointer-list {
        position: absolute;
        bottom: 20px;
        left: 50%;
        transform: translate(-50%, 0);
        display: flex;

        .item {
            margin: 0 $point-item-left-and-right-space;
            background-color: rgb(202, 210, 221);
            border-radius: 50%;
            width: $point-item-width;
            height: $point-item-height;
        }

        .item.active-item {
            background-color: rgb(15, 15, 15);
        }
    }

    .control {
        .left-item {
            background-color: rgb(23, 23, 23, .2);
            width: $control-item-width;
            height: $control-item-height;
            line-height: $control-item-height;
            text-align: center;
            border-radius: 50%;
            position: absolute;
            top: 50%;
        }

        .right-item {
            background-color: rgb(23, 23, 23, .2);
            width: $control-item-width;
            height: $control-item-height;
            line-height: $control-item-height;
            text-align: center;
            border-radius: 50%;
            position: absolute;
            top: 50%;
            right: 0;
        }
    }
}</style>
  