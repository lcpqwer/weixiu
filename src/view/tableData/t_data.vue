<template>
  <div>
    <!--<Button style="margin-left: 10px" type="info" @click="add">新增</Button>-->
    <div style="float: left">
      <Select style="width:150px;margin-right: 3px" placeholder="请选择状态键字搜索">
        <Option v-for="item in state1" :value="item.label" :key="item.Id" @click.native="Schioce4(item)" style="width: 80px">{{ item.label }}</Option>
      </Select>
      <Select style="width:150px;margin-right: 3px" placeholder="请选择类型键字搜索">
        <Option v-for="item in type1" :value="item.label" :key="item.Id" @click.native="Schioce5(item)" style="width: 80px">{{ item.label }}</Option>
      </Select>
    </div>
    <!--<Input clearable placeholder="请输入用户关键字搜索" class="search-input" v-model="searchNum" style="width: 200px"/>-->
    <Input clearable placeholder="请输入标题关键字搜索" class="search-input" v-model="searchTitle" style="width: 200px;margin-right: 3px"/>
    <Button type="info" @click="handSeek">搜索</Button>
    <br>
    <div style="margin-bottom: 10px;margin-top: 10px">
      <span class="title1">开始时间：</span><span class="title2">{{this.time[0]}}</span>
      <span class="title1">结束时间：</span><span class="title2">{{this.time[1]}}</span>
      <span class="title1">收入：</span><span class="title2">{{this.income}}元</span>
      <span class="title1">支出：</span><span class="title2">{{this.expenditure}}元</span>
      <span class="title1">总额：</span><span class="title2">{{this.total}}元</span>
    </div>
    <Table :columns="columns1" :data="data1"></Table>
    <!--//分页-->
    <div style="text-align: right">
      <Page :total="dataCount" :page-size="pageSize" show-total class="paging" @on-change="changepage"></Page>
    </div>
  </div>
</template>

<script>
  var date = new Date()
  export default {
    data () {
      return {
        title:'',
        type1:[
          {
            value: '1',
            label: '维修订单'
          },
          {
            value: '2',
            label: '支付订单'
          },
        ],
        state1:[
          {
            value: '1',
            label: '收入'
          },
          {
            value: '2',
            label: '支出'
          },
        ],
        typeId:'',
        stateId:'',
        searchTitle:'',
        modal1: false,
        modal2: false,
        modal3:false,
        loading: true,
        loading1: true,
        modal3type:true,
        //    分页
        ajaxHistoryData: [],
        // 初始化信息总条数
        dataCount: 0,
        // 每页显示多少条
        pageSize: 10,
        page:1,
        time:[],
        income:'',
        expenditure:'',
        total:'',
        columns1: [
          {
            title: '标题',
            key: 'title'
          },
          {
            title: '金额',
            key: 'total'
          },
          {
            title: '类型',
            key: 'type',
            render: (h, params) => {
              return h('Tag', {
                props: {
                  color: params.row.type === 1 ? 'green' : params.row.type === 2 ? 'red' : ''
                }
              }, params.row.type === 1 ? '维修订单' : params.row.type === 2 ? '支付订单' : '');
            }
          },
          {
            title: '创建日期',
            key: 'time'
          },
          {
            title: '订单编号',
            key: 'number'
          },
          {
            title: '状态',
            key: 'state',
            render: (h, params) => {
              return h('Tag', {
                props: {
                  color: params.row.state === 1 ? 'green' : params.row.state === 2 ? 'red' :''
                }
              }, params.row.state === 1 ? '收入' : params.row.state === 2 ? '支出' :'');
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
        // data2: [],
        // data3: [],
        // data4: [],
        // data5: []
      }
    },
    created() {
      // console.log(date,'当前时间')
      this.tableShow()
    },
    methods: {
      //用户信息展示
      tableShow(){
        this.$axios({
          method: 'post',
          url: 'admin/Transaction/show',
          data: this.$qs.stringify({
            title:this.searchTitle,
            type:this.typeId,
            state:this.stateId,
            page:this.page,
            jwt: localStorage.getItem('jwt')
          })
        }).then(res => {
          // console.log(res.data.table,'用户信息')
          this.ajaxHistoryData = res.data.table;
          this.time = res.data.time;
          this.income = res.data.income;
          this.expenditure = res.data.expenditure;
          this.total = res.data.total;
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
      Schioce4(item){
        // console.log(item)
        this.stateId=item.value

      },
      Schioce5(item){
        // console.log(item)
        this.typeId=item.value
      },
      handSeek(){
        this.tableShow()
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
              url: 'admin/Transaction/delete',
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
  .title1{
   /*font-weight: bolder;*/
    font-size: large;
  }
  .title2{
     margin-right: 30px;
    font-size: larger;
   }


</style>
