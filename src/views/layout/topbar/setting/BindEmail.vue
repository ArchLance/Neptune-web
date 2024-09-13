<template>
    <div class="set">
      <h4>绑定邮箱</h4>
      <p>
        <span>已绑定邮箱：</span><span style="font-size: 25px;">{{userStore.userInfo.email}}</span>
      </p>
      <p>邮箱作为您身份验证的重要方式，请谨慎操作！</p>
      <p>
        <!-- <el-form ref="toBindFormRef" :rules="toBindRules" status-icon :model="toBind"
                 class="demo-form-inline"> -->
                <el-form ref="toBindFormRef" status-icon :model="state.toBind"
                 class="demo-form-inline">
          <el-row :gutter="20">
            <el-col :span="12" v-show="showGetCode && !showNewEmail">
              <el-form-item prop="code" style="width: 100%;">
                <el-input v-model="state.toBind.code" placeholder="请输入邮箱验证码">
                  <template #append>
                          <el-button type="primary" plain @click="getCode()" color="#2fa7b9" :disabled="!show">{{codeText}}</el-button>
                  </template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8"
                    v-show="showNewEmail && !showGetCode">
              <el-form-item prop="email" style="width: 100%;">
                <el-input v-model="state.toBind.email" placeholder="请输入新邮箱号" />
              </el-form-item>
            </el-col>
            <el-col :span="8"
                    v-show="showNewEmail && !showGetCode">
              <el-form-item prop="code2" style="width: 100%;">
                <el-input v-model="state.toBind.code2" placeholder="请输入新邮箱验证码">
                  <template #append>
                    <el-button type="primary" plain @click="getCode()" color="#2fa7b9" :disabled="!show">{{codeText}}</el-button>
                  </template>
                </el-input>
              </el-form-item>
            </el-col>
  
            <el-col  :span="6"
                    v-show="showNewEmail && !showGetCode">
              <el-form-item style="width: 100%;">
                <el-button plain color="#2fa7b9" @click="toBindSubmit">
                    提交
                </el-button>
              </el-form-item>
            </el-col>
  
            <el-col :span="12"
                    v-show="showGetCode && !showNewEmail">
              <el-form-item style="width: 100%;">
                <el-button plain color="#2fa7b9" @click="confirmCode">
                  确认更换
                </el-button>
              </el-form-item>
            </el-col>
            <el-col :span="24"
                    v-show="!showGetCode && !showNewEmail">
              <el-button plain color="#2fa7b9" @click="showGetCode = true"
                         style="margin-left: 0px;">更换绑定邮箱
              </el-button>
            </el-col>
          </el-row>
        </el-form>
      </p>
    </div>
  
  </template>
  
  <script setup lang="ts">
  import {ref,reactive,toRefs } from 'vue'
  import { useUserStore } from '@/store/models/user'
  import { ElMessage } from 'element-plus'
  import { sendEmailApi, verifyCodeApi, updateEmailApi } from '@/api/user/user'
  // updateEmailApi
  const state = reactive({
    toBind: {
      // 旧邮箱输入的验证码
      code: '',
      email: '',
      // 新邮箱输入的验证码
      code2: ''
    },
  })
  const userStore = useUserStore()
  // 获取验证码 点击后为禁止状态
  const show = ref(true)
  // 点击更改绑定邮箱 显示获取验证码框
  const showGetCode = ref(false)
  // 获取验证码文本
  const codeText = ref('获取验证码')
  
  // 获取邮箱验证码
  const getCode = async () => {
    // 点击后倒计时60秒
    if(!timer.value){
      count.value = TIME_COUNT
      show.value = false
      timer.value  = setInterval(() => {
        if (count.value > 0 && count.value <= TIME_COUNT) {
          count.value--;
          codeText.value = count.value + 's';
        } else {
          show.value = true;
          window.clearInterval(timer.value);
          timer.value = null;
          codeText.value = "重新获取";
        }
      }, 1000)
    }
    try{
      const { data } = await sendEmailApi(userStore.userInfo.email, userStore.token)
      if(data.code === 0){
        // 提示
        ElMessage({
          message: '验证码已经放送到您的邮箱，此验证码用于更换邮箱绑定，请勿将验证码告知他人，有效期3分钟，请妥善保管。~',
          type: 'success',
        })
      }
    }catch (error) {
        // 捕获loginApi中抛出的任何错误，包括超时  
        ElMessage.error('请求服务器超时') 
      }
  }
  // 时间计时器
  const timer = ref()
  // 获取验证码60秒倒计时
  const TIME_COUNT = 60
  // 当前秒数
  const count = ref(0)
  
  // 提交新邮箱验证码
  const showNewEmail = ref(false)
  const confirmCode = async () => {
  
    if(state.toBind.code!=''){
      // 验证用户输入的验证码是否正确
      const { data } = await verifyCodeApi(userStore.userInfo.email,state.toBind.code,userStore.token)
      if(data.code ===   0){
        // 显示新邮箱的输入框
        showNewEmail.value = true
        // 关闭旧邮箱验证码输入框
        showGetCode.value = false
        // 清除计时器
        show.value = true
        window.clearInterval(timer.value)
        timer.value = null
        codeText.value = "获取验证码"
        ElMessage.success("邮箱验证码验证成功")
      }else {
        ElMessage.error(data.msg)
      }
    }else {
      ElMessage.error('按要求进行更换邮箱绑定操作.')
      return false;
    }
  }
  
  // 提交邮箱更改绑定
  const toBindSubmit = async () => {
    if(state.toBind.code2 != ''){
      showNewEmail.value = false
      // 清除计时器
      show.value = true
      window.clearInterval(timer.value);
      timer.value = null;
      codeText.value = "获取验证码";
      const { data } = await updateEmailApi(state.toBind.email,state.toBind.code2,userStore.token)
      if(data.code === 0){
        // 提示
        ElMessage({
          message: '更换绑定邮箱成功~',
          type: 'success',
        })
      }else {
        ElMessage.error('验证码错误')
        return false;
      }
    }else {
      ElMessage.error('验证码为空，请输入验证码')
      return false;
    }
  }
  </script>
  
  <style scoped>
  
  </style>