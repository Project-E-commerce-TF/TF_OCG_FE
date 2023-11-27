<template>
  <div class="flex w-3/4">
    <div class="col w-1/5">
      <div class="flex justify-around container mx-auto px-8 pt-20">
        <div class="flex">
          <div class="w-24 h-25 rounded-full overflow-hidden">
            <img
              class="w-full h-auto object-cover"
              src="../assets/images/jisoo.jpg"
              size="xs"
              alt="User's Profile Avatar"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="col w-4/5">
      <div class="container mx-auto py-8 pr-60">
        <div class="grid grid-cols-1 py-3">
          <div class="col-span-1 w-full flex justify-end">
            <button type="button" class="text-gray-500">Cancel</button>
          </div>
        </div>
        <div class="grid grid-cols-1 py-3">
          <div class="col-span-1">
            <h3 class="font-bold text-gray-500">Full Name</h3>
          </div>
        </div>
        <div class="grid grid-cols-1 py-3">
          <div class="col-span-1">
            <input
              id="fullName"
              class="px-4 py-3 rounded-lg border border-gray-100 mt-1 bg-grey_white w-full"
              type="text"
              placeholder="Example"
            />
          </div>
        </div>
        <div class="grid grid-cols-1 py-3">
          <div class="col-span-1">
            <h3 class="font-bold text-gray-500">Email</h3>
          </div>
        </div>
        <div class="grid grid-cols-1 py-3">
          <div class="col-span-1">
            <input
              id="email"
              class="px-4 py-3 rounded-lg border border-gray-100 mt-1 bg-grey_white w-full"
              type="text"
              placeholder="email@gmail.com"
            />
          </div>
        </div>
        <div class="grid grid-cols-1 py-3">
          <div class="col-span-1">
            <h3 class="font-bold text-gray-500">Password</h3>
          </div>
        </div>
        <div class="grid grid-cols-1 py-3">
          <div class="col-span-1">
            <input
              id="password"
              class="px-4 py-3 rounded-lg border border-gray-100 mt-1 bg-grey_white w-full"
              type="password"
              placeholder="12345678"
            />
          </div>
        </div>
        <div class="flex justify-between py-8">
          <div class="grid grid-cols-1">
            <div class="col-span-1 w-full flex justify-end">
              <button
                type="button"
                class="bg-primary text-white border-2 text-center px-9 py-3 font-bold rounded-lg"
              >
                Save Changes
              </button>
            </div>
          </div>
          <div class="grid grid-cols-1">
            <div class="col-span-1 w-full flex justify-end">
              <button
                type="button"
                class="bg-white text-primary border-2 text-center px-9 py-3 font-bold rounded-lg"
              >
                Change Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
