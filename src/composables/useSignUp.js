import { ref } from "vue";

const error = ref(null);
const isPending = ref(false);

async function signup(fullName, email, password) {
  isPending.value = true;
  error.value = null;
  try {
    const response = await fetch("URL_BACKEND_GO/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fullName, email, password }),
    });

    if (!response.ok) {
      throw new Error("Could not create a new user");
    }

    return response.json();
  } catch (err) {
    console.error(err);
    error.value = err.message;
  } finally {
    isPending.value = false;
  }
}

export function useSignUp() {
  return { error, isPending, signup };
}
