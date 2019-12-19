<template>
  <div class="index">
     <div>
          <Top></Top>
          <BrokenLine></BrokenLine>
          <div class="thre">
            <RadarChat></RadarChat>
            <RingChat></RingChat>
            
           
         
          </div>
     </div>
  </div>
</template>

<script>
import Top from '../components/Index/Top';
import BrokenLine from '../components/Index/BrokenLine';
import RadarChat from '../components/Index/RadarChat';
import RingChat from '../components/Index/RingChat';
export default {
  name: "",
  data() {
    return {};
  },
  props: {},
  components: {
    Top,BrokenLine,RadarChat,RingChat
  },
  methods: {},
  mounted() {},
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.index{
  // background: red;
  width: 100vm;
  height: 100vh;
}

</style>