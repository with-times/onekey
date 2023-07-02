<template>

  <section class="uk-section uk-section-secondary">
    <div class="uk-container uk-container-small">
      <div class="uk-grid" uk-grid="">
        <div class="uk-width-2-3@m">
          <Select :web-list="state.webList"
                  :web-data="state.webData"
                  :page-update="pageUpdate"
                  :web-data-update="webDataUpdate"
          ></Select>
        </div>
        <div class="uk-width-1-3@m">
          <h5 class="uk-heading-line uk-text-bold"><span>最近更新</span></h5>
          <div class="uk-margin-bottom">
            <template v-for="item in state.feeds">
              <a :href="item.link">
                <span class="uk-label-tag"># {{item.title}}</span>
              </a>
            </template>


          </div>

        </div>
      </div>
    </div>
  </section>
</template>


<script setup>
import {reactive} from 'vue'
import {getAll, getAllFeeds} from "../../request/web/index.js";
import Select from "./Select.vue";
import {useMessage} from "naive-ui";

const message = useMessage()
const state = reactive({
  webList: {},
  webData: {
    state: 'active',
    orderBy: true,
    current_page: 1,
    last_page: null,
    per_page: 5,
    page: 1
  },
  feeds: {},
  feedConfig: {
    orderBy: true,
    current_page: 1,
    last_page: null,
    per_page: 10,
    page: 1
  }
})
const webDataUpdate = (value) => {
  state.webData.orderBy = value
  getWeb()
}
const pageUpdate = (r) => {
  state.webData.page = r
  getWeb()
}

const getWeb = async () => {
  const data = {
    state: state.webData.state,
    orderBy: state.webData.orderBy,
    per_page: state.webData.per_page,
    page: state.webData.page
  }
  await getAll(data).then(r => {
    state.webList = r.data.data
    state.webData.current_page = r.data.current_page
    state.webData.last_page = r.data.last_page
  })
}


const getFeed = async () => {
  await getAllFeeds(state.feedConfig).then(r => {
    state.feeds = r.data.data
    state.feedConfig.current_page = r.data.current_page
    state.feedConfig.last_page = r.data.last_page
  }).catch(e => {
    message.error(e.response.data.message)
  })
}
getWeb()
getFeed()


</script>

<style scoped>
.uk-section {
  padding-top: 100px;
}

.uk-text-small {
  font-size: x-small;
}

.uk-width-data {
  width: 30%;
  margin-left: 10px;
}

</style>
