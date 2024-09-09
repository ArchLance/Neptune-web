<template>
  <el-col class="hidden-md-and-down" :lg="6" :xl="6">
    <div class="right_box">
      <h3 class="title">
        <el-icon style="margin-right: 10px;">
          <Grid />
        </el-icon>
        信息展示
      </h3>
      <div class="info">
        <div class="right_photo">
          <!-- 用户没设置头像的情况下使用系统默认的 -->

          <img v-if="userInfo.avatar" :src="avatar" style="width: 130px;height: auto;" />
          <img v-else src="@/assets/default_avatar.png" style="width: 130px;height: auto;" />
        </div>
        <h2>{{ userInfo.username }}</h2>
        <br>
        <p class="email">{{ userInfo.email }}</p>
      </div>
      <el-divider />
      <h3 class="title">
        <el-icon style="margin-right: 10px;">
          <Sunrise />
        </el-icon>
        账号类型
      </h3>
      <div class="type">
        <!--用户账号-->
        <div v-if="userInfo.role === 'ROLE_ADMIN'">
          管理员
        </div>
        <div v-else>
          用户
        </div>
      </div>
      <el-divider />
    </div>
  </el-col>
</template>

<script setup lang="ts">
import { computed, toRefs } from 'vue'
import { useUserStore } from '@/store/models/user'
//   import {calculateDays} from "../../../utils/date";
const { userInfo } = toRefs(useUserStore())
// 服务器路径
const baseURL = import.meta.env.VITE_APP_BASE_API
const avatarSrc = import.meta.env.VITE_APP_USER_BASE_AVATAR

const avatar = computed(() => {
  return baseURL + avatarSrc + userInfo.value.avatar
})

</script>

<style scoped>
.right_box {
  width: 100%;
  height: auto;
  background: white;
  padding: 20px;
  /* 添加此属性 padding间距不扩大div */
  box-sizing: border-box;
}

.right_photo {
  position: relative;
  text-align: center;
  height: 100px;
  width: 100px;
  margin-left: -65px;
  left: 50%;
}

.info {
  text-align: center;
}

.right_photo img {
  width: 100%;
  border-radius: 50%;
}

.right_box h2 {
  padding-top: 10px;
  letter-spacing: 0;
  font-size: 30px;
}

.right_box .title {
  color: #178557;
}

.right_box .type {
  text-align: center;
}
</style>