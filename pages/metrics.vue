<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <div>
    <h3 class="text-lg leading-6 font-medium text-gray-900">
      Impact of Symbol Directory Dapp
    </h3>
    <dl class="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
      <div class="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
        <dt class="text-sm font-medium text-gray-500 truncate">
          Total Transactions
        </dt>
        <dd class="mt-1 text-3xl font-semibold text-gray-900">
          {{ totalTransactions }}
        </dd>
      </div>
      <div class="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
        <dt class="text-sm font-medium text-gray-500 truncate">
          Aprox Total Fees
        </dt>
        <dd class="mt-1 text-3xl font-semibold text-gray-900">
          {{ fees.toString().substring(0, 6) }} XYM
        </dd>
      </div>
    </dl>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState({
      totalTransactions: state => state.metrics.transactionsProcessed,
      fees: state => state.metrics.totalFees
    })
  }
};
</script>
