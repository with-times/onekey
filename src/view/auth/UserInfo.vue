<template>
  <section class="uk-section uk-section-secondary uk-section-small">
    <div class="uk-container uk-container-small">
      <div class="uk-placeholder uk-text-center">
        <a class="uk-link-muted" uk-toggle="target: #addWeb">添加网站</a>
      </div>
      <div class="uk-grid" uk-grid="">
        <div class="uk-width-2-3@m">
          <el-timeline>
            <el-timeline-item
                v-for="(activity, index) in activities"
                :key="index"
                :timestamp="activity.created_at"
                placement="top"
            >
              <div>
                <h6>
                  {{ activity.content }}
                </h6>
              </div>

            </el-timeline-item>
          </el-timeline>
        </div>
        <div class="uk-width-1-3@m">
          <h5 class="uk-text-bold"><span>我的网站</span></h5>

          <div class="uk-margin-bottom" v-for="item in state.mySite">
            <div class="uk-card uk-card-primary uk-card-small">
              <div class="uk-card-header">
                <div class="uk-grid-small uk-flex-middle" data-uk-grid>
                  <div class="uk-width-auto">
                    <img class="uk-border-circle" alt="" width="40" height="40"
                         :data-src="item.user.avatar" uk-img="">
                  </div>
                  <div class="uk-width-expand">
                    <h6 class="uk-margin-remove-bottom uk-text-bold">{{ item.title }}</h6>
                    <p class="uk-text-meta uk-margin-remove-top uk-text-small">
                      <time :datetime="item.created_at">{{ item.created_at }}</time>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AddWeb></AddWeb>

    </div>
  </section>
</template>

<script setup>

import {reactive, ref} from "vue";
import {getAll, getDeeds} from "../../request/web/index.js";
import {useMessage} from "naive-ui";
import {UserStore} from "../../store/index.js";

const activities = ref({})
const message = useMessage()
const state = reactive({
  webData: {
    state: 'active',
    orderBy: false,
    current_page: 1,
    last_page: null,
    per_page: 5,
    page: 1
  },
  mySite: {}
})
const deed = async () => {
  await getDeeds().then(r => {
    activities.value = r.data
  }).catch(e => {
    message.error(e.response.data.message)
  })
}
deed()

const getUserWeb = async () => {
  const data = {
    state: state.webData.state,
    orderBy: state.webData.orderBy,
    per_page: state.webData.per_page,
    page: state.webData.page,
    user_id: UserStore().id
  }
  await getAll(data).then(r => {
    console.log(r)
    state.mySite = r.data.data
  }).catch(e => {

  })
}
getUserWeb()


</script>

<style scoped>
.uk-section {
  padding-top: 100px;
}

.uk-dark {
  color: #1a1a1a;
}

.uk-card-primary {
  box-shadow: none;
  background-color: #393939;
  border-radius: 50px;


}
</style>
