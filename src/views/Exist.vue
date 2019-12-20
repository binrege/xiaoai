<template>
  <div class="home">
      <div>
        <el-button @click="exist" type="primary" round>系统安全出口</el-button>
      </div>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {};
  },
  props: {},
  components: {},
  methods: {
    exist(){
      localStorage.removeItem("users")
      this.$router.push("/login")
      localStorage.removeItem("ids")
    }
  },
  mounted() {},
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.home{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 750px;
  background: rgb(107, 220, 240);
}
</style>