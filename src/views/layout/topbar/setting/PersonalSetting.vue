<template>
  <el-row :gutter="20">
    <!--左侧信息 start-->
    <el-col :span="18">
      <div class="left_box">
        <h3 class="title">
          <el-icon style="margin-right: 10px;">
            <User />
          </el-icon>
          个人信息设置
        </h3>

        <!--基本设置 start-->
        <div class="set">
          <h4>基础设置</h4>
          <el-form ref="basicFormRef" :rules="basicRules" status-icon :model="basic">
            <el-row :gutter="20">
              <!-- 用户名 -->
              <el-col :span="8">
                <el-form-item prop="username" label="用户名" style="width: 100%;">
                  <el-input v-model="basic.username" placeholder="请输入用户名" />
                </el-form-item>
              </el-col>
              <!--用户账号-->
              <el-col :span="8">
                <el-form-item prop="account" label="账号" style="width: 100%;">
                  <el-input v-model="basic.account" placeholder="请输入账号" />
                </el-form-item>
              </el-col>
              <!--头像-->
              <el-col :span="5">
                <el-form-item label="头像：" style="margin: auto;">
                  <!-- name是后端接收的参数名 -->
                  <!-- 建议重写action -->
                  <el-upload class="avatar-uploader" :headers="headers" :data="userId" :action="baseURL + uploadURL"
                    name="imgfile" :show-file-list="false" :on-success="handleAvatarSuccess">
                    <img v-if="basic.avatar" :src="avatar" style="width: 50px;border-radius: 50px;" />
                    <img v-else src="@/assets/default_avatar.png" style="width: 50px;border-radius: 50px;" />
                  </el-upload>
                </el-form-item>
              </el-col>
              <el-col :span="3">
                <el-form-item>
                  <el-button :loading="loading" plain color="#2fa7b9" style="margin-left: 50px;"
                    @click="onBasicSubmit(basicFormRef)">
                    提交
                  </el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <!--基本设置 end-->
        <el-divider border-style="dashed" />
        <!--绑定邮箱 start-->
        <BindEmail />
        <!--绑定邮箱 end-->
        <el-divider border-style="dashed" />
        <!--修改密码 start-->
        <UpdatePwd />
        <!--修改密码 end-->
      </div>
    </el-col>
    <!--左侧信息 end-->
    <!--右侧个人信息 start-->
    <UserInfo />
    <!--右侧个人信息 end-->
  </el-row>
</template>

<script setup lang="ts">
import { ref, reactive, toRefs, onMounted, computed } from 'vue'
import { useUserStore } from '@/store/models/user'
import { ElMessage } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
import BindEmail from './BindEmail.vue'
import UpdatePwd from "./UpdatePwd.vue"
import UserInfo from "./UserInfo.vue"
import { updateInfoApi } from '@/api/user/user'
const loading = ref(false)
const basicFormRef = ref<FormInstance>()
const userStore = useUserStore()
const userId = computed(() => {
  return {
    userId: userStore.userInfo.userid
  }
})
interface RuleForm {
  userid: string
  username: string
  account: string
  avatar: string
  email: string
  role: string
}
const state = reactive({
  // 基本信息
  basic: {
    userid: '',
    username: '',
    account: '',
    avatar: '',
    email: '',
    role: ''
  }
})
const headers = reactive({
  Authorization: ''
})
// 校验基础信息
const basicRules = reactive<FormRules<RuleForm>>({
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  account: [{ required: true, message: "请输入账号", trigger: "blur" }],
})
// 图片上传到服务器的路径
const baseURL = import.meta.env.VITE_APP_BASE_API
const uploadURL = "api/user/avatar"
const avatarSrc = import.meta.env.VITE_APP_USER_BASE_AVATAR
const avatar = computed(() => {
  return baseURL + avatarSrc + basic.value.avatar
})// 图片上传成功后执行的函数
const handleAvatarSuccess = (res: any) => {
  console.log(res)
  if (res.code === 0) {
    //console.log("handleAvatarSuccess:", res)
    state.basic.avatar = res.data.path
  }
}

// 提交基础信息

const onBasicSubmit = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate(async (valid) => {
    if (valid) {
      loading.value = true
      // 登录
      try {
        const { data } = await updateInfoApi({ ...state.basic });
        if (data.code === 0) {
          userStore.setUserInfo({
            userid: state.basic.userid,
            username: state.basic.username,
            account: state.basic.account,
            email: state.basic.email,
            role: state.basic.role,
            avatar: state.basic.avatar
          })
          // 提示
          ElMessage({
            message: '基础信息修改成功~',
            type: 'success',
          })
          loading.value = false
        } else {
          // 提示
          ElMessage({
            message: '基础信息修改失败~',
            type: 'error',
          })
          loading.value = false
        }
      } catch (error) {
        // 捕获loginApi中抛出的任何错误，包括超时  
        ElMessage.error('请求服务器超时')
        loading.value = false; // 确保在发生错误时关闭加载状态  
      }
    } else {
      console.log('error submit!')
      return Promise.resolve()
    }
  })
}
const { userInfo } = userStore
//挂载后加载数据
onMounted(() => {
  headers.Authorization = userStore.token
  state.basic.userid = userInfo.userid
  state.basic.username = userInfo.username
  state.basic.account = userInfo.account
  state.basic.avatar = userInfo.avatar
  state.basic.email = userInfo.email
  state.basic.role = userInfo.role
})
// 它主要用于在setup函数中创建响应式的引用，这些引用与原始响应式对象保持同步
// 但允许你在模板或计算属性中解构它们而不会丢失响应性。
const { basic } = toRefs(state)
</script>

<style scoped>
.left_box {
  width: 100%;
  height: auto;
  background: white;
  padding: 20px;
  /* 添加此属性 padding间距不扩大div */
  box-sizing: border-box;
}

.left_box .title {
  color: #178557;
  margin-bottom: 10px;
  padding: 20px 20px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
}

.left_box .set {
  text-align: left;
  padding: 0px 20px;
  margin-bottom: 10px;
  color: #8f8f8f;
  line-height: 35px;
}

.left_box .set h4 {
  line-height: 45px;
  color: #8f8f8f;
}

.avatar-uploader {
  width: 100%;
  height: auto;
  background: white;
  margin-top: -10px;
}
</style>