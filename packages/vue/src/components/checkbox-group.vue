<template>
  <div class="av-checkbox-group">
    <slot></slot>
  </div>
</template>

<script>
import colorMixin from '../mixins/color-mixin'
export default {
  name: 'AvCheckboxGroup',

  props: ['value'],

  // mounted () {
  //   for (const child of this.$children) {
  //     child.$on('item-selected', (value) => this.itemSelected(value))
  //     child.$on('item-unselected', (value) => this.itemUnselected(value))
  //   }
  // },

  watch: {
    value () {
      this.updateChildren()
    }
  },

  mixins: [colorMixin],

  methods: {
    itemSelected (value) {
      if (this.value.findIndex(v => v === value) === -1) {
        this.value.push(value)
      }
    },

    itemUnselected (value) {
      const ind = this.value.findIndex(v => v === value)
      this.value.splice(ind, 1)
    },

    updateChildren () {
      for (const child of this.$children) {
        const state = this.value.findIndex(v => v === child.value) !== -1
        child.setState(state)
      }
    },

    registerCheckbox (child) {
      child.$on('item-selected', (value) => this.itemSelected(value))
      child.$on('item-unselected', (value) => this.itemUnselected(value))
      child.checked = this.value.findIndex(v => v === child.value) !== -1
    }
  }
}
</script>
