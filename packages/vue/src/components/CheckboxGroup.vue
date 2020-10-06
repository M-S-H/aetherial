<template>
  <div class="av-checkbox-group" v-on:item-selected="itemSelected($event)">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, provide } from 'vue'

export default defineComponent({
  name: 'AvCheckboxGroup',

  props: {
    modelValue: {
      type: Array,
      default: () => []
    }
  },

  setup (props) {
    provide('checkboxValues', props.modelValue)
  }
})
</script>
