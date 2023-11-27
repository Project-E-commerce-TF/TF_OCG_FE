import { fetchData } from "@/utils/axiosFetchApi";
import { isValidEmail } from "@/utils/regexEmail";
import { regexPhoneNumberVn } from "@/utils/regexPhoneNumberVn";
import { ref } from "vue";

const error = ref(null);
const isPending = ref(false);

async function signup(username, email, password, repeatPassword, phoneNumber) {
  try {
    if (!username || !email || !password || !repeatPassword || !phoneNumber) {
      error.value = "Please fill all fields";
      return;
    }
    if (!isValidEmail(email)) {
      error.value = "Email is not valid";
      return;
    }
    if (password !== repeatPassword) {
      error.value = "Passwords must match";
      return;
    }
    if (!regexPhoneNumberVn(phoneNumber)) {
      error.value = "Phone number is not valid";
      return;
    }
    const data = {
      username,
      email,
      password,
      phoneNumber,
    };
    isPending.value = true;
    error.value = null;

    const response = await fetchData(
      `${process.env.VUE_APP_URL}/users`,
      "POST",
      data
    );
    if (!response) {
      throw new Error("Could not create a new user");
    }

    return response;
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
