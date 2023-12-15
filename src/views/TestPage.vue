<template>
    <div class="testPage">
        {{ title }}
        <br>
        <!-- <input v-focus type="text"> -->
        <button @click="fun($event)">修改</button>
        <input type="text" v-model="title">
        <button @click="copy()">复制</button>
    </div>
</template>
  
<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router'

const title = ref('hello World');

function useCopyContent(bool = true) {
    // bool 设为true使用异步，反之使用同步
    // 同步兼容性更好，异步的使用失败了会调起同步的
    function copyContent(content) {
        let inputDom = document.createElement('textarea');
        // 设置为只读，防止移动端手机上弹出软键盘  
        inputDom.setAttribute('readonly', 'readonly');
        inputDom.value = content;
        document.body.appendChild(inputDom);
        inputDom.select();
        // Input要在正常的编辑状态下原生复制方法才会生效
        const result = document.execCommand('copy')
        document.body.removeChild(inputDom);
        return result;
    }
    async function asyncCopyContent(content) {
        const text = content || '';
        try {
            // 由于旧版本无window.navigator.clipboard，采用报错形式捕捉
            await window.navigator.clipboard.writeText(text);
            return true;
        } catch (e) {
            return copyContent(text);
        }
    }
    return bool ? asyncCopyContent : copyContent;
}

function copy() {
    useCopyContent()(title.value)
}


function fun(e) {
    title.value = 'hello';
    console.log(e.target.remove());
}
const route = useRoute();
console.log(route.matched);
</script>
<style lang="scss">
.testPage {
    width: 1790px;
}
</style>
  