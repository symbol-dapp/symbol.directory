<template>
  <div class="mt-10 sm:mt-0">
    <div class="md:grid md:grid-cols-3 md:gap-6">
      <div class="md:col-span-1">
        <div class="px-4 sm:px-0">
          <h3 class="text-lg font-medium leading-6 text-gray-900">
            Social Media
            <span class="ml-2 text-gray-500 text-base">Optional</span>
          </h3>
        </div>
      </div>
      <div class="mt-5 md:mt-0 md:col-span-2">
        <form action="#" method="POST">
          <div class="shadow overflow-hidden sm:rounded-md">
            <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
              <div class="grid grid-cols-6 gap-6">
                <div class="col-span-6 sm:col-span-3">
                  <div class="mt-1 relative rounded-md shadow-sm">
                    <div
                      class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                    >
                      <img src="/images/twitter.svg" width="20" height="20" />
                    </div>
                    <input
                      type="text"
                      name="twitter"
                      id="twitter"
                      class="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                      placeholder="Add your product's Twitter URL"
                    />
                  </div>
                </div>
                <div class="col-span-6 sm:col-span-3">
                  <div class="mt-1 relative rounded-md shadow-sm">
                    <div
                      class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                    >
                      <!-- Heroicon name: solid/mail -->
                      <img src="/images/reddit.svg" width="20" height="20" />
                    </div>
                    <input
                      type="text"
                      name="reddit"
                      id="reddit"
                      class="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                      placeholder="Add your product's Reddit URL"
                    />
                  </div>
                </div>
                <div class="col-span-6 sm:col-span-3">
                  <div class="mt-1 relative rounded-md shadow-sm">
                    <div
                      class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                    >
                      <!-- Heroicon name: solid/mail -->
                      <img src="/images/facebook.svg" width="20" height="20" />
                    </div>
                    <input
                      type="text"
                      name="facebook"
                      id="facebook"
                      class="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                      placeholder="Add your product's Facebook URL"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
