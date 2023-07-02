<template>
  <div>
    <n-form
        ref="formRef"
        :show-label="false"
        :model="formValue"
        :rules="rules"
    >
      <n-form-item label="用户名" path="name">
        <n-input v-model:value="formValue.name" type="text" placeholder="用户名"/>
      </n-form-item>
      <n-form-item label="邮箱" path="email">
        <n-auto-complete v-model:value="formValue.email" :options="options" placeholder="邮箱"/>
      </n-form-item>
      <n-form-item label="密码" path="password">
        <n-input v-model:value="formValue.password" type="password"
                 first
                 show-password-on="mousedown" placeholder="密码"/>
      </n-form-item>
      <n-form-item label="确认密码" path="reenteredPassword">
        <n-input v-model:value="formValue.reenteredPassword" type="password"
                 :disabled="!formValue.password"
                 @keydown.enter.prevent
                 show-password-on="mousedown" placeholder="确认密码"/>
      </n-form-item>
      <n-form-item label="同意服务条款">
        <n-checkbox v-model:checked="formValue.agree">同意服务条款</n-checkbox>
      </n-form-item>
      <n-button :loading="loading" attr-type="button" @click="regs">
        注册
      </n-button>
    </n-form>
  </div>
</template>

<script setup>

import {computed, ref} from "vue";
import {reg} from "../../request/auth/index.js";
import {UserStore} from "../../store/index.js";
import {useMessage} from "naive-ui";
import Swal from "sweetalert2";

const userStore = UserStore()
const message = useMessage()
const formRef = ref(null)
const formValue = ref({
  name: '',
  email: '',
  password: '',
  reenteredPassword: '',
  agree: false,

})
const loading = ref(false)

const rules = {
  name: {
    required: true,
    message: "请输入用户名",
    trigger: "blur"
  },
  email: {
    required: true,
    message: "请输入邮箱",
    trigger: "blur"
  },
  password: {
    required: true,
    message: "请输入密码",
    trigger: ["input", "blur"]
  },
  reenteredPassword: [
    {
      required: true,
      message: "请再次输入密码",
      trigger: ["input", "blur"]
    },
    {
      validator: validatePasswordStartWith,
      message: "两次密码输入不一致",
      trigger: "input"
    },
    {
      validator: validatePasswordSame,
      message: "两次密码输入不一致",
      trigger: ["blur", "password-input"]
    }
  ]
}

function validatePasswordStartWith(rule, value) {
  return !!formValue.value.password && formValue.value.password.startsWith(value) && formValue.value.password.length >= value.length;
}
function validatePasswordSame(rule, value) {
  return value === formValue.value.password;
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

const regs = async (e) => {
  e.preventDefault();
  formRef.value?.validate().then(() => {
    if (formValue.value.agree){
      loading.value = true
      reg(formValue.value.name,formValue.value.email, formValue.value.password, formValue.value.reenteredPassword).then(r => {
        loading.value = false
        console.log(r)
        userStore.getInfoOrToken(r.data.user, r.data.access_token)
        Swal.fire({
          icon: 'success',
          text: '注册成功',
        }).then(() => {
          window.location.href = '/'
        })
      })
    }else {
      message.error('请勾选用户协议')
    }
   }).catch(e => {
    message.error('请输入账号密码')
  });
}
</script>

<style scoped>

</style>
