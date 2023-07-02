<template>
  <section class="uk-section uk-section-secondary">
    <div class="uk-container uk-container-small uk-margin-bottom">
      <div class="uk-grid uk-grid-medium uk-flex uk-flex-middle" data-uk-grid>
        <div class="uk-width-expand">
          <h5 class="uk-margin-remove uk-text-bold">rss预览</h5>
        </div>
      </div>
    </div>
    <div class="uk-container uk-container-small">
      <div class="uk-grid" uk-grid="">
        <div class="uk-width-1-1@m">
          <div class="uk-margin">

          </div>
          <article v-for="item in state.feeds"
                   class="uk-section uk-section-small uk-visible-toggle uk-padding-remove-top">
            <div class="uk-grid-small uk-flex-top" uk-grid>
              <div class="uk-width-auto">
                <img alt="" class="uk-border-rounded uk-box-shadow-hover-medium" height="40"
                     :src="item.user.avatar"
                     width="40">
              </div>
              <div class="uk-width-expand">
                <a class="uk-link uk-link-reset" :href="item.link" target="_blank">
                  <h6 class="uk-margin-remove-bottom uk-text-bold">{{ item.title }}</h6>
                </a>

                <p class="uk-text-meta uk-margin-remove-top uk-text-small uk-inline" v-html="item.description">
                </p>

                <div>
                  <span class="uk-label-tag">来自：{{ item.website.title }}</span>
                  <span class="uk-label-tag">发布时间：{{ item.last_modified }}</span>
                </div>
              </div>
            </div>
          </article>
          <div class="uk-flex uk-flex-center">
            <n-pagination v-model:page="state.feedConfig.current_page" :page-count="state.feedConfig.last_page"
                          :on-update:page="pageUpdate"
                          :page-slot="5"/>
          </div>
        </div>
      </div>
    </div>
  </section>

</template>

<script setup>

import {reactive} from "vue";
import {getAllFeeds} from "../../request/web/index.js";
import {useMessage} from "naive-ui";


const message = useMessage()

const state = reactive({
  feeds: {},
  feedConfig: {
    orderBy: true,
    current_page: 1,
    last_page: null,
    per_page: 10,
    page: 1
  },


})

const getFeed = async () => {
  await getAllFeeds(state.feedConfig).then(r => {

    state.feeds = r.data.data
    state.feedConfig.current_page = r.data.current_page
    state.feedConfig.last_page = r.data.last_page
  }).catch(e => {
    message.error(e.response.data.message)
  })
}

const pageUpdate = (r) => {
  state.feedConfig.page = r
  window.scrollTo({top: 0, behavior: 'smooth'});
  getFeed()

}
getFeed()


</script>

<style scoped>

.uk-section {
  padding-top: 100px;
}

.uk-margin-top {
  margin-top: 50px !important;
}

</style>
