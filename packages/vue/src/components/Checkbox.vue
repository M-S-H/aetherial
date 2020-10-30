<template>
  <div
    class="av-checkbox"
    @click="toggle"
    :class="color"
  >
    <!-- The checkbox element -->
    <div
      class="av-checkbox-element"
      :class="{active: checked}"
    >
      <!-- Checkbox shape -->
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <path d="M454.8,58.9L170.3,343.5c-3.2,3.2-8.3,3.2-11.5,0L57.2,241.9c-3.2-3.2-8.3-3.2-11.5,0L2.4,285.2c-3.2,3.2-3.2,8.3,0,11.5
          L109.7,404l49.1,49.1c3.2,3.2,8.3,3.2,11.5,0l339.4-339.4c3.2-3.2,3.2-8.3,0-11.5l-43.4-43.4C463.1,55.7,458,55.7,454.8,58.9z"
        />
      </svg>
    </div>

    <!-- Checkbox label -->
    <label class="av-checkbox-label">
      <slot></slot>
    </label>

    <!-- Native checkbox -->
    <input
      type="checkbox"
      :value="value"
      :checked="checked"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, onMounted, ref, watch } from 'vue'
import color from '../mixins/color.vue'

export default defineComponent({
  props: {
    value: {
      default: null
    },

    modelValue: {
      type: Boolean,
      default: false
    }
  },

  mixins: [color],

  emits: ['update:modelValue'],

  setup (props, context) {
    let isInGroup = false
    const checked = ref(false)
    const list = inject('checkboxValues') as Array<any>

    onMounted(() => {
      if (list !== undefined) {
        isInGroup = true

        watch(() => list, l => {
          const valueContained = l.findIndex(v => v === props.value) !== -1
          if (valueContained !== checked.value) {
            checked.value = !checked.value
            context.emit('update:modelValue', checked.value)
          }
        }, { deep: true, immediate: true })
      }
    })

    watch(() => props.modelValue, (val: boolean) => {
      checked.value = val
    }, { immediate: true })

    watch(checked, (val) => {
      if (!isInGroup) {
        return
      }

      const ind = list.findIndex(v => v === props.value)
      if (val && ind === -1) {
        list.push(props.value)
      } else if (!val && ind !== -1) {
        list.splice(ind, 1)
      }
    }, { immediate: true })

    const toggle = () => {
      checked.value = !checked.value
      context.emit('update:modelValue', checked.value)
    }

    return {
      toggle,
      list,
      checked
    }
  }
})
</script>
