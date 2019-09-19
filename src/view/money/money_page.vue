<template>
  <div>
    <Input clearable placeholder="请输入优惠券码关键字搜索" class="search-input" v-model="searchValue" style="width: 400px;margin-right: 3px"/>
    <Button type="info" @click="handSeek">搜索</Button>
    <Table :columns="columns1" :data="data1" style="margin-top: 10px"></Table>
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
        searchValue:'',
        modal1: false,
        modal2: false,
        modal3:false,
        //    分页
        ajaxHistoryData: [],
        // 初始化信息总条数
        dataCount: 0,
        // 每页显示多少条
        pageSize: 10,
        page:1,
        columns1: [
          {
            title: '达人名称',
            key: 'username'
          },
          {
            title: '手机号',
            key: 'phone'
          },
          {
            title: '优惠券名称',
            key: 'name',
            // width: 150
          },
          {
            title: '优惠券码',
            key: 'code',
            // width: 120
          },
          {
            title: '金额',
            key: 'price'
          },
          {
            title: '创建时间',
            key: 'time'
          },
          {
            title: '开始时间',
            key: 'startime'
          },
          {
            title: '截止日期',
            key: 'outtime'
          },
          {
            title: '使用状态',
            key: 'state',
            render: (h, params) => {
              return h('Tag', {
                props: {
                  color: params.row.state === 1 ? 'green' : params.row.state === 2 ? 'orange' : ''
                }
              }, params.row.state === 1 ? '未使用' : params.row.state === 2 ? '使用' : '');
            }
          },
          {
            title: '操作',
            key: 'action',
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'info',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px',
                    marginBottom: '3px'
                  },
                  attrs: {
                    style: 'background-color:#d6514d;border:1px solid #d6514d'
                  },
                  on: {
                    click: () => {
                      this.delete(params.row);
                    }
                  }
                }, '删除')
              ]);
            }
          }
        ],
        data1: []
      }
    },
    created() {
      // console.log(localStorage.getItem('jwt'))
      this.tableShow()
    },
    methods: {
      //用户信息展示
      tableShow(){
        this.$axios({
          method: 'post',
          url: 'admin/Coupon/conponlist',
          data: this.$qs.stringify({
            page:this.page,
            jwt: localStorage.getItem('jwt')
          })
        }).then(res => {
          // console.log(res.data.table,'用户信息')
          this.ajaxHistoryData = res.data.table;
          // this.dataCount = res.data.table.length;
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
      //搜索
      handSeek(){
        // this.tableShow()
        this.$axios({
          method: 'post',
          url: 'admin/user/show',
          data: this.$qs.stringify({
            name:this.searchValue,
            jwt: localStorage.getItem('jwt')
          })
        }).then(res => {
          // console.log(res,'搜索用户')
          this.data2 = res.data.table
        }).catch(res => {
          this.$Message.error('请求超时,请稍后再试...');
        });
      },
      //删除
      delete(row){
        // console.log(row)
        this.$Modal.confirm({
          title: '删除',
          content: '确认删除该条信息吗？',
          onOk: () => {
            this.$axios({
              method: 'post',
              url: 'admin/Coupon/conpondelete',
              data: this.$qs.stringify({
                Id: row.Id,
                jwt:localStorage.getItem('jwt')
              })
            }).then(res => {
              this.tableShow()
            }).catch(res => {
              this.$Message.error('请求超时,请稍后再试...');
            });
          },
          onCancel: () => {
            this.$Message.info('取消');
          }
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

</style>
