<template>
  <div class="av-select">
    <div
      class="av-select-display"
      :class="{open: open}"
      @click="open = !open"
    >
      <!-- Static display of selected value -->
      <input
        v-if="!(open && searchable)"
        class="av-input av-selected-display"
        type="text"
        @focus="this.blur()"
        :value="displayValue"
        :placeholder="displayValue || placeholder"
        readonly
      />

      <input
        v-if="open && searchable"
        v-model="searchKey"
        @click.prevent="null"
        :placeholder="displayValue || placeholder"
      />
    </div>

    <!-- Chevron -->
    <svg class="av-select-chevron" :class="{rotate: open}" x="0px" y="0px" viewBox="0 0 10.3 6" @click="open = !open">
      <path d="M9.2,0.1L5.1,4.2L1,0.1C0.9,0,0.8,0,0.7,0.1L0.1,0.7C0,0.8,0,0.9,0.1,1l4.2,4.2l0,0L5,5.9C5.1,6,5.2,6,5.3,5.9l0,0l0.7-0.7 L10.2,1c0.1-0.1,0.1-0.2,0-0.3L9.5,0.1C9.4,0,9.3,0,9.2,0.1z"/>
    </svg>

    <!-- Close -->
    <svg class="av-close-select" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" @click="open = false">
      <polygon points="200,26 174,0 100,74 26,0 0,26 74,100 0,174 26,200 100,126 174,200 200,174 126,100 " />
    </svg>

    <transition name="slide-fade">
    <ul v-if="open" class="av-select-items">
      <li v-for="item in filteredItems" :key="objectList ? item[valueKey] : item" @click="makeSelection(item)">{{ itemDisplay(item) }}</li>
      <li v-if="filteredItems.length === 0" class="sv-select-no-results">No Results</li>
    </ul>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'AvSelect',

  props: {
    'searchable': { default: false },
    'placeholder': { default: 'Select One' },
    'displayKey': { default: null },
    'valueKey': { default: null },
    'items': { default: [] },
    'value': {}
  },

  data () {
    return {
      overlayStyles: {},
      searchKey: '',
      open: false,
      selected: null
    }
  },

  mounted () {
    if (this.value) {
      this.findSelection()
    }
  },

  watch: {
    value () {
      this.findSelection()
    }
  },

  computed: {
    displayValue () {
      return this.itemDisplay(this.selected)
    },

    filteredItems () {
      if (this.searchKey !== '') {
        return this.items.filter(option => {
          if (this.objectList) {
            return option[this.displayKey].toLowerCase().includes(this.searchKey.toLocaleLowerCase())
          } else {
            return option.toLowerCase().includes(this.searchKey.toLocaleLowerCase())
          }
        })
      } else {
        return this.items
      }
    },

    objectList () {
      return typeof this.items[0] === 'object'
    }
  },

  methods: {
    findSelection () {
      if (this.objectList && this.valueKey) {
        this.selected = this.items.find(x => x[this.valueKey] === this.value)
      } else if (this.objectList && !this.valueKey) {
        this.selected = this.items.find(x => JSON.stringify(x) === JSON.stringify(this.value))
      } else {
        this.selected = this.value
      }
    },

    itemDisplay (item) {
      if (item) {
        return this.objectList ? item[this.displayKey] : item
      } else {
        return null
      }
    },

    makeSelection (item) {
      let value

      if (this.objectList && this.valueKey) {
        value = item[this.valueKey]
      } else {
        value = item
      }

      this.$emit('input', value)
      this.open = false
    }
  }
}
</script>

<style lang="scss" scoped>
.av-select-items {
  top: 46px;
}

// Router Slide Fade
.slide-fade-enter-active,
.slide-fade-leave-active {
  will-change: transform;
  transition-duration: 0.15s;
  transition-property: opacity, transform;
  transition-timing-function: cubic-bezier(0.55, 0, 0.1, 1);
}

.slide-fade-enter {
  opacity: 0;
  transform: translateY(-20px) scaleY(0);
}

.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-20px) scaleY(0);
}
</style>
