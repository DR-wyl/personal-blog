<template>
    <div ref="targetA" style="width: 600px;height: 400px;"></div>
</template>
  
<script setup>
import { EChartInit } from '@/personalUtil';
import * as echarts from 'echarts';
import { onMounted, ref } from 'vue';

const targetA = ref(null);

onMounted(() => {
    const options = {
        xAxis: {
            show: false,
            type: 'value',
            max: function (value) {
                return value.max * 1.2;
            }
        },
        yAxis: {
            type: 'category',
            data: ['华北', '东北', '华东', '中南', '西南', '西北'],
            inverse: true,
            // 轴线
            axisLine: {
                show: false
            },
            // 轴刻度
            axisTick: {
                show: false
            }
        },
        grid: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            containLabel: true

        },
        // 核心配置
        series: [
            {
                type: 'bar',
                data: [20, 30, 40, 50, 60, 70],
                showBackground: true,
                backgroundStyle: {
                    color: 'rgba(180,180,180,0.2)'
                },
                itemStyle: {
                    color: '#5D98CE',
                    barBorderRadius: 5,
                    shadowColor: 'rgba(0,0,0,0.3)',
                    shadowBlur: 5
                },
                barWidth: 12,
                labdel: {
                    show: true,
                    position: 'right',
                    textStyle: {
                        color: '#fff'
                    }
                }
            }

        ]
    }
    EChartInit(echarts, {
        el: targetA.value,
        option: options,
        onMounted: () => { },
        onError: () => { },
        resizeObserver: true
    });
});
</script>
<style lang="scss" scoped></style>
  