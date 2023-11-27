<template>
  <div class="footer h-15">
    <div
      class="infoCompany px-32 bg-grey_white flex flex-col h-150 justify-around"
    >
      <div class="contact row flex">
        <div class="col w-2/6">
          <div class="row mb-16">
            <router-link to="/">
              <button class="w-38 h-12 border-none bg-transparent">
                <img
                  :src="require('@/assets/images/logo_header.png')"
                  alt="logo_brand"
                  class="w-full h-full object-cover"
                />
              </button>
            </router-link>
          </div>
          <div class="row font-bold mb-4 text-2xl">Subscribe Now</div>
          <div class="row mb-8">
            Learn about new offers and get more deals by joining our newsletter
          </div>
          <div class="relative">
            <input
              type="text"
              class="border border-gray-300 pl-4 pr-10 py-2 focus:outline-none focus:border-primary w-full"
              placeholder="Email address"
            />
            <button
              class="absolute right-0 top-0 bg-primary text-white px-4 py-2 rounded-lg"
            >
              Subscribe
            </button>
          </div>
        </div>
        <div class="col w-2/6 ml-20">
          <div class="row text-2xl font-bold mb-8 text-primary">Reach us</div>
          <div class="row flex w-full">
            <div class="col w-8 mr-4">
              <img
                :src="require('@/assets/images/icon_contact.png')"
                alt="icon_search"
                class="w-full h-full"
              />
            </div>
            <div class="col">
              <div class="col text-xl mb-16 text-primary">
                (+971) 58 8284186
              </div>
              <div class="col text-xl mb-16 text-primary">
                (+971) 58 8284186
              </div>
              <div class="col text-xl text-primary">View Store Location</div>
            </div>
          </div>
        </div>
        <div class="col w-1/6">
          <div class="row text-2xl font-bold mb-8 text-primary">Categories</div>
          <div class="row text-xl mb-8 text-primary">Books</div>
          <div class="row text-xl mb-8 text-primary">Stationery</div>
          <div class="row text-xl mb-8 text-primary">Art & Craft</div>
          <div class="row text-xl text-primary">Classroom & Supplies</div>
        </div>
        <div class="col w-1/6 ml-6">
          <div class="row text-2xl font-bold mb-8 text-primary">Helpdesk</div>
          <div class="row text-xl mb-8 text-primary">Contact Us</div>
          <div class="row text-xl mb-8 text-primary">Privacy Policy</div>
          <div class="row text-xl mb-8 text-primary">Terms and Condition</div>
          <div class="row text-xl text-primary">Shipping and Payment</div>
        </div>
      </div>

      <div class="row flex justify-between">
        <div class="col w-1/3">
          <div class="row text-primary font-bold text-2xl">
            Delivery Charges:
          </div>
          <div class="row text-primary text-xl">
            UAE - AED 15 | Oman - AED 30 Free shipping over AED 200
          </div>
        </div>
        <div class="col flex items-center">
          <div class="row">
            <img
              :src="require('@/assets/images/icon_social_network.png')"
              alt="icon_search"
              class="w-full h-full"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="row flex bg-primary h-20 items-center justify-between pl-32">
      <div class="col w-1/2">
        <div class="row text-grey_white">
          © 2021 Noor Al Samaa Bookshop. All rights reserved.
        </div>
      </div>
      <div class="col w-1/2">
        <div class="row flex justify-around items-center pr-32">
          <div class="col text-grey_white">We accept these payment methods</div>
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
</template>
<style>
@media screen and (max-width: 480px) {
  .footer {
    display: none;
  }
}
</style>
