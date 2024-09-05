<template>
    <div class='collapse-icon' @click="SettingStore.setIsCollapse(!isCollapse)">
        <template v-if="isCollapse">
            <el-button :icon="CaretRight" size="small" circle />
        </template>
        <template v-else>
            <el-button :icon="CaretLeft" size="small" circle />
        </template>
    </div>
</template>
<script setup lang="ts">

import { computed } from 'vue'
import { CaretLeft, CaretRight } from '@element-plus/icons-vue'
import { useSettingStore } from "@/store/models/setting";

const SettingStore = useSettingStore()
const isCollapse = computed(() => SettingStore.isCollapse)
</script>

<style scoped>
.collapse-icon {
    position: absolute;
    /* 控制当前元素在父元素中的位置 */
    top: 50%;
    transform: translateY(-50%);
    width: 100%;
    /* 控制子元素的位置 */
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
}
</style>