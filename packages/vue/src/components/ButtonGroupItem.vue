<template>
  <div
    class="av-button-group-item"
    :class="{ active: isSelected }"
    @click="toggle"
  >
    <slot></slot>

    <div></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, onMounted, Ref, ref, watch } from 'vue'

export default defineComponent({
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    value: {
      default: null
    }
  },

  setup (props, context) {
    const isSelected = ref(false)
    const selectedValue = inject('avButtonGroupValue') as Ref<any>

    const select = () => {
      isSelected.value = true
    }

    onMounted(() => {
      if (selectedValue) {
        console.log('hi')
        watch(() => selectedValue.value, v => {
          const isCurrentValue = v === props.value
          if (isCurrentValue !== isSelected.value) {
            isSelected.value = !isSelected.value
            context.emit('update:modelValue', isSelected.value)
          }
        }, { immediate: true })
      }
    })

    watch(() => props.modelValue, (v: boolean) => {
      if (v) {
        isSelected.value = v
      }
    }, { immediate: true })

    watch(isSelected, (v: boolean) => {
      if (v) {
        selectedValue.value = props.value
      }
    }, { immediate: true })

    return {
      select,
      isSelected
    }
  }
})
</script>
