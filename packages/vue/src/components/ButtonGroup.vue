<template>
  <div class="av-button-group" :class="color">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, provide, ref, watch } from 'vue'

export default defineComponent({
  name: 'AvButtonGroup',

  props: {
    modelValue: {
      type: Boolean,
      default: false
    }
  },

  setup (props, context) {
    const watchedValue = ref(props.modelValue)
    provide('avButtonGroupValue', watchedValue)

    watch(() => props.modelValue, (v) => { watchedValue.value = v }, { immediate: true })
    watch(watchedValue, (v) => context.emit('update:modelValue', v))

    return {
      watchedValue
    }
  }
})
</script>
