import { fetchData } from "@/utils/axiosFetchApi";
import { setLocalStorage } from "@/utils/localStorage";
import { ref } from "vue";

const error = ref(null);
const isPending = ref(false);

async function loginGoogle() {
  try {
    isPending.value = true;
    error.value = null;

    const response = await fetchData(
      `${process.env.VUE_APP_URL}/auth/login-google`,
      "GET"
    );
    if (!response) {
      throw new Error("Invalid login credentials");
    }
    setLocalStorage("infoUser", response);
    return response;
  } catch (err) {
    console.error(err);
    error.value = err.message;
  } finally {
    isPending.value = false;
  }
}

export function useLoginGoogle() {
  return { error, isPending, loginGoogle };
}
