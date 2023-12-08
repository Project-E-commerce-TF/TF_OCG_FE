import { showSide } from "./dashBoard.vue";

export const toggleSideBar = () => {
  showSide.value = !showSide.value;
};
