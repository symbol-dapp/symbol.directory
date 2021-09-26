<template>
  <div class="my-5">
    <div>
      <h2 class="text-xl font-bold text-gray-900">
        Reviews
      </h2>
      <div v-if="reviews.length === 0" class="my-5 p-5 bg-white flex justify-center shadow sm:rounded-lg">
        No reviews yet
      </div>
      <div class="my-5 px-5 bg-white shadow sm:rounded-lg">
        <div v-for="(review, reviewIdx) in reviews" :key="review.id" class="flex text-sm text-gray-500 space-x-4">
          <div :class="[reviewIdx === 0 ? '' : 'border-t border-gray-200', 'flex-1 py-10']">
            <h3 class="font-medium text-gray-900">{{ review.author.address.pretty() }}</h3>

            <div class="flex items-center mt-4">
              <ul class="flex justify-center">
                <li v-for="rating in [1, 2, 3, 4, 5]" :key="rating">
                  <i :class="[review.state.rate >= rating ? 'fas' : 'far', 'fa-star fa-sm text-yellow-500 mr-1']" />
                </li>
              </ul>
            </div>
            <p class="sr-only">{{ review.rating }} out of 5 stars</p>

            <div class="mt-4 prose prose-sm max-w-none text-gray-500" >
              {{ review.state.content }}
            </div>
          </div>
        </div>
      </div>
      <h2 class="text-xl font-bold text-gray-900">
        Write a review
      </h2>
      <form v-on:submit.prevent="publish" class="my-5 p-5 space-y-8 divide-y divide-gray-200 bg-white shadow sm:rounded-lg">
        <div>
          <div class="flex items-center mt-4">
            <ul class="flex justify-center">
              <li v-for="rating in [1, 2, 3, 4, 5]" :key="rating">
                <i :class="[reviewRating >= rating ? 'fas' : 'far', 'fa-star fa-sm text-yellow-500 mr-1 cursor-pointer']" @click="reviewAs(rating)" />
              </li>
            </ul>
          </div>
          <div class="mt-4">
            <label for="about" class="block text-sm font-medium text-gray-700">
              Comment
            </label>
            <div class="mt-1">
              <textarea v-model="content" id="about" name="about" rows="3" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md" />
            </div>
            <p class="mt-2 text-sm text-gray-500">Write a few sentences about the project.</p>
          </div>
        </div>
        <div class="pt-5">
          <div class="flex justify-end">
            <button type="submit" class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Publish
            </button>
          </div>
        </div>
        <Announcer :transaction="transaction" :on-confirmed="onConfirmed" :go-to-path="undefined" />
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { QRCodeGenerator } from 'symbol-qr-library';
import { NetworkType, Transaction } from 'symbol-sdk';
import Vue from 'vue';
import { PublishReviewCommand } from '~/models/review/PublishReviewCommand';

export default Vue.extend({
  name: 'ProjectReviews',
  props: {
    reviews: {
      type: Array,
      default: () => []
    },
    projectId: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      reviewRating: 0,
      content: '',
      transaction: ''
    };
  },
  methods: {
    reviewAs (rating: number) {
      this.reviewRating = rating;
    },
    publish () {
      const command = PublishReviewCommand.of(
        this.projectId,
        {
          rate: this.reviewRating,
          content: this.content
        },
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
    onConfirmed (transaction: Transaction) {
      this.$store.dispatch('projects/addReview', transaction);
    }
  }
});
</script>
