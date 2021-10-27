<template>
  <div class="py-8 px-4 overflow-hidden sm:px-6 lg:px-8 lg:py-12">
    <div class="max-w-xl mx-auto">
      <div class="text-center">
        <h1 class="text-3xl md:text-4xl  leading-6 font-semibold text-gray-900">
          <icon emoji="/icons/email.svg" class="w-12" /> Contact me
        </h1>
      </div>
      <div class="mt-12">
        <form
          name="contactme"
          class="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8"
          data-netlify="true"
          netilfy
        >
          <input type="hidden" name="form-name" value="contactme" />
          <p class="hidden">
            <label>Don’t fill this out if you’re human: <input
              name="bot-field"
            ></label>
          </p>
          <div class="sm:col-span-2">
            <label
              for="name"
              class="block text-sm font-medium text-gray-700"
            >Name</label>
            <div class="mt-1">
              <input
                id="name"
                v-model="name"
                type="text"
                name="name"
                autocomplete="given-name"
                placeholder="John Doe"
                class="py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
              >
            </div>
          </div>
          <div class="sm:col-span-2">
            <label
              for="email"
              class="block text-sm font-medium text-gray-700"
            >Email</label>
            <div class="mt-1">
              <input
                id="email"
                v-model="email"
                name="email"
                type="email"
                autocomplete="email"
                placeholder="youremail@thatisnotfake.com"
                class="py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
              >
            </div>
          </div>
          <div class="sm:col-span-2">
            <label
              for="message"
              class="block text-sm font-medium text-gray-700"
            >Message</label>
            <div class="mt-1">
              <textarea
                id="message"
                v-model="message"
                name="message"
                rows="4"
                placeholder="Your message here..."
                class="py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
              />
            </div>
          </div>
          <div class="sm:col-span-2">
            <div class="flex items-start">
              <div class="flex-shrink-0">
                <!-- Enabled: "bg-indigo-600", Not Enabled: "bg-gray-200" -->
                <button
                  type="button"
                  :class="{
                    'bg-indigo-600': agreed,
                    'bg-gray-200': !agreed
                  }"
                  class="relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  aria-pressed="false"
                  @click="toggleAgree()"
                >
                  <span class="sr-only">Agree</span>
                  <!-- Enabled: "translate-x-5", Not Enabled: "translate-x-0" -->
                  <span
                    v-bind:class="{
                      'translate-x-5': agreed,
                      'translate-x-0': !agreed
                    }"
                    aria-hidden="true"
                    class="inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
                  />
                </button>
              </div>
              <div class="ml-3">
                <p class="text-base text-gray-500">
                  By selecting this, I understand that this form is storing my
                  submitted information so I can be contacted.
                </p>
              </div>
            </div>
          </div>
          <div class="sm:col-span-2">
            <button
              :disabled="completed"
              type="submit"
              :class="{ 'cursor-not-allowed opacity-50': completed }"
              class="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Let's talk
            </button>
          </div>
        </form>
      </div>
      <div class="relative mt-10">
        <div class="absolute inset-0 flex items-center" aria-hidden="true">
          <div class="w-full border-t border-gray-300" />
        </div>
        <div class="relative flex justify-center">
          <span class="px-2 bg-gray-100 text-sm text-gray-500">
            OR
          </span>
        </div>
      </div>
      <div class="mt-5 text-gray-500 flex flex-inline justify-center">
        <a href="https://twitter.com/symboldapp" target="__blank">
          <span>Feel free to drop me a</span>
          <span class="text-blue-500 mx-1">tweet</span>
          <img src="/images/twitter.svg" class="h-5 w-5 inline">
        </a>
      </div>
    </div>
  </div>
</template>
<script>
function encode (data) {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&');
}

export default {
  data () {
    return {
      name: '',
      email: '',
      message: '',
      agreed: false
    };
  },
  computed: {
    completed () {
      return (
        this.name === '' ||
        this.email === '' ||
        this.message === '' ||
        !this.agreed
      );
    }
  },
  methods: {
    toggleAgree () {
      this.agreed = !this.agreed;
    },
    onSubmit (event) {
      event.preventDefault();
      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({
          'form-name': event.target.getAttribute('name'),
          name: this.name,
          reason: this.reason,
          email: this.email,
          message: this.message,
          agreed: this.agreed
        })
      })
        .then(() => this.$router.push({ path: '/success-form' }))
        .catch(error => alert(error));
    }
  }
};
</script>
