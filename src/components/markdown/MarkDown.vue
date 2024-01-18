<template>
    <div class="markedClass" v-html="mdHtml"></div>
</template>
  
<script setup>
import { marked } from "marked";
import { onMounted, ref, defineProps } from 'vue';
const props = defineProps({
    msg: {
        default: ''
    },
    fetchUrl: {
        default: ''
    }
});

const mdHtml = ref('');
async function init() {
    let markdown;
    if (props.msg) {
        markdown = props.msg;
    } else if (props.fetchUrl) {
        // http://127.0.0.1:3000/JS基础.md
        const res1 = await fetch(props.fetchUrl);
        markdown = await res1.text();
    } else {
        console.error('必须传值到MarkDown组件');
        return;
    }
    const html = marked(markdown);
    mdHtml.value = html;
}
onMounted(() => {
    init()
});

/* 
console.log(document.cookie);
function fun() {

  console.log(1);
  const time = new Date('2023-12-20').toUTCString();
  console.log(time);

  document.cookie = `name=jack;expires=${time}`;
  document.cookie = `age=10`;
  document.cookie = `size=30;max-age=10`;
  console.log(document.cookie);
}
console.log(process.env);
*/
</script>
  
<style lang="scss" scoped>
// @import "./drake-vue.css";
// @import "./drake-vue3.css";
.markedClass {
    overflow: scroll;
    max-height: 95vh;
    max-width: 95vw;
}
</style>
  