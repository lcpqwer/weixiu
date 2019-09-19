<template>
  <div>
    <!--<Button style="margin-left: 10px;margin-right: 5px" type="info" @click="add">补卡</Button>-->
    <!--搜索-->
    <!--<Input clearable placeholder="请输入用户名关键字搜索" class="search-input" v-model="searchName" style="width: 200px"/>-->
    <!--<Input clearable placeholder="请输入工号关键字搜索" class="search-input" v-model="searchNum" style="width: 200px"/>-->
    <!--<Input clearable placeholder="请输入手机号关键字搜索" class="search-input" v-model="searchPhone" style="width: 200px"/>-->
    <!--<Button type="info" @click="handSeek">搜索</Button>-->
    <Table :columns="columns1" :data="data1"></Table>
    <!--//分页-->
    <div style="text-align: right">
      <Page :total="dataCount" :page-size="pageSize" show-total class="paging" @on-change="changepage"></Page>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        //    分页
        ajaxHistoryData: [],
        // 初始化信息总条数
        dataCount: 0,
        // 每页显示多少条
        pageSize: 10,
        page:1,
        columns1: [
          {
            title: 'Ip地址',
            key: 'ip'
          },
          {
            title: '登录时间',
            key: 'time'
          },
          {
            title: '登录账号',
            key: 'username'
          }
        ],
        data1: []
      }
    },
    created() {
      this.tableShow()
    },
    methods: {
      //用户信息展示
      tableShow(){
        this.$axios({
          method: 'post',
          url: 'admin/ip/show',
          data: this.$qs.stringify({
            page:this.page,
            jwt: localStorage.getItem('jwt')
          })
        }).then(res => {
          // console.log(res.data.table,'用户信息')
          this.ajaxHistoryData = res.data.table;
          this.dataCount = res.data.count;
          // 初始化显示，小于每页显示条数，全显，大于每页显示条数，取前每页条数显示
          if (res.data.count < this.pageSize) {
            // this.historyData = this.ajaxHistoryData;
            this.data1 = res.data.table
          } else {
            this.data1 = this.ajaxHistoryData.slice(0, this.pageSize);
          }
        }).catch(res => {
          this.$Message.error('请求超时,请稍后再试...');
        });
      },
      //分页
      changepage (index) {
        this.page = index
        this.tableShow()
        var _start = (index - 1) * this.pageSize;
        var _end = index * this.pageSize;
        this.data1 = this.ajaxHistoryData.slice(_start, _end);
      }
    }
  }
</script>

<style scoped>
  .tupian{
    width: 100px;
  }
  .map {
    width: 100%;
    height: 400px;
  }

</style>
