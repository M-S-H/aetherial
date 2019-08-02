<template>
  <div class="av-radio-group">
    <slot></slot>
  </div>
</template>

<script>
import colorMixin from '../mixins/color-mixin'

export default {
  name: 'AvRadioButtonGroup',

  props: ['value'],

  mixins: [colorMixin],

  watch: {
    value () {
      this.updateChildren()
    }
  },

  methods: {
    itemSelected (value) {
      this.$emit('input', value)
    },

    registerRadioButton (child) {
      child.$on('item-selected', (value) => this.itemSelected(value))
      child.selected = this.value === child.value
    },

    updateChildren () {
      for (const child of this.$children) {
        child.selected = this.value === child.value
      }
    }
  }
}
</script>
