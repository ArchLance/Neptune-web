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
    top: 50%;
    /* left: 0; */
    transform: translateY(-50%);
    width: 100%;
    /* height: 100%; */
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
}
</style>