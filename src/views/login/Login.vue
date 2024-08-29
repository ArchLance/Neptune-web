<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div id="ebg">

    </div>
    <div class="login-container">
        <!--登录表单 start-->
        <div class="login-form">
            <!--标题和logo start-->
            <div class="login-title">
                <h2 class="title">Neptune红队武器库</h2>
            </div>
            <!--标题和logo end-->
            <!--登录表单组件 start-->
            <LoginForm />
            <!--登录表单组件 end-->
        </div>
        <!--登录表单 end-->
    </div>
</template>

<script setup lang="ts">
import LoginForm from '@/views/login/components/LoginForm.vue'
</script>

<style scoped>
.login-container {
    position: fixed;
    height: 100%;
    width: 100%;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 25px 25px;
    box-sizing: border-box;
}

.login-box {
    position: relative;
    width: 100%;
    height: 100%;
    background-color: #fffc;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
}

/* 设置背景图 */
#ebg {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    padding: 10px;
    background-image: url("@/assets/login/background.png");
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
}

.login-form {
    max-width: 480px;
    width: 50%;
    padding: 40px;
    border-radius: 10px;
    box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
    box-sizing: border-box;
    background-color: #fffc;
}

.login-title {
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin-bottom: 30px;
}

.login-title .title {
    margin: 0;
    font-size: 30px;
    white-space: nowrap;
}


::v-deep(.el-input__inner) {
    height: 40px;
}
</style>