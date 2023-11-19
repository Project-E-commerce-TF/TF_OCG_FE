import { ref } from "vue";
import axios from "axios";

const user = ref(null);

async function fetchUser() {
  try {
    const response = await axios.get("URL_BACKEND_GO/getUser");
    if (!response.data) {
      throw new Error("Could not fetch user data");
    }
    user.value = response.data;
  } catch (error) {
    console.error(error);
  }
}

export function useUser() {
  return { user, fetchUser };
}
