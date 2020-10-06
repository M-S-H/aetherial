<template>
  <div class="av-radio-group">
    {{ whatever }}
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, provide, reactive, ref, watch } from 'vue'

export default defineComponent({
  name: 'AvRadioGroup',

  props: {
    modelValue: {
      default: null
    }
  },

  setup (props, context) {
    const whatever = ref(props.modelValue)
    provide('avRadioGroupValue', whatever)

    watch(() => props.modelValue, (v) => { whatever.value = v }, { immediate: true })
    watch(whatever, (v) => context.emit('update:modelValue', v))

    return {
      whatever
    }
  }
})
</script>
