<template>
  <button
    class="av-button"
    :disabled="disabled || loading"
    v-av-ripple
    @click="propagateClick"
    :class="[color, { 'alternate-state': loading }]"
  >
    <!-- Main Button Text -->
    <span
      class="av-button-content"
      :class="{ 'hidden-loading': loading }"
    >
      <slot></slot>
    </span>

    <!-- Loading State -->
    <span
      v-if="loading"
      class="button-loading-state"
    >
      <av-spinner :color="color"></av-spinner>
    </span>
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import color from '../mixins/color.vue'

export default defineComponent({
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    state: {
      type: String,
      default: 'button'
    },
    loading: {
      type: Boolean,
      default: false
    }
  },

  emits: ['click'],

  mixins: [
    color
  ],

  methods: {
    propagateClick ($event: MouseEvent) {
      $event.stopImmediatePropagation()
      this.$emit('click')
    }
  }
})
</script>
