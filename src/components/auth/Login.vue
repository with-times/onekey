<template>
  <div>
    <n-form
        ref="formRef"
        :show-label="false"
        :model="formValue"
        :rules="rules"
    >
      <n-form-item label="邮箱" path="email">
        <n-auto-complete v-model:value="formValue.email" :options="options" placeholder="邮箱"/>
      </n-form-item>
      <n-form-item label="密码" path="password">
        <n-input v-model:value="formValue.password" type="password"
                 show-password-on="mousedown" placeholder="密码"/>
      </n-form-item>
      <n-form-item label="记住密码">
        <n-checkbox v-model:checked="formValue.remember">记住密码</n-checkbox>
      </n-form-item>
      <n-button :loading="loading" attr-type="button" @click="logins">
        登录
      </n-button>
    </n-form>
  </div>
</template>

<script setup>

import {computed, ref} from "vue";
import {login} from "../../request/auth/index.js";
import {UserStore} from "../../store/index.js";
import {useMessage} from "naive-ui";
import Swal from "sweetalert2";

const userStore = UserStore()
const message = useMessage()
const formRef = ref(null)
const formValue = ref({
  email: '',
  password: '',
  remember: false
})
const loading = ref(false)

const rules = {
  email: {
    required: true,
    message: "请输入邮箱",
    trigger: "blur"
  },
  password: {
    required: true,
    message: "请输入密码",
    trigger: ["input", "blur"]
  }
}
const options = computed(() => {
  return [
    ["谷歌", "@gmail.com"],
    ["网易", "@163.com"],
    ["腾讯", "@qq.com"]
  ].map((emailInfo) => {
    return {
      type: "group",
      label: emailInfo[0],
      key: emailInfo[0],
      children: [formValue.value.email.split("@")[0] + emailInfo[1]]
    };
  });
})

const logins = async (e) => {
  e.preventDefault();
  formRef.value?.validate().then(() => {
    loading.value = true
    login(formValue.value.email, formValue.value.password, formValue.value.remember).then(r => {
      loading.value = false
      userStore.getInfoOrToken(r.data.user,r.data.access_token)
      Swal.fire({
        icon: 'success',
        text: '登录成功',
      }).then(() => {
        window.location.href = '/'
      })
    }).catch(e => {
      Swal.fire({
        icon: 'error',
        text: e.response.data.message,
      }).then(() => {
        loading.value = false
      })
    })
  }).catch(e => {
    message.error('请输入账号密码')
  });
}
</script>

<style scoped>

</style>
