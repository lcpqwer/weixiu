<template>
  <div>
    <Button style="margin-right: 6px" type="info" @click="add">新增</Button>
    <Input clearable placeholder="请输入优惠券关键字搜索" class="search-input" v-model="searchValue" style="width: 400px;margin-right: 3px"/>
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
        <FormItem label="优惠券名称" prop="name">
          <Input v-model="formAdd.name" placeholder="" style="width:200px"></Input>
        </FormItem>
        <FormItem label="用户类型" prop="type">
          <Select v-model="formAdd.type" style="width:200px">
            <Option v-for="item in type" :value="item.value" :key="item.value" @click.native="chioce(item)">{{ item.label }}</Option>
          </Select>
          <!--<Input v-model="formAdd.type" placeholder=""></Input>-->
        </FormItem>
        <FormItem label="次数" v-if="modal3type" prop="number">
          <Input v-model="formAdd.number" placeholder="" style="width:200px"></Input>
        </FormItem>
        <FormItem label="折扣金额" prop="price">
          <Input v-model="formAdd.price" placeholder="" style="width:200px"></Input>
        </FormItem>
        <FormItem label="开始时间" prop="startime">
          <Row v-model="formAdd.startime">
            <Col span="12">
              <DatePicker type="date" placeholder="请选择" style="width: 200px" @on-change="changedate"></DatePicker>
            </Col>
          </Row>
        </FormItem>
        <FormItem label="到期时间" prop="outtime">
          <Row v-model="formAdd.outtime">
            <Col span="12">
              <DatePicker type="date" placeholder="请选择" style="width: 200px" @on-change="changedate1"></DatePicker>
            </Col>
          </Row>
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
        <FormItem label="用户类型" prop="type">
          <Select v-model="formItem.type" style="width:200px">
            <Option v-for="item in type" :value="item.value" :key="item.value" @click.native="chioce1(item)">{{ item.label }}</Option>
          </Select>
        </FormItem>
        <FormItem label="金额" prop="price">
          <Input v-model="formItem.price" placeholder="" style="width:200px"></Input>
        </FormItem>
        <FormItem label="次数" prop="number">
          <Input v-model="formItem.number" placeholder="" style="width:200px"></Input>
        </FormItem>
        <FormItem label="开始时间" prop="startime">
          <Row v-model="formItem.startime">
            <Col span="12">
              <DatePicker type="date" placeholder="请选择" style="width: 200px" @on-change="changedate2"></DatePicker>
            </Col>
          </Row>
        </FormItem>
        <FormItem label="到期时间" prop="outtime">
          <Row v-model="formItem.outtime">
            <Col span="12">
              <DatePicker type="date" placeholder="请选择" style="width: 200px" @on-change="changedate21"></DatePicker>
            </Col>
          </Row>
          <!--<Input v-model="formItem.outtime" placeholder=""></Input>-->
        </FormItem>
        <FormItem label="优惠码名称" prop="name">
          <Input v-model="formItem.name" placeholder="" style="width:200px"></Input>
        </FormItem>
      </Form>
    </Modal>
    <!--发布弹框-->
    <Modal
      v-model="modal4"
      title="发布"
      @on-ok="ok4"
      @on-cancel="cancel4">
      <Form :model="formfabu" :label-width="20">
        <FormItem>
          <Input clearable placeholder="请输入达人关键字搜索" class="search-input" v-model="searchName"/>
          <Button type="info" @click="handSeek1" style="margin-top: 5px">搜索</Button></br>
          <Button @click="handleSelectAll(true)" style="margin-top: 5px;margin-right: 5px">全选</Button>
          <Button @click="handleSelectAll(false)" style="margin-top: 5px">取消</Button>
          <Table border ref="selection" :columns="columns4" :data="data2" @on-select="select" @on-select-all="selectall"></Table>
          <div style="text-align: right">
            <Page :total="dataCount1" :page-size="pageSize1" show-total class="paging" @on-change="changepage1"></Page>
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
        searchName:'',
        searchPhone:'',
        searchNum:'',
        ruleValidate: {
          name: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          type: [
            { required: true, message: '不能为空', trigger: 'blur' },
          ],
          number: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          price:[
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          startime: [
            { required: true, message: '不能为空', trigger: 'blur' },
          ],
          outtime: [
            { required: true, message: '不能为空', trigger: 'blur' },
          ]
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
        data2: [],
        type:[
          {
            value: '2',
            label: '指定用户'
          },
          {
            value: '1',
            label: '所有用户'
          },
        ],
        date2:'',
        date21:'',
        adddate:'',
        adddate1:'',
        formfabu:{},
        formAdd:{
          type:'',
          number:'',
          price:'',
          outtime:'',
          name:'',
          jwt:localStorage.getItem('jwt')
        },
        formItem:{
          Id:'',
          code:'',
          type:'',
          price:'',
          time:'',
          number:'',
          startime:'',
          outtime:'',
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
        pageSize: 10,
        page:1,
        ajaxHistoryData1: [],
        dataCount1: 0,
        // 每页显示多少条
        pageSize1: 8,
        columns1: [
          {
            title: '优惠券名称',
            key: 'name'
          },
          {
            title: '次数',
            key: 'number',
            // width: 120
          },
          {
            title: '折扣金额',
            key: 'price',
            // width: 120
          },
          {
            title: '类型',
            key: 'typename'
          },
          {
            title: '状态',
            key: 'statename'
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
            title: '结束时间',
            key: 'outtime',
            // width: 150
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
                      this.fabu(params.row);
                    }
                  }
                }, '发布'),
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
          url: 'admin/coupon/show',
          data: this.$qs.stringify({
            name: this.searchValue,
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
      //新增
      add(){
        this.modal3=true
      },
      changedate(res){
        // console.log(res,'时间内')
        this.adddate=res
      },
      changedate1(res){
        this.adddate1=res
      },
      chioce(item){
        // console.log(item,'悬着用户')
        this.formAdd.type = item.value
        if(item.value === '1'){
          this.modal3type=false
        }else if(item.value === '2'){
          this.modal3type=true
        }
      },
      ok3 (formAdd) {
        this.$refs[formAdd].validate((valid) => {
          if (valid) {
            this.$axios({
              method: 'post',
              url: 'admin/coupon/insert',
              data: this.$qs.stringify({
                number:this.formAdd.number,
                price:this.formAdd.price,
                startime:this.adddate,
                outtime:this.adddate1,
                name:this.formAdd.name,
                type:this.formAdd.type,
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
      handSeek1(){
        this.$axios({
          method: 'post',
          url: 'admin/user/show',
          data: this.$qs.stringify({
            name:this.searchName,
            phone:this.searchPhone,
            number:this.searchNum,
            jwt: localStorage.getItem('jwt')
          })
        }).then(res => {
          // console.log(res.data.table,'用户信息')
          this.ajaxHistoryData1 = res.data.table;
          this.dataCount1 = res.data.table.length;
          // 初始化显示，小于每页显示条数，全显，大于每页显示条数，取前每页条数显示
          if (res.data.table.length < this.pageSize1) {
            // this.historyData = this.ajaxHistoryData;
            this.data2 = res.data.table
          } else {
            this.data2 = this.ajaxHistoryData1.slice(0, this.pageSize1);
          }
        }).catch(res => {
          this.$Message.error('请求超时,请稍后再试...');
        });
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
        // this.formItem.Id=row.Id
      },
      chioce1(item){
        // console.log(item,'悬着用户')
        this.formItem.type = item.value
        if(item.value === '1'){
          this.modal3type=false
        }else if(item.value === '2'){
          this.modal3type=true
        }
      },
      changedate2(res){
        this.date2=res
      },
      changedate21(res){
        this.date21=res
      },
      changetime1(res){
        this.time=res
      },
      ok (formItem) {
        this.$refs[formItem].validate((valid) => {
          if (valid) {
            this.$axios({
              method: 'post',
              url: 'admin/Coupon/upd',
              data: this.$qs.stringify({
                Id: this.formItem.Id,
                type:this.formItem.type,
                number: this.formItem.number,
                price: this.formItem.price,
                startime: this.date2,
                outtime: this.date21,
                name: this.formItem.name,
                jwt:localStorage.getItem('jwt')
              })
            }).then(res => {
              // console.log(res,'修改')
              this.modal3=false
              this.modal1=false
              this.tableShow()
            }).catch(res => {
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
              url: 'admin/coupon/delete',
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
