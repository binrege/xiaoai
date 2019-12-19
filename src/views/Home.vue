<template>
 <!-- <div class="iconfont icon-shezhi"></div> -->
  <div id="home">
      <div class="top">
          <div v-if="users.username">欢迎{{users.username}}来到小爱后台管理系统</div>
          <div>{{helloworld()}}</div>
      </div>
      <div class="contain">
          <div class="asider-left">
            <el-row class="tac">
                    <el-col :span="3">
                        <el-menu default-active="2" class="el-menu-vertical-demo" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
                            <el-menu-item index="1">
                                <i class="el-icon-location"></i>
                                <span slot="title">首页</span>
                            </el-menu-item>
                            <el-menu-item index="2">
                                <i class="el-icon-menu"></i>
                                <span slot="title">分页表格</span>
                            </el-menu-item>
                            <el-menu-item index="3">
                                <i class="el-icon-document"></i>
                                <span slot="title">标签页</span>
                            </el-menu-item>
                            <el-menu-item index="4">
                                <i class="el-icon-check"></i>
                                <span slot="title">图片上传</span>
                            </el-menu-item>
                            <el-menu-item index="5">
                                <i class="el-icon-goods"></i>
                                <span slot="title">已发表</span>
                            </el-menu-item>
                            <el-menu-item index="6">
                                <i class="el-icon-message"></i>
                                <span slot="title">发布文章</span>
                            </el-menu-item>
                            <el-menu-item index="7">
                                <i class="el-icon-orange"></i>
                                <span slot="title">统计</span>
                            </el-menu-item>
                            <el-menu-item index="8">
                                <i class="el-icon-setting"></i>
                                <span slot="title">导出excel</span>
                            </el-menu-item>
                            <el-menu-item index="9">
                                <i class="el-icon-delete"></i>
                                <span slot="title">退出系统</span>
                            </el-menu-item>
                        </el-menu>
                    </el-col>
                </el-row>

          </div>
          <div class="asider-right"></div>
      </div>
   
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      users:{},
      siderList:[
        {
          
        }
      ]
    };
  },
  props: {},
  components: {},
  methods: {
    helloworld(){
      // - 问好
      //   - 如果早上6-12点，就提示早上好
      //   - 如果早上12-2点，就提示中午好
      //   - 如果下午2-6点，就提示下午好
      //   - 如果晚上6-12点，就提示晚上好
      //   - 如果凌晨12点-凌晨6点，就提示该睡觉了
      let username=this.users.username
      let teime=this.$dayjs(new Date()).format("YYYY年MM月DD日 HH时MM分ss秒")
      let currentTime=this.$dayjs(new Date()).format("HH")
      if(currentTime>=6&&currentTime<12){
        return "早上好 "+username+"   登录时间:"+teime
      }else if(currentTime>=12&&currentTime<14){
        return "中午好 "+username+"   登录时间:"+teime
      }else if(currentTime>=14&&currentTime<18){
        return "下午好 "+username+"   登录时间:"+teime
      }else if(currentTime>=18&&currentTime<24){
        return "晚上好 "+username+"   登录时间:"+teime
      }else if(currentTime>=0&&currentTime<6){
        return "该睡觉了 "+username+"   登录时间:"+teime
      }
      
    }
  },
  mounted() {
    //拿到当前登录用户
    this.users=JSON.parse(localStorage.getItem("users"))
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.top{
  height: 60px;
  background: rgb(45,93,132);
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  padding:0 20px;
}
</style>