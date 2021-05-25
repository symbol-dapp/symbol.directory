<template>
  <div>
    <p>{{ data }}</p>
    <div>
      <img :src="transaction" />
    </div>
    <div>
      {{ transaction }}
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import {
  Deadline,
  Message,
  NetworkType,
  PlainMessage,
  TransferTransaction
} from "symbol-sdk";
import { QRCodeGenerator, TransactionQR } from "symbol-qr-library";
import { mapState } from "vuex";
import { CreateProjectCommand } from "~/models/project/CreateProjectCommand";

export default Vue.extend({
  data() {
    return {
      transaction: ""
    };
  },
  computed: mapState({
    data: (state: any) => {
      const command = CreateProjectCommand.of(
        state.submit,
        NetworkType.TEST_NET
      );
      return JSON.stringify(
        command.toTransaction(1573430400, NetworkType.TEST_NET)
      );
    }
  }),
  created() {
    const command = CreateProjectCommand.of(
      this.$store.state.submit,
      NetworkType.TEST_NET
    );
    const transaction = command.toTransaction(1573430400, NetworkType.TEST_NET);

    const qrCode = QRCodeGenerator.createTransactionRequest(transaction, NetworkType.TEST_NET, '3B5E1FA6445653C971A50687E75E6D09FB30481055E3990C84B25E9222DC1155');
    qrCode.toBase64().toPromise().then((qrCodeBase64) => {
      this.transaction = qrCodeBase64;
    })
  }
});
</script>
