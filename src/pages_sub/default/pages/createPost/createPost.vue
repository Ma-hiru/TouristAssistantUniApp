<template>
  <view class="w-screen h-screen bg-gray-200 p-3">
    <view class="bg-white w-screen top-0 left-0 z-[60] fixed">
      <view :style="{ height: `${menuButtonTop}px`, marginBottom: '2.5rem' }" />
    </view>
    <view
      class="fixed w-screen top-0 left-0 z-[70]"
      :style="{ paddingTop: `${menuButtonTop}px` }"
    >
      <view
        class="text-center relative text-base font-bold flex justify-center items-center"
      >
        写攻略
      </view>
    </view>
    <view :style="{ height: `${menuButtonTop}px` }" class="mt-[3rem]" />
    <view
      class="grid grid-cols-1 grid-rows-[auto_auto_auto_minmax(0,1fr)_auto_auto_auto_auto] w-full bg-white p-4 rounded-lg"
      :style="{ height: `calc(100% - ${safeAreaInsets.bottom}px - 6rem)` }"
    >
      <view>
        <button
          @tap="uploadImg"
          class="clear-btn w-40 h-40 bg-gray-100 flex justify-center items-center relative overflow-visible rounded-lg"
        >
          <uni-icons type="plusempty" size="24" v-if="!coverSrc" />
          <image
            :src="coverSrc"
            v-else
            :style="{ height: '10rem', width: '10rem' }"
            mode="aspectFill"
          >
            <view
              @tap.stop="cancelUploadImage"
              class="absolute -top-1 -right-1 w-6 h-6 bg-[#999999] flex justify-center items-center rounded-full z-50"
            >
              <uni-icons type="closeempty" color="#ffffff" />
            </view>
          </image>
        </button>
      </view>
      <view class="text-xl h-12 flex items-center mt-4">
        <input
          type="text"
          placeholder="标题"
          class="w-full"
          v-model="title"
          confirm-type="done"
        />
      </view>
      <ant-divider />
      <view class="mt-4">
        <textarea
          placeholder="正文"
          class="w-full"
          maxlength="300"
          v-model="content"
          :auto-height="true"
          style="resize: none"
          confirm-type="done"
          :show-confirm-bar="false"
        />
      </view>
      <ant-divider />
      <view class="pt-2 pb-2 mt-4 flex justify-between items-center">
        <button
          @tap="selectPoint"
          class="flex justify-center items-center clear-btn rounded-lg"
        >
          <image
            src="@/pages_sub/default/static/createPost/flag.svg"
            :style="{ height: '2rem', width: '2rem' }"
          />
          标记地点
        </button>
        <text class="text-[#666666]">
          {{ guideStore.createPostPoint?.name || "未选择" }}
        </text>
      </view>
      <view class="mt-4 mb-6 w-full flex flex-row justify-between">
        <view>标签</view>
        <view class="flex space-x-2">
          <view
            v-for="(tag, index) in tags"
            :key="tag.id"
            @tap="selectTags(index)"
          >
            <uni-tag :inverted="true" :text="tag.title" :type="tag.type" />
          </view>
        </view>
      </view>
      <view>
        <button
          @tap="submit"
          class="clear-btn text-black w-full p-2 text-center bg-[#FFCA22]"
        >
          发布
        </button>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useGuideStore } from "@/stores";
import { PostCategoryList } from "@/types/guide";
import dayjs from "dayjs";

const safeAreaInsets = uni.getWindowInfo().safeAreaInsets;
const guideStore = useGuideStore();
const { top: menuButtonTop } = uni.getMenuButtonBoundingClientRect();
const tags = ref<PostCategoryList>(
  guideStore.postCategoryList.map((item, index) => {
    if (index === 0) {
      item.type = "primary";
      return item;
    } else {
      item.type = "default";
      return item;
    }
  })
);
const title = ref("");
const content = ref("");
const selectTags = (index: number) => {
  tags.value[index].type =
    tags.value[index].type === "primary" ? "default" : "primary";
};
const selectPoint = () => {
  uni.navigateTo({ url: "/pages_sub/default/pages/point/point?mode=guide" });
};
const coverSrc = ref("");
const cancelUploadImage = () => {
  coverSrc.value = "";
};
const uploadImg = () => {
  uni.chooseImage({
    count: 1,
    sourceType: ["album", "camera"],
    success: (res) => {
      console.log(res.tempFilePaths[0]);
      coverSrc.value = res.tempFilePaths[0];
    },
    fail: (err) => {
      console.log(err);
    },
  });
};
const submit = () => {
  if (!title.value) {
    return uni.showToast({
      title: "标题不能为空",
      icon: "none",
    });
  } else if (!content.value) {
    return uni.showToast({
      title: "正文不能为空",
      icon: "none",
    });
  } else if (!coverSrc.value) {
    return uni.showToast({
      title: "封面不能为空",
      icon: "none",
    });
  } else if (!guideStore.createPostPoint) {
    return uni.showToast({
      title: "请选择地点",
      icon: "none",
    });
  }
  guideStore.postList.push({
    id: Date.now(),
    time: dayjs(new Date()).format("YYYY-MM-DD"),
    title: title.value,
    content: content.value,
    avatar:
      "https://i1.hdslb.com/bfs/face/3a59c98c91d0e14d0a965e45577e6f5f7e73c6ce.jpg@96w_96h_1c_1s.avif",
    nickname: "户山香橙",
    cover: coverSrc.value,
    likes: 0,
    position: guideStore.createPostPoint,
    category: tags.value.filter((i) => {
      return i.type === "primary";
    }),
    comments: [],
  });
  uni.showToast({
    title: "发布成功",
    icon: "success",
  });
  setTimeout(
    () =>
      uni.navigateBack({
        animationType: "pop-out",
      }),
    1000
  );
};
</script>

<style scoped lang="scss">
.clear-btn {
  &::after {
    border: none;
  }
}
</style>
