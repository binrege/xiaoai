<template>
  <div class="homeTwo">
    <div class="headers">
      <span class="iconfont icon-arrow-left" @click="selectAll"></span>
      <span>TodoList</span>
    </div>
    <div  class="items" v-for="(item,index) in list" :key="index" @mouseenter="entermouse(index)" @mouseleave="leavemouse()">
      <div @click="singleSelect(item)">
        <div v-if="isSelect===item.checked" class="iconfont icon-checkbox_prekaobei" v-model="item.checked" ></div>
        <div v-else class="iconfont icon-check-box-" v-model="item.checked"></div>
        <div>{{item.name}}</div>
      </div>
      <div v-show="show===index" class="iconfont icon-X" @click="deleteItem(item)"></div>
    </div>
    <div v-if="list.length===0">暂无数据</div>
    <div class="footer">
        <span>{{itemleft}} item left</span>
      <div :class="{currentitem:ids===1}" @click="clickAll(1)">All</div>
      <div :class="{currentitem:ids===2}" @click="clickAll(2)">Active</div>
      <div :class="{currentitem:ids===3}" @click="clickAll(3)">Completed</div>
    </div>
  </div>

</template>

<script>
  export default {
    name: "todolist",
    components: {},
    props: {},
    data() {
      return {
        isSelect:true,
        selectall:false,
        selectallsingle:1,
        show:-1,
        list: [
          {
            name: 'star this repository',
            checked: false
          },
          {
            name: 'fork this repository',
            checked: false
          },
          {
            name: 'follow author',
            checked: false
          },
          {
            name: 'vue-admin',
            checked: false
          },
          {
            name: 'vue',
            checked: false
          },
          {
            name: 'element-ui',
            checked: false
          },
          {
            name: 'axios',
            checked: true
          },
          {
            name: 'webpack',
            checked: true
          }
        ],
        oldList:[],
        ids:1
      }
    },
    methods: {
      singleSelect(item){
        item.checked=!item.checked
        if (this.ids===1) {
          return
        }else if (this.ids===2) {
          this.list=this.oldList.filter(item=>!item.checked)

        }else {
          this.list=this.oldList.filter(item=>item.checked)
        }
      },
      selectAll(){
        if (this.ids===1) {
          this.selectall=!this.selectall
          this.list=this.oldList.filter()
          this.list.map(item=>{
            item.checked=this.selectall
          })
        }else {
          return
        }
      },
      entermouse(index){
        this.show=index
      },
      leavemouse(){
        this.show=-1
      },
      deleteItem(indexs){
        this.list=this.list.filter(item=>indexs!==item)
        this.oldList=this.oldList.filter(item=>indexs!==item)
      },
      clickAll(value){
        this.ids=value
        if (value===1){
          this.list=this.oldList.filter(()=>true)
        }else if(value===2){
          this.list=this.oldList.filter(item=>!item.checked)
        }else {
          this.list=this.oldList.filter(item=>item.checked)
        }
      }
    },
    mounted() {
        this.oldList=this.list
    },
    created() {
    },
    filters: {},
    computed: {
      itemleft(){
        return this.oldList.filter(item=>!item.checked).length
      }
    },
    watch: {},
    directives: {}
  }
</script>
<style scoped>
  @import "//at.alicdn.com/t/font_1554437_36zsvwwe5pn.css";
  .homeTwo {
    width: 322px;
    height: 413px;
    border: 1px solid #ccc;
    padding: 10px;
    position: relative;
    margin: 20px 10px;
    
    background: white;
  }
  .headers {
    display: flex;
    justify-content: space-between;
    border-bottom:1px solid #cccccc;
  }
  .items {
    margin-top: 5px;
    line-height: 40px;
    display: flex;
    justify-content: space-between;
  }
  .items > div {
    display: flex;
  }
  .items > div > div:last-child {
    margin-left: 20px;
  }
  .items > div > div:first-child {
    color: aqua;
  }
  .footer{
    position: absolute;
    border-top:1px solid #ccc;
    padding: 10px;
    bottom: 0;
  }
  .footer>span{
    float: left;
  }
  .footer>div{
   
    float: left;
    margin-left: 20px;
    text-align: center;
  }
  .currentitem{
    border: 1px solid #ccc;
  }
</style>
