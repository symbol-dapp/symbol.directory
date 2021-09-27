<template>
  <div class="mt-4">
    <ProjectDisplay :project-state="projectState" />
    <div class="relative py-6">
      <div class="absolute inset-0 flex items-center" aria-hidden="true">
        <div class="w-full border-t border-gray-300" />
      </div>
      <div class="relative flex justify-center">
        <span class="px-2 bg-gray-100 text-sm text-gray-500">
          Continue
        </span>
      </div>
    </div>
    <div
      class="mt-6 flex flex-col-reverse justify-stretch space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-center sm:space-x-reverse sm:space-y-0 sm:space-x-3 md:mt-0 md:flex-row md:space-x-3"
    >
      <button
        type="button"
        class="inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
        @click="back"
      >
        Review Project Info
      </button>
      <button
        id="publish"
        type="button"
        class="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
        @click="publish"
      >
        Let's publish it!
      </button>
    </div>
    <transition name="fade">
      <div
        v-if="transaction !== ''"
        class="bg-white shadow sm:rounded-lg mt-10"
      >
        <div class="px-4 py-5 sm:p-6">
          <h3 class="text-lg leading-6 font-medium text-gray-900 text-center">
            Scan the QR Code in your Symbol Wallet
          </h3>
          <div class="grid grid-cols-2 gap-4">
            <div class="flex justify-center items-center">
              <img id="qrCode" :src="transaction">
            </div>
            <!-- ... -->
            <div v-if="listening" class="flex justify-center items-center">
              <div>
                <p class="text-md text-gray-800">
                  Waiting the Transaction to be confirmed
                </p>
                <div class="flex justify-center mt-5">
                  <Spinner />
                </div>
              </div>
            </div>
            <div v-if="confirmed" class="flex flex-col justify-center items-center">
              <p class="text-md text-gray-800 mb-4">
                Confirmed 👏
              </p>
              <div>
                <NuxtLink
                  to="/"
                  class="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
                >
                  See project at home page
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import { mapGetters } from 'vuex';
import { QRCodeGenerator } from 'symbol-qr-library';

import { CreateProjectCommand } from '~/models/project/CreateProjectCommand';
import { WSSRepositoryFactory } from '~/services/RepositoryFacade';
import { ProjectJournalResolver } from '~/models/project/ProjectJournalResolver';
import NetworkTypeResolver from '~/services/NetworkTypeResolver';

export default Vue.extend({
  components: {},
  data () {
    return {
      transaction: '',
      listening: false,
      confirmed: false
    };
  },
  computed: {
    ...mapGetters({ projectState: 'submit/projectStateForm' })
  },
  created () {
    if (Object.keys(this.$store.state.submit.basicInfo).length === 0) {
      this.$router.push('/submit');
    }
  },
  methods: {
    publish () {
      if (this.transaction !== '') {
        return;
      }
      const listener = WSSRepositoryFactory.createListener();
      this.listening = true;
      const command = CreateProjectCommand.of(
        this.$store.getters['submit/projectStateForm']
      );
      const transaction = command.toTransaction(
        1615853185,
        NetworkTypeResolver()
      );

      const qrCode = QRCodeGenerator.createTransactionRequest(
        transaction,
        NetworkTypeResolver(),
        this.$store.state.node.nodeInfo.networkGenerationHashSeed // network/node
      );
      qrCode
        .toBase64()
        .toPromise()
        .then((qrCodeBase64) => {
          this.transaction = qrCodeBase64;
        });
      listener.open().then(() => {
        listener.confirmed(ProjectJournalResolver()).subscribe((transaction) => {
          this.listening = false;
          this.confirmed = true;
          this.$store.dispatch('projects/addProject', transaction);
          listener.close();
        });
      });
    },
    back () {
      this.$router.go(-1);
    }
  }
});
</script>
