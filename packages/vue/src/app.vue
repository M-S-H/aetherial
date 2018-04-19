<template>
  <div id="app">
    <h1>Button</h1>
    <av-button @click="stuff()">Save</av-button>
    <av-button class="hollow" color="secondary">Save</av-button>
  </div>
</template>

<script>
export default {
  name: 'app',
  methods: {
    stuff: function () {
      console.log('clicked')
    }
  }
}
</script>