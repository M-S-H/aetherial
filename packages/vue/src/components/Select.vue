<template>
  <div class="av-select">
    <div
      class="av-select-display"
      :class="{ open: isOpen }"
      @click="isOpen = !isOpen"
    >
      <!-- Static display of selected value -->
      <input
        v-if="!(isOpen && searchable)"
        class="av-input av-selected-display"
        type="text"
        :value="displayText"
        :placeholder="placeholder"
        @focus="$event.target.blur()"
        readonly="true"
      />

      <!-- Search input if enabled -->
      <input
        v-if="isOpen && searchable"
        type="text"
        class="av-input search-field"
        v-model="searchKey"
        @click.prevent
        :placeholder="displayText || placeholder"
      />

      <!-- Chevron -->
      <svg class="av-select-chevron" :class="{ rotate: isOpen }" x="0px" y="0px" viewBox="0 0 10.3 6" @click="isOpen = !isOpen">
        <path d="M9.2,0.1L5.1,4.2L1,0.1C0.9,0,0.8,0,0.7,0.1L0.1,0.7C0,0.8,0,0.9,0.1,1l4.2,4.2l0,0L5,5.9C5.1,6,5.2,6,5.3,5.9l0,0l0.7-0.7 L10.2,1c0.1-0.1,0.1-0.2,0-0.3L9.5,0.1C9.4,0,9.3,0,9.2,0.1z"/>
      </svg>

      <!-- Close -->
      <svg class="av-close-select" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" @click="isOpen = false">
        <polygon points="200,26 174,0 100,74 26,0 0,26 74,100 0,174 26,200 100,126 174,200 200,174 126,100 " />
      </svg>
    </div>

    <teleport :to="portalId" v-if="isOpen">
      <ul v-if="isOpen" class="av-select-items" :style="overlayStyles">
        <li v-for="item of filteredItems" :key="item" @click="makeSelection(item)">{{ itemDisplay(item) }}</li>
        <li class="sv-select-no-results" v-if="filteredItems.length == 0">No Results</li>
      </ul>
    </teleport>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AvSelect',

  data () {
    return {
      searchKey: '',
      overlayStyles: null as unknown as any,
      isObjectList: false,
      isOpen: false,
      displayValue: '',
      selected: null as unknown as any,
      portalId: null as unknown as string
    }
  },

  mounted () {
    const id = Math.random().toString().substring(3, 8)
    const wrap = document.createElement('div')
    wrap.id = 'av' + id
    wrap.classList.add('av-select-overlay')
    const body = document.querySelector('body')
    if (body) {
      body.appendChild(wrap)
    }
    this.portalId = '#av' + id
  },

  props: {
    items: {
      type: Array,
      required: true
    },

    searchable: {
      type: Boolean,
      default: false
    },

    placeholder: {
      type: String
    },

    displayKey: {
      type: String,
      default: 'display'
    },

    valueKey: {
      type: String,
      default: 'value'
    },

    modelValue: {
      default: null
    }
  },

  emits: ['update:modelValue'],

  watch: {
    items: {
      handler (newList: Array<string> | Array<object>) {
        this.isObjectList = typeof newList[0] === 'object'
      },
      immediate: true
    },

    selected: {
      handler () {
        if (this.selected !== this.modelValue) {
          this.$emit('update:modelValue', this.selected)
        }
      }
    },

    modelValue: {
      handler () {
        if (this.selected !== this.modelValue) {
          this.selected = this.modelValue
        }
      },
      immediate: true,
      deep: true
    },

    isOpen: function (val) {
      if (this.searchable && val) {
        this.searchKey = ''
        setTimeout(() => {
          this.$el.querySelector('.search-field').focus()
        }, 0)
      }
      this.setOverlayStyles()
    }
  },

  computed: {
    displayText: function (): string {
      if (this.isObjectList && this.valueKey !== '') {
        const selectedItem = this.items.find(x => (x as object)[this.valueKey] === this.selected)
        return this.itemDisplay(selectedItem)
      } else if (this.isObjectList && this.valueKey === '') {
        const selectedItem = this.items.find(x => JSON.stringify(x) === JSON.stringify(this.selected))
        return this.itemDisplay(selectedItem)
      } else {
        return this.itemDisplay(this.selected)
      }
    },

    filteredItems: function (): Array<any> {
      console.log('compute')
      if (this.searchKey !== '') {
        return this.items.filter(option => {
          if (this.isObjectList) {
            const optionObject = option as object
            return optionObject[this.displayKey].toLowerCase().includes(this.searchKey.toLocaleLowerCase())
          } else {
            const optionString = option as string
            return optionString.toLowerCase().includes(this.searchKey.toLocaleLowerCase())
          }
        })
      } else {
        return this.items
      }
    }
  },

  methods: {
    setOverlayStyles () {
      const boundingRect = this.$el.getBoundingClientRect()
      this.overlayStyles = {}
      this.overlayStyles.width = boundingRect.width + 'px'
      this.overlayStyles.left = boundingRect.left + 'px'

      if (boundingRect.top + boundingRect.height + 200 < window.innerHeight) {
        this.overlayStyles.top = boundingRect.top + boundingRect.height + 5 + 'px'
      } else {
        this.overlayStyles.bottom = window.innerHeight - boundingRect.top + 5 + 'px'
      }
    },

    itemDisplay (item): string {
      if (item) {
        return this.isObjectList ? item[this.displayKey] : item
      } else {
        return ''
      }
    },

    makeSelection (item) {
      if (this.isObjectList && this.valueKey !== '') {
        this.selected = item[this.valueKey]
      } else {
        this.selected = item
      }

      this.isOpen = false
    }
  }
})
</script>
