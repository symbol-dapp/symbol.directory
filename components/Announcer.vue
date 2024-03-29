<template>
  <transition name="fade">
    <div
      v-if="transaction !== ''"
      class="bg-white shadow sm:rounded-lg mt-10"
    >
      <div class="px-4 py-5 sm:p-6">
        <h3 class="text-lg leading-6 font-medium text-gray-900 text-center">
          {{ $t('announcer.scan') }}
        </h3>
        <div class="grid grid-cols-2 gap-4">
          <div class="flex flex-col justify-center items-center">
            <img id="qrCode" :src="transaction">
            <a
              href="https://vimeo.com/615368477"
              target="__blank"
              class="inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
            >
              {{ $t('announcer.tutorial') }}
            </a>
          </div>
          <!-- ... -->
          <div v-if="listening" class="flex justify-center items-center">
            <div>
              <p class="text-md text-gray-800">
                {{ $t('announcer.waiting') }}
              </p>
              <div class="flex justify-center mt-5">
                <Spinner />
              </div>
            </div>
          </div>
          <div v-if="confirmed" class="flex flex-col justify-center items-center">
            <p class="text-md text-gray-800 mb-4">
              {{ $t('announcer.confirmed') }}
            </p>
            <div v-if="goToPath">
              <NuxtLink
                :to="goToPath"
                class="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
              >
                {{ callToAction }}
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { Transaction } from 'symbol-sdk';
import Vue from 'vue';
import { ProjectJournalResolver } from '~/models/project/ProjectJournalResolver';
import { WSSRepositoryFactory } from '~/services/RepositoryFacade';
const listener = WSSRepositoryFactory.createListener();

export default Vue.extend({
  props: {
    transaction: {
      type: String,
      default: ''
    },
    callToAction: {
      type: String,
      default: ''
    },
    goToPath: {
      type: String,
      default: undefined
    },
    onConfirmed: {
      type: Function,
      default: () => (_: Transaction) => ({})
    }
  },
  data () {
    return {
      listening: true,
      confirmed: false
    };
  },
  mounted () {
    listener.open().then(() => {
      listener.confirmed(ProjectJournalResolver()).subscribe((transaction) => {
        this.listening = false;
        this.confirmed = true;
        this.onConfirmed(transaction);
        listener.close();
      });
    });
  }
});
</script>
