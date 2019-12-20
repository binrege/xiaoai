<template>
  <div class="index">
    <div>
      <Top></Top>
      <BrokenLine></BrokenLine>
      <div class="thre">
        <div>
          <RadarChat></RadarChat>
        </div>
        <div>
          <RingChat></RingChat>
        </div>
        <div>
          <HomeData></HomeData>
        </div>
      </div>
      <div class="bottom">
        <OrderData></OrderData>
        <TodoList></TodoList>
        <Progress></Progress>
      </div>
    </div>
  </div>
</template>

<script>
import Top from "../components/Index/Top";
import BrokenLine from "../components/Index/BrokenLine";
import RadarChat from "../components/Index/RadarChat";
import RingChat from "../components/Index/RingChat";
import HomeData from "../components/Index/HomeData";
import OrderData from "../components/Index/OrderData";
import TodoList from "../components/Index/TodoList";
import Progress from "../components/Index/Progress";
export default {
  name: "",
  data() {
    return {};
  },
  props: {},
  components: {
    Top,
    BrokenLine,
    RadarChat,
    RingChat,
    HomeData,
    OrderData,
    TodoList,
    Progress
  },
  methods: {},
  mounted() {},
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.index {
  // background: red;
  width: 100vm;
 
}
.thre {
  width: 98%;
  display: flex;
  margin-left: 4px;
  justify-content: space-between;
}
.bottom{
  display: flex;
}
</style>