import { defineStore } from 'pinia'
import { ref } from 'vue'
export const useSettingStore = defineStore('settingState', () => {
    // 是否折叠
    const isCollapse = ref(false)
    // tagsViews 是否展示，默认展示
    const isShowTag = ref(true)
    function setIsCollapse(newIsCollapse: boolean) {
        isCollapse.value = newIsCollapse
    }
    function setIsShow(newIsShowTag: boolean) {
        isShowTag.value = newIsShowTag
    }
    return {
        isCollapse,
        isShowTag,
        setIsCollapse,
        setIsShow
    }
})