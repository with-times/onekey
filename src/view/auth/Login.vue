<template>
  <div id="userLogin" class="uk-flex-top" uk-modal>
    <div class="uk-modal-dialog uk-modal-body uk-margin-auto-vertical">
      <div class="uk-margin-bottom">
        <ul uk-tab="active:0">
          <li><a>登录</a></li>
          <li><a>注册</a></li>
        </ul>
        <ul class="uk-switcher">
          <li>
           <LoginComponent></LoginComponent>
          </li>
          <li>
            <RegComponent></RegComponent>
          </li>
        </ul>
      </div>

    </div>
  </div>

</template>

<script setup>
import LoginComponent from '../../components/auth/Login.vue'
import RegComponent from '../../components/auth/Reg.vue'


</script>

<style scoped>
.uk-tab > .uk-active > a {
  color: #ffffff;
  border-color: #ffffff;
}

.uk-tab::before {
  content: "";
  position: absolute;
  bottom: 0;
  left: 20px;
  right: 0;
  border-bottom: 0;
}

</style>
