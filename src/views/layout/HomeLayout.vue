<template>
    <div class="homeDiv">
        <div class="main">
            <h1>前端学习栈</h1>
            <div class="linkDiv">
                <router-link class="linkTo" :to="{ name: 'TestPage' }">测试页面</router-link>
                <router-link class="linkTo" :to="{ name: 'DetailPage' }">详情页面</router-link>
            </div>
        </div>
    </div>
</template>
  
<script setup></script>
<style lang="scss" scoped>
.homeDiv {

    .main {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        h1{
            font-size: 70px;
        }
        .linkDiv {
            display: flex;
            justify-content: space-around;
            align-items: center;
            // flex-direction: column;
            width: 100%;
            height: 100%;
            margin-top: 30px;

            /* background-color: #000000; */
            .linkTo {
                // color: #ffffff;
                padding: 10px;
                font-size: 30px;
                border: 1px solid rgb(213, 208, 208);
                border-radius: 3px;
                background-color: rgba(102, 85, 191, 0.798);
            }
        }
    }
}
</style>
  