<template>
  <div class="av-button-group" :class="color">
    <slot></slot>
  </div>
</template>

<script>
import colorMixin from '../mixins/color-mixin'

export default {
  name: 'AvButtonGroup',

  props: {
    'multiple': { default: false },
    'value': { default: null }
  },

  watch: {
    value () {
      console.log('value changed')
      this.updateItems()
    }
  },

  mixins: [colorMixin],

  mounted () {
    for (const child of this.$children) {
      child.$on('item-selected', (value) => this.newItemSelected(value))

      if (this.multiple) {
        child.$on('item-unselected', (value) => this.itemUnselected(value))
      }
    }
  },

  methods: {
    newItemSelected (value) {
      if (this.multiple) {
        this.value.push(value)
      } else {
        console.log('emit')
        this.$emit('input', value)
      }
    },

    itemUnselected (value) {
      const ind = this.value.findIndex(v => v === value)
      this.value.splice(ind, 1)
    },

    updateItems () {
      for (const child of this.$children) {
        this.multiple
          ? child.$data.selected = this.value.findIndex(x => child.$props.value === x) !== -1
          : child.$data.selected = child.$props.value === this.value
      }
    }
  }
}
</script>
