<template>
  <div 
    class="av-switch"
    @click="toggle"
    :class="color"
  >
    <!-- Switch Element -->
    <div class="av-switch-element" :class="{on: value}">
      <span></span>
    </div>

    <!-- Label -->
    <label class="av-switch-label">
      <slot></slot>
    </label>
  </div>
</template>


<script>
import colorMixin from '../mixins/color-mixin'

export default {
  name: 'AvSwitch',

  props: ['value'],

  mixins: [colorMixin],

  methods: {
    toggle () {
      this.$emit('input', !this.value)
    }
  }
}
</script>
