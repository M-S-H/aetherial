<template>
  <button 
    class="av-button" 
    v-ripple
    @click="$emit('click')"
    :class="color"
  >
    <!-- Main Button Text -->
    <span class="av-button-content">
      <slot></slot>
    </span>

    <!-- <div v-ripple class="av-ripple"></div> -->
  </button>
</template>

<script>
import colorMixin from '../mixins/color-mixin'

export default {
  props: {
    'disabled': {
      default: false
    },
    'state': {
      default: 'button'
    }
  },

  mixins: [ colorMixin ]
}
</script>