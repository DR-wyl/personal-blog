<script setup>
import { onMounted, shallowRef, ref, defineProps } from 'vue';
const props = defineProps(['list']);
const index = ref(1);
const maxIndex = props.list.length;
const imgAssets = shallowRef(null);

onMounted(() => {
    imgAssets.value.style.left = -index.value * 800 + 'px';
});


const imgList = [...props.list];
imgList.unshift(imgList[imgList.length - 1]);
imgList.push(imgList[1]);

function moveTo(index) {
    imgAssets.value.style.transition = "left 0.5s";
    imgAssets.value.style.left = -index * 800 + 'px';
}
// 边界值处理
function BoundaryTreatment(index) {
    imgAssets.value.style.transition = "none";
    imgAssets.value.style.left = -index * 800 + 'px';
    imgAssets.value.clientHeight; // 强制渲染
}
function toLeftItem() {
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
    if (index.value === maxIndex) {
        index.value = 0;
        BoundaryTreatment(index.value);
        index.value = 1;
    } else {
        index.value = index.value + 1;
    }
    moveTo(index.value);
}
function setIndex(data) {
    index.value = data;
}

</script>

<template>
    <div class="box">
        <div ref="imgAssets" class="img-assets">
            <img v-for="v of imgList" :src="v">
        </div>
        <div class="control">
            <div class="left-item" @click="toLeftItem">←</div>
            <div class="right-item" @click="toRightItem">→</div>
        </div>
        <div class="pointer-list">
            <div v-for="v of maxIndex" :class="['item', index === v ? 'active-item' : '']" @click="setIndex(v)">
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
}
</style>
  