<template>
  <div id="app">
    <h1>Button</h1>
    <av-button @click="thing = {id: 1, name: 'One'}">Save</av-button>
    <av-button class="hollow" color="secondary" @click="showModal = true">Save</av-button>

    {{ thing }}
    <av-select :items="options" v-model="thing" displayKey="name"></av-select>

    <input class="av-input" />

    <av-modal :visible="showModal" @close="showModal = false">
      <div class="modal-header">Hello Vue Modal</div>
      <div class="modal-content">This is my content.</div>
      <div class="modal-actions">
        <av-button @click="showModal = false">Close</av-button>
      </div>
    </av-modal>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      options: [{id: 1, name: 'One'}, {id: 2, name: 'Two'}],
      thing: { id: 2, name: 'Two' },
      showModal: false
    }
  },
  methods: {
    stuff: function () {
      console.log('clicked')
    }
  }
}
</script>