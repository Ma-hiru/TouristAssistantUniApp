<script setup lang="ts">
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";

onLaunch(() => {
  console.log("App Launch");
});
onShow(() => {
  console.log("App Show");
});
onHide(() => {
  console.log("App Hide");
});
</script>
<style lang="scss">
@import "@/assets/tailwind.css";

html {
  font-size: 16px;
  box-sizing: border-box;
  --diy-color-primary: #0066d5;
  --div-color-primary-dark: #8fcdeb;
  --div-color-white: #f5f1e8;
  --div-color-gray: #656565;
}

.btn-hover {
  background: var(--div-color-primary-dark);
}

.clear-btn {
  &::after {
    border: none;
  }
}
</style>
