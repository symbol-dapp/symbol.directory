<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <div>
    <h3 class="text-lg leading-6 font-medium text-gray-900">
      Impact of Symbol Directory Dapp
    </h3>
    <dl class="my-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
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
          Total Fees
        </dt>
        <dd class="mt-1 text-3xl font-semibold text-gray-900">
          {{ fees.toString().substring(0, 6) }} XYM
        </dd>
      </div>
      <div class="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
        <dt class="text-sm font-medium text-gray-500 truncate">
          Total Users
        </dt>
        <dd class="mt-1 text-3xl font-semibold text-gray-900">
          {{ userMetrics.length }}
        </dd>
      </div>
      <div class="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
        <dt class="text-sm font-medium text-gray-500 truncate">
          Total projects
        </dt>
        <dd class="mt-1 text-3xl font-semibold text-gray-900">
          {{ numProjects }}
        </dd>
      </div>
      <div class="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
        <dt class="text-sm font-medium text-gray-500 truncate">
          Total reviews
        </dt>
        <dd class="mt-1 text-3xl font-semibold text-gray-900">
          {{ numReviews }}
        </dd>
      </div>
    </dl>
    <h3 class="text-lg leading-6 font-medium text-gray-900">
      Top Transactioners
    </h3>
    <div class="flex flex-col my-5">
      <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Address
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Num Transactions
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="user in userMetrics" :key="user.address">
                  <td class="px-6 py-4 font-mono whitespace-nowrap text-sm font-medium text-gray-900">
                    <a
                      :href="`http://explorer.symbolblockchain.io/accounts/${user.address}`"
                      target="_blank"
                      class="hover:text-indigo-500"
                    >{{ user.address }}</a>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ user.transactions }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import _ from 'lodash';

export default {
  computed: {
    ...mapState({
      numProjects: state => state.projects.projects.length,
      numReviews: state => state.projects.projects.map(_ => _.state.reviews.length).reduce((prev, next) => prev + next, 0),
      totalTransactions: state => state.metrics.transactionsProcessed,
      fees: state => state.metrics.totalFees,
      userMetrics: state => _.orderBy(state.metrics.users, 'transactions', 'desc')
    })
  }
};
</script>
