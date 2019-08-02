<template>
  <div class="av-checkbox" @click="toggle" :class="color">
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
      {{ checked }}
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

<script>
import colorMixin from '../mixins/color-mixin'

export default {
  name: 'AvCheckbox',

  model: {
    prop: 'model'
  },

  props: {
    'value': { default: null },
    'model': { default: false }
  },

  data () {
    return {
      checked: false,
      inGroup: false
    }
  },

  mounted () {
    if (this.$parent.$options.name === 'AvCheckboxGroup') {
      this.inGroup = true
      this.$parent.registerCheckbox(this)
    }
  },

  beforeDestroy () {
    this.$emit('item-unselected', this.value)
  },

  watch: {
    model (newVal, oldVal) {
      this.checked = newVal

      if (this.inGroup) {
        this.checked
          ? this.$emit('item-selected', this.value)
          : this.$emit('item-unselected', this.value)
      }
    }
  },

  mixins: [colorMixin],

  methods: {
    toggle () {
      if (this.inGroup) {
        this.checked
        ? this.$emit('item-unselected', this.value)
        : this.$emit('item-selected', this.value)
      } else {
        this.$emit('input', !this.checked)
      }
    },

    setState (state) {
      this.checked = state

      if (this.inGroup) {
        this.$emit('input', this.checked)
      }
    }
  }
}
</script>
