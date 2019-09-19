<template>
  <div>
    <Button style="margin-right: 6px" type="info" @click="add">新增</Button>
    <Select v-model="searchValue" style="width:200px;margin-right: 3px" placeholder="请选择汇款方式搜索">
      <Option v-for="item in type" :value="item.value" :key="item.value" @click.native="chioceSou(item)">{{ item.label }}</Option>
    </Select>
    <Input clearable placeholder="请输入渠道名称键字搜索" class="search-input" v-model="name" style="width: 300px;margin-right: 3px"/>
    <Button type="info" @click="handSeek">搜索</Button>
    <Table :columns="columns1" :data="data1" style="margin-top: 10px"></Table>
    <!--新增-->
    <Modal
      v-model="modal3"
      title="新增"
      @on-ok="ok3('formAdd')"
      @on-cancel="cancel3"
      :loading="loading">
      <Form :model="formAdd" :label-width="80" :rules="ruleValidate" ref="formAdd">
        <FormItem label="渠道名称" prop="name">
          <Input v-model="formAdd.name" placeholder="" style="width:200px"></Input>
        </FormItem>
        <FormItem label="支付状态" prop="pay_type">
          <Select v-model="formAdd.pay_type" style="width:200px">
            <Option v-for="item in type" :value="item.value" :key="item.value" @click.native="chioce(item)">{{ item.label }}</Option>
          </Select>
          <!--<Input v-model="formAdd.type" placeholder=""></Input>-->
        </FormItem>
        <FormItem label="图片">
          <Upload
            action="http://54.223.48.127/repair/public/admin/index/upd"
            :data="img"
            ref="upload"
            :format="['jpg','jpeg','png']"
            :show-upload-list="false"
            :before-upload="handleBeforUpload1"
            :on-success="handleSuccess1">
            <Button icon="ios-cloud-upload-outline">点击上传</Button>
          </Upload>
        </FormItem>
        <FormItem>
          <div style="width: 100px;height: 100px;border: 1px darkgrey solid;text-align: center">
            <img :src="url" alt="请点击上传" style="width: 100px;height: 100px" v-model="formAdd.img">
          </div>
        </FormItem>
      </Form>
    </Modal>
    <!--//修改弹框-->
    <Modal
      v-model="modal1"
      title="修改"
      @on-ok="ok('formItem')"
      @on-cancel="cancel"
      :loading="loading1">
      <Form :model="formItem" :label-width="85" :rules="ruleValidate2" ref="formItem">
        <FormItem label="渠道名称" prop="name">
          <Input v-model="formItem.name" placeholder="" style="width:200px"></Input>
        </FormItem>
        <FormItem label="支付状态" prop="pay_type">
          <Select v-model="formItem.pay_type" style="width:200px">
            <Option v-for="item in type" :value="item.label" :key="item.value" @click.native="chioce1(item)">{{ item.label }}</Option>
          </Select>
          <!--<Input v-model="formAdd.type" placeholder=""></Input>-->
        </FormItem>
        <FormItem label="图片">
          <Upload
            action="http://54.223.48.127/repair/public/admin/index/upd"
            :data="img"
            ref="upload"
            :format="['jpg','jpeg','png']"
            :show-upload-list="false"
            :before-upload="handleBeforUpload1"
            :on-success="handleSuccess1">
            <Button icon="ios-cloud-upload-outline">点击上传</Button>
          </Upload>
        </FormItem>
        <FormItem>
          <div style="width: 100px;height: 100px;border: 1px darkgrey solid;text-align: center">
            <img :src="url" alt="请点击上传" style="width: 100px;height: 100px" v-model="formItem.img">
          </div>
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
        url:'',
        img:{
          image:null,
          jwt:localStorage.getItem('jwt')
        },
        ruleValidate: {
          name: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          pay_type: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
        },
        ruleValidate2: {
          type: [
            { required: true, message: '不能为空', trigger: 'blur' },
          ],
          price:[
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          number: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          startime: [
            { required: true, message: '不能为空', trigger: 'blur' },
          ],
          outtime: [
            { required: true, message: '不能为空', trigger: 'blur' },
          ],
          name: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ]
        },
        searchValue:'',
        name:'',
        columns4: [
          {
            type: 'selection',
            width: 60,
            height: 20,
            align: 'center'
          },
          {
            title: '用户名',
            key: 'name'
          },
          {
            title: '手机号',
            key: 'phone'
          }
        ],
        type:[
          {
            value: '2',
            label: '不需要汇款'
          },
          {
            value: '1',
            label: '需要汇款'
          },
        ],
        date21:'',
        adddate:'',
        adddate1:'',
        formfabu:{},
        formAdd:{
          pay_type:'',
          img:'',
          name:'',
          jwt:localStorage.getItem('jwt')
        },
        formItem:{
          Id:'',
          pay_type:'',
          type:'',
          img:'',
          name:'',
          jwt:localStorage.getItem('jwt')
        },
        formImg:{
          Id:"",
          img:null,
          jwt:localStorage.getItem('jwt')
        },
        modal1: false,
        modal2: false,
        modal3:false,
        modal4:false,
        loading: true,
        loading1: true,
        modal3type:true,
        //    分页
        ajaxHistoryData: [],
        // 初始化信息总条数
        dataCount: 0,
        // 每页显示多少条
        pageSize: 5,
        ajaxHistoryData1: [],
        dataCount1: 0,
        // 每页显示多少条
        pageSize1: 8,
        columns1: [
          {
            title: '渠道名称',
            key: 'name'
          },
          {
            title: '图片',
            key: 'img',
            render: (h, params) => {
              // console.log(params.row)
              return h('img', {
                style: {
                  width: '100px'
                },
                attrs: {
                  src: params.row.img, style: 'width: 100px;height: 100px'
                }
                // on: {
                //     click: () => {
                //         this.hangImg(1, params.row);
                //     }
                // }
              });
            }
          },
          {
            title: '时间',
            key: 'time'
          },
          {
            title: '是否汇款',
            key: 'pay_type',
            render: (h, params) => {
              return h('Tag', {
                props: {
                  color: params.row.pay_type === 1 ? 'green' : params.row.pay_type === 2 ? 'orange' :''
                }
              }, params.row.pay_type === 1 ? '需要汇款' : params.row.pay_type === 2 ? '不需要汇款' : '');
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
        data1: [],
        data3: [],
        moneyId:''
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
          url: 'admin/Pay/show',
          data: this.$qs.stringify({
            pay_type: this.searchValue,
            name:this.name,
            jwt: localStorage.getItem('jwt')
          })
        }).then(res => {
          // console.log(res.data.table,'用户信息')
          this.ajaxHistoryData = res.data.table;
          this.dataCount = res.data.table.length;
          // 初始化显示，小于每页显示条数，全显，大于每页显示条数，取前每页条数显示
          if (res.data.table.length < this.pageSize) {
            // this.historyData = this.ajaxHistoryData;
            this.data1 = res.data.table
          } else {
            this.data1 = this.ajaxHistoryData.slice(0, this.pageSize);
          }
        }).catch(res => {
          this.$Message.error('请求超时,请稍后再试...');
        });
      },
      //新增
      add(){
        this.modal3=true
      },
      handleBeforUpload1 (file) {
        this.img.image = file  // 将回调的文件信息存入data.file
      },
      handleSuccess1(response){
        // console.log(response.url)
        this.url = response.url
      },
      chioce(item){
        // console.log(item,'悬着用户')
        this.formAdd.pay_type = item.value
      },
      ok3 (formAdd) {
        this.$refs[formAdd].validate((valid) => {
          if (valid) {
            this.$axios({
              method: 'post',
              url: 'admin/Pay/insert',
              data: this.$qs.stringify({
                img:this.url,
                name:this.formAdd.name,
                pay_type:this.formAdd.pay_type,
                jwt:localStorage.getItem('jwt')
              })
            }).then(res => {
              // console.log(res,'用户增加')
              this.tableShow()
              this.modal3=false
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
            this.$Message.error('新增失败,请正确填写信息!');
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
      //搜索
      handSeek(){
        this.tableShow()
      },
      chioceSou(item){
        // console.log(item)
        this.searchValue = item.label
      },
      //发布
      fabu(row){
        // console.log(row,'发布')
        this.moneyId = row.Id
        if(row.type === 1){
          this.modal4=false,
            this.$axios({
              method: 'post',
              url: 'admin/Coupon/release',
              data: this.$qs.stringify({
                Id: row.Id,
                jwt:localStorage.getItem('jwt')
              })
            }).then(res => {
              // console.log(res,'发布')
              this.$Message.success(res.data.msg);
              this.tableShow()
            }).catch(res => {
              this.$Message.error('请求超时,请稍后再试...');
            });
        }else if(row.type === 2){
          this.modal4=true,
            this.$axios({
              method: 'post',
              url: 'admin/user/show',
              data: this.$qs.stringify({
                jwt:localStorage.getItem('jwt')
              })
            }).then(res => {
              this.ajaxHistoryData1 = res.data.table;
              this.dataCount1 = res.data.table.length;
              // 初始化显示，小于每页显示条数，全显，大于每页显示条数，取前每页条数显示
              if (res.data.table.length < this.pageSize1) {
                // this.historyData = this.ajaxHistoryData;
                this.data2=res.data.table
              } else {
                this.data2 = this.ajaxHistoryData1.slice(0, this.pageSize1);
              }
            }).catch(res => {
              this.$Message.error('请求超时,请稍后再试...');
            });
        }
      },
      select(selection,row){
        // this.formfabu.push(row.name)
        // console.log(row,'宣布在')
        this.data3.push(row.Id)
        // console.log(this.data3,'宣布在所欲11111111111')
      },
      selectall(selection){
        // console.log(selection,'宣布在所欲')
        for(var i=0; i<selection.length; i ++){
          this.data3[i] = selection[i].Id
        }
        // console.log(this.data3,'宣布在所欲11111111111')
      },
      handleSelectAll (status) {
        this.$refs.selection.selectAll(status);
      },
      ok4 () {
        this.$axios({
          method: 'post',
          url: 'admin/Coupon/release',
          data: this.$qs.stringify({
            UId:this.data3,
            Id:this.moneyId,
            jwt:localStorage.getItem('jwt')
          })
        }).then(res => {
          // console.log(res,'用户fabuchenggong')
          this.tableShow()
        }).catch(res => {
          this.$Message.error('请求超时,请稍后再试...');
        });
      },
      cancel4 () {
        // this.$Message.info('Clicked cancel');
      },
      //用户修改
      xiugai(row){
        // console.log(row)
        this.modal1=true
        this.formItem=row
        this.url=row.img
        // if(row.pay_type == 1){
        //   this.formItem.pay_type = '汇款'
        // }else if(row.pay_type == 2){
        //   this.formItem.pay_type = '不汇款'
        // }
        // this.formItem.pay_type = row
      },
      chioce1(item){
        // console.log(item,'悬着用户')
        this.formItem.type = item.value
      },
      ok (formItem) {
        this.$refs[formItem].validate((valid) => {
          if (valid) {
            this.$axios({
              method: 'post',
              url: 'admin/Pay/upd',
              data: this.$qs.stringify({
                Id: this.formItem.Id,
                img:this.url,
                name:this.formItem.name,
                pay_type:this.formItem.type,
                jwt:localStorage.getItem('jwt')
              })
            }).then(res => {
              // console.log(res,'修改')
              this.modal1=false
              this.tableShow()
            }).catch(res => {
              this.modal1=false
              this.tableShow()
              this.$Message.error('请求超时,请稍后再试...');
            });
            callback();
          } else{
            this.loading1 = false;
            this.$nextTick(() => {
              this.loading1 = true;
            });
            this.$Message.error('修改失败,请正确填写信息!');
          }
        })
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
              url: 'admin/Pay/delete',
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
        var _start = (index - 1) * this.pageSize;
        var _end = index * this.pageSize;
        this.data1 = this.ajaxHistoryData.slice(_start, _end);
      },
      changepage1 (index) {
        var _start = (index - 1) * this.pageSize1;
        var _end = index * this.pageSize1;
        this.data2 = this.ajaxHistoryData1.slice(_start, _end);
      }
    }
  }
</script>

<style scoped>

</style>
