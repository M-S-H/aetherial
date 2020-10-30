<template>
  <div class="av-radio-group">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, provide, ref, watch } from 'vue'

export default defineComponent({
  name: 'AvRadioGroup',

  props: {
    modelValue: {
      default: null
    }
  },

  emits: ['update:modelValue'],

  setup (props, context) {
    const currentValue = ref(props.modelValue)
    provide('avRadioGroupValue', currentValue)

    watch(() => props.modelValue, (v) => { currentValue.value = v }, { immediate: true })
    watch(currentValue, (v) => context.emit('update:modelValue', v))

    return {
      currentValue
    }
  }
})
</script>
