<template>
  <view class="w-screen min-h-screen bg-gray-100">
    <view>
      <image
        :style="{ width: '100%' }"
        :src="postDetail?.cover"
        mode="widthFix"
        class="rounded-b-lg"
        @tap="previewImage"
      />
    </view>
    <view class="p-4 flex flex-col justify-start bg-white rounded-lg">
      <view class="grid grid-cols-[minmax(0,1fr)_auto] grid-rows-1 mt-4">
        <view class="flex items-center">
          <ant-avatar :src="postDetail?.avatar" />
          <text class="text-black ml-2">{{ postDetail?.nickname }}</text>
        </view>
        <view class="flex items-center">
          <text class="text-[#333333]">
            {{
              postDetail?.time.split("-")[1] +
              "-" +
              postDetail?.time.split("-")[2]
            }}
          </text>
          <text class="ml-2 text-[#333333]">
            {{ postDetail?.position?.name }}
          </text>
        </view>
      </view>
      <ant-divider />
      <view class="mt-2">
        <text class="text-xl font-bold">{{ postDetail?.title }}</text>
      </view>
      <view class="mt-4">
        <text class="text-base">{{ postDetail?.content }}</text>
      </view>
    </view>
    <view class="p-4">
      <view class="w-full">
        <text class="text-base border-b-2 border-yellow-200">
          共{{ postDetail?.comments.length }}条评论
        </text>
      </view>
      <view class="w-full">
        <Comment
          v-for="comment in postDetail?.comments"
          :key="comment.id"
          :detail="comment"
        />
        <view
          class="w-full mt-24"
          :style="{
            height: keyboardHeight + safeAreaInsets.bottom + 'px',
          }"
        />
      </view>
    </view>
    <view class="fixed w-full bottom-0 p-4 pb-0 bg-white">
      <view
        class="w-full grid grid-rows-1 grid-cols-[minmax(0,1fr)_auto] items-end"
      >
        <view class="mr-4 mb-1 flex items-center h-14 justify-center">
          <uni-easyinput
            v-model="commentContent"
            placeholder="发条评论吧"
            confirm-type="send"
            :adjust-position="false"
            @confirm="sendComment"
            @keyup.enter="sendComment"
          />
        </view>
        <view class="flex justify-center items-center space-x-4 h-16">
          <button class="flex items-center flex-col clear-btn" @tap="like">
            <image
              :src="likeSvg"
              :style="{ height: '2rem', width: '2rem' }"
              v-show="isLike"
            />
            <image
              v-show="!isLike"
              :src="likeNoneSvg"
              :style="{ height: '2rem', width: '2rem' }"
            />
            <text class="text-sm">点赞</text>
          </button>
          <button
            class="flex items-center flex-col clear-btn"
            open-type="share"
          >
            <image :src="shareSvg" :style="{ height: '2rem', width: '2rem' }" />
            <text class="text-sm">分享</text>
          </button>
        </view>
      </view>
      <view
        class="w-full"
        :style="{
          height: keyboardHeight + safeAreaInsets.bottom + 'px',
          transition: 'height 0.3s',
        }"
      />
    </view>
  </view>
</template>

<script setup lang="ts">
import { onLoad } from "@dcloudio/uni-app";
import { useGuideStore } from "@/stores";
import { PostDetail } from "@/types/guide";
import { ref } from "vue";
import Comment from "@/pages_sub/default/components/Comment.vue";
import shareSvg from "@/pages_sub/default/static/post/share.svg";
import likeSvg from "@/pages_sub/default/static/post/like.svg";
import likeNoneSvg from "@/pages_sub/default/static/post/like_none.svg";
import dayjs from "dayjs";

const commentContent = ref("");
const keyboardHeight = ref<number>(0);
const guideStore = useGuideStore();
const safeAreaInsets = uni.getWindowInfo().safeAreaInsets;
const postDetail = ref<PostDetail>();
const isLike = ref(false);
const index = ref(-1);
uni.onKeyboardHeightChange((res) => {
  keyboardHeight.value = res.height;
});
const like = () => {
  isLike.value = !isLike.value;
};
const sendComment = () => {
  if (commentContent.value.trim() === "") {
    uni.showToast({
      title: "评论内容不能为空",
      icon: "none",
    });
    return;
  }
  uni.showLoading({
    title: "正在发送...",
  });
  const items = {
    id: new Date().getTime(),
    time: dayjs(new Date()).format("YYYY-MM-DD"),
    content: commentContent.value,
    avatar:
      "https://i1.hdslb.com/bfs/face/3a59c98c91d0e14d0a965e45577e6f5f7e73c6ce.jpg@96w_96h_1c_1s.avif",
    nickname: "八奈见杏菜",
  };
  guideStore.sendComment(items, index.value);
  uni.hideLoading();
  uni.showToast({
    title: "发送成功",
    icon: "success",
  });
  commentContent.value = "";
};
const previewImage = () => {
  uni.previewImage({
    urls: [postDetail.value?.cover as string],
  });
};
onLoad((options) => {
  postDetail.value = guideStore.postList.filter((items, i) => {
    if (items.id === Number((options as { id: string }).id)) {
      index.value = i;
      return true;
    } else return false;
  })[0];
});
</script>

<style scoped lang="scss"></style>
