<template>
  <!-- Radio Button Element -->
  <div class="av-radio-button" :class="color" @click="select">
    <div
      class="av-radio-button-element"
      :class="{selected: selected}"
    ></div>

    <!-- Radio Button Label -->
    <label class="av-radio-button-label">
      <slot></slot>
    </label>

    <!-- Radio button for accessiblility -->
    <input type="radio" :checked="selected" :value="selected" name="name" />
  </div>
</template>

<script>
import colorMixin from '../mixins/color-mixin'

export default {
  name: 'AvRadioButton',

  model: {
    prop: 'model'
  },

  mixins: [colorMixin],

  props: {
    model: { default: false },
    value: { default: null }
  },

  mounted () {
    if (this.$parent.$options.name === 'AvRadioButtonGroup') {
      this.inGroup = true
      this.$parent.registerRadioButton(this)
      console.log(this.value)
    }
  },

  data () {
    return {
      selected: false,
      inGroup: false
    }
  },

  watch: {
    selected (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.$emit('input', newVal)
      }
    },

    model (newVal, oldVal) {
      this.selected = newVal
      if (newVal) {
        this.$emit('item-selected', this.value)
      }
    }
  },

  methods: {
    select () {
      this.selected = true
      this.$emit('item-selected', this.value)
    }
  }
}
</script>

