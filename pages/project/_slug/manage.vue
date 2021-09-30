<template>
  <div class="py-4">
    <div class="rounded-md bg-red-100 p-4 shadow shadow-lg mb-10">
      <div class="flex">
        <div class="flex-shrink-0">
          <!--<XCircleIcon class="h-5 w-5 text-red-400" aria-hidden="true" />-->
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
    <div class="my-4">
      <SubmitSocialMedia @socialMedia="socialMediaChange" />
      <div class="text-right mt-2">
        <button
          class="ml-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          @click="updateSocialMedia"
        >
          Update Social Media
        </button>
      </div>
    </div>
    <div ref="announcer">
      <Announcer :transaction="transaction" :on-confirmed="onConfirmed" :go-to-path="goToPath" call-to-action="Social Media Updated!" />
    </div>
  </div>
</template>

<script lang="ts">
import { QRCodeGenerator } from 'symbol-qr-library';
import { Transaction } from 'symbol-sdk';
import Vue from 'vue';
import Project, { SocialMedia } from '~/models/project/Project';
import RemoveProjectCommand from '~/models/project/RemoveProjectCommand';
import { UpdateSocialCommand } from '~/models/project/UpdateSocialMediaCommand';
import NetworkTypeResolver from '~/services/NetworkTypeResolver';

export default Vue.extend({
  asyncData ({ params }) {
    const slug = params.slug;
    return { slug };
  },
  data () {
    return {
      slug: undefined,
      transaction: '',
      socialMedia: undefined as SocialMedia | undefined,
      goToPath: '',
      callToAction: '',
      action: ''
    };
  },
  computed: {
    project () {
      return this.$store.state.projects.projects.find((project: Project) => project.state.name === this.slug);
    }
  },
  created () {
    this.$store.commit('submit/storeProject', this.project.state, { root: true });
  },
  methods: {
    onConfirmed (transaction: Transaction) {
      if (this.action === 'deleteProject') {
        this.onDeletion(transaction);
      } else if (this.action === 'updateSocialMedia') {
        this.onUpdateSocialMedia(transaction);
      }
    },
    deleteProject () {
      this.action = 'deleteProject';
      this.goToPath = '/';
      this.callToAction = 'Project Removed';
      (this.$refs.announcer as HTMLElement).scrollIntoView({ behavior: 'smooth' });
      const command = RemoveProjectCommand.of(
        this.project.state.name
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
    },
    updateSocialMedia () {
      (this.$refs.announcer as HTMLElement).scrollIntoView({ behavior: 'smooth' });
      this.action = 'updateSocialMedia';
      this.goToPath = `/project/${this.project.state.name}`;
      this.callToAction = 'Social Media updated!';
      const command = UpdateSocialCommand.of(
        this.project.state.name,
        this.socialMedia!
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
    },
    onUpdateSocialMedia (transaction: Transaction) {
      this.$store.dispatch('projects/updateSocialMedia', transaction, { root: true });
    },
    onDeletion (transaction: Transaction) {
      this.$router.push('/');
      this.$store.dispatch('projects/removeProject', transaction, { root: true });
    },
    socialMediaChange (data: any) {
      this.socialMedia = data;
    }
  }
});
</script>
