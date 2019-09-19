<template>
  <div>
    <Button style="margin-right: 6px" type="info" @click="add">新增</Button>
    <!--搜索-->
    <Input clearable placeholder="请输入故障内容关键字搜索" class="search-input" v-model="main" style="width: 400px;margin-right: 3px"/>
    <Button type="info" @click="handSeek">搜索</Button>
    <Table :columns="columns1" :data="data1" style="margin-top: 10px"></Table>
    <!--新增-->
    <Modal
      v-model="modal3"
      title="新增故障信息"
      @on-ok="ok3('formAdd')"
      @on-cancel="cancel3"
      :loading="loading">
      <Form :model="formAdd" :label-width="80" :rules="ruleValidate" ref="formAdd">
        <FormItem label="故障内容" prop="main">
          <Input v-model="formAdd.main" placeholder="" :maxlength='16' style="width:200px"></Input>
        </FormItem>
      </Form>
    </Modal>
    <!--//修改弹框-->
    <!--<Button type="primary" @click="modal1 = true">修改</Button>-->
    <Modal
      v-model="modal1"
      title="修改故障信息"
      @on-ok="ok('formItem')"
      @on-cancel="cancel"
      :loading="loading1">
      <Form :model="formItem" :label-width="80" :rules="ruleValidate2" ref="formItem">
        <FormItem label="故障内容" prop="main">
          <Input v-model="formItem.main" placeholder="" :maxlength='16' style="width:200px"></Input>
        </FormItem>
      </Form>
    </Modal>
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
        ruleValidate: {
          main: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ]
        },
        ruleValidate2: {
          laptop_name: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          series_name: [
            { required: true, message: '不能为空', trigger: 'blur' },
            // {type: 'number',required:true,validator:validatePhone,message:'请输入正确的手机号',trigger:'change'}
          ],
          juti_name: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ]
        },
        main:'',
        formAdd:{
          main:'',
          jwt:localStorage.getItem('jwt')
        },
        formItem:{
          id:'',
          main: '',
          jwt:localStorage.getItem('jwt')
        },
        modal1: false,
        modal2: false,
        modal3:false,
        loading: true,
        loading1: true,
        //    分页
        ajaxHistoryData: [],
        // 初始化信息总条数
        dataCount: 0,
        // 每页显示多少条
        pageSize: 10,
        page:1,
        columns1: [
          {
            title: '时间',
            key: 'time',
            // width: 300
          },
          {
            title: '故障内容',
            key: 'main'
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
                    marginBottom: '5px'
                  },
                  on: {
                    click: () => {
                      this.xiugai(params.row);
                    }
                  }
                }, '修改'),
                h('Button', {
                  props: {
                    type: 'info',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px',
                    marginBottom: '5px'
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
          url: 'admin/Hitch/show',
          data: this.$qs.stringify({
            main:this.main,
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
        this.tableShow()
      },
      //新增
      add(){
        this.modal3=true
      },
      ok3 (formAdd) {
        // console.log(this.$nextTick,'验证')
        this.$refs[formAdd].validate((valid) => {
          if (valid) {
            this.$axios({
              method: 'post',
              url: 'admin/Hitch/insert',
              data: this.$qs.stringify({
                main:this.formAdd.main,
                jwt:localStorage.getItem('jwt')
              })
            }).then(res => {
              // console.log(res,'用户增加')
              this.tableShow()
              this.modal3 = false
              this.formAdd = {}
            }).catch(res => {
              this.$Message.error('请求超时,请稍后再试...');
            });
            callback();
          } else{
            this.loading = false;
            this.$nextTick(() => {
              this.loading = true;
            });
            this.$Message.error('新增失败，请填写完整的信息!');
          }
        })
        this.tableShow()
        this.formAdd = {}
      },
      cancel3 () {
        this.tableShow()
        this.formAdd = {}
        // this.$Message.info('Clicked cancel');
      },
      //用户修改
      xiugai(row){
        // console.log(row)
        this.modal1=true
        this.formItem=row
        this.formItem.Id=row.Id
        this.formItem.main=row.main
      },
      ok (formItem) {
        this.$refs[formItem].validate((valid) => {
          if (valid) {
            this.$axios({
              method: 'post',
              url: 'admin/Hitch/upd',
              data: this.$qs.stringify({
                Id:this.formItem.Id,
                main: this.formItem.main,
                jwt:localStorage.getItem('jwt')
              })
            }).then(res => {
              // console.log(res,'用户修改')
              this.modal1=false
              this.tableShow()
            }).catch(res => {
              this.$Message.error('请求超时,请稍后再试...');
            });
            callback();
          } else{
            this.loading = false;
            this.$nextTick(() => {
              this.loading = true;
            });
            this.$Message.error('修改失败,请正确填写信息!');
          }
        })
        this.tableShow()
      },
      cancel () {
        this.modal3=false
        // this.$Message.info('Clicked cancel');
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
              url: 'admin/Hitch/delete',
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
