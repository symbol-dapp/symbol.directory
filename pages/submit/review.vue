<template>
  <div>
    {{ data }}
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'

export default Vue.extend({
  computed: mapState({
    data: (state: any) => JSON.stringify(state.submit)
  })
})
</script>
