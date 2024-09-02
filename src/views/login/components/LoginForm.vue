<template>
    <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules">
        <el-form-item label="" prop="username">
            <el-input placeholder="请输入用户名" autoComplete="on" style="position: relative" v-model="ruleForm.account">
                <template #prefix>
                    <el-icon class="el-input__icon">
                        <UserFilled />
                    </el-icon>
                </template>
            </el-input>
        </el-form-item>

        <el-form-item label="" prop="password">
            <el-input placeholder="请输入密码" autoComplete="on" v-model="ruleForm.password" :type="passwordType">
                <template #prefix>
                    <el-icon class="el-input__icon">
                        <GoodsFilled />
                    </el-icon>
                </template>
                <template #suffix>
                    <div class="show-pwd" @click="showPwd">
                        <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
                    </div>
                </template>
            </el-input>
        </el-form-item>

        <el-form-item style="width: 100%">
            <el-button :loading="loading" class="login-btn" type="success"
                @click="submitForm(ruleFormRef)">登录</el-button>
        </el-form-item>

    </el-form>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import type { FormInstance } from 'element-plus'
import { ElNotification } from "element-plus";
import { useRouter } from 'vue-router'
import { loginApi } from '../../../api/login/login'
import { useUserStore } from '../../../store/models/user'
const router = useRouter()
const ruleFormRef = ref<FormInstance>()
const passwordType = ref('password')
const loading = ref(false)
const rules = reactive({
    account: [{ required: true, message: "请输入用户名", trigger: "blur" }],
    password: [{ required: true, message: "请输入密码", trigger: "blur" }],
})
// 表单数据
const ruleForm = reactive({
    account: 'admin',
    password: '123456',
})
// 显示密码图标
const showPwd = () => {
    passwordType.value = passwordType.value === 'password' ? '' : 'password'
}

const userStore = useUserStore()
// TODO: 应该把用户数据加到localstorage中
const submitForm = (formEl: FormInstance | undefined) => {
    console.log("提交表单")
    if (!formEl) return
    formEl.validate(async (valid) => {
        if (valid) {
            loading.value = true
            // 登录
            try {
                const { data } = await loginApi({ ...ruleForm })
                console.log(data)
                if (data.code === 0) {
                    // 设置token
                    userStore.setToken(data.data.token)
                    userStore.setUserInfo({
                        userid: data.data.userid,
                        username: data.data.username,
                        account: data.data.account,
                        email: data.data.email,
                        role: data.data.role
                    })
                    await router.push({
                        path: '/index',
                    })
                    ElNotification({
                        title: '登录成功',
                        message: "欢迎登录Neptune",


                        type: "success",
                        duration: 3000
                    })
                } else {
                    ElNotification({
                        title: '温馨提示',
                        message: data.msg,
                        type: "error",
                        duration: 3000
                    });
                    loading.value = false
                }
            } catch (err: any) {
                // 捕获loginApi中抛出的任何错误，包括超时  
                ElNotification({
                    title: '登录超时',
                    message: "请求服务器超时",
                    type: "error",
                    duration: 3000
                });
                loading.value = false; // 确保在发生错误时关闭加载状态  
            }
        } else {
            console.log('error submit!')
            loading.value = false
            return Promise.resolve()
        }
    })
}
</script>
<style scoped>
.login-btn {
    margin-top: 20px;
    width: 100%;
    height: 47px
}

.show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    cursor: pointer;
    user-select: none;
}

::v-deep(.svg-icon) {
    vertical-align: 0;
}
</style>