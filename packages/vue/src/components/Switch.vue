<template>
  <div
    class="av-switch"
    @click="toggle"
    :class="color"
  >
    <!-- Switch Element -->
    <div class="av-switch-element" :class="{ on: active }">
      <span></span>
    </div>

    <!-- Label -->
    <label class="av-switch-label">
      <slot></slot>
    </label>

    <!-- Native checkbox -->
    <input
      type="checkbox"
      :checked="active"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import color from '../mixins/color.vue'

export default defineComponent({
  name: 'AvSwitch',

  props: {
    modelValue: {
      type: Boolean,
      default: false
    }
  },

  mixins: [color],

  data () {
    return {
      active: false
    }
  },

  watch: {
    modelValue: function (val) {
      this.active = val
    }
  },

  methods: {
    toggle () {
      this.active = !this.active
      this.$emit('update:modelValue', this.active)
    }
  }
})
</script>
