<template>
  <div>
    <!--<Button style="margin-left: 10px;margin-right: 5px" type="info" @click="add">补卡</Button>-->
    <!--搜索-->
    <Row style="float: left;margin-right: 3px">
      <Col span="12">
        <Select
          v-model="searchName"
          filterable
          remote
          style="width:200px"
          :clearable="true"
          placeholder="请选择达人或输入达人名称"
          :remote-method="remoteMethod3"
          :loading="loading3">
          <Option v-for="(item, index) in user3" :value="item.uid" :key="index" style="width: 100px">{{item.name}}</Option>
        </Select>
      </Col>
    </Row>
    <Select style="width:150px;margin-right: 3px" :clearable="true" placeholder="请选择打卡状态" v-model="searchNum">
      <Option v-for="item in state" :value="item.label" :key="item.Id" @click.native="Schioce4(item)" style="width: 80px">{{ item.label }}</Option>
    </Select>
    <Row style="float: left;margin-right: 3px">
      <Col span="12">
        <DatePicker type="date" placeholder="请选择日期" style="width: 150px;margin-right: 3px" @on-change="changedateSou"></DatePicker>
      </Col>
      <Col span="12">
        <DatePicker type="date" placeholder="请选择时间" style="width: 150px" @on-change="changedateSou1"></DatePicker>
      </Col>
    </Row>
    <!--<Input clearable placeholder="请输入达人关键字搜索" class="search-input" v-model="searchName" style="width: 200px"/>-->
    <!--<Input clearable placeholder="请选择打卡状态" class="search-input" v-model="searchNum" style="width: 200px"/>-->
    <!--<Input clearable placeholder="请输入未打卡达人关键字搜索" class="search-input" v-model="searchPhone" style="width: 200px"/>-->
    <Button type="info" @click="handSeek">搜索</Button><br>
    <Button style="margin:10px 0px 0px 0px;background-color: #f39800;border: 1px solid #f39800" type="info">
      <!--请选择订单CSV导出-->
      <a @click="daochuc" :href="href" download="csv" style="color: #fff"><Icon type="ios-download-outline"></Icon>请选择订单CSV导出</a>
    </Button>
    <Table :columns="columns1" :data="data1" style="margin-top: 10px" @on-select="select" @on-selection-change="selectChange"></Table>
    <!--新增-->
    <!--<Modal-->
      <!--width="700"-->
      <!--v-model="modal3"-->
      <!--title="用户补卡信息"-->
      <!--@on-ok="ok3('formAdd')"-->
      <!--@on-cancel="cancel3"-->
      <!--:loading="loading">-->
      <!--<Form :model="formAdd" :label-width="80" :rules="ruleValidate" ref="formAdd">-->
        <!--<FormItem label="姓名" prop="uid">-->
          <!--<Input v-model="formAdd.uid" placeholder="" :maxlength='16'></Input>-->
        <!--</FormItem>-->
        <!--<FormItem label="补卡时间" prop="time">-->
          <!--<Input v-model="formAdd.time" placeholder="" number></Input>-->
        <!--</FormItem>-->
        <!--<FormItem label="考勤" prop="state">-->
          <!--<Input v-model="formAdd.state" placeholder=""></Input>-->
        <!--</FormItem>-->
        <!--<FormItem label="自拍照" prop="img">-->
          <!--<div class="tupian">-->
            <!--<img v-model="formAdd.img" placeholder=""></img>-->
          <!--</div>-->
        <!--</FormItem>-->
        <!--<FormItem label="省份" prop="province">-->
          <!--<Select v-model="formAdd.province" style="width:200px">-->
            <!--<Option v-for="item in cityList" :value="item.name" :key="item.id" @click.native="chioce(item)">{{ item.name }}</Option>-->
          <!--</Select>-->
        <!--</FormItem>-->
        <!--<FormItem label="城市" prop="city">-->
          <!--<Select v-model="formAdd.city" style="width:200px">-->
            <!--<Option v-for="item in cityList1" :value="item.name" :key="item.id" @click.native="chioce1(item)">{{ item.name }}</Option>-->
          <!--</Select>-->
        <!--</FormItem>-->
        <!--<FormItem label="地区" prop="area">-->
          <!--<Select v-model="formAdd.area" style="width:200px">-->
            <!--<Option v-for="item in cityList2" :value="item.name" :key="item.id" @click.native="chioce2(item)">{{ item.name }}</Option>-->
          <!--</Select>-->
        <!--</FormItem>-->
        <!--<FormItem label="详细地址" prop="address">-->
          <!--<Input v-model="formAdd.address" placeholder="请选择您的详细地址"></Input>-->
          <!--<div class="map">-->
            <!--<el-amap vid="amapDemo" class="amap" :center="center" :zoom="zoom">-->
              <!--<el-amap-marker :position="center" vid="amapMarker"></el-amap-marker>-->
            <!--</el-amap>-->
          <!--</div>-->
        <!--</FormItem>-->
        <!--&lt;!&ndash;<FormItem label="经度" prop="longitude">&ndash;&gt;-->
          <!--&lt;!&ndash;<Input v-model="formAdd.longitude" placeholder=""></Input>&ndash;&gt;-->
        <!--&lt;!&ndash;</FormItem>&ndash;&gt;-->
        <!--&lt;!&ndash;<FormItem label="纬度" prop="latitude">&ndash;&gt;-->
          <!--&lt;!&ndash;<Input v-model="formAdd.latitude" placeholder=""></Input>&ndash;&gt;-->
        <!--&lt;!&ndash;</FormItem>&ndash;&gt;-->
      <!--</Form>-->
    <!--</Modal>-->
    <!--//修改弹框-->
    <!--<Button type="primary" @click="modal1 = true">修改</Button>-->
    <!--<Modal-->
      <!--v-model="modal1"-->
      <!--title="补卡信息"-->
      <!--@on-ok="ok('formItem')"-->
      <!--@on-cancel="cancel"-->
      <!--:loading="loading1">-->
      <!--<Form :model="formItem" :label-width="80" :rules="ruleValidate2" ref="formItem">-->
        <!--<FormItem label="姓名" prop="uid">-->
          <!--<Input v-model="formItem.uid" placeholder="" :maxlength='16'></Input>-->
        <!--</FormItem>-->
        <!--<FormItem label="补卡时间" prop="time">-->
          <!--<Input v-model="formItem.time" placeholder="" number></Input>-->
        <!--</FormItem>-->
        <!--<FormItem label="考勤" prop="state">-->
          <!--<Input v-model="formItem.state" placeholder=""></Input>-->
        <!--</FormItem>-->
        <!--<FormItem label="自拍照" prop="img">-->
          <!--<img v-model="formItem.img" placeholder=""></img>-->
        <!--</FormItem>-->
        <!--<FormItem label="省份" prop="province">-->
          <!--<Select v-model="formItem.province" style="width:200px">-->
            <!--<Option v-for="item in cityList" :value="item.name" :key="item.id" @click.native="chioce(item)">{{ item.name }}</Option>-->
          <!--</Select>-->
        <!--</FormItem>-->
        <!--<FormItem label="城市" prop="city">-->
          <!--<Select v-model="formItem.city" style="width:200px">-->
            <!--<Option v-for="item in cityList1" :value="item.name" :key="item.id" @click.native="chioce1(item)">{{ item.name }}</Option>-->
          <!--</Select>-->
        <!--</FormItem>-->
        <!--<FormItem label="地区" prop="area">-->
          <!--<Select v-model="formItem.area" style="width:200px">-->
            <!--<Option v-for="item in cityList2" :value="item.name" :key="item.id" @click.native="chioce2(item)">{{ item.name }}</Option>-->
          <!--</Select>-->
        <!--</FormItem>-->
        <!--<FormItem label="详细地址" prop="address">-->
          <!--<Input v-model="formItem.address" placeholder=""></Input>-->
        <!--</FormItem>-->
        <!--<FormItem label="经度" prop="longitude">-->
          <!--<Input v-model="formItem.longitude" placeholder=""></Input>-->
        <!--</FormItem>-->
        <!--<FormItem label="纬度" prop="latitude">-->
          <!--<Input v-model="formItem.latitude" placeholder=""></Input>-->
        <!--</FormItem>-->
      <!--</Form>-->
    <!--</Modal>-->
    <!--//修改图片-->
    <!--<Modal-->
      <!--v-model="modal2"-->
      <!--title="修改用户图片">-->
      <!--<Form :model="formImg" :label-width="80">-->
        <!--<FormItem label="图片文件">-->
          <!--<Upload-->
            <!--ref="upload"-->
            <!--action="http://192.168.8.100/repair/public/admin/user/upd_imgs"-->
            <!--:data="formImg"-->
            <!--:show-upload-list="false"-->
            <!--:format="['jpg','jpeg','png']"-->
            <!--:before-upload="handleUpload"-->
            <!--:on-success="handleSuccess">-->
            <!--<Button icon="ios-cloud-upload-outline" type="info" style="margin-bottom: 10px">点击上传封图</Button>-->
          <!--</Upload>-->
          <!--<img :src="formImg.img" alt="" style="width: 200px">-->
        <!--</FormItem>-->
      <!--</Form>-->
      <!--&lt;!&ndash;隐藏Modal对话框确定取消按钮&ndash;&gt;-->
      <!--<div slot="footer"></div>-->
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
        user3:[],
        state:[
          {
            value: '1',
            label: '开始接单'
          },
          {
            value: '2',
            label: '结束接单'
          },
        ],
        state4:'',
        list3:[],
        timeArry:[],
        list4:[],
        loading3: false,
        loading4: false,
        zoom:14,
        center:[121.6292529148,31.2035397816],
        ruleValidate: {
          uid: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          time: [
            { required: true, message: '不能为空', trigger: 'blur' },
            // {type: 'number',required:true,validator:validatePhone,message:'请输入正确的手机号',trigger:'change'}
          ],
          state: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          img:[
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          province: [
            { required: true, message: '不能为空', trigger: 'blur' },
          ],
          city: [
            { required: true, message: '不能为空', trigger: 'blur' },
          ],
          area: [
            { required: true, message: '不能为空', trigger: 'blur' },
          ],
          address: [
            { required: true, message: '不能为空', trigger: 'blur' },
          ]
        },
        ruleValidate2: {
          uid: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          time: [
            { required: true, message: '不能为空', trigger: 'blur' },
            // {type: 'number',required:true,validator:validatePhone,message:'请输入正确的手机号',trigger:'change'}
          ],
          state: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          img:[
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          province: [
            { required: true, message: '不能为空', trigger: 'blur' },
          ],
          city: [
            { required: true, message: '不能为空', trigger: 'blur' },
          ],
          area: [
            { required: true, message: '不能为空', trigger: 'blur' },
          ],
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
        csvArry:'',
        csv:[],
        href:'',
        formAdd:{
          uid:'',
          time:'',
          state:'',
          img:'',
          province:'',
          city:'',
          area:'',
          address:'',
          longitude:'',
          latitude:'',
          jwt:localStorage.getItem('jwt')
        },
        formItem:{
          Id:'',
          name:'',
          phone:'',
          grade:'',
          arrangement:'',
          total:'',
          quota:'',
          city:'',
          pass:'',
          provinceid:'',
          cityid:'',
          areaid:'',
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
        //    分页
        ajaxHistoryData: [],
        // 初始化信息总条数
        dataCount: 0,
        // 每页显示多少条
        pageSize: 10,
        page:1,
        columns1: [
          {
            type: 'selection',
            width: 60,
            height: 20,
            align: 'center'
          },
          // {
          //   title: '详情',
          //   type: 'expand',
          //   width: 70,
          //   render: (h, params) => {
          //     return h(tableDetail, {
          //       props: {
          //         row: params.row
          //       }
          //     })
          //   }
          // },
          {
            title: '用户姓名',
            key: 'name',
            // width: 120
          },
          {
            title: '打卡日期',
            key: 'time'
          },
          {
            title: '打卡地址',
            key: 'address'
          },
          {
            title: '自拍照',
            key: 'img',
            render: (h, params) => {
              // console.log(params.row)
              return h('img', {
                style: {
                  width: '100px',
                  height: '100px'
                },
                attrs: {
                  src: params.row.img, style: 'width: 100px;height: 100px;margin: auto'
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
            title: '考勤状态',
            key: 'state',
            render: (h, params) => {
              return h('Tag', {
                props: {
                  color: params.row.state === 1 ? 'green' : params.row.state === 2 ? 'orange':''
                }
              }, params.row.state === 1 ? '上班打卡' : params.row.state === 2 ? '下班打卡' :  '');
            }
          },
          {
            title: '操作',
            key: 'action',
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Tag', {
                  props: {
                    // type: 'info',
                    size: 'small',
                    color: params.row.state === 1 ? 'green' :'gray'
                  },
                  style: {
                    marginRight: '5px',
                    marginBottom: '5px',
                  },
                  // attrs: {
                  //   style: ''
                  // },
                  nativeOn: {
                    click: () => {
                      this.bohui(params.row);
                    }
                  }
                }, params.row.state === 1 ? '驳回' :'无法驳回'),
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
                }, '删除'),
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
      //复选框
      select (selection) {
        // console.log("select")
        // console.log(selection)
        // console.log(selection,'单选1')
        // for(var i = 0; i < selection.length; i ++){
        //   this.csv[i]=selection[i].Id
        // }
        // console.log(this.csv,'单选')
      },
      selectChange(selection){
        // console.log("seletctChange")
        // console.log(selection)
        // console.log(selection,'2')
        this.csvArry="";
        for(var i = 0; i < selection.length; i ++){
          this.csv[i]=selection[i].Id
          this.csvArry += 'Id[' + i + ']=' + this.csv[i]
          if(i !=  selection.length-1){
            this.csvArry  = this.csvArry + '&&'
          }
        }
        // if(this.csv.length == 0){
        //   this.href = ''
        //   // this.$Message.error('请选择订单');
        // }
        this.href = 'http://192.168.8.107/repair/public/admin/Attendance/csv?' + this.csvArry
        // console.log(this.href,'选择改变')
      },
      //导出CVS
      daochuc(){
        // console.log( this.csv)
        this.$axios({
          method: 'post',
          url: 'admin/Attendance/csv',
          data: this.$qs.stringify({
            Id:this.csv,
            jwt: localStorage.getItem('jwt')
          })
        }).then(res => {
          // this.download(res)
          // console.log(res.data.table,'用户信息')
        }).catch(res => {
          this.$Message.error('请求超时,请稍后再试...');
        });
      },
      //驳回
      bohui(row){
        // console.log(row,'1234')
        if(row.state ===1){
          this.$axios({
            method: 'post',
            url: 'admin/Attendance/reject',
            data: this.$qs.stringify({
              Id:row.Id,
              jwt: localStorage.getItem('jwt')
            })
          }).then(res => {
            // console.log(res.data.table,'用户信息')
            this.tableShow()
            this.$Message.success('驳回成功');
          }).catch(res => {
            this.$Message.error('请求超时,请稍后再试...');
          });
        }
      },
      //用户信息展示
      tableShow(){
        this.$axios({
          method: 'post',
          url: 'admin/attendance/show',
          data: this.$qs.stringify({
            uid:this.searchName,
            state:this.state4,
            page:this.page,
            time:this.timeArry,
            jwt: localStorage.getItem('jwt')
          })
        }).then(res => {
          // console.log(res.data.table,'用户信息')
          this.ajaxHistoryData = res.data.table;
          this.user3 = res.data.table;
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
      remoteMethod3 (query) {
        // console.log(query,'skjfdasfkasd')
        // this.tableShow()
        if (query !== '') {
          this.loading3 = true;
          setTimeout(() => {
            this.loading3 = false;
            this.user3 = this.list3;
          }, 200);
        } else {
          this.user3 = [];
        }
        // console.log(this.model13)
      },
      changedateSou(res){
        // console.log(res,'时间内')
        this.timeArry[0]=res
      },
      changedateSou1(res){
        // console.log(res,'时间内')
        this.adddate1=res
        this.timeArry[1]=res
      },
      // remoteMethod4 (query) {
      //   console.log(query,'skjfdasfkasd')
      //   // this.tableShow()
      //   if (query !== '') {
      //     this.loading4 = true;
      //     setTimeout(() => {
      //       this.loading4 = false;
      //       this.user4 = this.list4;
      //     }, 200);
      //   } else {
      //     this.user4 = [];
      //   }
      //   // console.log(this.model13)
      // },
      Schioce4(item){
        // console.log(item)
        this.state4=item.value

      },
      handSeek(){
        this.tableShow()
      },
      //补卡
      add(){
        this.modal3=true
        this.$axios({
          url: 'admin/user/adress',
          method: 'get',
          // data: $qs.stringify({
          //   Id: isDelete
          // })
        }).then(res => {
          // console.log(res,'12345')
          this.cityList = res.data.table
        }).catch(res => {
          this.$Message.error('请求超时,请稍后再试...')
        });
      },
      //省联动
      chioce(item){
        this.cityListId=item.id
        this.$axios({
          method: 'post',
          url: 'admin/user/getRegion',
          data: this.$qs.stringify({
            id: item.id,
            type: item.type
            // jwt:localStorage.getItem('jwt')
          })
        }).then(res => {
          // console.log(res,'市三级联动')
          this.cityList1=res.data
        }).catch(res => {
          this.$Message.error('请求超时,请稍后再试...');
        });
      },
      //市联动
      chioce1(item){
        // console.log(JSON.stringify(item),'12345')
        this.cityListId1=item.id
        this.$axios({
          method: 'post',
          url: 'admin/user/getRegion',
          data: this.$qs.stringify({
            id: item.id,
            type: item.type
            // jwt:localStorage.getItem('jwt')
          })
        }).then(res => {
          // console.log(res,'市三级联动')
          this.cityList2=res.data
        }).catch(res => {
          this.$Message.error('请求超时,请稍后再试...');
        });
      },
      //区联动
      chioce2(item){
        this.cityListId2=item.id
      },
      ok3 (formAdd) {
        // console.log(this.$nextTick,'验证')
        this.$refs[formAdd].validate((valid) => {
          if (valid) {
            this.$axios({
              method: 'post',
              url: 'admin/user/insert',
              data: this.$qs.stringify({
                uid:this.formItem.uid,
                time:this.formItem.time,
                state: this.formItem.state,
                img: this.formItem.img,
                province: this.cityListId,
                city: this.cityListId1,
                area:this.cityListId2,
                address:this.formItem.address,
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
        // this.$Message.info('Clicked cancel');
      },
      //用户修改
      buka(row){
        // console.log(row)
        this.modal1=true
        this.formItem=row
        // this.formItem.Id=row.Id
        // this.formItem.cityid=row.cityid
        this.add()
        this.chioce()
        this.chioce1()
        this.chioce2()
      },
      ok (formItem) {
        // console.log(this.$refs[formItem])
        this.modal3=false
        this.$refs[formItem].validate((valid) => {
          if (valid) {
            this.$axios({
              method: 'post',
              url: 'admin/user/upd',
              data: this.$qs.stringify({
                uid:this.formItem.uid,
                time:this.formItem.time,
                state: this.formItem.state,
                img: this.formItem.img,
                province: this.cityListId,
                city: this.cityListId1,
                area:this.cityListId2,
                address:this.formItem.address,
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
      // 修改上传图片
      xiugaiimg(row){
        // console.log(row)
        this.modal2=true
        // this.formImg=row
        this.formImg.Id=row.Id
      },
      handleUpload (file) {
        this.formImg.img = file;
      },
      handleSuccess (response, file, fileList) {
        if(response.code === 200){
          this.modal2=false
          this.tableShow()
        }
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
              url: 'admin/attendance/delete',
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
  .tupian{
    width: 100px;
  }
  .map {
    width: 100%;
    height: 400px;
  }

</style>
