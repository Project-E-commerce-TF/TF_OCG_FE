<template>
  <div class="father w-full">
    <div class="flex w-full son1">
      <!-- User Profile Section -->
      <div class="prf1 col w-1/5">
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

      <!-- User Information Section -->
      <div class="prf2 col w-4/5 h-[100%]">
        <div class="container mx-auto py-8 pr-60">
          <!-- Membership Button -->
          <div class="grid grid-cols-1 py-3">
            <div class="col-span-1 w-full flex justify-end">
              <button
                @click="showRankDetails"
                type="button"
                class="text-black font-bold bg-slate-200 py-1 px-3 rounded-full"
              >
                {{ user?.currentLevel }} member
              </button>
            </div>
          </div>

          <!-- Full Name -->
          <div class="grid grid-cols-1 py-3">
            <div class="col-span-1">
              <h3 class="font-bold text-gray-500">Full Name</h3>
            </div>
          </div>
          <div class="grid grid-cols-1 py-3">
            <div class="col-span-1">
              <div
                id="fullName"
                class="px-4 py-3 rounded-lg border border-gray-100 mt-1 bg-grey_white w-full"
                type="text"
                placeholder="Example"
              >
                {{ infoUser.userName }}
              </div>
            </div>
          </div>

          <!-- Email -->
          <div class="grid grid-cols-1 py-3">
            <div class="col-span-1">
              <h3 class="font-bold text-gray-500">Email</h3>
            </div>
          </div>
          <div class="grid grid-cols-1 py-3">
            <div class="col-span-1">
              <div
                id="email"
                class="px-4 py-3 rounded-lg border border-gray-100 mt-1 bg-grey_white w-full"
                type="text"
                placeholder="Example"
              >
                {{ infoUser.email }}
              </div>
            </div>
          </div>

          <!-- Phone -->
          <div class="grid grid-cols-1 py-3">
            <div class="col-span-1">
              <h3 class="font-bold text-gray-500">Phone</h3>
            </div>
          </div>
          <div class="grid grid-cols-1 py-3">
            <div class="col-span-1">
              <div
                id="phoneNumber"
                class="px-4 py-3 rounded-lg border border-gray-100 mt-1 bg-grey_white w-full"
                type="text"
                placeholder="Example"
              >
                {{ infoUser.phoneNumber }}
              </div>
            </div>
          </div>

          <!-- Change Password Button -->
          <div class="flex justify-between py-8">
            <div class="grid grid-cols-1">
              <router-link
                class="col-span-1 w-full flex justify-end"
                :to="{ name: `ChangePassword` }"
              >
                <button
                  type="button"
                  class="bg-white text-primary border-4 text-center px-9 py-3 font-bold rounded-lg"
                >
                  Change Password
                </button>
              </router-link>
            </div>
            <button
              type="button"
              @click="logout"
              class="bg-white text-red-500 border-4 text-center px-9 py-3 font-bold rounded-lg"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="showRank">
      <!-- Dong Rank -->
      <div
        v-if="isDongRank"
        class="son w-1/2 mx-32 border-2 rounded-xl"
        style="background: linear-gradient(to right, #cd7f32, #ffffff)"
      >
        <div class="row flex justify-between m-6">
          <div class="col text-6xl font-bold">
            {{ user?.currentLevel }}
          </div>
          <div class="col font-bold flex flex-col justify-between items-end">
            <div class="row">
              <button @click="closeRankDetails" class="font-bold">Close</button>
            </div>
            <div class="row mt-4">Ưu đãi mỗi thứ hạng ></div>
          </div>
        </div>
        <div class="row border-2 m-4 rounded-2xl bg-white">
          <div class="row m-4 font-bold">Để nâng cao thứ hạng tiếp theo</div>
          <div class="row flex m-4">
            <div class="col w-1/2 mr-4">
              <div class="row font-bold">Đơn hàng</div>
              <div class="row font-bold">{{ user?.orderCount }}/3</div>
              <div class="row">
                <progress
                  class="w-full rounded-full bg-gray-300"
                  max="3"
                  :value="user?.orderCount"
                ></progress>
              </div>
            </div>
            <div class="col w-1/2 border-l-2 pl-4">
              <div class="row font-bold">Chi tiêu</div>
              <div class="row font-bold">{{ formattedTotalSpent }}/3tr</div>
              <progress
                class="w-full rounded-full bg-gray-300"
                max="1000000"
                :value="user?.totalSpent"
              ></progress>
            </div>
          </div>
          <div class="row m-4 flex justify-between">
            <div class="col text-gray-400 font-bold">
              Thứ hạng sẽ được cập nhật sau 31.12.2023
            </div>
            <div class="col text-gray-400 font-bold">Chi tiết></div>
          </div>
        </div>
      </div>

      <!-- Bac Rank -->
      <div
        v-else-if="isBacRank"
        class="son w-1/2 mx-32 border-2 rounded-xl"
        style="background: linear-gradient(to right, #c0c0c0, #ffffff)"
      >
        <div class="row flex justify-between m-6">
          <div class="col text-6xl font-bold">
            {{ user?.currentLevel }}
          </div>
          <div class="col font-bold flex flex-col justify-between items-end">
            <div class="row">
              <button @click="closeRankDetails" class="font-bold">Close</button>
            </div>
            <div class="row mt-4">Ưu đãi mỗi thứ hạng ></div>
          </div>
        </div>
        <div class="row border-2 m-4 rounded-2xl bg-white">
          <div class="row m-4 font-bold">Để nâng cao thứ hạng tiếp theo</div>
          <div class="row flex m-4">
            <div class="col w-1/2 mr-4">
              <div class="row font-bold">Đơn hàng</div>
              <div class="row font-bold">{{ user?.orderCount }}/20</div>
              <div class="row">
                <progress
                  class="w-full rounded-full bg-gray-300"
                  max="20"
                  :value="user?.orderCount"
                ></progress>
              </div>
            </div>
            <div class="col w-1/2 border-l-2 pl-4">
              <div class="row font-bold">Chi tiêu</div>
              <div class="row font-bold">{{ formattedTotalSpent }}/5tr</div>
              <div class="row">
                <progress
                  class="w-full rounded-full bg-gray-300"
                  max="5000000"
                  :value="user?.totalSpent"
                ></progress>
              </div>
            </div>
          </div>
          <div class="row m-4 flex justify-between">
            <div class="col text-gray-400 font-bold">
              Thứ hạng sẽ được cập nhật sau 31.12.2023
            </div>
            <div class="col text-gray-400 font-bold">Chi tiết></div>
          </div>
        </div>
      </div>
      <!-- Vang Rank -->
      <div
        v-else-if="isVangRank"
        class="son w-1/2 mx-32 border-2 rounded-xl"
        style="background: linear-gradient(to right, #ffd700, #ffffff)"
      >
        <div class="row flex justify-between m-6">
          <div class="col text-6xl font-bold">
            {{ user?.currentLevel }}
          </div>
          <div class="col font-bold flex flex-col justify-between items-end">
            <div class="row">
              <button @click="closeRankDetails" class="font-bold">Close</button>
            </div>
            <div class="row mt-4">Ưu đãi mỗi thứ hạng ></div>
          </div>
        </div>
        <div class="row border-2 m-4 rounded-2xl bg-white">
          <div class="row m-4 font-bold">Để nâng cao thứ hạng tiếp theo</div>
          <div class="row flex m-4">
            <div class="col w-1/2 mr-4">
              <div class="row font-bold">Đơn hàng</div>
              <div class="row font-bold">{{ user?.orderCount }}/75</div>
              <div class="row">
                <progress
                  class="w-full rounded-full bg-gray-300"
                  max="75"
                  :value="user?.orderCount"
                ></progress>
              </div>
            </div>
            <div class="col w-1/2 border-l-2 pl-4">
              <div class="row font-bold">Chi tiêu</div>
              <div class="row font-bold">{{ formattedTotalSpent }}/15tr</div>
              <progress
                class="w-full rounded-full bg-gray-300"
                max="15000000"
                :value="user?.totalSpent"
              ></progress>
            </div>
          </div>
          <div class="row m-4 flex justify-between">
            <div class="col text-gray-400 font-bold">
              Thứ hạng sẽ được cập nhật sau 31.12.2023
            </div>
            <div class="col text-gray-400 font-bold">Chi tiết></div>
          </div>
        </div>
      </div>

      <!-- Kim Cuong Rank -->
      <div
        v-else-if="isKimCuongRank"
        class="son w-1/2 mx-32 border-2 rounded-xl"
        style="background: linear-gradient(to right, #b9f2ff, #ffffff)"
      >
        <div class="row flex justify-between m-6">
          <div class="col text-6xl font-bold">
            {{ user?.currentLevel }}
          </div>
          <div class="col font-bold flex flex-col justify-between items-end">
            <div class="row">
              <button @click="closeRankDetails" class="font-bold">Close</button>
            </div>
            <div class="row mt-4">Ưu đãi mỗi thứ hạng ></div>
          </div>
        </div>
        <div class="row border-2 m-4 rounded-2xl bg-white">
          <div class="row m-4 font-bold">Để nâng cao thứ hạng tiếp theo</div>
          <div class="row flex m-4">
            <div class="col w-1/2 mr-4">
              <div class="row font-bold">Đơn hàng</div>
              <div class="row font-bold">{{ user?.orderCount }}/75</div>
              <div class="row">
                <progress
                  class="w-full rounded-full bg-gray-300"
                  max="75"
                  :value="user?.orderCount"
                ></progress>
              </div>
            </div>
            <div class="col w-1/2 border-l-2 pl-4">
              <div class="row font-bold">Chi tiêu</div>
              <div class="row font-bold">{{ formattedTotalSpent }}/15tr</div>
              <progress
                class="w-full rounded-full bg-gray-300"
                max="15000000"
                :value="user?.totalSpent"
              ></progress>
            </div>
          </div>
          <div class="row m-4 flex justify-between">
            <div class="col text-gray-400 font-bold">
              Thứ hạng sẽ được cập nhật sau 31.12.2023
            </div>
            <div class="col text-gray-400 font-bold">Chi tiết></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getLocalStorage } from "@/utils/localStorage";
import { fetchData } from "@/utils/axiosFetchApi";
import { onMounted, ref, computed } from "vue";
import Cookies from "js-cookie";
import { useRouter } from "vue-router";

const infoUser = getLocalStorage("infoUser");
const user = ref();
const showRank = ref(false);
const router = useRouter();

const logout = () => {
  Cookies.remove("accessToken");
  Cookies.remove("refreshToken");
  localStorage.removeItem("infoUser");
  router.push({ name: "Login" });
};

const formattedTotalSpent = computed(() => {
  if (!user.value?.totalSpent) return "0 VND";
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(user.value.totalSpent);
});

const userRank = computed(() => {
  const orderCount = user.value?.orderCount || 0;
  const totalSpent = user.value?.totalSpent || 0;

  if (orderCount >= 75 && totalSpent >= 15000000) {
    return "Diamond";
  } else if (orderCount >= 20 && totalSpent >= 5000000) {
    return "Gold";
  } else if (orderCount >= 3 && totalSpent >= 3000000) {
    return "Silver";
  } else {
    return "Bronze";
  }
});

const isDongRank = computed(() => userRank.value === "Bronze");
const isBacRank = computed(() => userRank.value === "Silver");
const isVangRank = computed(() => userRank.value === "Gold");
const isKimCuongRank = computed(() => userRank.value === "Diamond");

const showRankDetails = () => {
  showRank.value = true;
  document.querySelector(".prf1").style.opacity = "0.1";
  document.querySelector(".prf2").style.opacity = "0.1";
};

const closeRankDetails = () => {
  showRank.value = false;
  document.querySelector(".prf1").style.opacity = "1";
  document.querySelector(".prf2").style.opacity = "1";
};

onMounted(async () => {
  try {
    if (!Cookies.get("accessToken")) {
      router.push({ name: "Login" });
      return;
    }
    const response = await fetchData(
      `${process.env.VUE_APP_URL}/users/${infoUser.userID}`,
      "GET"
    );
    if (response) {
      user.value = response; // Assign the value like this
    } else {
      console.error("Invalid response format:", response);
    }
  } catch (error) {
    console.error("Error create transaction:", error);
  }
});
</script>

<style scoped>
progress {
  width: 100%;
  height: 13px;
  margin-top: 10px;
}
progress[value]::-webkit-progress-bar {
  background-color: #ecf0f1;
  border-radius: 10px;
}

progress[value]::-webkit-progress-value {
  background-color: #3498db;
  border-radius: 10px;
}

progress[value]::-moz-progress-bar {
  background-color: #3498db;
  border-radius: 10px;
}

.father {
  position: relative;
}

.son {
  opacity: 1;
  position: absolute;
  top: 0;
}
</style>
