<template>
  <div id="addWeb" uk-modal>
    <div class="uk-modal-dialog uk-modal-body">
      <div class="uk-margin-bottom">
        <n-alert title="添加网站须知" :bordered="false" type="warning">
          如果您的网站开启了订阅，请直接输入您的订阅地址，且获取网站信息，如果网站信息正确，请点击添加网站即可，如果您的网站没有开启订阅，请手动添加
        </n-alert>
      </div>
      <div class="uk-margin-bottom">
        <n-space vertical>
          <n-input v-model:value="state.inputs.title" type="text" placeholder="网站标题" />
          <n-input v-model:value="state.inputs.url" type="text" placeholder="网站链接" />
          <n-input
              v-model:value="state.inputs.feedUrl"
              :input-props="{ type: 'url' }"
              placeholder="请输入您网站的订阅链接"
              :disabled="state.loading"
          />
          <n-input
              v-model:value="state.inputs.description"
              type="textarea"
              placeholder="网站介绍"
          />
        </n-space>

      </div>
      <el-button type="primary" @click="getWeb" :loading="state.loading">
        获取网站信息
      </el-button>
      <el-button type="primary" @click="addWeb" :loading="state.loading">
        添加网站
      </el-button>
    </div>
  </div>
</template>

<script setup>

import {useMessage} from 'naive-ui'
import {reactive, ref} from "vue";
import {createWebSite, getWebInfo} from "../../request/web/index.js";

const message = useMessage()

const state = reactive({
  inputs:{
    title:'',
    description: '',
    url: '',
    feedUrl: ''
  },
  loading:false
})

const getWeb = async () => {
  state.loading = true
  await getWebInfo(state.inputs.feedUrl).then(r => {
    state.loading = false
    console.log(r.data)
    state.inputs.url = r.data.url
    state.inputs.title = r.data.title
    state.inputs.description = r.data.description
    state.inputs.feedUrl = r.data.feed
  }).catch(e => {
    state.loading = false
    message.error(e.response.data.message)
  })
}
const addWeb = async () => {
  const web = {
    title:state.inputs.title,
    url:state.inputs.url,
    feedUrl:state.inputs.feedUrl,
    description:state.inputs.description
  };
  await createWebSite(web).then(r => {
    message.success(`添加${r.data.website.title}成功`)
    location.reload();
  }).catch(e => {
    message.error(e.response.data.message)
  })
}


</script>

<style scoped>

</style>
