<template>
    <div class="testPage">
        <div id="main"></div>
    </div>
</template>
  
<script setup>
import * as echarts from 'echarts';
// import 'echarts-gl';
import { EChartInit } from '@/personalUtil/index'
import { onMounted } from 'vue';

let option;

option = {
    // x轴展示数据
    xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    //
    yAxis: {
        type: 'value'
    },
    series: [
        {
            data: [120, 200, 150, 80, 70, 110, 130],
            type: 'bar'
        }
    ]
};

onMounted(() => {
    EChartInit(echarts, {
        el: document.getElementById('main'),
        option,
        resizeObserver: true
    });
})
</script>
<style lang="scss">
.testPage {
    width: 1790px;

    #main {
        background-color: rgb(255, 255, 255);
        width: 600px;
        height: 550px;
    }
}
</style>
  