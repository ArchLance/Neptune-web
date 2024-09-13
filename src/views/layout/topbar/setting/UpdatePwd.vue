<template>
  <div class="set">
    <h4>修改密码</h4>
    <p style="display: inline-flex;
                      justify-content: center;
                      align-items: center;">
      <el-icon style="margin-right: 5px;">
        <CircleCheck />
      </el-icon>密码6~18位字母、数字、特殊字符组成
    </p>
    <br>
    <p style="display: inline-flex;
                      justify-content: center;
                      align-items: center;">
      <el-icon style="margin-right: 5px;">
        <Warning />
      </el-icon>安全提示：新密码请勿与旧密码过于相似
    </p>
    <el-form ref="modifyFormRef" :rules="modifyRules" :model="modifyPwd" class="demo-form-inline">
      <el-row :gutter="20">
        <el-col :span="10">
          <el-form-item label="旧密码：" style="width: 100%;">
            <el-input v-model="modifyPwd.old_password" show-password placeholder="请输入旧密码" />
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="新密码：" style="width: 100%;">
            <el-input v-model="modifyPwd.new_password" show-password placeholder="请输入新密码" />
          </el-form-item>
        </el-col>
        <el-col :span="4" style="text-align: center;">
          <el-form-item style="margin-right: 0px;">
            <el-button plain color="#2fa7b9" :loading="subLoading" @click="modifySubmit(modifyFormRef)">
              提交
            </el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/store/models/user'
const userStore = useUserStore()
import { updatePwdApi } from "@/api/user/user";
import { useRouter } from 'vue-router'
// 定义表单对象
const modifyPwd = ref({
  old_password: "",
  new_password: ""
})
const modifyFormRef = ref<FormInstance>()
const subLoading = ref(false)
// 定义表单约束规则对象
const modifyRules = reactive<FormRules>({
  old_password: [{ required: true, message: '旧密码不能为空', trigger: 'blur' }],
  new_password: [{ required: true, message: '新密码不能为空', trigger: 'blur' }]
})
const router = useRouter()
// TODO: 还有一个问题是如果token过期，那么需要重新登录
// 提交修改密码
const modifySubmit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  try {
    await formEl.validate(async (valid) => {
      subLoading.value = true
      if (valid) {
        const { data } = await updatePwdApi(modifyPwd.value, userStore.token)
        console.log(data)
        if (data.code === 0) {
          ElMessage.success(data.msg)
          userStore.loginOut();
          await router.push({
            path: '/login',
          });
        } else {
          ElMessage.error(data.msg)
        }
      } else {
        ElMessage.error('提交失败，你还有未填写的项！')
      }
      subLoading.value = false
    })
  } catch (err: any) {
    // 捕获loginApi中抛出的任何错误，包括超时  
    ElMessage.error('请求服务器超时')
    subLoading.value = false; // 确保在发生错误时关闭加载状态  
  }
}
</script>

<style scoped></style>