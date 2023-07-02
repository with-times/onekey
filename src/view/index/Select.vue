<template>
  <div class="uk-margin-bottom">
    <n-checkbox
        checked-value="false"
        unchecked-value="true"
        @update:checked="state.webDataUpdate"
    >
      倒序
    </n-checkbox>
  </div>
  <div v-if="state.webList.length">
    <article v-for="item in state.webList"
             class="uk-section uk-section-small uk-visible-toggle uk-padding-remove-top">
      <div class="uk-grid-small uk-flex-top" uk-grid>
        <div class="uk-width-auto">
          <img alt="" class="uk-border-rounded uk-box-shadow-hover-medium" height="40"
               :src="item.user.avatar"
               width="40">
        </div>
        <div class="uk-width-expand">
          <a class="uk-link uk-link-reset" @click="router.push({name:'web',params:{num:item.site_number}})">
           <h6 class="uk-margin-remove-bottom uk-text-bold">{{ item.title }}</h6>
          </a>

          <p class="uk-text-meta uk-margin-remove-top uk-text-small uk-inline">
            {{ item.site_message }}
          </p>

          <div>
            <span class="uk-label-tag">站长：{{ item.user.name }}</span>
            <span class="uk-label-tag">{{ item.url }}</span>
          </div>
        </div>
      </div>
    </article>
    <div class="uk-flex uk-flex-center">
      <n-pagination v-model:page="state.webData.current_page" :page-count="state.webData.last_page"
                    :on-update:page="state.pageUpdate"
                    :page-slot="5"/>
    </div>
  </div>
  <div v-else>
    <n-empty description="这里什么也没有">
      <template #extra>
      </template>
    </n-empty>
  </div>
</template>

<script setup>

import {useRouter} from "vue-router";

const router = useRouter()

const state = defineProps({
  webDataUpdate:Function,
  pageUpdate:Function,
  webList:Object,
  webData:Object,
})



</script>

<style scoped>

</style>
