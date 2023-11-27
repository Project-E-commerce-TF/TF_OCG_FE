import { ref } from "vue";
import { fetchData } from "@/utils/axiosFetchApi";
import { isValidEmail } from "@/utils/regexEmail";
import { setLocalStorage } from "@/utils/localStorage";
import Cookies from "js-cookie";

const error = ref(null);
const isPending = ref(false);

async function login(email, password) {
  try {
    if (!email || !password) {
      error.value = "Please fill all fields";
      return;
    }
    if (!isValidEmail(email)) {
      error.value = "Email is not valid";
      return;
    }

    isPending.value = true;
    error.value = null;

    const response = await fetchData(
      `${process.env.VUE_APP_URL}/auth/login`,
      "POST",
      { email, password }
    );
    if (!response) {
      throw new Error("Invalid login credentials");
    }
    Cookies.set("accessToken", response.accessToken, { expires: 1 / 24 });
    Cookies.set("refreshToken", response.refreshToken, { expires: 1 });
    setLocalStorage("infoUser", response);
    return response;
  } catch (err) {
    console.error(err);
    error.value = err.message;
  } finally {
    isPending.value = false;
  }
}

export function useLogin() {
  return { error, isPending, login };
}
