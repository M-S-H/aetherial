<template>
  <button
    class="av-button"
    :disabled="disabled"
    v-av-ripple
    @click="propagateClick"
  >
    <!-- Main Button Text -->
    <span class="av-button-content">
      <slot></slot>
    </span>
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    state: {
      type: String,
      default: 'button'
    }
  },

  methods: {
    propagateClick ($event: MouseEvent) {
      $event.stopImmediatePropagation()
      this.$emit('click')
    }
  }
})
</script>
