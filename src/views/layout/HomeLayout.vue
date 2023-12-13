<template>
    <div class="homeDiv">
        <button @click="changeLocale">切换语言</button>
        <div class="main">
            <h1>{{ t('HomeLayout.title') }}</h1>
            <div class="linkDiv">
                <router-link class="linkTo" :to="{ name: 'TestPage' }">{{ t('HomeLayout.test') }}</router-link>
                <router-link class="linkTo" :to="{ name: 'DetailPage' }">{{ t('HomeLayout.detail') }}</router-link>
            </div>
        </div>
    </div>
</template>
  
<script setup>
import { useI18n } from 'vue-i18n'
const { t, locale } = useI18n();
const changeLocale = () => locale.value = locale.value === 'en' ? 'zh' : 'en';

</script>
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

        h1 {
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
  