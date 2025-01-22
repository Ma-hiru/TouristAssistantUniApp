<template>
  <view class="w-full h-full z-0">
    <scroll-view class="scroll-content z-10" :scroll-y="true">
      <Message type="user" :time="time" :text="'介绍一下岳阳楼。'" />
      <Message type="assistant" :time="time" :text="text" />
      <Message
        type="system"
        :time="time"
        :text="'system message:something goes wrong! please try again.'"
      />
      <Message type="user" :time="time" :text="'介绍一下岳阳楼。'" />
      <Message type="assistant" :time="time" :text="text" />
      <view class="h-20" />
    </scroll-view>
    <ChatInput class="z-50" placeholder="快来询问热门的景点信息吧~" />
  </view>
</template>

<script setup lang="ts">
import Message from "@/components/Message/index.vue";
import ChatInput from "@/components/ChatInput/index.vue";

const time = "2025/01/22 21:55:50";
const text =
  "岳阳楼是中国历史上著名的文化古迹之一，位于湖南省岳阳市岳阳楼区，临洞庭湖而建，是中国古代四大名楼之一。其前身可追溯至三国时期，最初是东吴将领鲁肃的阅兵楼。岳阳楼始建于公元220年前后，历经多次重建和修缮，现存建筑为清光绪六年（1880年）重建。历史背景岳阳楼最初的功能主要是军事用途，直到唐朝才逐渐转变为观赏楼。";
//唐朝时期，岳阳楼成为文人墨客游览和创作的胜地，许多著名诗人如李白、杜甫等都曾在此留下诗作。岳阳楼真正名闻天下是在北宋时期，滕子京重修岳阳楼后，范仲淹撰写了《岳阳楼记》，其中“先天下之忧而忧，后天下之乐而乐”的名句使其文化价值得以升华。
// 建筑特色 岳阳楼为三层、四柱、飞檐、盔顶式纯木结构，楼高19.42米，整体建筑古朴端庄，气势恢宏。其楼顶覆盖黄琉璃瓦，采用“如意斗拱”托举而成的盔顶式结构，这种建筑形式在中国古代建筑史上独一无二。岳阳楼内部装饰精美，二楼悬挂有清朝书法家张照所书的《岳阳楼记》雕屏。文化意义 岳阳楼不仅是江南建筑艺术的殿堂，更是中华文化的殿宇。它承载了丰富的诗文、对联、书法等文化遗产，成为展示和传播湖湘文化的重要载体。范仲淹的《岳阳楼记》所表达的“先忧后乐”精神，使岳阳楼成为中华民族精神的象征。岳阳楼作为国家重点文物保护单位，是岳阳楼洞庭湖国家级重点风景名胜区的重要组成部分，于2011年被评为国家5A级旅游景点。
</script>

<style scoped lang="scss">
.scroll-content {
  height: calc(100vh);
}
</style>
