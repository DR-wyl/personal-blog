<template>
    <button @click="printFun()">
        <slot name="default">
            打印
        </slot>
    </button>
</template>
  
<script setup>
import printJS from 'print-js';
const props = defineProps({
    // 要打印元素的ID值,传字符串进来
    printId: {
        default: 'testtable'
    }
})

async function printFun() {
    const style = '@page {margin:0 10mm};' //打印时去掉眉页眉尾
    printJS({
        printable: props.printId, // 标签元素id
        type: 'html',
        header: '',
        targetStyles: ['*'],
        scanStyles: true,
        //打印必须加上，不然页面上的css样式无效
        style
    });
}

</script>
  
<style lang="scss"></style>
  