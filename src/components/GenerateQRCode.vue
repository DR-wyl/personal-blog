<template>
    <canvas ref="canvasRef" class="canvasQRCode"></canvas>
</template>
  
<script setup>
import QRCode from 'qrcode';
import { onMounted, ref, defineProps } from 'vue';

const canvasRef = ref(null);
const props = defineProps({
    url: {
        default: 'http://www.ban-cheng.top'
    },
    size: {
        default: 70
    },
    unit: {
        default: 'px'
    }
});

onMounted(() => {
    QRCode.toCanvas(canvasRef.value, props.url, function (error) {
        if (error) console.error(error)
        console.log('success!');
    });
    canvasRef.value.style.height = props.size + props.unit;
    canvasRef.value.style.width = props.size + props.unit;
});

/* async function createImgQRCode() {
    try {
        const url = await QRCode.toDataURL('http://www.ban-cheng.top');
        console.log(url);
        // 将url设为某个img标签的src属性即可进行显示
    } catch (err) {
        console.error(err)
    }
} */
</script>
  
<style scoped></style>
  