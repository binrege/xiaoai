<template>
  <div class="home">
    <div class="top">
      <div>
        <div>
          <div>今日发布</div>
          <div>{{getTodays}}</div>
        </div>
        <div class="el-icon-check"></div>
      </div>
      <div>
        <div>
          <div>原创文章</div>
          <div>{{Original.length}}</div>
        </div>
        <div class="el-icon-tickets"></div>
      </div>
      <div>
        <div>
          <div>新留言</div>
          <div>3</div>
        </div>
        <div class="iconfont icon-xiaoxitixing"></div>
      </div>
      <div>
        <div>
          <div>新消息</div>
          <div>4</div>
        </div>
        <div class="el-icon-phone-outline"></div>
      </div>
    </div>
    <div class="middle">
      <div>
        <ve-pie :judge-width="true" width="400px" :data="chartDatas"></ve-pie>
      </div>
      <div>
        <ve-pie :data="chartDatass" :judge-width="true" width="400px" :settings="chartSettings"></ve-pie>
      </div>
    </div>
    <div>
      <ve-waterfall :data="chartData"></ve-waterfall>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    this.chartSettings = {
      roseType: "radius"
    };
    return {
      ArticleData: [],
      Original: [],
      TodaysArticle: [],
      chartDatas: {
        columns: ["category", "num"],
        rows: []
      },
      chartDatass: {
        columns: ["source", "num"],
        rows: []
      },
      chartData: {
        columns: ["date", "数量"],
        rows: []
      }
    };
  },
  props: {},
  components: {},
  methods: {
    getnum(arr1, items) {
      let num = 0;
      arr1.map(item => {
        if (item.category === items) {
          num += 1;
        }
      });
      return num;
    },
    getnum1(arr1, items) {
      let num = 0;
      arr1.map(item => {
        if (item.source === items) {
          num += 1;
        }
      });
      return num;
    },
    getnum2(arr1, items) {
      let num = 0;
      arr1.map(item => {
        if (this.$dayjs(item.date).format("YYYY-MM-DD") === items) {
          num += 1;
        }
      });
      return num;
    },
    getdata() {
      this.$axios
        .req("article/allArticle")
        .then(res => {
          this.ArticleData = res.data;
          this.ArticleData.map((item, index) => {
            if (
              this.chartDatas.rows.every(
                items => items.category !== item.category
              )
            ) {
              this.chartDatas.rows.push({
                category: item.category,
                num: this.getnum(this.ArticleData, item.category)
              });
            }

            if (
              this.chartDatass.rows.every(items => items.source !== item.source)
            ) {
              this.chartDatass.rows.push({
                source: item.source,
                num: this.getnum1(this.ArticleData, item.source)
              });
            }

            console.log(
              index + "---" + this.$dayjs(item.date).format("YYYY-MM-DD")
            );
            if (
              this.chartData.rows.every((items, indexs) => {
                console.log(
                  indexs +
                    "+++++" +
                    this.$dayjs(items.date).format("YYYY-MM-DD")
                );
                return (
                  this.$dayjs(items.date).format("YYYY-MM-DD") !==
                  this.$dayjs(item.date).format("YYYY-MM-DD")
                );
              })
            ) {
              this.chartData.rows.push({
                date: this.$dayjs(item.date).format("YYYY-MM-DD"),
                数量: this.getnum2(
                  this.ArticleData,
                  this.$dayjs(item.date).format("YYYY-MM-DD")
                )
              });
            }
          });
          this.Original = this.ArticleData.filter(item => {
            return item.source === "原创";
          });
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.getdata();
  },
  watch: {},
  computed: {
    getTodays() {
      this.TodaysArticle = this.ArticleData.filter(item => {
        return (
          this.$dayjs(new Date()).format("YYYY-MM-DD") ===
          this.$dayjs(item.date).format("YYYY-MM-DD")
        );
      });
      return this.TodaysArticle.length;
    }
  }
};
</script>

<style scoped lang='scss'>
.home {
  width: 100vm;
  height: 100vh;
  background: white;
}
.top {
  color: white;
  height: 60px;
  display: flex;
}
.top > div {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}
.top > div > div {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
.top > div:nth-child(1) {
  background: rgb(55, 178, 235);
}
.top > div:nth-child(2) {
  background: rgb(238, 34, 136);
}
.top > div:nth-child(3) {
  background: rgb(143, 12, 136);
}
.top > div:nth-child(4) {
  background: rgb(27, 206, 176);
}
.top > div > div:last-child {
  font-size: 20px;
  color: white;
}
.top > div > div:first-child {
  width: 230px;
  height: 40px;
}
.middle {
  display: flex;
  justify-content: space-around;
  height: 300px;
  margin-top: 20px;
}
.middle > div {
  height: 600px;
}
</style>