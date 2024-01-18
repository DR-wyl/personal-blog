<template>
    <div>加载完毕</div>
</template>
  
<script setup>
const res = await new Promise(r => setTimeout(r, 3000));
</script>