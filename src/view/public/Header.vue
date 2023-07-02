<template>
  <header>
    <!--    背景图-->
    <div class="uk-position-fixed uk-position-top uk-position-z-index">
      <nav class="uk-navbar-container uk-navbar-transparent" uk-sticky="cls-active:uk-bg">
        <div class="uk-container uk-container-small">
          <div uk-navbar>
            <div class="uk-navbar-left">
              <div class="uk-navbar-item">
                <ul class="uk-navbar-nav">
                  <!--                    菜单按钮-->
                  <li><a uk-toggle="target: #left_menu">
                    <IconCategory></IconCategory>
                  </a></li>
                </ul>
              </div>
            </div>
            <div class="uk-navbar-right">
              <div class="uk-navbar-item">
                <ul class="uk-navbar-nav">
                  <!--                      通知-->
                  <li><a @click="searchFeed">
                    <IconListSearch></IconListSearch>
                  </a></li>
                  <!--                      我的-->
                  <li><a @click="userInfo">
                    <IconUserCircle></IconUserCircle>
                  </a>
                  </li>
                  <li v-if="userStore.isLogin"><a @click="logout">
                    <IconLogout></IconLogout>
                  </a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>

    </div>

    <div class="uk-section uk-height-medium uk-cover-container">
      <img :data-src="bg" src="" alt="" uk-img="loading: eager"
           data-uk-cover="">
      <div class="uk-overlay uk-overlay-primary uk-position-cover">
      </div>
    </div>
    <div class="uk-container uk-container-small">
      <div class="uk-position-relative">
        <div class="uk-position-right uk-text-right">
          <div class="uk-inline title">
            {{ title }}
          </div>
          <div class="uk-inline logo">
            <img class="uk-border-rounded uk-box-shadow-small" :data-src="ims" uk-img="loading: eager" src="" alt="">
          </div>
          <div>
            <p class="uk-text-muted subtitle">{{ subtitle }}</p>
          </div>
        </div>
      </div>
    </div>
  </header>
  <login></login>

  <el-dialog v-model="state.dialogTableVisible" :fullscreen="true" title="搜索">
    <n-input round v-model:value="state.Search" @input="searchUpdate" placeholder="搜索">
      <template #suffix>
        <IconSearch size="15"></IconSearch>
      </template>
    </n-input>
    <div class="uk-margin">
      <h6>博客{{state.feeds.websites.length}}</h6>
      <el-collapse accordion>
        <el-collapse-item v-for="(item, index) in state.feeds.websites" :title="item.title" :name="index">
          <div v-for="i in item.subscribes">
            <el-divider>
              <a class="uk-link uk-link-reset" :href="i.link" target="_blank">
                <h6 class="uk-margin-remove-bottom uk-text-bold">{{ i.title }}</h6>
              </a>
            </el-divider>

            <p class="uk-text-meta uk-margin-remove-top uk-text-small uk-inline" v-html="i.description">
            </p>

          </div>
        </el-collapse-item>
      </el-collapse>

    </div>

    <div class="uk-margin">
      <h6>订阅 {{state.feeds.subscribes.length}}</h6>
      <el-collapse accordion>
        <el-collapse-item v-for="(item, index) in state.feeds.subscribes" :title="item.title" :name="index">
          <a :href="item.link" target="_blank"><div v-html="item.description">
          </div></a>
        </el-collapse-item>
      </el-collapse>

    </div>
  </el-dialog>
</template>

<script setup>
import {IconCategory, IconListSearch, IconLogout, IconSearch, IconUserCircle} from '@tabler/icons-vue';
import UIkit from "uikit";
import Login from "../auth/Login.vue";
import {UserStore} from "../../store/index.js";
import {reactive, ref} from "vue";
import router from "../../router/index.js";
import {Logout} from "../../request/auth/index.js";
import {search} from "../../request/web/index.js";

const userStore = UserStore()
const ims = ref('src/assets/logo.jpg');

if (userStore.isLogin) {
  ims.value = userStore.avatar
}


const bg = 'https://picsum.photos/800/400/?random=2'
const title = userStore.name;
const subtitle = '半生飘摇惊回眸  一念转瞬负清秋'

const state = reactive({
  dialogTableVisible: false,
  Search: null,
  feeds: {
    subscribes:{},
    websites:{}
  }
})


const userInfo = () => {
  if (userStore.isLogin) {
    router.push({name: 'user'})
  } else {
    UIkit.modal(document.getElementById('userLogin')).show();
  }
}

const searchFeed = () => {
  state.dialogTableVisible = true
}

const logout = async () => {
  await Logout()
}

const searchUpdate = async () => {
    await search(state.Search).then(r => {
      console.log(r)
      state.feeds = r.data
    })
}


</script>

<style lang="less" scoped>
.uk-position-relative {
  top: -45px;
}

.uk-height-medium {
  height: 200px;
}

.logo {
  height: 60px;
  width: 60px;
}

.title {
  color: white;
  margin-right: 0.614rem;
  margin-bottom: 0.806rem;

}

.subtitle {
  font-size: 0.780rem;
  margin-top: 0.514rem;
}

.uk-bg {
  background: rgba(34, 34, 34, 0.09);
  backdrop-filter: blur(0.4rem);
}

</style>
