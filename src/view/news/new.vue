<template>
  <div>
    <Button style="margin-right: 6px" type="info" @click="add">新增</Button>
    <!--<Select v-model="searchValue" style="width:200px;margin-right: 3px" placeholder="请选择搜索">-->
      <!--<Option v-for="item in type" :value="item.value" :key="item.value" @click.native="chioceSou(item)">{{ item.label }}</Option>-->
    <!--</Select>-->
    <Select v-model="searchValue1" style="width:200px;margin-right: 3px" placeholder="请选择状态搜索">
      <Option v-for="item in state" :value="item.value" :key="item.value" @click.native="chioceSou1(item)">{{ item.label }}</Option>
    </Select>
    <Input clearable placeholder="请输入标题关键字搜索" class="search-input" v-model="title" style="width: 300px;margin-right: 3px"/>
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
        <FormItem label="类型" prop="type">
          <Select v-model="formAdd.type" style="width:200px">
            <Option v-for="item in type" :value="item.label" :key="item.value" @click.native="chioce(item)">{{ item.label }}</Option>
          </Select>
          <!--<Input v-model="formAdd.vid" placeholder="" :maxlength='16'></Input>-->
        </FormItem>
        <FormItem label="标题" prop="title">
          <Input v-model="formAdd.title" placeholder="请输入标题" style="width:200px"></Input>
        </FormItem>
        <FormItem label="金额" prop="amount">
          <Input v-model="formAdd.amount" placeholder="请输入金额" style="width:200px"></Input>
        </FormItem>
        <FormItem label="机型大类" prop="jixinglei">
          <Select v-model="formAdd.jixinglei" style="width:200px">
            <Option v-for="item in jixinglei" :value="item.name" :key="item.id" @click.native="chioce2(item)">{{ item.name }}</Option>
          </Select>
          <!--<Input v-model="formAdd.vid" placeholder="" :maxlength='16'></Input>-->
        </FormItem>
        <FormItem label="品牌" prop="pinpai">
          <Select v-model="formAdd.pinpai" style="width:200px">
            <Option v-for="item in pinpai" :value="item.name" :key="item.id" @click.native="chioce3(item)">{{ item.name }}</Option>
          </Select>
          <!--<Input v-model="formAdd.vid" placeholder="" :maxlength='16'></Input>-->
        </FormItem>
        <FormItem label="机型" prop="jixing">
          <Select v-model="formAdd.jixing" style="width:200px">
            <Option v-for="item in jixing" :value="item.name" :key="item.id" @click.native="chioce4(item)">{{ item.name }}</Option>
          </Select>
          <!--<Input v-model="formAdd.vid" placeholder="" :maxlength='16'></Input>-->
        </FormItem>
        <FormItem label="设备" prop="shebei">
          <Select v-model="formAdd.shebei" style="width:200px">
            <Option v-for="item in shebei1" :value="item.name" :key="item.id" @click.native="chioce5(item)">{{ item.name }}</Option>
          </Select>
          <!--<Input v-model="formAdd.vid" placeholder="" :maxlength='16'></Input>-->
        </FormItem>
        <FormItem label="颜色">
          <Input v-model="formAdd.colour" placeholder="" :maxlength='16' style="width:200px"></Input>
        </FormItem>
        <FormItem label="故障原因" prop="hitch">
          <Select v-model="formAdd.hitch" style="width:200px">
            <Option v-for="item in hitch1" :value="item.main" :key="item.Id" @click.native="chioce12(item)">{{ item.main }}</Option>
          </Select>
          <!--<Input v-model="formAdd.vid" placeholder="" :maxlength='16'></Input>-->
        </FormItem>
        <FormItem label="状态" prop="state">
          <Select v-model="formAdd.state" style="width:200px">
            <Option v-for="item in state" :value="item.label" :key="item.value" @click.native="chioce1(item)">{{ item.label }}</Option>
          </Select>
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
      <Form :model="formItem" :label-width="80" :rules="ruleValidate2" ref="formItem">
        <FormItem label="类型" prop="type">
          <Select v-model="formItem.type" style="width:200px">
            <Option v-for="item in type" :value="item.label" :key="item.value" @click.native="chioce6(item)">{{ item.label }}</Option>
          </Select>
          <!--<Input v-model="formAdd.vid" placeholder="" :maxlength='16'></Input>-->
        </FormItem>
        <FormItem label="标题" prop="title">
          <Input v-model="formItem.title" placeholder="请输入标题" style="width:200px"></Input>
        </FormItem>
        <FormItem label="金额" prop="amount">
          <Input v-model="formItem.amount" placeholder="请输入金额" style="width:200px"></Input>
        </FormItem>
        <FormItem label="机型大类" prop="jixinglei">
          <Select v-model="formItem.jixinglei" style="width:200px">
            <Option v-for="item in jixinglei" :value="item.name" :key="item.id" @click.native="chioce8(item)">{{ item.name }}</Option>
          </Select>
          <!--<Input v-model="formAdd.vid" placeholder="" :maxlength='16'></Input>-->
        </FormItem>
        <FormItem label="品牌" prop="pinpai">
          <Select v-model="formItem.pinpai" style="width:200px">
            <Option v-for="item in pinpai" :value="item.name" :key="item.id" @click.native="chioce9(item)">{{ item.name }}</Option>
          </Select>
          <!--<Input v-model="formAdd.vid" placeholder="" :maxlength='16'></Input>-->
        </FormItem>
        <FormItem label="机型" prop="jixing">
          <Select v-model="formItem.jixing" style="width:200px">
            <Option v-for="item in jixing" :value="item.name" :key="item.id" @click.native="chioce10(item)">{{ item.name }}</Option>
          </Select>
          <!--<Input v-model="formAdd.vid" placeholder="" :maxlength='16'></Input>-->
        </FormItem>
        <FormItem label="设备" prop="shebei">
          <Select v-model="formItem.equipment" style="width:200px">
            <Option v-for="item in shebei1" :value="item.name" :key="item.id" @click.native="chioce11(item)">{{ item.name }}</Option>
          </Select>
          <!--<Input v-model="formAdd.vid" placeholder="" :maxlength='16'></Input>-->
        </FormItem>
        <FormItem label="颜色">
          <Input v-model="formItem.colour" placeholder="" :maxlength='16' style="width:200px"></Input>
        </FormItem>
        <FormItem label="故障原因" prop="hitch">
          <Select v-model="formItem.hitch" style="width:200px">
            <Option v-for="item in hitch2" :value="item.main" :key="item.Id" @click.native="chioce13(item)">{{ item.main }}</Option>
          </Select>
          <!--<Input v-model="formAdd.vid" placeholder="" :maxlength='16'></Input>-->
        </FormItem>
        <FormItem label="状态" prop="state">
          <Select v-model="formItem.state" style="width:200px">
            <Option v-for="item in state" :value="item.label" :key="item.value" @click.native="chioce7(item)">{{ item.label }}</Option>
          </Select>
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
  var date = new Date()
  export default {
    data () {
      return {
        searchValue:'',
        searchValue1:'',
        title:'',
        hitch1:[],
        hitch:"",
        hitch2:[],
        hitch12:"",
        ruleValidate: {
          title: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          main: [
            { required: true, message: '不能为空', trigger: 'blur' },
          ],
          amount:[
            { required: true, message: '不能为空', trigger: 'blur' },
          ]
        },
        ruleValidate2: {
          title: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          amount:[
            { required: true, message: '不能为空', trigger: 'blur' },
          ],
          main: [
            { required: true, message: '不能为空', trigger: 'blur' },
          ]
        },
        type:[
          {
            value: '1',
            label: '普通'
          },
          {
            value: '2',
            label: '设备'
          },
        ],
        state:[
          {
            value: '1',
            label: '显示'
          },
          {
            value: '2',
            label: '隐藏'
          },
        ],
        // type1:'',
        // state1:'',
        typeId:'',
        stateId:'',
        typeId1:'',
        stateId1:'',
        date:'',
        time:'',
        adddate:'',
        addtime:'',
        jixinglei:[],
        pinpai:[],
        jixing:[],
        shebei1:[],
        jixingId:'',
        pinpaiId:'',
        jixingleiId:'',
        shebeiId:'',
        jixingName:'',
        pinpaiName:'',
        jixingleiName:'',
        shebeiName:'',
        formAdd:{
          title:'',
          type:'',
          amount:'',
          category:'',
          colour:"",
          hitch:'',
          brand:'',
          version:'',
          equipment:'',
          state:'',
          jwt:localStorage.getItem('jwt')
        },
        formItem:{
          Id:'',
          title:'',
          type:'',
          typename:'',
          amount:'',
          jixinglei:'',
          pinpai:'',
          colour:"",
          hitch:'',
          jixing:'',
          equipment:'',
          state:'',
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
        columns1: [
          // {
          //   title: '类型',
          //   key: 'type',
          //   render: (h, params) => {
          //     return h('Tag', {
          //       props: {
          //         color: params.row.type === 1 ? 'green' : params.row.type === 2 ? 'red' : ''
          //       }
          //     }, params.row.type === 1 ? '普通' : params.row.type === 2 ? '设备' : '');
          //   }
          // },
          {
            title: '标题',
            key: 'title'
          },
          {
            title: '金额',
            key: 'amount'
          },
          {
            title: '机型大类',
            key: 'category'
          },
          {
            title: '品牌',
            key: 'brand'
          },
          {
            title: '机型',
            key: 'version'
          },
          {
            title: '设备',
            key: 'equipment'
          },
          {
            title: '颜色',
            key: 'colour'
          },
          {
            title: '故障原因',
            key: 'hitch'
          },
          {
            title: '状态',
            key: 'state',
            render: (h, params) => {
              return h('Tag', {
                props: {
                  color: params.row.state === 1 ? 'green' : params.row.state === 2 ? 'red' :''
                }
              }, params.row.state === 1 ? '显示' : params.row.state === 2 ? '隐藏' :'');
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
      //机型大类
      Lei(){
        this.$axios({
          method: 'post',
          url: 'admin/Category/show',
          data: this.$qs.stringify({
            jwt: localStorage.getItem('jwt')
          })
        }).then(res => {
          // console.log(res)
          this.jixinglei = res.data.table
          this.jixinglei1 = res.data.table
        }).catch(res => {
          this.$Message.error('请求超时,请稍后再试...');
        });
      },
      //品牌
      pinpaishow(){
        this.$axios({
          method: 'post',
          url: 'admin/Brand/show',
          data: this.$qs.stringify({
            // name:this.juti_name,
            cid:this.jixingleiId,
            jwt: localStorage.getItem('jwt')
          })
        }).then(res => {
          // console.log(res.data.table,'用户信息111')
          this.pinpai=res.data.table
          this.pinpai1=res.data.table
          // this.data3=res.data.table
        }).catch(res => {
          this.$Message.error('请求超时,请稍后再试...');
        });
      },
      //机型
      jixingjx(){
        this.$axios({
          method: 'post',
          url: 'admin/Version/show',
          data: this.$qs.stringify({
            cid:this.jixingleiId,
            bid:this.pinpaiId,
            // name:this.juti_name,
            jwt: localStorage.getItem('jwt')
          })
        }).then(res => {
          // console.log(res.data.table,'用户信息')
          this.jixing = res.data.table
          this.jixing1 = res.data.table
        }).catch(res => {
          this.$Message.error('请求超时,请稍后再试...');
        });
      },
      //设备
      shebei(){
        this.$axios({
          method: 'post',
          url: 'admin/Equipment/show',
          data: this.$qs.stringify({
            vid:this.jixingId,
            // name:this.series_name,
            jwt: localStorage.getItem('jwt')
          })
        }).then(res => {
          // console.log(res.data.table,'用户信息')
          this.shebei1 = res.data.table
          this.shebei11 = res.data.table
        }).catch(res => {
          this.$Message.error('请求超时,请稍后再试...');
        });
      },
      //故障列表
      guzhang(){
        this.$axios({
          method: 'post',
          url: 'admin/Hitch/show',
          data: this.$qs.stringify({
            main:this.main,
            // page:this.page,
            jwt: localStorage.getItem('jwt')
          })
        }).then(res => {
          // console.log(res.data.table,'故障列表')
          this.hitch1 = res.data.table
          this.hitch2 = res.data.table
        }).catch(res => {
          this.$Message.error('请求超时,请稍后再试...');
        });
      },
      //搜索
      handSeek(){
        this.tableShow()
      },
      chioceSou(item){
        // console.log(item)
        this.searchValue = item.label
      },
      chioceSou1(item){
        // console.log(item)
        this.searchValue1 = item.label
      },
      //用户信息展示
      tableShow(){
        this.$axios({
          method: 'post',
          url: 'admin/Amount/show',
          data: this.$qs.stringify({
            title:this.title,
            type:this.searchValue,
            state:this.searchValue1,
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
      //新增
      add(){
        this.modal3=true
        this.Lei()
        this.guzhang()
      },
      chioce(item){
        // console.log(item)
        this.typeId=item.value
        // console.log(this.typeId)
      },
      chioce1(item){
        // console.log(item)
        this.stateId=item.value
      },
      chioce2(item){
        // console.log(item)
        this.jixingleiId=item.Id
        this.jixingleiName=item.name
        this.pinpaishow()
      },
      chioce3(item){
        // console.log(item)
        this.pinpaiId=item.Id
        this.pinpaiName=item.name
        this.jixingjx()
      },
      chioce4(item){
        // console.log(item)
        this.jixingId=item.Id
        this.jixingName=item.name
        this.shebei()
      },
      chioce5(item){
        // console.log(item)
        this.shebeiName=item.name
      },
      chioce12(item){
        // console.log(item)
        this.hitch=item.main
      },
      ok3 (formAdd) {
        this.$refs[formAdd].validate((valid) => {
          if (valid) {
            this.$axios({
              method: 'post',
              url: 'admin/Amount/insert',
              data: this.$qs.stringify({
                title:this.formAdd.title,
                type:this.typeId,
                amount:this.formAdd.amount,
                category:this.jixingleiName,
                brand:this.pinpaiName,
                version:this.jixingName,
                equipment:this.shebeiName,
                state:this.stateId,
                hitch:this.hitch,
                colour:this.formAdd.colour,
                jwt:localStorage.getItem('jwt')
              })
            }).then(res => {
              this.tableShow()
              this.modal3=false
              this.formAdd = {}
            }).catch(res => {
              this.$Message.error('请求超时,请稍后再试...');
            });
            callback();
          } else{
            // console.log('新增失败')
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
      //用户修改
      xiugai(row){
        // console.log(row)
        this.modal1=true
        this.formItem=row
        // this.formItem.typename=row.typename
        this.formItem.jixinglei=row.category
        this.formItem.pinpai=row.brand
        this.formItem.jixing=row.version
        this.formItem.equipment=row.equipment
        this.formItem.Id=row.Id
        this.Lei()
        //品牌
        this.$axios({
          method: 'post',
          url: 'admin/Brand/show',
          data: this.$qs.stringify({
            // name:this.juti_name,
            cid:row.categoryid,
            jwt: localStorage.getItem('jwt')
          })
        }).then(res => {
          // console.log(res.data.table,'用户信息111')
          this.pinpai=res.data.table
          // this.pinpai1=res.data.table
          // this.data3=res.data.table
        }).catch(res => {
          this.$Message.error('请求超时,请稍后再试...');
        });
        //机型
          this.$axios({
            method: 'post',
            url: 'admin/Version/show',
            data: this.$qs.stringify({
              cid:row.categoryid,
              bid:row.brandid,
              // name:this.juti_name,
              jwt: localStorage.getItem('jwt')
            })
          }).then(res => {
            // console.log(res.data.table,'用户信息22222')
            this.jixing = res.data.table
            // this.jixing1 = res.data.table
          }).catch(res => {
            this.$Message.error('请求超时,请稍后再试...');
          });
        //设备
          this.$axios({
            method: 'post',
            url: 'admin/Equipment/show',
            data: this.$qs.stringify({
              vid:row.versionid,
              // name:this.series_name,
              jwt: localStorage.getItem('jwt')
            })
          }).then(res => {
            // console.log(res.data.table,'用户信息333333')
            this.shebei1 = res.data.table
            // this.shebei11 = res.data.table
          }).catch(res => {
            this.$Message.error('请求超时,请稍后再试...');
          });
        this.jixingleiName=row.category
        this.pinpaiName=row.brand
        this.jixingName=row.version
        this.shebeiName=row.equipment
        this.guzhang()
      },
      chioce6(item){
        // console.log(item)
        this.typeId1=item.value
        // console.log(this.typeId)
      },
      chioce7(item){
        // console.log(item)
        this.stateId1=item.value
      },
      chioce8(item){
        // console.log(item)
        this.jixingleiId=item.Id
        this.jixingleiName=item.name
        this.pinpaishow()
      },
      chioce9(item){
        // console.log(item)
        this.pinpaiId=item.Id
        this.pinpaiName=item.name
        this.jixingjx()
      },
      chioce10(item){
        // console.log(item)
        this.jixingId=item.Id
        this.jixingName=item.name
        this.shebei()
      },
      chioce11(item){
        // console.log(item)
        this.shebeiName=item.name
      },
      chioce13(item){
        // console.log(item)
        this.hitch12=item.main
      },
      ok (formItem) {
        this.$refs[formItem].validate((valid) => {
          if (valid) {
            this.$axios({
              method: 'post',
              url: 'admin/Amount/upd',
              data: this.$qs.stringify({
                Id: this.formItem.Id,
                title:this.formItem.title,
                type:this.typeId1,
                amount:this.formItem.amount,
                category:this.jixingleiName,
                brand:this.pinpaiName,
                version:this.jixingName,
                equipment:this.shebeiName,
                state:this.stateId1,
                hitch:this.hitch12,
                colour:this.formItem.colour,
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
              url: 'admin/Amount/delete',
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
