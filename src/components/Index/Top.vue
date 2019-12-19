<template>
  <div class="top">
    <div class="contain">
      <div>
        <div class="iconfont icon-lianxiren"></div>
        <div>
          <div>New Visits</div>
          <div>{{setCharts(datas.visits)}}</div>
        </div>
      </div>
      <div>
        <div class="iconfont icon-xiaoxi"></div>
        <div>
          <div>Messages</div>
          <div>{{setCharts(datas.messages)}}</div>
        </div>
      </div>
      <div>
        <div class="iconfont icon-qian01"></div>
        <div>
          <div>Purchases</div>
          <div>{{setCharts(datas.purchases)}}</div>
        </div>
      </div>
      <div>
        <div class="iconfont icon-gouwuche"></div>
        <div>
          <div>Shopping</div>
          <div>{{setCharts(datas.shopping)}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "top",
  data() {
    return {
      datas:[],
    };
  },
  props: {},
  components: {},
  methods: {
    getdata() {
      this.$axios
        .req("homeData")
        .then(res => {
         this.datas = res.data;
          // console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    //给数据加逗号
    setCharts(val){
        let arr=(val+"").split("")
        let str=""
        arr.reverse().map((item,index,arr)=>{
          if(index%3===0){
            str+=","+item 
          }else{
             str+=item
          }
        })
        return str.slice(1).split("").reverse().join("")
    }
  },
  mounted() {
    this.getdata()
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.top{
  width: 99%;
}
.contain{
  margin-top: 20px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  
}
.contain>div{
    display: flex;
    width: 21%;
    height:50px;
    background: white;
    padding:10px 20px;
    justify-content: space-between;
    align-items: center;
   box-shadow: 0 4px 9px rgba(0,0,0,.4);
  }
  .contain>div>div:first-child{
    font-size: 40px;
  }
  .contain>div:nth-child(1)>div:first-child{
    color: rgb(52, 185, 247);
  }
  .contain>div:nth-child(2)>div:first-child{
    color: rgb(45, 34, 194);
  }
  .contain>div:nth-child(3)>div:first-child{
    color: rgb(207, 59, 14);
  }
  .contain>div:nth-child(4)>div:first-child{
    color: rgb(243, 134, 10);
  }
  .contain>div>div:last-child>div:first-child{
      color: rgb(196, 180, 180);
      margin-bottom: 7px;
      font-size: 13px;
  }
  .contain>div>div:last-child>div:last-child{
    color: rgb(56, 48, 48);
  }
</style>