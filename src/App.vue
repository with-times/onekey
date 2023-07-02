<template>
  <n-config-provider :locale="zhCN" :date-locale="dateZhCN" :theme="darkTheme">
    <n-message-provider>
  <HeaderVue></HeaderVue>
  <LeftMenuVue></LeftMenuVue>
      <div v-wechat-title="$route.meta.title">
  <router-view></router-view>
      </div>
  <FooterVue></FooterVue>
    </n-message-provider>
  </n-config-provider>
</template>

<script setup>
import HeaderVue from './view/public/Header.vue';
import LeftMenuVue from "./view/public/LeftMenu.vue";
import FooterVue from "./view/public/Footer.vue";
import {UserStore} from "./store/index.js";
import {user} from "./request/auth/index.js";
import {darkTheme, dateZhCN, zhCN} from "naive-ui";

const userStore = UserStore();

if (userStore.isLogin){
  user();
}
</script>

<style scoped>

</style>
