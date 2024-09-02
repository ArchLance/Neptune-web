<template>
    <div class="toolbar">
        <!--logo start-->
        <div class="topleft">
            <img src="@/assets/logo.png">
            <Hamburger></Hamburger>
        </div>
        <div class="topright">
            <el-dropdown trigger="click" @command="handleCommand">
                <span class="el-dropdown-link">
                    <el-avatar :size=34 src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
                    <!-- 得用import才能让其识别出相对路径 -->
                    <!-- <el-avatar :size=34 src="@/assets/logo.png" /> -->
                    {{ userStore.userInfo.username }}
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item command="profile">个人信息</el-dropdown-item>
                        <el-dropdown-item command="settings">更改设置</el-dropdown-item>
                        <el-dropdown-item command="logout" divided>退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
        <!--logo end-->
    </div>
</template>

<script setup lang="ts">
import Hamburger from './Hamburger.vue';
import { useUserStore } from '@/store/models/user'
const userStore = useUserStore();
function handleCommand(command: any) {
    console.log(`Selected command: ${command}`);
    switch (command) {
        case 'profile':
            console.log('profile');
            alert('profile')
            break;
        case 'settings':
            console.log('Navigate to settings page');
            alert('Navigate to settings page')
            break;
        case 'logout':
            console.log('Logout user');
            alert('Logout user')
            break;
        default:
            console.log('Unknown command');
    }
}
</script>

<style>
.toolbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    right: 20px;
    box-shadow: rgb(0 0 0 / 10%) 0px 0px 10px;
    background: white;
}

.topleft {
    display: flex;
    align-items: center;
    gap: 5px;
}

.topleft img {
    margin: 6px;
    flex: 0 0 auto;
    flex-basis: 40px;
    width: 135px;
}

.topright {
    display: flex;
    align-items: center;
    margin: 20px;
}

.avatar-dropdown {
    position: relative;
    display: inline-flex;
    align-items: center;
}

.avatar {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    cursor: pointer;
}

.topright .el-dropdown-link {
    cursor: pointer;
    color: var(--el-color-primary);
    display: flex;
    align-items: center;
}
</style>