<template>
  <div class="my-10">
    <div class="flex border-2 rounded-2xl w-full">
      <div class="col p-6 w-full">
        <div class="row flex justify-between border-b-2 pb-2">
          <div class="col">
            <div class="row font-bold">{{ order.status }}</div>
            <div class="row font-bold">{{ formattedOrderDate }}</div>
          </div>
          <div class="col font-bold">{{ order.shippingAddress }}</div>
          <div class="col">
            <div class="row font-bold">ORDER</div>
            <div class="row font-bold text-right">#{{ order.orderId }}</div>
          </div>
        </div>
        <div class="row flex justify-between mt-4">
          <div class="col flex">
            <img
              :src="require('@/assets/images/image_order.png')"
              alt="logo_brand"
              class="w-full h-full mr-4 object-cover"
            />
            <div class="col flex flex-col justify-center h-full w-full">
              <div class="row font-bold">Item Total</div>
              <div class="row font-bold">{{ orderDetailsLength }} Items</div>
            </div>
          </div>
          <div class="col flex flex-col justify-center items-end">
            <div class="row font-bold text-right">Total</div>
            <div class="row font-bold text-2xl text-right">
              {{ order.totalPrice.toFixed(2) }} VND
            </div>
            <div v-if="order.status === 'order being delivered'">
              <div
                class="border-2 rounded-xl p-2 font-bold text-white bg-primary text-center w-fit"
              >
                <button @click="completeOrder(order.orderId)">
                  Complete the Order
                </button>
              </div>
            </div>

            <div v-else-if="order.status === 'complete the order'">
              <div
                class="border-2 rounded-xl p-2 font-bold text-white bg-primary"
              >
                <template v-if="!isReviewed">
                  <button
                    @click="addReviews"
                    :class="{ 'btn-disabled': isReviewed.value }"
                  >
                    Add Reviews
                  </button>
                </template>
                <template v-else>
                  <div class="text-gray-400">Reviewed</div>
                </template>
              </div>
            </div>
          </div>
        </div>
        <div v-if="showReviewForm">
          <div
            v-for="variant in variants"
            :key="variant.variantId"
            class="border-4 rounded-lg my-4 p-2"
          >
            <div class="flex bg-grey_white rounded-lg">
              <img
                :src="variant.image"
                alt="variant-image"
                class="w-24 h-24 object-cover mr-2 rounded-xl"
              />
              <div class="flex flex-col justify-center">
                <div class="font-bold">{{ variant.title }}</div>
                <div class="font-bold">{{ variant.price }} VND</div>
              </div>
            </div>
            <form
              @submit.prevent="
                submitReview(variant.variantId, variant.orderDetailId)
              "
              v-if="!variant.isReview"
            >
              <div>
                <label for="rating" class="font-bold mr-1">Rating:</label>
                <div class="flex">
                  <img
                    v-for="star in 5"
                    :key="star"
                    :src="getStarImage(star, variant)"
                    alt="star"
                    @click="setRating(star, variant)"
                    :class="{ 'selected-star': star <= variant.rating }"
                    class="cursor-pointer w-[20px]"
                  />
                </div>
              </div>
              <label for="review text-" class="font-bold">Review:</label>
              <div class="border-2 w-full">
                <textarea id="review" class="w-full" v-model="variant.review" />
              </div>
              <div class="m-2">
                <button
                  type="submit"
                  class="font-bold border-2 p-2 bg-primary text-white rounded-xl"
                >
                  Submit Review
                </button>
              </div>
            </form>
            <div v-else>
              <div class="text-gray-400 text-save font-bold mt-2">Reviewed</div>
            </div>
          </div>
          <div class="flex justify-end">
            <button
              type="submit"
              @click="closeReviewForm"
              class="border-2 p-2 rounded-xl bg-primary font-bold text-white"
            >
              Done
            </button>
          </div>
        </div>
      </div>
      <!-- Updated router-link to dynamically include orderId -->
      <router-link
        :to="{ name: 'OrderDetail', params: { orderId: order.orderId } }"
        class="bg-grey_white flex flex-col justify-center items-center"
      >
        <img
          :src="require('@/assets/images/chevron-right.png')"
          alt="logo_brand"
          class="w-5 h-5 mx-3 object-cover"
        />
      </router-link>
    </div>
  </div>
</template>

<script>
import { ref, watch, computed } from "vue";
import { fetchData } from "@/utils/axiosFetchApi";

export default {
  props: {
    order: {
      type: Object,
      required: true,
    },
  },
  setup(props, context) {
    const orderDetailsLength = ref(0);
    const showReviewForm = ref(false);
    const review = ref("");
    const isReviewed = ref(false);
    const variants = ref([]);
    const selectedVariant = ref(null);
    const rating = ref(0);
    const emptyStar = require("@/assets/images/empty-star.png");
    const filledStar = require("@/assets/images/star.png");

    const formattedOrderDate = computed(() => {
      if (props.order && props.order.orderDate) {
        return props.order.orderDate.substring(0, 10);
      }
      return "";
    });

    watch(
      () => props.order,
      () => {
        if (props.order) {
          orderDetailsLength.value = props.order.orderDetails.length;
        }
      },
      { immediate: true }
    );

    const completeOrder = async () => {
      try {
        const response = await fetch(
          `${process.env.VUE_APP_URL}/order/complete`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              orderId: props.order.orderId,
            }),
          }
        );

        if (response.ok) {
          console.log("Order marked as complete successfully");
          context.emit("complete-order", props.order.orderId);
        } else {
          console.error(
            "Failed to mark order as complete. Server responded with:",
            response.status,
            response.statusText
          );
        }
      } catch (error) {
        console.error("Error completing order:", error);
      }
    };

    const fetchVariants = async () => {
      try {
        const response = await fetch(
          `${process.env.VUE_APP_URL}/variant/get-variant-by-order-id?orderID=${props.order.orderId}`
        );

        if (response.ok) {
          const data = await response.json();
          variants.value = data.variants.map((variant) => ({
            ...variant,
            rating: 0,
            review: "",
            isReviewed: false,
            reviewSubmitted: false,
          }));
          console.log("variants:", variants.value);
        } else {
          console.error(
            "Failed to fetch variants. Server responded with:",
            response.status,
            response.statusText
          );
        }
      } catch (error) {
        console.error("Error fetching variants:", error);
      }
    };

    const closeReviewForm = () => {
      showReviewForm.value = false;
    };

    const addReviews = async () => {
      showReviewForm.value = true;

      if (!variants.value.length) {
        await fetchVariants();
      }
    };
    const submitReview = async (variantId, orderDetailId) => {
      const variant = variants.value.find((v) => v.variantId === variantId);
      if (!variant) {
        console.error("Variant not found");
        return;
      }

      try {
        const url = `${process.env.VUE_APP_URL}/review/add-review?orderDetailId=${orderDetailId}`;

        const data = {
          variantID: variantId,
          rating: variant.rating,
          comment: variant.review,
        };

        const headers = {
          "Content-Type": "application/json",
        };

        const response = await fetchData(
          url,
          "POST",
          JSON.stringify(data),
          headers
        );

        if (response) {
          console.log("Review submitted successfully");
          variant.isReviewed = true;
          variant.reviewSubmitted = true;
          await fetchVariants();
        } else {
          console.error(
            "Failed to submit review. Server responded with:",
            response.status,
            response.statusText
          );
          // Handle error scenarios if needed
        }
      } catch (error) {
        console.error("Error submitting review:", error);
        // Handle error scenarios if needed
      } finally {
        // Optionally, you can reset the review form state here
        variant.review = "";
        variant.rating = 0;
      }
    };
    const setRating = (star, variant) => {
      variant.rating = star;
    };

    // Phương thức để lấy đường dẫn hình ảnh của sao
    const getStarImage = (star, variant) => {
      return star <= variant.rating ? filledStar : emptyStar;
    };

    return {
      orderDetailsLength,
      formattedOrderDate,
      completeOrder,
      addReviews,
      showReviewForm,
      review,
      isReviewed,
      rating,
      submitReview,
      setRating,
      getStarImage,
      variants,
      selectedVariant,
      fetchVariants,
      closeReviewForm,
    };
  },
};
</script>

<style>
.btn-disabled {
  background-color: gray;
  cursor: not-allowed;
}
</style>
