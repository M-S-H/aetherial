<template>
  <div class="hi">
    <h1>Stuff</h1>
    <av-button @click="dostuff" class="error">Hi</av-button>

    <av-checkbox-group v-model="lists">
      <av-checkbox v-model="isAccepted" class="primary" value="something">Label Godes Here</av-checkbox> {{ isAccepted }}
      <av-checkbox class="primary" value="one"></av-checkbox>
      <av-checkbox class="primary" value="two"></av-checkbox>
      <av-checkbox class="primary" value="three"></av-checkbox>
    </av-checkbox-group>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'App',

  data () {
    return {
      isAccepted: false,
      lists: []
    }
  },

  methods: {
    dostuff () {
      console.log('yay')
    }
  }
})
</script>
