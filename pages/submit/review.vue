<template>
  <div>
    <ProjectDisplay :projectState="projectState" />
    <div
      class="mt-6 flex flex-col-reverse justify-stretch space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-center sm:space-x-reverse sm:space-y-0 sm:space-x-3 md:mt-0 md:flex-row md:space-x-3"
    >
      <button
        @click="back"
        type="button"
        class="inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
      >
        Review Project Info
      </button>
      <button
        type="button"
        class="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
      >
        Let's publish it!
      </button>
    </div>
    <p>Scan and sign the transaction to list your project</p>
    <div>
      <img id="qrCode" :src="transaction" />
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { mapGetters } from "vuex";
import { NetworkType } from "symbol-sdk";
import { QRCodeGenerator } from "symbol-qr-library";
import { CreateProjectCommand } from "~/models/project/CreateProjectCommand";

export default Vue.extend({
  data() {
    return {
      transaction: ""
    };
  },
  methods: {
    init: function() {
      const command = CreateProjectCommand.of(
        this.$store.getters["submit/projectStateForm"],
        NetworkType.TEST_NET
      );
      const transaction = command.toTransaction(
        1615853185,
        NetworkType.TEST_NET
      );

      const qrCode = QRCodeGenerator.createTransactionRequest(
        transaction,
        NetworkType.TEST_NET,
        "3B5E1FA6445653C971A50687E75E6D09FB30481055E3990C84B25E9222DC1155"
      );
      qrCode
        .toBase64()
        .toPromise()
        .then(qrCodeBase64 => {
          this.transaction = qrCodeBase64;
        });
    },
    back: function() {
      this.$router.go(-1);
    }
  },
  created() {
    if (Object.keys(this.$store.state.submit.basicInfo).length === 0) {
      this.$router.push("/submit");
    }
    this.init();
  },
  computed: {
    ...mapGetters({ projectState: "submit/projectStateForm" })
  }
});
</script>
