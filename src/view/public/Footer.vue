<template>
  <footer class="uk-section uk-section-secondary uk-section-small">
    <div class="uk-container uk-container-small">
      <div class="uk-grid uk-grid-large" data-uk-grid>
        <div class="uk-width-1-1@m">
          <h5>OUR COMPANY</h5>
          <p>用一生的时间去抵达遥远的未来</p>
          <p>十年前是尊前客，月白风清，忧患凋零。</p>
          <div>
            <a href="" class="uk-icon-button" data-uk-icon="twitter"></a>
            <a href="" class="uk-icon-button" data-uk-icon="facebook"></a>
            <a href="" class="uk-icon-button" data-uk-icon="instagram"></a>
          </div>
        </div>
      </div>
    </div>
    <div class="uk-container uk-container-small">
      <p class="uk-text-small uk-padding uk-text-center">
        Copyright {{ date_y}} -
        <a class="uk-button-text uk-link-reset uk-text-meta" href="#">Created
        by {{by}}</a></p>
    </div>
<!--    <div class="uk-position-fixed uk-position-bottom">-->
<!--      <div class="uk-container uk-container-small">-->
<!--        <div class="uk-grid" uk-grid>-->
<!--          <div class="uk-width-expand">-->
<!--            aaa-->
<!--          </div>-->
<!--          <div class="uk-width-auto">-->
<!--            bbb-->
<!--          </div>-->
<!--        </div>-->

<!--      </div>-->
<!--    </div>-->
  </footer>



</template>

<script setup>
import {IconCircleArrowUpFilled} from '@tabler/icons-vue';
const by = '与时同行'
const date = new Date();
const date_y = date.getFullYear().toString();

</script>

<style scoped>


</style>
