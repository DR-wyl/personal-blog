<template>
    <div class="menuDiv">
        <ul class="menu">
            <li class="firstLevel" v-for="item of props.modelValue" :key="props.modelValue">
                <span class="firstTitle" @click="showSubordinateList($event)">{{ item.label }}</span>
                <ul class="internalMenu" v-if="item.children.length !== 0">
                    <li v-for="innerItem of item.children"><span>{{ innerItem.label }}</span></li>
                </ul>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';
const props = defineProps({
    modelValue: {
        default: [
            {
                label: '一级标题1',
                children: [
                    { label: '二级标题1-1' },
                    { label: '二级标题1-2' },
                ]
            },
            {
                label: '一级标题2',
                children: [
                    { label: '二级标题2-1' },
                    { label: '二级标题2-2' },
                    { label: '二级标题2-3' },
                ]
            }
        ],
        type: Object
    }
});
// 展示下级列表
function showSubordinateList(event) {
    // event.target.classList.toggle('active');
    // 查其第一个下级菜单
    const targetElement_internalMenu = event.target.parentNode.querySelector('.internalMenu');
    // 讲下级菜单的data-set值与当前高度进行互换
    const CurrentHeight = targetElement_internalMenu.style.height;
    targetElement_internalMenu.style.height = targetElement_internalMenu.dataset.height;
    targetElement_internalMenu.dataset.height = CurrentHeight;
}
onMounted(() => {
    // 挂载时候将所有下级菜单隐藏，并且将其真实高度保存在data-set当中
    const internalMenus = document.querySelectorAll('.menu .firstLevel .internalMenu');
    [...internalMenus].forEach(item => {
        item.dataset.height = getComputedStyle(item).height;
        item.style.height = '0px';
    });
})
</script>
<style lang="scss" scoped>
ul,
li {
    list-style-type: none;
    padding: 0;
    margin: 0;
}

.menuDiv {
    max-width: 50vw;
    width: 100%;

    .menu {
        background-color: rgb(58, 66, 74);
        width: 100%;

        .firstLevel {

            .firstTitle.active {
                color: rgb(75, 168, 255);
            }

            .firstTitle {
                display: block;
            }

            .internalMenu {
                background-color: rgb(106, 115, 125);
                overflow: hidden;
                transition: all 1s;
            }
        }

    }
}
</style>
  