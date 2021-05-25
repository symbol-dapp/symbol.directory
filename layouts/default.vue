<template>
  <div class="bg-gray-100 ">
    <Header v-if="enabled" />
    <div class="max-w-7xl mx-auto sm:px-6 lg:px-8 py-10">
      <Nuxt />
    </div>
    <Footer />
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data () {
    return {
      enabled: false
    }
  },
  mounted () {
    if (this.$route.query.enabled) {
      this.$data.enabled = true
    }
  }
})
</script>
