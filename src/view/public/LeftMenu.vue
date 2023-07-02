<template>
  <div id="left_menu" uk-offcanvas="overlay: true; mode: push">
    <div class="uk-offcanvas-bar">
      <div class="uk-position-relative uk-position-center">
        <ul class="uk-nav uk-nav-default">
          <li><router-link class="uk-links" to="/"><IconHome2 :size="20" class="uk-margin-small-right"/>首页</router-link></li>
          <li><router-link class="uk-links" to="/feed"><IconList :size="20" class="uk-margin-small-right"/>订阅</router-link></li>
<!--          <li><router-link class="uk-links" to="/link"><IconLink :size="20" class="uk-margin-small-right"/>友链</router-link></li>-->
          <li><router-link class="uk-links" to="/about"><IconBox :size="20" class="uk-margin-small-right"/>关于</router-link></li>
        </ul>
      </div>
      <div class="uk-text-center">
        <div class="uk-position-bottom-center uk-position-small">
          <div class="uk-flex uk-flex-center uk-grid uk-grid-small uk-margin-bottom" uk-grid>
            <div class="uk-first-column">
              <a href="" class="uk-icon-button" uk-icon="github"></a>
            </div>
            <div class="uk-first-column">
              <a href="" class="uk-icon-button" uk-icon="google"></a>
            </div>
            <div class="uk-first-column">
              <a href="" class="uk-icon-button" uk-icon="discord"></a>
            </div>
          </div>
<!--          <span class="uk-text-small uk-text-center">© 2022 | <a href="" title="">Created by ONE-KEYS</a></span>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { IconHome2, IconList, IconLink, IconBox } from '@tabler/icons-vue';

</script>

<style scoped>
.uk-links{
  display: flex;
  margin: 10px 0;
  border-radius: 25px;
  width: auto;
  padding: 5px 30px 5px 30px;
  transition: background 0.3s ease-in-out; /* 过渡效果 */
}
.uk-links:hover{
  background: #303030;
}
.uk-offcanvas-bar .uk-nav-default > li > a {
  color: #e1e1e1;
}

.uk-margin-small-right{
  margin-right: 5px !important;
}

.uk-active{
  background: #303030;
}


</style>
