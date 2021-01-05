<template>
  <div class="av-spinner" :class="color">
    <span class="spinner-text">
      <slot></slot>
    </span>
    <div class="circles">
      <div class="circle one"></div>
      <div class="circle two"></div>
      <div class="circle three"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import color from '../mixins/color.vue'

export default defineComponent({
  name: 'Spinner',

  mixins: [
    color
  ]
})
</script>
