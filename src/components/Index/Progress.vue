<template>
  <div class="order">
      <div><img src="https://wpimg.wallstcn.com/e7d23d71-cf19-4b90-a1cc-f56af8c0903d.png" alt=""></div>
      <div>
        <div class="items" v-for="(item,index) in datas" :key="index">
          <div>{{item.name}}</div>

          <el-progress :text-inside="true" :width="60" :color="color" :stroke-width="15" stroke-linecap="square"
                               type="line"
                               :percentage="Number(getpercent(item.progress))" status="success">
                  </el-progress>
        </div>
        
      </div>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      datas: [],
       color: [
          {color: '#f56c6c', percentage: 20},
          {color: '#e6a23c', percentage: 40},
          {color: '#5cb87a', percentage: 60},
          {color: '#1989fa', percentage: 80},
          {color: '#6f7ad3', percentage: 100}]
    };
  },
  props: {},
  components: {},
  methods: {
    getdata() {
      this.$axios
        .req("progress")
        .then(res => {
          this.datas = res.data;
          // console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
     getpercent(val) {
        if (val === 0) {
          return 0;
        } else {
          val = val * 100
        }
        return val.toFixed(1);
      }
  },
  mounted() {
    this.getdata();
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.order{
  padding:10px;
  margin-top: 20px;
  width: 272px;
  height: 413px;
  background: white;
}
img{
width: 273px;
}
.items{
  margin-top: 10px;
}
</style>