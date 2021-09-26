<template>
  <div class="py-4">
    <div class="rounded-md bg-red-100 p-4 shadow shadow-lg mb-10">
      <div class="flex">
        <div class="flex-shrink-0">
          <XCircleIcon class="h-5 w-5 text-red-400" aria-hidden="true" />
        </div>
        <div class="ml-3">
          <h3 class="text-sm font-medium text-red-800">
            Only the owner of the project can manage it!!!
          </h3>
          <div class="mt-2 text-sm text-red-700">
            <p>
              If you announce the transaction with the intention of modification, and you're not the owner, nothing will happen
            </p>
            <p class="font-bold mt-2">
              OWNER: <span class="font-mono"> {{ project.owner.address.pretty() }}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
    <ProjectDisplay :project-state="project.state" :show-control-buttons="true" />
    <div class="flex justify-end mt-4">
      <button @click="deleteProject" type="button" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
        Delete Project
      </button>
    </div>
    <Announcer :transaction="transaction" :on-confirmed="onDeletion" go-to-path="/" call-to-action="Project Removed!" />
  </div>
</template>

<script lang="ts">
import { QRCodeGenerator } from 'symbol-qr-library';
import { NetworkType, Transaction } from 'symbol-sdk';
import Vue from 'vue';
import Project from '~/models/project/Project';
import RemoveProjectCommand from '~/models/project/RemoveProjectCommand';

export default Vue.extend({
  asyncData ({ params }) {
    const slug = params.slug;
    return { slug };
  },
  data () {
    return {
      slug: undefined,
      transaction: ''
    };
  },
  computed: {
    project () {
      return this.$store.state.projects.projects.find((project: Project) => project.state.name === this.slug);
    }
  },
  methods: {
    deleteProject () {
      const command = RemoveProjectCommand.of(
        this.project.state.name,
        NetworkType.TEST_NET
      );
      const transaction = command.toTransaction(
        1615853185,
        NetworkType.TEST_NET
      );

      const qrCode = QRCodeGenerator.createTransactionRequest(
        transaction,
        NetworkType.TEST_NET,
        '3B5E1FA6445653C971A50687E75E6D09FB30481055E3990C84B25E9222DC1155' // network/node
      );
      qrCode
        .toBase64()
        .toPromise()
        .then((qrCodeBase64) => {
          this.transaction = qrCodeBase64;
        });
    },
    onDeletion (transaction: Transaction) {
      this.$router.push('/');
      this.$store.dispatch('projects/removeProject', transaction);
    }
  }
});
</script>
