<template>
  <div class="av-input-wraper" :class="color">
    <slot name="icon"></slot>
    <input class="av-input" :type='type' v-model="modelValue" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import color from '../mixins/color.vue'

export default defineComponent({
  name: 'AvInput',

  props: {
    type: {
      type: String,
      default: 'text'
    }
  },

  modelValue: {
    type: String,
    default: ''
  },

  mixins: [color]
})
</script>
