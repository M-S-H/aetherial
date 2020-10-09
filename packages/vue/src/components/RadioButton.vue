<template>
  <!-- Radio Button Element -->
  <div class="av-radio-button" @click="select" :class="color">
    <div
      class="av-radio-button-element"
      :class="{selected: isSelected}"
    ></div>

    <!-- Radio Button Label -->
    <label class="av-radio-button-label">
      <slot></slot>
    </label>

    <!-- Radio button for accessiblility -->
    <input type="radio" :checked="isSelected" :value="value" />
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, onMounted, Ref, ref, watch } from 'vue'
import color from '../mixins/color.vue'

export default defineComponent({
  name: 'AvRadioButton',

  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    value: {
      default: null
    }
  },

  mixins: [color],

  setup (props, context) {
    let isInGroup = false
    const isSelected = ref(false)
    const selectedValue = inject('avRadioGroupValue') as Ref<any>

    const select = () => {
      isSelected.value = true
    }

    onMounted(() => {
      if (selectedValue) {
        isInGroup = true
        console.log(selectedValue)
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
      if (isInGroup && v) {
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
