<template>
  <div 
    class="av-button-group-item"
    :class="{active: selected}"
    @click="toggle"
  >
    <slot></slot>

    <div></div>
  </div>
</template>

<script>
export default {
  name: 'AvButtonGroupItem',

  props: ['value'],

  data () {
    return {
      selected: false
    }
  },

  methods: {
    toggle () {
      this.selected
        ? this.$emit('item-unselected', this.value)
        : this.$emit('item-selected', this.value)
    }
  }
}
</script>
