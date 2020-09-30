<template>
  <div class="hi">
    <h1>Stuff</h1>
    <av-button @click="dostuff" class="error">Hi</av-button>

    <av-checkbox v-model="isAccepted" class="primary">Label Godes Here</av-checkbox> {{ isAccepted }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'App',

  data () {
    return {
      isAccepted: false
    }
  },

  methods: {
    dostuff () {
      // alert('I did stuff')
    }
  }
})
</script>
