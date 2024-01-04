<template>
    <div class="testPage" ref="testRef">
        <el-date-picker id="kkk" ref="datePickerRef" v-model="value1" @change="changeFun" type="datetimerange" range-separator="To"
            start-placeholder="Start date" end-placeholder="End date" />
    </div>
</template>
  
<script setup>

import { ref, onMounted, shallowRef } from 'vue'

const datePickerRef = shallowRef(null);
const testRef = shallowRef(null);
function changeFun(value) {
    console.log(value);
}
const value1 = ref('');
onMounted(async () => {
    console.log(testRef.value);
    console.log(testRef.value.querySelectorAll('span'));
});


</script>
<style lang="scss" scoped>
.testPage {
    box-sizing: border-box;
    padding: 2px;
}
</style>
  