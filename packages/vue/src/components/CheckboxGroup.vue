<template>
  <div class="av-checkbox-group">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AvCheckboxGroup',

  props: {
    modelValue: {
      type: Array,
      default: () => []
    }
  },

  watch: {
    modelValue () {
      this.updateChildren()
    }
  },

  methods: {
    itemSelected (value) {
      if (this.modelValue.findIndex(v => v === value) === -1) {
        // eslint-disable-next-line vue/no-mutating-props
        this.modelValue.push(value)
      }
    },

    itemUnselected (value) {
      const ind = this.modelValue.findIndex(v => v === value)
      // eslint-disable-next-line vue/no-mutating-props
      this.modelValue.splice(ind, 1)
    },

    updateChildren () {
      // for (const child of this.$children) {
      //   const state = this.modelValue.findIndex(v => v === child.value) !== -1
      //   child.setState(state)
      // }
    },

    registerCheckbox (child) {
      child.$on('item-selected', (value) => this.itemSelected(value))
      child.$on('item-unselected', (value) => this.itemUnselected(value))
      child.checked = this.modelValue.findIndex(v => v === child.value) !== -1
    }
  }
})
</script>
