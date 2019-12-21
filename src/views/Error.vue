<template>
  <div class="home">
    <input type="button" @click="back" :value="msg()" />
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      time: 5
    };
  },
  props: {},
  components: {},
  methods: {
    msg() {
      let timer = setInterval(() => {
        clearInterval(timer);
        this.time -= 1;
        console.log(this.time);
        if (this.time === 0) {
          this.$router.push("/");
        }
      }, 1000);

      return "点击返回首页(" + this.time + ")";
    },
    back() {
      this.$router.push("/");
    }
  },
  mounted() {
  
  },
  watch: {},
  computed: {
  }
};
</script>

<style scoped lang='scss'>
.home {
  background: url("../assets/images/u=2467596910,83465754&fm=26&gp=0.jpg")
    no-repeat center;
  width: 100vm;
  height: 100vh;
}
input {
  margin: 20px 30px;
  background: rgb(200, 18, 236);
  border: none;
}
</style>