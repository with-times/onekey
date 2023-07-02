<template>
  <section class="uk-section uk-section-secondary">
    <div class="uk-container uk-container-small uk-margin-bottom">
      <div class="uk-grid uk-grid-medium uk-flex uk-flex-middle" data-uk-grid>
        <div class="uk-width-expand">
          <h5 class="uk-margin-remove uk-text-bold">{{state.data.title}}</h5>
          <span class="uk-h6 uk-text-muted">{{state.data.site_message}}</span>
        </div>
        <div class="uk-width-auto">
          <div class="uk-inline">
            <a :href="state.data.url" target="_blank" class="uk-button uk-button-default">踩踩它</a>
          </div>
        </div>
      </div>
    </div>
    <div class="uk-container uk-container-small uk-margin-top">
      <ul uk-accordion="multiple: true, active: 0">
        <li v-for="item in state.deeds">
          <a class="uk-accordion-title" >{{item.created_at}}</a>
          <div class="uk-accordion-content">
            <p>{{item.content}}</p>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup>

import {getWebByNum} from "../../request/web/index.js";
import {useRoute} from "vue-router";
import {reactive} from "vue";
const route = useRoute()

const state = reactive({
  deeds:{},
  data:{}

})

const getWeb = async () => {
  await getWebByNum(route.params.num).then(r => {
    console.log(r.data)
    state.data = r.data
    state.deeds = r.data.deeds
  }).catch(e => {
    console.log(e)

  })
}
getWeb()

</script>

<style scoped>
.uk-section {
  padding-top: 100px;
}
.uk-margin-top {
  margin-top: 50px !important;
}
.uk-accordion-title{
  font-size: 15px;
}

.uk-button-default{
  border-radius: 25px;
}
</style>
