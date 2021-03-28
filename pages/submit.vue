<template>
  <div>
    <form>
      <div>
        <div class="text-center">
          <h1 class="text-5xl mb-10">
            Submit your project
          </h1>
        </div>
        <SubmitBasicInfo />
      </div>

      <div class="hidden sm:block" aria-hidden="true">
        <div class="py-5">
          <div class="border-t border-gray-200" />
        </div>
      </div>

      <SubmitTokenInfo />

      <div class="hidden sm:block" aria-hidden="true">
        <div class="py-5">
          <div class="border-t border-gray-200" />
        </div>
      </div>

      <SubmitSocialMedia />

      <div class="text-right mt-5">
        <button
          type="submit"
          class="ml-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Continue
        </button>
      </div>
    </form>
  </div>
</template>
