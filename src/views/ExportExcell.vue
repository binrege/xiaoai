// 分页表格
<template>
  <div class="search">
    <div>
      <template>
        <el-table :data="NewtableData" style="width: 100%">
          <el-table-column align="center" label="名称" prop="NAME" width="500"></el-table-column>
          <el-table-column align="center" label="商品编号" prop="GOODS_SERIAL_NUMBER" width="300"></el-table-column>
          <el-table-column align="center" label="原价" prop="ORI_PRICE" width="200"></el-table-column>
          <el-table-column align="center" label="现价" prop="PRESENT_PRICE" width="200"></el-table-column>
        </el-table>
      </template>
      <Paging :list="tableData" @updates="updates"></Paging>
      <div class="btns">
        <div>
          <download-excel
            class="export-excel-wrapper"
            :data="NewtableData"
            name="filename.xls"
          >
            <!-- 上面可以自定义自己的样式，还可以引用其他组件button -->
            <el-button type="primary" size="small">导出EXCEL</el-button>
          </download-excel>
        </div>
        <div>
          <download-excel
            class="export-excel-wrapper"
            :data="NewtableData"
            name="filename.csv"
          >
            <!-- 上面可以自定义自己的样式，还可以引用其他组件button -->
          <input class="exportCls" type="button" value="导出csv" />
          </download-excel>
         
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Paging from "../components/Pagination/Paging";
export default {
  name: "",
  data() {
    return {
      tableData: [],
       //导出的数据,不知道默认则全导出NewtableData
      NewtableData: [],
      oldlist: [],
      prePages: 10,
      //指定默认导出字段
      json_fields: {
        "Complete name": "name", //常规字段
        Telephone: "phone.mobile", //支持嵌套属性
        "Telephone 2": {
          field: "phone.landline",
          //自定义回调函数
          callback: value => {
            return `Landline Phone - ${value}`;
          }
        }
      },
      //导出的数据
      json_data: [
        {
          name: "Tony Peña",
          city: "New York",
          country: "United States",
          birthdate: "1978-03-15",
          phone: {
            mobile: "1-541-754-3010",
            landline: "(541) 754-3010"
          }
        },
        {
          name: "Thessaloniki",
          city: "Athens",
          country: "Greece",
          birthdate: "1987-11-23",
          phone: {
            mobile: "+1 855 275 5071",
            landline: "(2741) 2621-244"
          }
        }
      ],
      json_meta: [
        [
          {
            " key ": " charset ",
            " value ": " utf- 8 "
          }
        ]
      ]
    };
  },
  props: {},
  components: {
    Paging
  },
  methods: {
    getdata() {
      this.$axios
        .req("tableData")
        .then(res => {
          this.tableData = res.data;
          this.oldlist = res.data;
          this.NewtableData = this.tableData.filter((item, index) => {
            return index < this.prePages;
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    //更新分页组件传过来展示到首页的数据
    updates(data) {
      console.log(data);
      this.NewtableData = data[0];
      this.prePages = data[1];
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
.search {
  margin-top: 15px;
  padding-left: 10px;
  input {
    width: 200px;
    height: 30px;
    padding: 0 10px;
    border: none;
    margin: 10px 0;
  }
  .exportXls {
    background: rgb(85, 85, 243);
  }
  .exportCls {
    background: red;
  }
}
.btns {
  width: 500px;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
</style>