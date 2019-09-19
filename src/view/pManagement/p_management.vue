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
          placeholder="请选择达人或输入达人名称"
          @on-clear="clear"
          :remote-method="remoteMethod1"
          :loading="loading3">
          <Option v-for="(item, index) in user" :value="item.name" :key="index" style="width: 100px">{{item.name}}</Option>
        </Select>
      </Col>
    </Row>
    <!--<Input clearable placeholder="请输入用户名关键字搜索" class="search-input" v-model="searchName" style="width: 200px"/>-->
    <Input clearable placeholder="请输入工号关键字搜索" class="search-input" v-model="searchNum" style="width: 200px;margin-right: 3px"/>
    <Input clearable placeholder="请输入手机号关键字搜索" class="search-input" v-model="searchPhone" style="width: 200px;margin-right: 3px"/>
    <Button type="info" @click="handSeek">搜索</Button>
    <Table :columns="columns1" :data="data1" style="margin-top: 10px"></Table>
    <!--新增-->
    <Modal
      v-model="modal3"
      title="新增用户信息"
      @on-ok="ok3('formAdd')"
      @on-cancel="cancel3"
      :loading="loading">
      <Form :model="formAdd" :label-width="80" :rules="ruleValidate" ref="formAdd">
        <FormItem label="达人姓名" prop="name">
          <Input v-model="formAdd.name" placeholder="请输入1-16个字符" :maxlength='16' style="width:200px"></Input>
        </FormItem>
        <FormItem label="手机号" prop="phone">
          <Input v-model="formAdd.phone" placeholder="请输入手机号" style="width:200px"></Input>
        </FormItem>
        <FormItem label="工号" prop="number">
          <Input v-model="formAdd.number" placeholder="请输入工号" style="width:200px"></Input>
        </FormItem>
        <FormItem label="省份" prop="provinceid">
          <Select v-model="formAdd.provinceid" style="width:200px" placeholder="请选择省份">
            <Option v-for="item in cityList" :value="item.name" :key="item.id" @click.native="chioce(item)">{{ item.name }}</Option>
          </Select>
          <!--<Input v-model="formAdd.provinceid" placeholder=""></Input>-->
        </FormItem>
        <FormItem label="城市" prop="cityid">
          <Select v-model="formAdd.cityid" style="width:200px" placeholder="请选择城市">
            <Option v-for="item in cityList1" :value="item.name" :key="item.id" @click.native="chioce1(item)">{{ item.name }}</Option>
          </Select>
          <!--<Input v-model="formAdd.cityid" placeholder=""></Input>-->
        </FormItem>
        <FormItem label="地区" prop="areaid">
          <Select v-model="formAdd.areaid" style="width:200px" placeholder="请选择地区">
            <Option v-for="item in cityList2" :value="item.name" :key="item.id" @click.native="chioce2(item)">{{ item.name }}</Option>
          </Select>
          <!--<Input v-model="formAdd.areaid" placeholder=""></Input>-->
        </FormItem>
        <FormItem label="详细地址" prop="address">
          <Input v-model="formAdd.address" placeholder="请输入详细地址" style="width:200px"></Input>
          <!--<div class="map1" v-show="maptu">-->
            <!--<el-amap vid="amapDemo1" class="amap" :center="center" :zoom="zoom">-->
              <!--<el-amap-marker v-for="marker in markers2" :events="marker.events" :position="center2" vid="amapMarker1" :clickable="true"></el-amap-marker>-->
              <!--<el-amap-info-window :position="center2" :content='content2' :visible="modal412" :events="infos2[0].events"></el-amap-info-window>-->
            <!--</el-amap>-->
          <!--</div>-->
        </FormItem>
        <FormItem label="照片">
          <Upload
            action="http://54.223.48.127/repair/public/admin/index/upd"
            :data="img"
            ref="upload"
            :format="['jpg','jpeg','png']"
            :show-upload-list="false"
            :before-upload="handleBeforUpload"
            :on-success="handleSuccess">
            <Button icon="ios-cloud-upload-outline">点击上传</Button>
          </Upload>
        </FormItem>
        <FormItem>
          <div style="width: 100px;height: 100px;border: 1px darkgrey solid;text-align: center">
            <img :src="url" alt="请点击上传" style="width: 100px;height: 100px" v-model="formAdd.img">
          </div>
        </FormItem>
        <FormItem label="等级">
          <Input v-model="formAdd.grade" placeholder="请输入等级" style="width:200px"></Input>
        </FormItem>
        <FormItem label="技术指导">
          <Input v-model="formAdd.arrangement" placeholder="请输入技术指导" style="width:200px"></Input>
        </FormItem>
        <FormItem label="总额">
          <Input v-model="formAdd.total" placeholder="请输入总额" style="width:200px"></Input>
        </FormItem>
        <FormItem label="领用额度">
          <Input v-model="formAdd.quota" placeholder="请输入领用额度" style="width:200px"></Input>
        </FormItem>
      </Form>
    </Modal>
    <!--//修改弹框-->
    <!--<Button type="primary" @click="modal1 = true">修改</Button>-->
    <Modal
      v-model="modal1"
      title="修改用户信息"
      @on-ok="ok('formItem')"
      @on-cancel="cancel"
      :loading="loading1">
      <Form :model="formItem" :label-width="80" :rules="ruleValidate2" ref="formItem">
        <FormItem label="达人姓名" prop="name">
          <Input v-model="formItem.name" placeholder="请输入1-16个字符" :maxlength='16' style="width:200px"></Input>
        </FormItem>
        <FormItem label="手机号" prop="phone">
          <Input v-model="formItem.phone" placeholder="请输入手机号" style="width:200px"></Input>
        </FormItem>
        <FormItem label="工号" prop="number">
          <Input v-model="formItem.number" placeholder="请输入工号" style="width:200px"></Input>
        </FormItem>
        <FormItem label="密码" prop="pass">
          <Input v-model="formItem.pass" placeholder="" style="width:200px"></Input>
        </FormItem>
        <FormItem label="照片">
          <Upload
            action="http://54.223.48.127/repair/public/admin/index/upd_imgs"
            :data="img1"
            ref="upload"
            :format="['jpg','jpeg','png']"
            :show-upload-list="false"
            :before-upload="handleBeforUpload1"
            :on-success="handleSuccess1">
            <Button icon="ios-cloud-upload-outline">点击上传</Button>
          </Upload>
        </FormItem>
        <FormItem>
          <div style="width: 100px;height: 100px;border: 1px darkgrey solid">
            <img :src="url1" alt="请点击上传" style="width: 100px;height: 100px" v-model="formItem.img">
          </div>
        </FormItem>
        <FormItem label="省份" prop="provinceid">
          <Select v-model="formItem.province" style="width:200px" placeholder="请选择省份">
            <Option v-for="item in cityList" :value="item.name" :key="item.id" @click.native="chioce(item)">{{ item.name }}</Option>
          </Select>
        </FormItem>
        <FormItem label="城市" prop="cityid">
          <Select v-model="formItem.city" style="width:200px" placeholder="请选择城市">
            <Option v-for="item in cityList1" :value="item.name" :key="item.id" @click.native="chioce1(item)">{{ item.name }}</Option>
          </Select>
        </FormItem>
        <FormItem label="地区" prop="areaid">
          <Select v-model="formItem.area" style="width:200px" placeholder="请选择地区">
            <Option v-for="item in cityList2" :value="item.name" :key="item.id" @click.native="chioce2(item)">{{ item.name }}</Option>
          </Select>
        </FormItem>
        <FormItem label="详细地址" prop="address">
          <Input v-model="formItem.address" placeholder="请输入详细地址" style="width:200px"></Input>
        </FormItem>
        <FormItem label="等级" prop="grade">
          <Input v-model="formItem.grade" placeholder="请输入等级" style="width:200px"></Input>
        </FormItem>
        <FormItem label="技术指导" prop="arrangement">
          <Input v-model="formItem.arrangement" placeholder="请输入技术指导" style="width:200px"></Input>
        </FormItem>
        <FormItem label="总额" prop="total">
          <Input v-model="formItem.total" placeholder="请输入总额" style="width:200px"></Input>
        </FormItem>
        <FormItem label="领用额度" prop="quota">
          <Input v-model="formItem.quota" placeholder="请输入领用额度" style="width:200px"></Input>
        </FormItem>
      </Form>
    </Modal>
    <!--//地图展示-->
    <Modal
      width="600"
      v-model="modal2"
      title="查看地图"
      @on-ok="ok2"
      @on-cancel="cancel2">
      <Form :label-width="80">
        <FormItem label="详细地址">
          <div class="map">
            <el-amap vid="amapDemo" class="amap" :center="center" :zoom="zoom">
              <el-amap-marker v-for="marker in markers" :events="marker.events" :position="center" vid="amapMarker" :clickable="true"></el-amap-marker>
              <el-amap-info-window :position="center" :content='content' :visible="modal4" :events="infos[0].events"></el-amap-info-window>
            </el-amap>
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
          // console.log(value,'打印值')
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
            grade:'',
            number:'',
            arrangement:'',
            total:'',
            quota:'',
            cityid:'',
            provinceid:'',
            areaid:'',
            address:'',
            img:'',
            jwt:localStorage.getItem('jwt')
          },
          formItem:{
            Id:'',
            name:'',
            phone:'',
            grade:'',
            number:'',
            arrangement:'',
            total:'',
            quota:'',
            pass:'',
            province:'',
            city:'',
            area:'',
            provinceid:'',
            cityid:'',
            areaid:'',
            address:'',
            img:'',
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
              title: '达人姓名',
              key: 'name',
              // width: 120
            },
            {
              title: '照片',
              key: 'img',
              // width: 100,
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
              title: '手机号',
              key: 'phone',
              // width: 120
            },
            {
              title: '工号',
              key: 'number'
            },
            {
              title: '等级',
              key: 'grade'
            },
            {
              title: '技术指数',
              key: 'arrangement',
              // width: 60
            },
            {
              title: '总额',
              key: 'total'
            },
            {
              title: '领用额度',
              key: 'quota'
            },
            {
              title: '上门城市',
              key: 'city',
              // width: 60
            },
            {
              title: '详细地址',
              key: 'address'
            },
            {
              title: '密码',
              key: 'pass'
            },
            {
              title: '创建时间',
              key: 'time',
              // width: 150
            },
            {
              title: '操作',
              key: 'action',
              width: 180,
              align: 'center',
              render: (h, params) => {
                  return h('div', [
                    h('Tag', {
                      props: {
                        // type: 'info',
                        size: 'small',
                        color: params.row.quit === 1 ? 'green' : params.row.quit === 2 ? 'gray' :''
                      },
                      style: {
                        marginRight: '5px',
                        marginBottom: '5px',
                        marginTop: '3px',
                        // float:'left',
                        // backColor:'#7ccc2f'
                      },
                      nativeOn: {
                        click: () => {
                          this.lizhi(params.row);
                        }
                      }
                    }, params.row.quit === 1 ? '在职' : params.row.quit === 2 ? '离职' : ''),
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
                        style: 'background-color:#9c56d8;border:1px solid #9c56d8'
                      },
                      on: {
                        click: () => {
                          this.map1(params.row);
                        }
                      }
                    }, '查看地图'),
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
                        style: 'background-color:#7ccc2f;border:1px solid #7ccc2f'
                      },
                      on: {
                        click: () => {
                          this.manage(params.row);
                        }
                      }
                    }, '发送消息'),
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
                          this.noOrder(params.row);
                        }
                      }
                    }, '未处理订单'),
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
                          this.dayOrder(params.row);
                        }
                      }
                    }, '今日需处理订单'),
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
            url: 'admin/user/quit',
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
            url: 'admin/user/show',
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
          this.model13 = ''
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
                    url: 'admin/user/insert',
                    data: this.$qs.stringify({
                      name: this.formAdd.name,
                      phone: this.formAdd.phone,
                      grade: this.formAdd.grade,
                      number: this.formAdd.number,
                      arrangement: this.formAdd.arrangement,
                      total: this.formAdd.total,
                      quota: this.formAdd.quota,
                      provinceid: this.cityListId,
                      cityid: this.cityListId1,
                      areaid:this.cityListId2,
                      address:this.formAdd.address,
                      img:this.url,
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
                url: 'admin/user/upd',
                data: this.$qs.stringify({
                  Id:this.formItem.Id,
                  name:this.formItem.name,
                  phone: this.formItem.phone,
                  number: this.formItem.number,
                  grade: this.formItem.grade,
                  arrangement: this.formItem.arrangement,
                  total: this.formItem.total,
                  quota: this.formItem.quota,
                  pass: this.formItem.pass,
                  provinceid: this.cityListId,
                  cityid: this.cityListId1,
                  areaid:this.cityListId2,
                  address: this.formItem.address,
                  img:this.url1,
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
                url: 'admin/user/delete',
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
          // this.data1 = this.ajaxHistoryData.slice(_start, _end);
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
