<template>
  <!-- <div class="iconfont icon-shezhi"></div> -->
  <div id="home">
    <div class="top">
      <div v-if="users.username">欢迎{{users.username}}来到小爱后台管理系统</div>
      <div>{{helloworld()}}</div>
    </div>
    <div class="contain">
      <div class="asider-left">
        <div class="asiderItem" :class="{activeItem:Number(ids)===index}" @click="clickBar(index,item.path)"  v-for="(item,index) in siderList" :key="index">
            <div :class="item.icon"></div>
            <div>{{item.name}}</div>
        </div>
      </div>
      <div class="asider-right">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      users: {},
      ids:0,
      siderList: [
        {
          id: 1,
          path: "/",
          icon: "el-icon-location",
          name: "首页"
        },
        {
          id: 2,
          path: "/pagination",
          icon: "el-icon-menu",
          name: "分页表格"
        },
        {
          id: 3,
          path: "/tagPage",
          icon: "el-icon-document",
          name: "标签页"
        },
        {
          id: 4,
          path: "/updatePic",
          icon: "el-icon-check",
          name: "图片上传"
        },
        {
          id: 5,
          path: "/published",
          icon: "el-icon-goods",
          name: "已发表"
        },
        {
          id: 6,
          path: "/publish",
          icon: "el-icon-message",
          name: "发布文章"
        },
        {
          id: 7,
          path: "/statics",
          icon: "el-icon-orange",
          name: "统计"
        },
        {
          id: 8,
          path: "/exportExcell",
          icon: "el-icon-setting",
          name: "导出excel"
        },
        {
          id: 9,
          path: "/login",
          icon: "el-icon-delete",
          name: "退出系统"
        }
      ]
    };
  },
  props: {},
  components: {},
  methods: {
    helloworld() {
      // - 问好
      //   - 如果早上6-12点，就提示早上好
      //   - 如果早上12-2点，就提示中午好
      //   - 如果下午2-6点，就提示下午好
      //   - 如果晚上6-12点，就提示晚上好
      //   - 如果凌晨12点-凌晨6点，就提示该睡觉了
      let username = this.users.username;
      let teime = this.$dayjs(new Date()).format("YYYY年MM月DD日 HH时MM分ss秒");
      let currentTime = this.$dayjs(new Date()).format("HH");
      if (currentTime >= 6 && currentTime < 12) {
        return "早上好 " + username + "   登录时间:" + teime;
      } else if (currentTime >= 12 && currentTime < 14) {
        return "中午好 " + username + "   登录时间:" + teime;
      } else if (currentTime >= 14 && currentTime < 18) {
        return "下午好 " + username + "   登录时间:" + teime;
      } else if (currentTime >= 18 && currentTime < 24) {
        return "晚上好 " + username + "   登录时间:" + teime;
      } else if (currentTime >= 0 && currentTime < 6) {
        return "该睡觉了 " + username + "   登录时间:" + teime;
      }
    },
    clickBar(val,path){
      this.ids=val
      localStorage.setItem("ids",val)
      this.$router.push(path)


    }
  },
  mounted() {
    //拿到当前登录用户
    this.users = JSON.parse(localStorage.getItem("users"));
    if(localStorage.getItem("ids")){
      this.ids=localStorage.getItem("ids")
    }
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.top {
  height: 60px;
  background: rgb(45, 93, 132);
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  padding: 0 20px;
}
.contain{
  display: flex;
  justify-content: space-between;
  width: 100vm;
  
  overflow: hidden;
}
.asiderItem{
  cursor: pointer;
  height: 50px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
div{
  margin-right: 10px;
}
  color:white;

}
.asider-left{
  width: 10%;
    background: #545c64;
  padding:20px;
  // width: 150px;
  height:690px;
}
.activeItem{
  
  color:#ffd04b;
}
.asider-right{
  padding:15px;
 background: #ccc;
  width: 90%;
  height: 100vh;
}
</style>