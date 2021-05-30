<template>
  <div>
    <ProjectDisplay :projectState="projectState" />
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
        @click="back"
        type="button"
        class="inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
      >
        Review Project Info
      </button>
      <button
        @click="publish"
        type="button"
        class="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
      >
        Let's publish it!
      </button>
    </div>
    <transition name="fade">
      <div
        class="bg-white shadow sm:rounded-lg mt-10"
        v-if="transaction !== ''"
      >
        <div class="px-4 py-5 sm:p-6">
          <h3 class="text-lg leading-6 font-medium text-gray-900 text-center">
            Scan the QR Code in your Symbol Wallet
          </h3>
          <div class="grid grid-cols-2 gap-4">
            <div class="flex justify-center items-center">
              <img id="qrCode" :src="transaction" />
            </div>
            <!-- ... -->
            <div v-if="listening" class="flex justify-center items-center">
              <div>
                <p class="text-md text-gray-800">
                  Waiting the Transaction to be confirmed
                </p>
                <div class="flex justify-center mt-5">
                  <div class="sk-chase">
                    <div class="sk-chase-dot"></div>
                    <div class="sk-chase-dot"></div>
                    <div class="sk-chase-dot"></div>
                    <div class="sk-chase-dot"></div>
                    <div class="sk-chase-dot"></div>
                    <div class="sk-chase-dot"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { mapGetters } from "vuex";
import { Listener, NetworkType, RepositoryFactoryHttp } from "symbol-sdk";
import { QRCodeGenerator } from "symbol-qr-library";

import { CreateProjectCommand } from "~/models/project/CreateProjectCommand";

const nodeUrl = "http://ngl-dual-101.testnet.symboldev.network:3000";
const repositoryFactory = new RepositoryFactoryHttp(nodeUrl);
const listener = new Listener(
  nodeUrl,
  repositoryFactory.createNamespaceRepository(),
  WebSocket
);

listener.open(() => {
  listener.newBlock().subscribe(_ => {
    console.log("newBlock", _);
  });
});

export default Vue.extend({
  components: {},
  data() {
    return {
      transaction: "",
      listening: false
    };
  },
  methods: {
    publish: function() {
      if (this.transaction !== "") {
        return;
      }
      this.listening = true;
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
  },
  computed: {
    ...mapGetters({ projectState: "submit/projectStateForm" })
  }
});
</script>
<style>
.sk-chase {
  width: 40px;
  height: 40px;
  position: relative;
  animation: sk-chase 2.5s infinite linear both;
}

.sk-chase-dot {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  animation: sk-chase-dot 2s infinite ease-in-out both;
}

.sk-chase-dot::before {
  content: "";
  display: block;
  width: 25%;
  height: 25%;
  background-color: #4f46e5;
  border-radius: 100%;
  animation: sk-chase-dot-before 2s infinite ease-in-out both;
}

.sk-chase-dot:nth-child(1) {
  animation-delay: -1.1s;
}

.sk-chase-dot:nth-child(2) {
  animation-delay: -1s;
}

.sk-chase-dot:nth-child(3) {
  animation-delay: -0.9s;
}

.sk-chase-dot:nth-child(4) {
  animation-delay: -0.8s;
}

.sk-chase-dot:nth-child(5) {
  animation-delay: -0.7s;
}

.sk-chase-dot:nth-child(6) {
  animation-delay: -0.6s;
}

.sk-chase-dot:nth-child(1)::before {
  animation-delay: -1.1s;
}

.sk-chase-dot:nth-child(2)::before {
  animation-delay: -1s;
}

.sk-chase-dot:nth-child(3)::before {
  animation-delay: -0.9s;
}

.sk-chase-dot:nth-child(4)::before {
  animation-delay: -0.8s;
}

.sk-chase-dot:nth-child(5)::before {
  animation-delay: -0.7s;
}

.sk-chase-dot:nth-child(6)::before {
  animation-delay: -0.6s;
}

@keyframes sk-chase {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes sk-chase-dot {
  80%,
  100% {
    transform: rotate(360deg);
  }
}

@keyframes sk-chase-dot-before {
  50% {
    transform: scale(0.4);
  }

  100%,
  0% {
    transform: scale(1);
  }
}
</style>
