import { showSide } from "./DashBoard.vue";

export const toggleSideBar = () => {
  showSide.value = !showSide.value;
};
