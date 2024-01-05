<template>
    <div class="testPage" ref="testRef">
       <input type="file" @change="fileChange">
        <img src="http://127.0.0.1:3000/1.jpg?1" alt="">
        <img :src="imgbse64" alt="">
    </div>
</template>
  
<script setup>
import {ref} from 'vue'
const imgbse64 = ref('')
function fileChange(e){
    let file = e.target.files[0];
    // console.log(file.size);
    let _slicBlob = new Blob([file]).slice(0, 300 * 1024);
    let _sliceFile = new File([_slicBlob], file.name, {type: file.type});
    let fr = new FileReader();
    fr.readAsDataURL(_sliceFile);
    fr.onload = function(e) {
        imgbse64.value = fr.result;
    }
}
</script>
<style lang="scss" scoped>
.testPage {
    box-sizing: border-box;
    // padding: 2px;
    img{
        width: 600px;
    }
}
</style>
  