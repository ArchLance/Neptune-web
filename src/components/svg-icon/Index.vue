<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <svg :class="svgClass" aria-hidden="true">
        <use :xlink:href="iconName"></use>
    </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue'
const props = defineProps({
    iconClass: { type: String },
    className: { type: String },
})
const iconName = computed(() => {
    return props.iconClass ? `#icon-${props.iconClass}` : '#icon'
})
const svgClass = computed(() => {
    return props.className ? 'svg-icon ' + props.className : 'svg-icon'
})
</script>

<style scoped>
.svg-icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
}
</style>