<template>
  <div>
    <Button style="margin-right: 5px;float: left;margin-bottom: 10px" type="info" @click="add">新增</Button>
    <!--搜索-->
    <Row style="float: left;margin-right: 3px">
      <Col span="12">
        <Select
          v-model="model13"
          filterable
          remote
          style="width:200px"
          :clearable="true"
          placeholder="请选择客户或输入客户名称"
          @on-clear="clear"
          :remote-method="remoteMethod1"
          :loading="loading3">
          <Option v-for="(item, index) in user" :value="item.name" :key="index" style="width: 100px">{{item.name}}</Option>
        </Select>
      </Col>
    </Row>
    <!--<Input clearable placeholder="请输入用户名关键字搜索" class="search-input" v-model="searchName" style="width: 200px"/>-->
    <!--<Input clearable placeholder="请输入工号关键字搜索" class="search-input" v-model="searchNum" style="width: 200px;margin-right: 3px"/>-->
    <!--<Input clearable placeholder="请输入手机号关键字搜索" class="search-input" v-model="searchPhone" style="width: 200px;margin-right: 3px"/>-->
    <Button type="info" @click="handSeek">搜索</Button>
    <Table :columns="columns1" :data="data1" style="margin-top: 10px"></Table>
    <!--新增-->
    <Modal
      v-model="modal3"
      title="新增信息"
      @on-ok="ok3('formAdd')"
      @on-cancel="cancel3"
      :loading="loading">
      <Form :model="formAdd" :label-width="80" :rules="ruleValidate" ref="formAdd">
        <FormItem label="客户姓名" prop="name">
          <Input v-model="formAdd.name" placeholder="请输入1-16个字符" :maxlength='16' style="width:300px"></Input>
        </FormItem>
        <FormItem label="手机号" prop="phone">
          <Input v-model="formAdd.phone" placeholder="请输入手机号" style="width:300px"></Input>
        </FormItem>
        <FormItem label="省份" prop="province">
          <Select v-model="formAdd.province" style="width:300px" placeholder="请选择省份">
            <Option v-for="item in cityList" :value="item.name" :key="item.id" @click.native="chioce(item)">{{ item.name }}</Option>
          </Select>
          <!--<Input v-model="formAdd.provinceid" placeholder=""></Input>-->
        </FormItem>
        <FormItem label="城市" prop="city">
          <Select v-model="formAdd.city" style="width:300px" placeholder="请选择城市">
            <Option v-for="item in cityList1" :value="item.name" :key="item.id" @click.native="chioce1(item)">{{ item.name }}</Option>
          </Select>
          <!--<Input v-model="formAdd.cityid" placeholder=""></Input>-->
        </FormItem>
        <FormItem label="地区" prop="area">
          <Select v-model="formAdd.area" style="width:300px" placeholder="请选择地区">
            <Option v-for="item in cityList2" :value="item.name" :key="item.id" @click.native="chioce2(item)">{{ item.name }}</Option>
          </Select>
          <!--<Input v-model="formAdd.areaid" placeholder=""></Input>-->
        </FormItem>
        <FormItem label="详细地址" prop="address">
          <Input v-model="formAdd.address" placeholder="请输入详细地址" style="width:300px"></Input>
          <!--<div class="map1" v-show="maptu">-->
          <!--<el-amap vid="amapDemo1" class="amap" :center="center" :zoom="zoom">-->
          <!--<el-amap-marker v-for="marker in markers2" :events="marker.events" :position="center2" vid="amapMarker1" :clickable="true"></el-amap-marker>-->
          <!--<el-amap-info-window :position="center2" :content='content2' :visible="modal412" :events="infos2[0].events"></el-amap-info-window>-->
          <!--</el-amap>-->
          <!--</div>-->
        </FormItem>
      </Form>
    </Modal>
    <!--//修改弹框-->
    <!--<Button type="primary" @click="modal1 = true">修改</Button>-->
    <Modal
      v-model="modal1"
      title="修改信息"
      @on-ok="ok('formItem')"
      @on-cancel="cancel"
      :loading="loading1">
      <Form :model="formItem" :label-width="80" :rules="ruleValidate2" ref="formItem">
        <FormItem label="客户姓名" prop="name">
          <Input v-model="formItem.name" placeholder="请输入1-16个字符" :maxlength='16' style="width:300px"></Input>
        </FormItem>
        <FormItem label="手机号" prop="phone">
          <Input v-model="formItem.phone" placeholder="请输入手机号" style="width:300px"></Input>
        </FormItem>
        <FormItem label="省份" prop="province">
          <Select v-model="formItem.province" style="width:300px" placeholder="请选择省份">
            <Option v-for="item in cityList" :value="item.name" :key="item.id" @click.native="chioce(item)">{{ item.name }}</Option>
          </Select>
        </FormItem>
        <FormItem label="城市" prop="city">
          <Select v-model="formItem.city" style="width:300px" placeholder="请选择城市">
            <Option v-for="item in cityList1" :value="item.name" :key="item.id" @click.native="chioce1(item)">{{ item.name }}</Option>
          </Select>
        </FormItem>
        <FormItem label="地区" prop="area">
          <Select v-model="formItem.area" style="width:300px" placeholder="请选择地区">
            <Option v-for="item in cityList2" :value="item.name" :key="item.id" @click.native="chioce2(item)">{{ item.name }}</Option>
          </Select>
        </FormItem>
        <FormItem label="详细地址" prop="address">
          <Input v-model="formItem.address" placeholder="请输入详细地址" style="width:300px"></Input>
        </FormItem>
      </Form>
    </Modal>
    <!--//地图展示-->
    <!--<Modal-->
      <!--width="600"-->
      <!--v-model="modal2"-->
      <!--title="查看地图"-->
      <!--@on-ok="ok2"-->
      <!--@on-cancel="cancel2">-->
      <!--<Form :label-width="80">-->
        <!--<FormItem label="详细地址">-->
          <!--<div class="map">-->
            <!--<el-amap vid="amapDemo" class="amap" :center="center" :zoom="zoom">-->
              <!--<el-amap-marker v-for="marker in markers" :events="marker.events" :position="center" vid="amapMarker" :clickable="true"></el-amap-marker>-->
              <!--<el-amap-info-window :position="center" :content='content' :visible="modal4" :events="infos[0].events"></el-amap-info-window>-->
            <!--</el-amap>-->
          <!--</div>-->
        <!--</FormItem>-->
      <!--</Form>-->
    <!--</Modal>-->
    <!--//分页-->
    <div style="text-align: right">
      <Page :total="dataCount" :page-size="pageSize" show-total class="paging" @on-change="changepage"></Page>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      const validatePhone = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('手机号不能为空'));
        } else if (!/^1[34578]\d{9}$/.test(value)) {
          callback('手机号格式不正确');
        } else {
          callback();
        }
      };
      const validatePass = (rule, value, callback) => {
        // 此时便能打印value值查看
        console.log(value,'打印值')
      };
      return {
        user:[],
        model13: '',
        loading3: false,
        markers: [
          {
            events: {
              click: () => {
                this.modal4 = !this.modal4
                //此处点击是有bug
                // console.log('true')
              }
            }
          }
        ],
        infos: [
          {
            events: {
              // open () {
              //   this.modal4 = true
              //   console.log('true1')
              // },
              close() {
                this.modal4 = false
                // console.log('false')
              }
            }
          }
        ],
        zoom:14,
        center:[121.6292529148,31.2035397816],
        // center:[],
        content:'',
        ruleValidate: {
          name: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          phone: [
            // { required: true, message: '不能为空', trigger: 'blur' },
            {type: 'number',required:true,validator:validatePhone,message:'请输入正确的手机号',trigger:'change'}
          ],
          number: [
            { type: 'number',required: true, message: '不能为空', trigger: 'blur' },
          ],
          provinceid: [
            { required: true, message: '不能为空', trigger: 'blur' },
          ],
          cityid: [
            { required: true, message: '不能为空', trigger: 'blur' },
          ],
          areaid: [
            { required: true, message: '不能为空', trigger: 'blur' },
          ],
          address: [
            { required: true, message: '不能为空', trigger: 'blur' },
          ]
        },
        ruleValidate2: {
          name: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          phone: [
            // { required: true, message: '不能为空', trigger: 'blur' },
            {type: 'number',required:true,validator:validatePhone,message:'请输入正确的手机号',trigger:'change'}
          ],
          number: [
            { type: 'number',required: true, message: '不能为空', trigger: 'blur' },
          ],
          pass: [
            { required: true, message: '不能为空', trigger: 'blur' },
          ],
          // provinceid: [
          //   { required: true, message: '不能为空', trigger: 'blur' },
          // ],
          // cityid: [
          //   { required: true, message: '不能为空', trigger: 'blur' },
          // ],
          // areaid: [
          //   { required: true, message: '不能为空', trigger: 'blur' },
          // ],
          address: [
            { required: true, message: '不能为空', trigger: 'blur' },
          ]
        },
        searchName:'',
        searchNum:'',
        searchPhone:'',
        cityList:[],
        cityList1:[],
        cityList2:[],
        cityListId:'',
        cityListId1:'',
        cityListId2:'',
        shengtype:"",
        shitype:'',
        qutype:'',
        provincename:'',
        cityname:'',
        areaname:'',
        // url:'@/assets/images/imgs.png',
        url:'',
        url1:'',
        img:{
          image:null,
          jwt:localStorage.getItem('jwt')
        },
        img1:{
          image:null,
          jwt:localStorage.getItem('jwt')
        },
        formAdd:{
          name:'',
          phone:'',
          city:'',
          province:'',
          area:'',
          address:'',
          jwt:localStorage.getItem('jwt')
        },
        formItem:{
          Id:'',
          name:'',
          phone:'',
          province:'',
          city:'',
          area:'',
          provinceid:'',
          cityid:'',
          areaid:'',
          address:'',
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
        modal4:true,
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
            title: '客户姓名',
            key: 'name',
          },
          {
            title: '手机号',
            key: 'phone',
          },
          {
            title: '创建时间',
            key: 'time',
          },
          {
            title: '省份',
            key: 'province'
          },
          {
            title: '城市',
            key: 'city'
          },
          {
            title: '区域',
            key: 'area',
          },
          {
            title: '详细地址',
            key: 'address'
          },
          {
            title: '操作',
            key: 'action',
            width: 180,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                // h('Tag', {
                //   props: {
                //     type: 'info',
                //     size: 'small',
                //     color: params.row.quit === 1 ? 'green' : params.row.quit === 2 ? 'gray' :''
                //   },
                //   style: {
                //     marginRight: '5px',
                //     marginBottom: '5px',
                //     marginTop: '3px',
                //     // float:'left',
                //     // backColor:'#7ccc2f'
                //   },
                //   nativeOn: {
                //     click: () => {
                //       this.lizhi(params.row);
                //     }
                //   }
                // }, params.row.quit === 1 ? '在职' : params.row.quit === 2 ? '离职' : ''),
                h('Button', {
                  props: {
                    type: 'info',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px',
                    marginBottom: '5px',
                    marginTop: '3px',
                    backColor:'#7ccc2f'
                  },
                  on: {
                    click: () => {
                      this.xiugai(params.row);
                    }
                  }
                }, '修改'),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px',
                    marginBottom: '5px',
                    marginTop: '3px',
                  },
                  attrs: {
                    style: 'background-color:#d6514d;border:1px solid #d6514d'
                  },
                  on: {
                    click: () => {
                      this.delete(params.row);
                    }
                  }
                }, '删除'),
                // h('Button', {
                //   props: {
                //     type: 'info',
                //     size: 'small'
                //   },
                //   style: {
                //     marginRight: '5px',
                //     marginBottom: '5px'
                //   },
                //   attrs: {
                //     style: 'background-color:#9c56d8;border:1px solid #9c56d8'
                //   },
                //   on: {
                //     click: () => {
                //       this.map1(params.row);
                //     }
                //   }
                // }, '查看地图'),
                // h('Button', {
                //   props: {
                //     type: 'info',
                //     size: 'small'
                //   },
                //   style: {
                //     marginRight: '5px',
                //     marginBottom: '3px'
                //   },
                //   attrs: {
                //     style: 'background-color:#7ccc2f;border:1px solid #7ccc2f'
                //   },
                //   on: {
                //     click: () => {
                //       this.manage(params.row);
                //     }
                //   }
                // }, '发送消息'),
                // h('Button', {
                //   props: {
                //     type: 'info',
                //     size: 'small'
                //   },
                //   style: {
                //     marginRight: '5px',
                //     marginBottom: '5px',
                //     marginTop: '3px',
                //     backColor:'#7ccc2f'
                //   },
                //   on: {
                //     click: () => {
                //       this.noOrder(params.row);
                //     }
                //   }
                // }, '未处理订单'),
                // h('Button', {
                //   props: {
                //     type: 'info',
                //     size: 'small'
                //   },
                //   style: {
                //     marginRight: '5px',
                //     marginBottom: '5px',
                //     marginTop: '3px',
                //     backColor:'#7ccc2f'
                //   },
                //   on: {
                //     click: () => {
                //       this.dayOrder(params.row);
                //     }
                //   }
                // }, '今日需处理订单'),
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
      //离职
      lizhi(row){
        // console.log(row,'用户信息')
        this.$axios({
          method: 'post',
          url: 'admin/customer/show',
          data: this.$qs.stringify({
            Id:row.Id,
            jwt: localStorage.getItem('jwt')
          })
        }).then(res => {
          // console.log(res.data.table,'用户信息')
          this.tableShow()
        }).catch(res => {
          this.$Message.error('请求超时,请稍后再试...');
        });
      },
      //未处理订单
      noOrder(row){
        // console.log(row,'未处理订单')
        this.$router.push({
          path:'/o_management',
          query:{
            uid:row.Id,
            state:6
          }
        })
      },
      //今日需处理订单
      dayOrder(row){
        var date = new Date()
        var Y = date.getFullYear()
        var M = date.getMonth() + 1
        var D = date.getDate()
        var day = Y+'-'+M+'-' +D
        // console.log(Y+'-'+M+'-' +D,'4562331')
        this.$router.push({
          path:'/o_management',
          query:{
            uid:row.Id,
            state:6,
            times:day
          }
        })
      },
      //用户信息展示
      tableShow(){
        this.$axios({
          method: 'post',
          url: 'admin/customer/show',
          data: this.$qs.stringify({
            name:this.model13,
            phone:this.searchPhone,
            number:this.searchNum,
            page:this.page,
            jwt: localStorage.getItem('jwt')
          })
        }).then(res => {
          // console.log(res.data.table,'用户信息')
          this.ajaxHistoryData = res.data.table;
          this.list = res.data.table;
          this.user = res.data.table;
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
      remoteMethod1 (query) {
        // console.log(query,'skjfdasfkasd')
        // this.tableShow()
        if (query !== '') {
          this.loading3 = true;
          setTimeout(() => {
            this.loading3 = false;
            this.user = this.list;
          }, 200);
        } else {
          this.user = [];
        }
        // console.log(this.model13)
      },
      clear(){
        // console.log('123')
        this.tableShow()
      },
      handSeek(){
        this.tableShow()
      },
      //新增
      add(){
        this.modal3=true
        this.sheng()
      },
      chioce(item){
        // console.log(item,'市三级联动1')
        this.cityListId=item.id
        this.shengtype=item.type
        this.shi()
      },
      //省联动
      sheng(){
        this.$axios({
          url: 'admin/user/adress',
          method: 'get',
        }).then(res => {
          // console.log(res,'市三级联动1')
          this.cityList = res.data.table
        }).catch(res => {
          this.$Message.error('请求超时,请稍后再试...')
        });
      },
      chioce1(item){
        // console.log(item,'12345')
        this.cityListId1=item.id
        this.shitype=item.type
        this.qu()
      },
      //市联动
      shi(){
        this.$axios({
          method: 'post',
          url: 'admin/user/getRegion',
          data: this.$qs.stringify({
            id: this.cityListId,
            type: this.shengtype
            // jwt:localStorage.getItem('jwt')
          })
        }).then(res => {
          // console.log(res,'市三级联动2')
          this.cityList1=res.data
        }).catch(res => {
          this.$Message.error('请求超时,请稍后再试...');
        });
      },
      chioce2(item){
        this.cityListId2=item.id
        this.qutype=item.type
      },
      //区联动
      qu(){
        this.$axios({
          method: 'post',
          url: 'admin/user/getRegion',
          data: this.$qs.stringify({
            id: this.cityListId1,
            type: this.shitype
            // jwt:localStorage.getItem('jwt')
          })
        }).then(res => {
          // console.log(res,'市三级联动3')
          this.cityList2=res.data
        }).catch(res => {
          this.$Message.error('请求超时,请稍后再试...');
        });
      },
      handleBeforUpload (file) {
        this.img.image = file  // 将回调的文件信息存入data.file
      },
      handleSuccess(response){
        // console.log(response.url)
        this.url = response.url
      },
      ok3 (formAdd) {
        // console.log(this.$nextTick,'验证')
        this.$refs[formAdd].validate((valid) => {
          if (valid) {
            this.$axios({
              method: 'post',
              url: 'admin/customer/insert',
              data: this.$qs.stringify({
                name: this.formAdd.name,
                phone: this.formAdd.phone,
                province: this.cityListId,
                city: this.cityListId1,
                area:this.cityListId2,
                address:this.formAdd.address,
                jwt:localStorage.getItem('jwt')
              })
            }).then(res => {
              // console.log(res,'用户增加')
              if(res.data.code === 200){
                this.tableShow()
                this.modal3 = false
                this.formAdd = {}
              }else if(res.data.code === 400){
                this.modal3 = true
                this.$Message.error('请输入正确的详细地址信息...');
              }
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
        this.url1=row.img
        //省
        this.$axios({
          url: 'admin/user/adress',
          method: 'get',
        }).then(res => {
          // console.log(res,'市三级联动1')
          this.cityList = res.data.table
        }).catch(res => {
          this.$Message.error('请求超时,请稍后再试...')
        });
        //市
        this.$axios({
          method: 'post',
          url: 'admin/user/getRegion',
          data: this.$qs.stringify({
            id: row.provinceid,
            type: 1,
            // jwt:localStorage.getItem('jwt')
          })
        }).then(res => {
          // console.log(res,'市三级联动2')
          this.cityList1=res.data
        }).catch(res => {
          this.$Message.error('请求超时,请稍后再试...');
        });
        //区
        this.$axios({
          method: 'post',
          url: 'admin/user/getRegion',
          data: this.$qs.stringify({
            id: row.cityid,
            type: 2,
            // jwt:localStorage.getItem('jwt')
          })
        }).then(res => {
          // console.log(res,'qu三级联动3')
          this.cityList2=res.data
        }).catch(res => {
          this.$Message.error('请求超时,请稍后再试...');
        });
        this.formItem.province=row.province
        this.formItem.city=row.city
        this.formItem.area=row.area

        this.cityListId=row.provinceid
        this.cityListId1=row.cityid
        this.cityListId2=row.areaid
      },
      handleBeforUpload1 (file) {
        this.img1.image = file  // 将回调的文件信息存入data.file
      },
      handleSuccess1(response){
        // console.log(response.url)
        this.url1 = response.url
      },
      ok (formItem) {
        // console.log(this.cityListId,'hsndjkfsdlf')
        this.modal3=false
        this.$refs[formItem].validate((valid) => {
          if (valid) {
            this.$axios({
              method: 'post',
              url: 'admin/customer/upd',
              data: this.$qs.stringify({
                Id:this.formItem.Id,
                name:this.formItem.name,
                phone: this.formItem.phone,
                province: this.cityListId,
                city: this.cityListId1,
                area:this.cityListId2,
                address: this.formItem.address,
                jwt:localStorage.getItem('jwt')
              })
            }).then(res => {
              // console.log(res,'用户修改')
              this.modal3=false
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
      // 查看地图
      close(){
        // console.log('1234')
      },
      map1(row){
        // console.log(row)
        this.modal2=true
        // this.center[0]=row.longitude
        // this.center[1]=row.latitude     此方式错误不显示
        this.center = [row.longitude,row.latitude]
        this.content = row.city+row.area+row.address
        // console.log(this.center,'地图')
        // console.log(this.center,'字符串')
        // this.center=this.center.map(Number)
        // console.log(this.center,'数字')
      },
      ok2 () {
        this.tableShow()
      },
      cancel2 () {
        this.tableShow()
      },
      event(){
        // console.log('地图点击事件')
      },
      // click1(event){},
      manage(row){
        // console.log(row)
        this.$axios({
          method: 'post',
          url: 'admin/mail/insert',
          data: this.$qs.stringify({
            title:'收款提醒',
            main:'未交收款' + row.total + '元',
            jwt:localStorage.getItem('jwt')
          })
        }).then(res => {
          this.tableShow()
          this.modal3=false
          this.formAdd = {}
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
              url: 'admin/customer/delete',
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
    },
  }
</script>

<style scoped>
  .map {
    width: 100%;
    height: 400px;
  }

</style>
