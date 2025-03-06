<template>
  <view class="w-screen h-screen bg-gray-100">
    <view>
      <view
        class="relative w-[calc(100%+2rem)] -left-4 user-card p-4 pb-8 rounded-b-md"
        :style="{ paddingTop: `${safeAreaInsets!.top}px` }"
      >
        <view
          class="w-full h-full flex justify-center items-center flex-col pt-4 pb-4"
          @tap="isLogin"
        >
          <ant-avatar class="z-10" size="medium" :src="avatarSrc" />
          <text class="text-white mt-4 font-bold">
            {{ username }}
          </text>
        </view>
      </view>
      <view class="pl-2 pr-2 -mt-8">
        <uni-card margin="0" padding="0.5rem">
          <view class="flex justify-between">
            <button
              @tap="goTo('star')"
              class="flex flex-col clear-btn items-center justify-center p-2"
            >
              <image
                src="/static/user/star.svg"
                :style="{ height: '2rem', width: '2rem' }"
              />
              <text>收藏地点</text>
            </button>
            <button
              @tap="goTo('guide')"
              class="flex flex-col clear-btn items-center justify-center p-2 pt-3"
            >
              <image
                class="m-1"
                src="/static/user/book.svg"
                :style="{ height: '1.4rem', width: '1.4rem' }"
              />
              <text>游览攻略</text>
            </button>
            <button
              @tap="goTo('check')"
              class="flex flex-col clear-btn items-center justify-between p-2 pb-[10px]"
            >
              <image
                src="/static/user/checkHistory.svg"
                class="relative -bottom-[6px]"
                :style="{ height: '1.8rem', width: '1.8rem' }"
              />
              <text>打卡记录</text>
            </button>
            <button
              @tap="goTo('activity')"
              class="flex flex-col clear-btn items-center justify-center p-2 pt-3"
            >
              <image
                src="/static/user/activity.svg"
                class="m-1"
                :style="{ height: '1.5rem', width: '1.5rem' }"
              />
              <text>热门活动</text>
            </button>
          </view>
        </uni-card>
      </view>
    </view>
    <view class="w-screen p-2">
      <view class="bg-white rounded-[4px]">
        <view class="text-base font-bold pt-4 pl-4">我的旅游</view>
        <view
          class="flex flex-col justify-center items-center p-1 pb-8 pt-4"
          v-if="!checkStore.history[0]"
        >
          <button
            class="p-2 pl-4 pr-4 flex justify-start items-center clear-btn bg-[#F9EE8C] rounded-full"
          >
            <image
              src="/static/user/photo.svg"
              :style="{ height: '1.8rem', width: '1.8rem' }"
            />
            <text class="font-bold">去记录你的旅行吧</text>
          </button>
          <text class="mt-4 text-sm text-[#333]">暂无历史打卡预览</text>
        </view>
        <view
          v-else
          class="flex justify-between ml-6 items-center mr-4 mt-4 pb-4"
        >
          <image
            style="width: 80%"
            mode="widthFix"
            :src="checkStore.history[0]?.path"
            @tap="previewImage(0)"
            @longpress="save(0)"
          />
          <button
            class="p-2 flex justify-start items-center clear-btn rounded-full"
          >
            <image
              src="/static/user/arrow.svg"
              :style="{ height: '2rem', width: '2rem' }"
            />
          </button>
        </view>
      </view>
    </view>
    <view class="w-screen p-2 pt-0">
      <view class="bg-white rounded-[4px]">
        <view class="text-base font-bold pt-4 pl-4">更多服务</view>
        <button
          @tap="goTo('userInfo')"
          class="p-2 pt-4 pb-4 flex justify-start items-center clear-btn space-x-2"
        >
          <image
            src="/static/user/userInfo.svg"
            :style="{ height: '2rem', width: '2rem' }"
          />
          <text>个人信息</text>
        </button>
        <button
          open-type="feedback"
          class="p-2 pt-4 pb-4 flex justify-start items-center clear-btn space-x-2"
        >
          <image
            src="/static/user/feedback.svg"
            class="mr-1 ml-1"
            :style="{ height: '1.5rem', width: '1.5rem' }"
          />
          <text>问题反馈</text>
        </button>
      </view>
    </view>
  </view>
  <view
    class="w-[calc(100%-2rem)] left-4 fixed bottom-4"
    v-show="userStore.userProfile.nickname"
  >
    <button
      class="w-full h-12 logout-btn flex justify-center items-center bg-none text-red-600"
      @tap="logout"
    >
      退出登录
    </button>
  </view>
</template>
<script setup lang="ts" name="my">
import { computed } from "vue";
import { useCheckStore, useUserStore } from "@/stores";
import { useChatStore } from "@/stores/modules/useChatStore";

const checkStore = useCheckStore();
const previewImage = (index: number) => {
  uni.previewImage({
    urls: checkStore.history.map((item) => item.path),
    current: index,
  });
};
const save = (index: number) => {
  uni.saveImageToPhotosAlbum({
    filePath: checkStore.history[index].path,
    success: () => {
      uni.showToast({
        title: "保存成功",
        icon: "success",
        duration: 2000,
      });
    },
    fail: () => {
      uni.showToast({
        title: "保存失败",
        icon: "none",
        duration: 2000,
      });
    },
  });
};
const { safeAreaInsets } = uni.getSystemInfoSync();
const userStore = useUserStore();
const chatStore = useChatStore();
const avatarSrc = computed(() => {
  return userStore.userProfile.avatar || "/static/user/avatar_default.jpg";
});
const username = computed(() => {
  return userStore.userProfile.nickname || "点击登录";
});
const goTo = (type: "star" | "guide" | "check" | "activity" | "userInfo") => {
  switch (type) {
    case "star":
      return uni.navigateTo({
        url: "/pages_sub/default/pages/point/point?mode=star",
      });
    case "userInfo":
      return uni.navigateTo({
        url: "/pages_sub/default/pages/userInfo/userInfo",
      });
    case "guide":
      return uni.switchTab({ url: "/pages/guide/guide" });
    case "check":
      return uni.navigateTo({
        url: "/pages_sub/default/pages/checkHistory/checkHistory",
      });
    case "activity":
      return uni.navigateTo({
        url: "/pages_sub/default/pages/activity/activity",
      });
  }
};

const isLogin = () => {
  if (username.value !== userStore.userProfile.nickname) {
    uni.navigateTo({ url: "/pages/login/login" });
  }
};
const logout = () => {
  userStore.userProfile = {
    nickname: "",
    avatar: "",
    token: "",
  };
  chatStore.wsClose();
  uni.navigateTo({ url: "/pages/login/login" });
};
</script>
<style lang="scss" scoped>
.logout-btn {
  border: red solid 1px;

  &::after {
    border: none;
  }
}

.user-card {
  background-image: $my-bg-url;
}
</style>
