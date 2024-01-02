<script setup>
/* 
    被引入说明
    <we-swiper :list="list" :is-auto="true"></we-swiper>
    const list = ['https://picsum.photos/400/300?1', 'https://picsum.photos/400/300?2', 'https://picsum.photos/400/300?3', 'https://picsum.photos/400/300?4']
*/
// 待完成，屏幕resize时的自适应
import { onMounted, onUnmounted, shallowRef, ref, defineProps } from 'vue';
const props = defineProps({
    list: {
        default: []
    },
    isAuto: {
        default: false
    }
});
const index = ref(1);
const maxIndex = props.list.length;
const imgAssets = shallowRef(null);
const box = shallowRef(null);
let boxWidth = 0;
let timeID;
const imgList = [...props.list];
imgList.unshift(imgList[imgList.length - 1]);
imgList.push(imgList[1]);

onMounted(() => {
    boxWidth = parseInt(getComputedStyle(box.value).width);
    // imgAssets.value.style.left = -index.value * boxWidth + 'px';
    imgAssets.value.style.transform = `translateX(${-index * boxWidth + 'px'})`
    console.log(boxWidth);
    if (props.isAuto) {
        timeID = setInterval(toRightItem, 3000);
    }
});
onUnmounted(() => {
    clearInterval(timeID);
});


function reStart() {
    if (!props.isAuto) return;
    clearInterval(timeID);
    timeID = setInterval(toRightItem, 3000)
}

function moveTo(index) {
    imgAssets.value.style.transition = "all 0.5s";
    // imgAssets.value.style.left = -index * boxWidth + 'px';
    imgAssets.value.style.transform = `translateX(${-index * boxWidth + 'px'})`
}
// 边界值处理
function BoundaryTreatment(index) {
    imgAssets.value.style.transition = "none";
    // imgAssets.value.style.left = -index * boxWidth + 'px';
    imgAssets.value.style.transform = `translateX(${-index * boxWidth + 'px'})`
    imgAssets.value.clientHeight; // 强制渲染
}
function toLeftItem() {
    reStart()
    if (index.value === 1) {
        index.value = maxIndex + 1;
        BoundaryTreatment(index.value);
        index.value = maxIndex;
    } else {
        index.value = index.value - 1;
    }
    moveTo(index.value);
}
function toRightItem() {
    reStart()
    if (index.value === maxIndex) {
        index.value = 0;
        BoundaryTreatment(index.value);
        index.value = 1;
    } else {
        index.value = index.value + 1;
    }
    moveTo(index.value);
}
function setIndexClick(data) {
    index.value = data;
    moveTo(data);
    reStart()
}

function setIndexEnter(data) {
    index.value = data;
    moveTo(data);
    clearInterval(timeID);
}

function setIndexLeave() {
    reStart()
}
</script>

<template>
    <div ref="box" class="box">
        <div ref="imgAssets" class="img-assets">
            <img v-for="v of imgList" :src="v">
        </div>
        <div class="control">
            <div class="left-item" @click="toLeftItem">←</div>
            <div class="right-item" @click="toRightItem">→</div>
        </div>
        <div class="pointer-list">
            <div v-for="v of maxIndex" :class="['item', index === v ? 'active-item' : '']" @click="setIndexClick(v)"
                @mouseenter="setIndexEnter(v)" @mouseleave="setIndexLeave(v)">
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
    border-radius: 20px;

    .img-assets {
        position: absolute;
        display: flex;
        height: 100%;
        // left: 0;
        // transition: left 0.5s;
    }

    .pointer-list {
        position: absolute;
        bottom: 20px;
        left: 50%;
        transform: translate(-50%, 0);
        display: flex;

        .item {
            margin: 0 $point-item-left-and-right-space;
            // background-color: rgb(202, 210, 221);
            border-radius: 50%;
            width: $point-item-width;
            height: $point-item-height;

            cursor: pointer;
            -webkit-backdrop-filter: blur(10px);
            backdrop-filter: blur(10px);
            border: solid 1px rgba(255, 255, 255, 0.6);
        }

        .item.active-item {
            background-color: rgb(255, 255, 255);
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
}
</style>
  