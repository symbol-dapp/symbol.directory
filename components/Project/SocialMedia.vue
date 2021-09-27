<template>
  <div class="flex">
    <div v-for="social in socialMediaNetworks" :key="social">
      <div v-if="socialMedia[social]" class="pr-3 flex items-center">
        <a :href="socialMedia[social]" target="__blank">
          <img :src="`/images/${social}.svg`" width="20" height="20">
        </a>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  name: 'ProjectSocialMedia',
  props: {
    socialMedia: {
      type: Object,
      default: undefined
    }
  },
  data () {
    return {
      socialMediaNetworks: ['github', 'twitter', 'facebook', 'reddit', 'telegram']
    };
  }
});
</script>
