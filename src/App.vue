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
@import "../src/wxcomponents/vant/common/index.wxss";
@import "../src/assets/tailwind.css";

html {
  font-size: 16px;
}
</style>
