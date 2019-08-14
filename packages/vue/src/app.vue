<template>
  <div id="app">
    <h1>Button</h1>
    <av-button @click="buttonstuff = ['yo']">Save</av-button>
    <av-button class="hollow" color="secondary" @click="showModal = true">Save</av-button>
    <av-button color="warning" @click="ishi = true">Crazy</av-button>

    {{ thing }}
    <av-select :items="options" v-model="thing" displayKey="name"></av-select>

    <input class="av-input" />

    <av-button-group v-model="buttonstuff">
      <av-button-group-item color="primary" value="hi">Hi</av-button-group-item>
      <av-button-group-item value="yo">Yo</av-button-group-item>
      <av-button-group-item value="sup">Sup</av-button-group-item>
    </av-button-group>

    {{ buttonstuff }}

    <av-modal :visible="showModal" @close="showModal = false">
      <div class="modal-header">Hello Vue Modal</div>
      <div class="modal-content">
        <av-select :items="options" v-model="thing" displayKey="name"></av-select>
      </div>
      <div class="modal-actions">
        <av-button @click="showModal = false">Close</av-button>
      </div>
    </av-modal>

    <av-switch v-model="sv">Coolness</av-switch>

    <av-checkbox v-model="sv">Boom</av-checkbox>

    <av-checkbox-group color="secondary" v-model="checks">
      <av-checkbox v-model="sv" value="whatever">Boom</av-checkbox>
      <av-checkbox v-for="o in checkOptions" :key="o" :value="o">{{ o }}</av-checkbox>
      <!-- <av-checkbox v-model="sv" value="one">One</av-checkbox>
      <av-checkbox value="two">Two</av-checkbox>
      <av-checkbox value="three">Three</av-checkbox> -->
    </av-checkbox-group>

    <av-radio-group color="primary" v-model="radioSelection">
      <av-radio-button value="yup">yup</av-radio-button>
      <av-radio-button value="hi" v-model="ishi">hi</av-radio-button>
      <av-radio-button value="yo">yo</av-radio-button>
    </av-radio-group>

    {{ radioSelection }}
    {{ ishi }}
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      options: [{id: 1, name: 'One'}, {id: 2, name: 'Two'}],
      thing: { id: 2, name: 'Two' },
      showModal: false,
      buttonstuff: 'yo',
      sv: false,
      checks: [],
      checkOptions: ['One', 'Two', 'Three'],
      radioSelection: 'yup',
      ishi: false
    }
  },
  methods: {
    stuff: function () {
      console.log('clicked')
    }
  }
}
</script>

<style scoped>
.nonsense {
  height: 2000px;
  width: 100%;
}
</style>
