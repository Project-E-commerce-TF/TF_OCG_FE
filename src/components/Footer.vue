<template>
  <div class="footer h-full">
    <div
      class="info_company w-full h-full bg-grey_white flex flex-col items-center justify-center"
    >
      <div class="w-5/6 mt-9 h-4/5">
        <div class="contact row flex h-full w-full justify-between gap-10">
          <div class="contact_container col h-full">
            <div class="row my-2 text-center">
              <router-link to="/">
                <button class="w-38 h-12 border-none bg-transparent">
                  <img
                    :src="require('@/assets/images/logo_header.png')"
                    alt="logo_brand"
                    class="w-full object-cover rounded-2xl my-1"
                  />
                </button>
              </router-link>
            </div>
            <div class="row font-bold my-2 text-2xl">Subscribe Now</div>
            <div class="row my-2">
              Learn about new offers and get more deals by joining our
              newsletter
            </div>
            <div class="relative">
              <input
                type="text"
                class="border border-gray-300 pl-4 pr-10 py-2 focus:outline-none focus:border-primary w-full rounded-xl"
                placeholder="Email address"
              />
              <button
                class="h-full absolute right-0 top-0 bg-primary text-white px-4 py-2 rounded-r-xl"
              >
                Subscribe
              </button>
            </div>
          </div>
          <div class="contact_container col h-full">
            <div class="row text-2xl font-bold mb-8 text-primary">Reach us</div>
            <div class="w-full h-full">
              <div class="row h-full flex items-center my-4">
                <img
                  :src="require('@/assets/images/phone-call.png')"
                  alt="logo_brand"
                  class="w-1/9 h-1/9 object-cover"
                />
                <div class="col text-xl ml-4 text-primary">
                  (+971) 58 8284186
                </div>
              </div>
              <div class="row h-full flex items-center my-4">
                <img
                  :src="require('@/assets/images/phone.png')"
                  alt="logo_brand"
                  class="w-1/9 h-1/9 object-cover"
                />
                <div class="col text-xl ml-4 text-primary">
                  (+971) 58 8284186
                </div>
              </div>
              <div class="row h-full flex items-center my-4">
                <img
                  :src="require('@/assets/images/map-pin.png')"
                  alt="logo_brand"
                  class="w-1/9 h-1/9 object-cover"
                />
                <div class="col text-xl ml-4 text-primary">
                  View Store Location
                </div>
              </div>
            </div>
          </div>
          <div class="contact_container col h-full">
            <div class="row text-2xl font-bold mb-8 text-primary">
              Categories
            </div>
            <div class="w-full h-full">
              <div class="row h-full text-xl text-primary my-4">Keyboard</div>
              <div class="row h-full text-xl text-primary my-4">Switch</div>
              <div class="row h-full text-xl text-primary my-4">Keycap</div>
              <div class="row h-full text-xl text-primary my-4">Mouse</div>
              <div class="row h-full text-xl text-primary my-4">Accessory</div>
            </div>
          </div>
          <div class="contact_container col h-full">
            <div class="row text-2xl font-bold mb-8 text-primary">Helpdesk</div>
            <div class="row text-xl text-primary my-4">Contact Us</div>
            <div class="row text-xl text-primary my-4">Privacy Policy</div>
            <div class="row text-xl text-primary my-4">Terms and Condition</div>
            <div class="row text-xl text-primary my-4">
              Shipping and Payment
            </div>
          </div>
        </div>
      </div>

      <hr class="bg-black w-full" />
      <div class="contact row flex my-9 justify-between w-5/6 h-1/5">
        <div class="col w-full">
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
              class="w-full h-full mt-4"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="info_bank row bg-primary h-full pl-32">
      <div class="py-4 flex items-center justify-between">
        <div class="col w-1/2">
          <div class="row text-grey_white">
            © 2021 Noor Al Samaa Bookshop. All rights reserved.
          </div>
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
<style>
@media screen and (max-width: 480px) {
  .footer {
    height: 100%;
  }
  .contact {
    flex-direction: column;
  }
  .contact_container {
    width: 100%;
  }
  .info_company {
    height: 100%;
  }
  .info_bank {
    display: none;
  }
}
</style>
