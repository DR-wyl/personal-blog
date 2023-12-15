<template>
    <div class="testPage">
        <p>你好</p>
        <p>世界</p>
    </div>
</template>
  
<script setup>
function a() {
    console.log(1);
    Promise.resolve().then(() => { console.log(2); })
}
setTimeout(() => { console.log(3); }, 0);
Promise.resolve().then(a);
console.log(5);
</script>
<style lang="scss">
.testPage {
    width: 1790px;
}
</style>
  