<template>
  <div class="tagpage">
    <el-tabs v-model="activeName">
      <el-tab-pane :label="'未读消息('+getmsg(0).length+')'" name="first">
        <div v-if="getmsg(0).length!==0" class="contain">
          <div class="msgItem" v-for="(item,index) in getmsg(0)" :key="index">
            <div class="titles">{{item.msgs}}</div>
            <div class="timer">
              <div>{{item.createTime}}</div>
              <div>
                <input type="button" @click="changeStatus(item,1)" value="标记已读" />
              </div>
            </div>
          </div>
          <div class="changeAll">
            <input class="biaojiAll" type="button" @click="changeAllStatus(0,1)" value="全部标记为已读" />
          </div>
        </div>
        <div v-else class="contains">暂无数据</div>
      </el-tab-pane>
      <el-tab-pane :label="'已读消息('+getmsg(1).length+')'" name="second">
         <div v-if="getmsg(1).length!==0" class="contain">
          <div class="msgItem" v-for="(item,index) in getmsg(1)" :key="index">
            <div class="titles">{{item.msgs}}</div>
            <div class="timer">
              <div>{{item.createTime}}</div>
              <div>
                <input  class="delbtn" type="button" @click="changeStatus(item,2)" value="删除" />
              </div>
            </div>
          </div>
          <div class="changeAll">
            <input class="delbtn" type="button" @click="changeAllStatus(1,2)" value="删除全部" />
          </div>
        </div>
        <div v-else class="contains">暂无数据</div>
      </el-tab-pane>
      <el-tab-pane :label="'回收站('+getmsg(2).length+')'" name="third">
         <div v-if="getmsg(2).length!==0" class="contain">
          <div class="msgItem" v-for="(item,index) in getmsg(2)" :key="index">
            <div class="titles">{{item.msgs}}</div>
            <div class="timer">
              <div>{{item.createTime}}</div>
              <div>
                <input class="reback" type="button" @click="changeStatus(item,1)" value="还原" />
              </div>
            </div>
          </div>
          <div class="changeAll">
            <input type="button" @click="changeAllStatus(2,3)" value="清空回收站" />
          </div>
        </div>
        <div v-else class="contains">暂无数据</div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: "tagPage",
  data() {
    return {
      //status:0 未读消息  1 已读消息   2 回收站消息
      msg: [
        {
          status: 0,
          msgs: "[系统通知] 该系统将于今晚凌晨2点到5点进行升级维护",
          createTime: "2018-04-19 20:00:00"
        },
        {
          status: 1,
          msgs: "今晚12点整发大红包,先到先得",
          createTime: "2018-04-19 21:00:00"
        },
        {
          status: 2,
          msgs: "今晚12点整发大红包,先到先得",
          createTime: "2018-04-19 21:00:00"
        },
        {
          status: 0,
          msgs: "[系统通知] 您的优惠券已经过期",
          createTime: "2018-04-19 20:00:00"
        },
        {
          status: 2,
          msgs: "[系统通知] 大吉大利,今晚吃鸡",
          createTime: "2018-04-19 20:00:00"
        }
      ],
      activeName:'first',
    };
  },
  props: {},
  components: {},
  methods: {
    getmsg(val) {
      let arr = [];
      arr = this.msg.filter((item, index) => {
        return item.status === val;
      });
      return arr;
    },
    changeStatus(items,val) {
      this.msg.map(item => {
        if (item === items) {
          item.status = val;
        }
      });
    },
    changeAllStatus(val1,val2) {
      this.msg.map(item => {
        if (item.status === val1) {
          item.status = val2;
        }
      });
    }
  },
  mounted() {},
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.contain {
  background: white;
  padding: 10px;
}
.msgItem {
  border-bottom: 1px solid #ccc;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.timer {
  display: flex;
  width: 250px;
  padding: 20px;
  justify-content: space-between;
  align-items: center;
  input {
    border: none;
  }
}
.changeAll {
  margin-top: 20px;
  input {
    width: 150px;
    height: 30px;
    border: none;
  }
}
.contains{
  display: flex;
  justify-content: center;
  align-items: center;
  background: white;
  height: 100px;

}
.delbtn{
  background: red;
}
.biaojiAll{
  background: rgb(78, 94, 231);
}
.reback{
  background: rgb(221, 173, 42);
}
</style>