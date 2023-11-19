import { ref } from "vue";
import axios from "axios";

const error = ref(null);
const isPending = ref(false);

async function login(email, password) {
  isPending.value = true;
  error.value = null;
  try {
    const response = await axios.post("URL_BACKEND_GO/login", {
      email,
      password,
    });

    if (!response.data || response.status !== 200) {
      throw new Error("Invalid login credentials");
    }

    return response.data; // Hoặc xử lý dữ liệu phản hồi theo cách khác nếu cần thiết
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
