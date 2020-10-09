<template>
  <div class="hi">
    <h1>Stuff</h1>
    <av-button @click="showModal = true" class="error">Hi</av-button>

    <av-checkbox v-model="isAccepted" value="something">Label Godes Here</av-checkbox> {{ isAccepted }}

    <av-checkbox-group v-model="lists">
      <av-checkbox v-model="isAccepted" value="something">Label Godes Here</av-checkbox> {{ isAccepted }}
      <av-checkbox value="one">One</av-checkbox>
      <av-checkbox value="two">Two</av-checkbox>
      <av-checkbox value="three">Three</av-checkbox>
    </av-checkbox-group>

    <av-button-group v-model="selected">
      <av-button-group-item value="one">one</av-button-group-item>
      <av-button-group-item value="two">two</av-button-group-item>
      <av-button-group-item value="three">three</av-button-group-item>
    </av-button-group>

    <av-radio-group v-model="selected">
      <av-radio-button v-for="option of options" :key="option" :value="option" class="primary">{{ option }}</av-radio-button>
    </av-radio-group>

    <av-input v-model="text"></av-input>

    <av-modal
      :visible="showModal"
      @close="showModal = false"
    >
      <div class="modal-header">Hi</div>
      <div class="modal-content">
        fdjsalfjas
      </div>
      <div class="modal-actions">
        <av-button @click="showModal = false">Close</av-button>
      </div>
    </av-modal>

    <av-switch v-model="isAccepted" class="primary">Accepted</av-switch>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'App',

  mounted () {
    (window as any).comp = this
  },

  data () {
    return {
      isAccepted: false,
      lists: ['one'],
      options: ['one', 'two', 'three'],
      selected: 'one',
      text: '',
      showModal: false
    }
  },

  methods: {
    dostuff () {
      if (this.lists.length > 0) {
        this.lists.splice(0, 1)
      }
    }
  }
})
</script>
