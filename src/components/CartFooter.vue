<template>
  <div class="footer h-full">
    <div class="info_bank row bg-primary h-full pl-32">
      <div class="py-4 flex items-center justify-between">
        <div class="col w-1/2 flex">
          <div class="row text-grey_white mr-2">Need help?</div>
          <div class="row text-grey_white">Contact us</div>
        </div>
        <div class="col w-1/2">
          <div class="row flex justify-around items-center pr-32">
            <div class="col text-grey_white">
              We accept these payment methods
            </div>
            <div class="col flex flex-col justify-center items-center">
              <div class="row h-6 w-8">
                <img
                  :src="require('@/assets/images/icon_cash.png')"
                  alt="icon_search"
                  class="w-full h-full"
                />
              </div>
              <div class="row text-grey_white text-xs">Cash</div>
            </div>
            <div class="col flex flex-col justify-center items-center">
              <div class="row h-6 w-8">
                <img
                  :src="require('@/assets/images/icon_bank.png')"
                  alt="icon_search"
                  class="w-full h-full"
                />
              </div>
              <div class="row text-grey_white text-xs">Bank transfer</div>
            </div>
            <div class="col col flex flex-col justify-center items-center">
              <div class="row flex justify-center items-center">
                <div class="col h-6 w-8 mr-2">
                  <img
                    :src="require('@/assets/images/logo_visa.png')"
                    alt="icon_search"
                    class="w-full h-full"
                  />
                </div>
                <div class="col h-6 w-8">
                  <img
                    :src="require('@/assets/images/logo_visa2.png')"
                    alt="icon_search"
                    class="w-full h-full"
                  />
                </div>
              </div>
              <div class="row text-grey_white text-xs">Cards</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
