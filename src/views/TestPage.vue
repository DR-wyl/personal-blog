<template>
    <div class="testPage" ref="testRef">
        <el-date-picker id="kkk" ref="datePickerRef" v-model="value1" @change="changeFun" type="datetimerange"
            range-separator="To" start-placeholder="Start date" end-placeholder="End date" />
        <br>
        <button @click="showDiv = !showDiv">togle</button>
        <button @click="fun">togle2</button>
        <!-- <div id="yyy" v-show="showDiv" style="height: 20px;width: 20px;background-color: blanchedalmond;"></div> -->
        <div id="yyy" v-if="showDiv" style="height: 20px;width: 20px;background-color: blanchedalmond;"></div>
    </div>
</template>
  
<script setup>

import { ref, onMounted, shallowRef } from 'vue'

const showDiv = ref(true);
const datePickerRef = shallowRef(null);
const testRef = shallowRef(null);
function changeFun(value) {
    console.log(value);
}
const value1 = ref('');
function fun(){
    document.getElementById('yyy').remove()
}
onMounted(async () => {
    console.log(testRef.value);
    console.log(testRef.value.querySelectorAll('span'));

    function createMutationObserver(targetNode, callback, config) {
        const observer = new MutationObserver(callback);
        config = config || { subtree: true, attributes: true };
        observer.observe(targetNode, config);
        return observer;
    }
    // createMutationObserver(document.querySelector('.testPage'), (mutationsList, observer) => {
    createMutationObserver(document.getElementById('yyy'), (mutationsList, observer) => {
        console.log(mutationsList,"111");
        console.log(observer);
        // observer.disconnect();
        return;
    });

});


</script>
<style lang="scss" scoped>
.testPage {
    box-sizing: border-box;
    padding: 2px;
}
</style>
  