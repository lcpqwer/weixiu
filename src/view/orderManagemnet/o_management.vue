<template>
  <div>
    <!--<router-link :to="{path:'/o_management'}"><span>刷新</span></router-link>-->
    <Button style="margin-left: 10px;margin-right: 5px;float: left;background-color:#9c56d8;border:1px solid #9c56d8" type="info" @click="shuanew">刷新</Button>
    <Button style="margin-left: 10px;margin-right: 5px;float: left" type="info" @click="add">新增</Button>
    <!--搜索-->
    <div style="float: left">
      <Select style="width:150px;margin-right: 3px" :clearable="true" placeholder="请选择订单状态">
        <Option v-for="item in stateid" :value="item.label" :key="item.Id" @click.native="Schioce4(item)" style="width: 80px">{{ item.label }}</Option>
      </Select>
      <Select style="width:150px;margin-right: 3px" :clearable="true" placeholder="请选择订单类型">
        <Option v-for="item in typeid" :value="item.label" :key="item.Id" @click.native="Schioce5(item)" style="width: 80px">{{ item.label }}</Option>
      </Select>
      <Row style="float: left;margin-right: 3px">
        <Col span="12">
          <DatePicker type="date" placeholder="请选择日期" style="width: 150px;margin-right: 3px" @on-change="changedateSou"></DatePicker>
        </Col>
        <Col span="12">
          <DatePicker type="date" placeholder="请选择时间" style="width: 150px" @on-change="changedateSou1"></DatePicker>
        </Col>
      </Row>
      <Row style="float: left;margin-right: 3px">
        <Col span="12">
          <Select
            v-model="model13"
            filterable
            remote
            style="width:200px"
            :clearable="true"
            placeholder="请选择达人或关键字搜索"
            :remote-method="remoteMethod1"
            :loading="loading3">
            <Option v-for="(item, index) in user" :value="item.Id" :key="index" style="width: 80px">{{item.name}}</Option>
          </Select>
        </Col>
      </Row>

      <!--<Select style="width:150px">-->
        <!--<Option v-for="item in user" :value="item.Id" :key="item.Id" @click.native="Schioce6(item)" style="width: 80px">{{ item.name }}</Option>-->
      <!--</Select>-->
    </div>
    <!--<Input clearable placeholder="请输入用户关键字搜索" class="search-input" v-model="searchNum" style="width: 200px"/>-->
    <Input clearable placeholder="请输入手机号关键字搜索" class="search-input" v-model="searchPhone" style="width: 200px;margin-right: 3px"/>
    <Button type="info" @click="handSeek">搜索</Button>
    <br>
    <!--<Button @click="handleSelectAll(true)" style="margin:5px 5px 0px 10px">全选</Button>-->
    <!--<Button @click="handleSelectAll(false)" style="margin-top: 5px">取消</Button>-->
    <Button style="margin:5px 5px 0px 10px;background-color: #f39800;border: 1px solid #f39800" type="info">
      <!--请选择订单CSV导出-->
      <a @click="daochuc" :href="href" download="csv" style="color: #fff"><Icon type="ios-download-outline"></Icon>请选择订单CSV导出</a>
    </Button>
    <Table border ref="selection" :columns="columns1" :data="data1" @on-select="select" @on-selection-change="selectChange" style="margin-top: 10px"></Table>

    <!--新增-->
    <Modal
      v-model="modal3"
      title="新增"
      :width="700"
      @on-ok="ok3('formAdd')"
      @on-cancel="cancel3"
      :loading="loading">
      <Form :model="formAdd" :label-width="100" :rules="ruleValidate" ref="formAdd" :inline="true">
          <FormItem label="达人" prop="uid">
            <Row style="float: left;margin-right: 3px">
              <Col span="12">
                <Select
                  v-model="formAdd.uid"
                  filterable
                  remote
                  style="width:200px"
                  :clearable="true"
                  placeholder="请选择达人或输入达人名称"
                  @on-clear="clear15"
                  :remote-method="remoteMethod15"
                  :loading="loading15">
                  <Option v-for="(item, index) in user15" :value="item.name" :key="index" style="width: 100px">{{item.name}}</Option>
                </Select>
              </Col>
            </Row>
          </FormItem>
          <FormItem label="维修方案" prop="programme">
            <Input v-model="formAdd.programme" placeholder="" style="width:200px"></Input>
          </FormItem>
          <hr class="xiahuaxian">
          <FormItem label="设备" prop="eid">
              <Row style="float: left;margin-right: 3px">
                <Col span="12">
                  <Select
                    v-model="formAdd.eid"
                    filterable
                    remote
                    style="width:200px"
                    :clearable="true"
                    placeholder="请输入设备关键字选择"
                    :remote-method="remoteMethod5"
                    :loading="loading5">
                    <Option v-for="(item, index) in user5" :value="item.equipment" :key="index" style="width: 100px">{{item.equipment}}</Option>
                  </Select>
                </Col>
              </Row>
            </FormItem>
          <FormItem label="具体故障" prop="specific">
            <Select v-model="formAdd.specific" style="width:200px">
              <Option v-for="item in guzhangtable" :value="item.hitch" :key="item.Id" @click.native="chiocegu(item)">{{ item.hitch }}</Option>
            </Select>
            <!--<Input v-model="formAdd.specific" placeholder="" style="width:200px"></Input>-->
          </FormItem>
          <FormItem label="颜色" prop="specific">
            <Select v-model="formAdd.color1" style="width:200px">
              <Option v-for="item in colortable" :value="item.colour" :key="item.Id" @click.native="chiocecolor(item)">{{ item.colour }}</Option>
            </Select>
            <!--<Input v-model="formAdd.color" placeholder="" style="width:200px"></Input>-->
          </FormItem>
          <FormItem label="金额" prop="amount">
            <Input v-model="formAdd.amount" placeholder="" style="width:200px" :readonly="readon"></Input>
          </FormItem>
          <hr class="xiahuaxian">
          <FormItem label="客服备注" prop="customer_service">
          <Input v-model="formAdd.customer_service" placeholder="" style="width:200px"></Input>
        </FormItem>
          <FormItem label="备注图片" prop="customer_img">
            <Upload
              action="http://54.223.48.127/repair/public/admin/index/upd"
              :data="img1"
              ref="upload"
              :multiple="true"
              :format="['jpg','jpeg','png']"
              :show-upload-list="false"
              :before-upload="handleBeforUpload1"
              :on-success="handleSuccess1">
              <Button icon="ios-cloud-upload-outline">点击上传</Button>
            </Upload>
            <!--<div style="width: 100px;height: 100px;border: 1px darkgrey solid;margin-right: 5px;margin-top: 5px" v-for="img in formAdd.customer_img">-->
            <!--<img :src="img" alt="请点击上传" style="width: 100px;height: 100px" v-model="formAdd.customer_img">-->
            <!--</div>-->
            <!--<Input v-model="formAdd.customer_img" placeholder=""></Input>-->
          </FormItem>
          <FormItem>
            <div style="width: 100px;height: 100px;border: 1px darkgrey solid;float: left;margin-right: 5px" v-for="img in formAdd.customer_img">
              <img :src="img" alt="请点击上传" style="width: 100px;height: 100px" v-model="formAdd.customer_img">
            </div>
          </FormItem>
          <hr class="xiahuaxian">
          <FormItem label="客户" prop="cid">
            <Row style="float: left">
              <Col span="12">
                <Select
                  v-model="formAdd.cid"
                  filterable
                  remote
                  style="width:200px"
                  :clearable="true"
                  placeholder="请选择客户或输入客户名称"
                  @on-clear="clear17"
                  :remote-method="remoteMethod17"
                  :loading="loading17">
                  <Option v-for="(item, index) in user17" :value="item.name" :key="index" style="width: 200px">{{item.name}}</Option>
                </Select>
              </Col>
            </Row>
          </FormItem>
          <FormItem label="手机号" prop="userphone">
            <Input v-model="formAdd.userphone" placeholder="" style="width:200px"></Input>
          </FormItem>
          <FormItem label="省份" prop="province">
            <Select v-model="formAdd.province" style="width:200px">
              <Option v-for="item in cityList" :value="item.name" :key="item.id" @click.native="chioce(item)">{{ item.name }}</Option>
            </Select>
          </FormItem>
          <FormItem label="城市" prop="city">
            <Select v-model="formAdd.city" style="width:200px">
              <Option v-for="item in cityList1" :value="item.name" :key="item.id" @click.native="chioce1(item)">{{ item.name }}</Option>
            </Select>
          </FormItem>
          <FormItem label="地区" prop="area">
            <Select v-model="formAdd.area" style="width:200px">
              <Option v-for="item in cityList2" :value="item.name" :key="item.id" @click.native="chioce2(item)">{{ item.name }}</Option>
            </Select>
          </FormItem>
          <FormItem label="详细地址" prop="address">
            <Input v-model="formAdd.address" placeholder="" v-on:input="mapInput" style="margin-bottom: 5px;width:200px"></Input>
            <div class="map1" v-show="maptu">
              <el-amap vid="amapDemo1" class="amap" :center="center2" :zoom="zoom">
                <el-amap-marker v-for="marker in markers2" :events="marker.events" :position="center2" vid="amapMarker1" :clickable="true"></el-amap-marker>
                <!--<el-amap-info-window :position="center2" :content='content2' :visible="modal412" :events="infos2[0].events"></el-amap-info-window>-->
              </el-amap>
            </div>
          </FormItem>
          <hr class="xiahuaxian">
          <FormItem label="优惠券(选填)" prop="couponId">
          <Select v-model="formAdd.couponId" style="width:200px">
            <Option v-for="item in youhui" :value="item.name" :key="item.Id" @click.native="chioce11(item)">{{ item.name }}  {{ item.price }}元</Option>
          </Select>
          <!--<Input v-model="formAdd.couponId" placeholder="" number></Input>-->
          </FormItem>
          <FormItem label="路费" prop="roadfare">
            <Input v-model="formAdd.roadfare" placeholder="" style="width:200px"></Input>
          </FormItem>
          <FormItem label="第三方订单号" prop="thirdnumber">
            <Input v-model="formAdd.thirdnumber" placeholder="" style="width:200px"></Input>
          </FormItem>
          <FormItem label="保修天数" prop="payid">
            <Select v-model="formAdd.warrantytime" style="width:200px">
              <Option v-for="item in xiutable" :value="item.time" :key="item.Id" @click.native="chioce15(item)">{{ item.time }}</Option>
            </Select>
          </FormItem>
          <FormItem label="关联订单" prop="associated_orders">
            <Row>
              <Col span="12">
                <Select
                  v-model="model14"
                  multiple
                  filterable
                  remote
                  @on-change="change"
                  :remote-method="remoteMethod2"
                  :loading="loading2"
                  style="width: 200px;">
                  <Option v-for="(option, index) in options2" :value="option.Id" :key="index" style="width:200px">{{option.number}}</Option>
                </Select>
              </Col>
            </Row>
            <!--<Select v-model="formAdd.associated_orders" style="width:200px">-->
            <!--<Option v-for="item in pay" :value="item.value" :key="item.value" @click.native="chioce8(item)">{{ item.label }}</Option>-->
            <!--</Select>-->
          </FormItem>
          <hr class="xiahuaxian">
          <FormItem label="订单类型" prop="state">
            <Select v-model="formAdd.state" style="width:200px">
              <Option v-for="item in stateid" :value="item.value" :key="item.value" @click.native="chioce6(item)">{{ item.label }}</Option>
            </Select>
          </FormItem>
          <FormItem label="订单状态" prop="type">
            <Select v-model="formAdd.type" style="width:200px">
              <Option v-for="item in typeid" :value="item.value" :key="item.value" @click.native="chioce7(item)">{{ item.label }}</Option>
            </Select>
            <!--<Input v-model="formAdd.type" placeholder=""></Input>-->
          </FormItem>
          <FormItem label="预约时间" prop="appointment_time">
          <Row v-model="formAdd.appointment_time" style="width:200px">
            <Col span="12" style="margin-right: 10px">
              <DatePicker type="date" placeholder="请选择日期" style="width: 200px" @on-change="changedate2"></DatePicker>
            </Col>
            <Col span="12" style="float: left">
              <TimePicker type="time" placeholder="请选择时间" style="width: 200px;" @on-change="changetime"></TimePicker>
            </Col>
          </Row>
        </FormItem>
          <FormItem label="支付状态" prop="paystate">
            <Select v-model="formAdd.paystate" style="width:200px">
              <Option v-for="item in paystate" :value="item.value" :key="item.value" @click.native="chioce14(item)">{{ item.label }}</Option>
            </Select>
          </FormItem>
          <FormItem label="支付渠道" prop="payid">
          <Select v-model="formAdd.payid" style="width:200px">
            <Option v-for="item in pay" :value="item.Id" :key="item.name" @click.native="chioce8(item)">{{ item.name }}</Option>
          </Select>
          <!--<Input v-model="formAdd.payid" placeholder=""></Input>-->
        </FormItem>
          <FormItem label="是否需要汇款" prop="roadfare">
            <Input v-model="formAdd.paytypeItem" placeholder="" style="width:200px" :readonly="readon"></Input>
          </FormItem>
          <hr class="xiahuaxian">
      </Form>
    </Modal>
    <!--//修改弹框-->
    <Modal
      v-model="modal1"
      title="修改信息"
      :width="700"
      @on-ok="ok('formItem')"
      @on-cancel="cancel"
      :loading="loading1">
      <Form :model="formItem" :label-width="80" :rules="ruleValidate2" ref="formItem" :inline="true">
        <FormItem label="达人" prop="uid">
          <Row style="float: left;margin-right: 3px">
            <Col span="12">
              <Select
                v-model="model16"
                filterable
                remote
                style="width:200px"
                :clearable="true"
                placeholder="请选择达人或输入达人名称"
                :remote-method="remoteMethod16"
                :loading="loading16">
                <Option v-for="(item, index) in user16" :value="item.Id" :key="index" style="width: 100px">{{item.name}}</Option>
              </Select>
            </Col>
          </Row>
          <!--<Select v-model="formItem.uid" style="width:200px">-->
            <!--<Option v-for="item in user" :value="item.Id" :key="item.Id" @click.native="chioce10(item)">{{ item.name }}</Option>-->
          <!--</Select>-->
          <!--<Input v-model="formAdd.uid" placeholder="" :maxlength='16'></Input>-->
        </FormItem>
        <FormItem label="维修方案" prop="programme">
          <Input v-model="formItem.programme" placeholder="" style="width:200px"></Input>
        </FormItem>
        <hr class="xiahuaxian">
        <FormItem label="设备">
          <Row style="float: left;margin-right: 3px">
            <Col span="12">
              <Select
                v-model="formItem.eid"
                filterable
                remote
                style="width:200px"
                :clearable="true"
                placeholder="请输入设备关键字选择"
                :remote-method="remoteMethod6"
                :loading="loading6">
                <Option v-for="(item, index) in user6" :value="item.equipment" :key="index" style="width: 100px">{{item.equipment}}</Option>
              </Select>
            </Col>
          </Row>
          <!--<Select v-model="formItem.eid" style="width:200px">-->
            <!--<Option v-for="item in shebei" :value="item.equipment" :key="item.id" @click.native="chioceformItem5(item)">{{ item.equipment }}</Option>-->
          <!--</Select>-->
          <!--<Input v-model="formItem.equipment" placeholder=""></Input>-->
        </FormItem>
        <FormItem label="具体故障" prop="hitch">
          <Select v-model="formItem.hitch" style="width:200px">
            <Option v-for="item in guzhangtable" :value="item.hitch" :key="item.Id" @click.native="chiocegu(item)">{{ item.hitch }}</Option>
          </Select>
          <!--<Input v-model="formAdd.specific" placeholder="" style="width:200px"></Input>-->
        </FormItem>
        <FormItem label="颜色" prop="color1">
          <Select v-model="formItem.color1" style="width:200px">
            <Option v-for="item in colortable" :value="item.colour" :key="item.Id" @click.native="chiocecolor(item)">{{ item.colour }}</Option>
          </Select>
          <!--<Input v-model="formAdd.color" placeholder="" style="width:200px"></Input>-->
        </FormItem>
        <FormItem label="金额" prop="amount">
          <Input v-model="formItem.amount" placeholder="" style="width:200px" :readonly="readon"></Input>
        </FormItem>
        <hr class="xiahuaxian">
        <FormItem label="客服备注" prop="customer_service">
          <Input v-model="formItem.customer_service" placeholder="" style="width:200px"></Input>
        </FormItem>
        <FormItem label="备注图片" prop="customer_img">
          <Upload
            action="http://54.223.48.127/repair/public/admin/index/upd"
            :data="img1"
            ref="upload"
            :multiple="true"
            :format="['jpg','jpeg','png']"
            :show-upload-list="false"
            :before-upload="handleBeforUpload1"
            :on-success="handleSuccess1">
            <Button icon="ios-cloud-upload-outline">点击上传</Button>
          </Upload>
        </FormItem>
        <FormItem>
          <div style="width: 100px;height: 100px;border: 1px darkgrey solid;float: left;margin-right: 5px" v-for="img in formItem.customer_img">
            <img :src="img" alt="请点击上传" style="width: 100px;height: 100px" v-model="formItem.customer_img">
          </div>
        </FormItem>
        <hr class="xiahuaxian">
        <FormItem label="客户" prop="cid">
          <Row style="float: left;margin-right: 3px">
            <Col span="12">
              <Select
                v-model="formItem.cid"
                filterable
                remote
                style="width:200px"
                :clearable="true"
                placeholder="请选择客户或输入客户名称"
                @on-clear="clear7"
                :remote-method="remoteMethod7"
                :loading="loading7">
                <Option v-for="(item, index) in user7" :value="item.name" :key="index" style="width: 100px">{{item.name}}</Option>
              </Select>
            </Col>
          </Row>
        </FormItem>
        <FormItem label="手机号" prop="userphone">
          <Input v-model="formItem.userphone" placeholder="" style="width:200px"></Input>
        </FormItem>
        <FormItem label="省份" prop="province">
          <Select v-model="formItem.province" style="width:200px">
            <Option v-for="item in cityList" :value="item.name" :key="item.id" @click.native="chioce(item)">{{ item.name }}</Option>
          </Select>
        </FormItem>
        <FormItem label="城市" prop="city">
          <Select v-model="formItem.city" style="width:200px">
            <Option v-for="item in cityList1" :value="item.name" :key="item.id" @click.native="chioce1(item)">{{ item.name }}</Option>
          </Select>
        </FormItem>
        <FormItem label="地区" prop="area">
          <Select v-model="formItem.area" style="width:200px;float: left">
            <Option v-for="item in cityList2" :value="item.name" :key="item.id" @click.native="chioce2(item)">{{ item.name }}</Option>
          </Select>
        </FormItem>
        <FormItem label="详细地址" prop="address">
          <Input v-model="formItem.address" placeholder="" v-on:input="mapInput1" style="width:200px;float: left"></Input>
          <div class="map1" v-show="maptu1">
            <el-amap vid="amapDemo2" class="amap" :center="center3" :zoom="zoom">
              <el-amap-marker :position="center3" vid="amapMarker2" :clickable="true"></el-amap-marker>
              <!--<el-amap-info-window :position="center3" :content='content3' :visible="modal412" :events="infos2[0].events"></el-amap-info-window>-->
            </el-amap>
          </div>
        </FormItem>
        <hr class="xiahuaxian">
        <FormItem label="优惠券(选填)" prop="couponId">
          <Select v-model="formItem.couponId" style="width:200px">
            <Option v-for="item in youhui" :value="item.Id" :key="item.Id" @click.native="chioce11(item)">{{ item.name }}  {{ item.price }}元</Option>
          </Select>
          <!--<Input v-model="formAdd.couponId" placeholder="" number></Input>-->
        </FormItem>
        <FormItem label="路费" prop="roadfare">
          <Input v-model="formItem.roadfare" placeholder="" style="width:200px"></Input>
        </FormItem>
        <FormItem label="第三方订单号" prop="thirdnumber">
          <Input v-model="formItem.thirdnumber" placeholder="" style="width:200px"></Input>
        </FormItem>
        <FormItem label="保修天数" prop="payid">
          <Select v-model="formItem.warrantytime" style="width:200px">
            <Option v-for="item in xiutable" :value="item.time" :key="item.Id" @click.native="chioce15(item)">{{ item.time }}</Option>
          </Select>
        </FormItem>
        <FormItem label="关联订单" prop="associated_orders">
          <Row>
            <Col span="12">
              <Select
                v-model="modelItem14"
                multiple
                filterable
                remote
                @on-change="changeItem"
                :remote-method="remoteMethodItem2"
                :loading="loadingItem2"
                style="width: 200px;">
                <Option v-for="(option, index) in options2" :value="option.Id" :key="index" style="width:200px">{{option.number}}</Option>
              </Select>
            </Col>
          </Row>
          <!--<Select v-model="formAdd.associated_orders" style="width:200px">-->
          <!--<Option v-for="item in pay" :value="item.value" :key="item.value" @click.native="chioce8(item)">{{ item.label }}</Option>-->
          <!--</Select>-->
        </FormItem>
        <hr class="xiahuaxian">
        <FormItem label="订单类型" prop="state">
          <Select v-model="formItem.state" style="width:200px">
            <Option v-for="item in stateid" :value="item.value" :key="item.value" @click.native="chioce6(item)">{{ item.label }}</Option>
          </Select>
        </FormItem>
        <FormItem label="订单状态" prop="type">
          <Select v-model="formItem.type" style="width:200px">
            <Option v-for="item in typeid" :value="item.value" :key="item.value" @click.native="chioce7(item)">{{ item.label }}</Option>
          </Select>
          <!--<Input v-model="formAdd.type" placeholder=""></Input>-->
        </FormItem>
        <FormItem label="预约时间" prop="appointment_time">
          <Row v-model="formItem.appointment_time" style="width:200px">
            <Col span="12" style="margin-right: 10px">
              <DatePicker type="date" placeholder="请选择日期" style="width: 200px" @on-change="changedate"></DatePicker>
            </Col>
            <Col span="12" style="float: left">
              <TimePicker type="time" placeholder="请选择时间" style="width: 200px" @on-change="changetime"></TimePicker>
            </Col>
          </Row>
        </FormItem>
        <FormItem label="支付类型" prop="paystate">
          <Select v-model="formItem.paystate" style="width:200px">
            <Option v-for="item in paystate" :value="item.value" :key="item.value" @click.native="chioceformItem14(item)">{{ item.label }}</Option>
          </Select>
        </FormItem>
        <FormItem label="支付渠道" prop="payid">
          <Select v-model="formItem.payid" style="width:200px">
            <Option v-for="item in pay" :value="item.Id" :key="item.name" @click.native="chioce8(item)">{{ item.name }}</Option>
          </Select>
        </FormItem>
        <FormItem label="是否需要汇款" prop="roadfare">
          <Input v-model="formItem.paytypeItem" placeholder="" style="width:200px" :readonly="readon"></Input>
        </FormItem>
        <hr class="xiahuaxian">
      </Form>
    </Modal>
    <!--//地图展示-->
    <Modal
      width="800"
      v-model="modalMap"
      title="查看地图"
      @on-ok="ok2"
      @on-cancel="cancel2">
      <Form :label-width="80">
        <FormItem label="地图详情">
          <div class="map">
            <el-amap vid="amapDemo" class="amap" :center="center" :zoom="zoom">
              <el-amap-marker v-for="marker in markers" :events="marker.events" :position="center0" vid="amapMarker" :clickable="true"></el-amap-marker>
              <el-amap-info-window :position="center0" :content='content' :visible="modal4" :events="infos[0].events"></el-amap-info-window>
              <el-amap-marker v-for="marker in markers1" :events="marker.events" :position="center1" vid="amapMarker" :clickable="true"></el-amap-marker>
              <el-amap-info-window :position="center1" :content='content1' :visible="modal41" :events="infos1[0].events"></el-amap-info-window>
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
  import tableDetail from './tableDetail.vue'
  export default {
    components: { tableDetail },
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
        readon:true,
        pdffref:'',
        maptu:false,
        maptu1:false,
        img1:{
          image:[],
          jwt:localStorage.getItem('jwt')
        },
        // img2:{
        //   image:[],
        //   jwt:localStorage.getItem('jwt')
        // },
        xiutable:[],
        url1:[],
        adddate:'',
        adddate1:'',
        addtime:'',
        state:'',
        state4:'',
        type4:'',
        type:'',
        timeArry:[],
        payid:'',
        typeid:[
          {
            value: '1',
            label: '上门'
          },
          {
            value: '2',
            label: '到店'
          },
          {
            value: '3',
            label: '售后'
          }
        ],
        stateid:[
          {
            value: '1',
            label: '未开始'
          },
          {
            value: '2',
            label: '进行'
          },
          {
            value: '3',
            label: '结束'
          },
          {
            value: '4',
            label: '疑难'
          },
          {
            value: '5',
            label: '正在上门'
          }
        ],
        pay:[],
        paystate:[
          {
            value: '1',
            label: '已支付'
          },
          {
            value: '2',
            label: '未支付'
          }
        ],
        model15: '',
        model16: '',
        loading15: false,
        loading5: false,
        loading6: false,
        loading7: false,
        loading16: false,
        loading17: false,
        model13: '',
        model14: [],
        modelItem14: [],
        loading3: false,
        loading2: false,
        loadingItem2: false,
        options2: [],
        list: [],
        list1:[],
        list5:[],
        list6:[],
        list7:[],
        list15:[],
        list16:[],
        list17:[],
        list18:[],
        file:'',
        href:'',
        csvArry:'',
        ruleValidate: {
          userphone: [
            // { required: true, message: '不能为空', trigger: 'blur' },
            {type: 'number',required:true,validator:validatePhone,message:'请输入正确的手机号',trigger:'change'}
          ],
          // uid: [
          //   { required: true, message: '不能为空', trigger: 'blur' },
          // ],
          // address: [
          //   { required: true, message: '不能为空', trigger: 'blur' },
          // ],
          programme: [
            { required: true, message: '不能为空', trigger: 'blur' },
          ],
          specific: [
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
          grade: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          arrangement:[
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          total: [
            { required: true, message: '不能为空', trigger: 'blur' },
          ],
          quota: [
            { required: true, message: '不能为空', trigger: 'blur' },
          ],
          pass: [
            { required: true, message: '不能为空', trigger: 'blur' },
          ],
          provinceid: [
            { required: true, message: '不能为空', trigger: 'blur' },
          ],
          cityid: [
            { required: true, message: '不能为空', trigger: 'blur' },
          ],
          areaid: [
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
        shengName:'',
        shiName:'',
        quName:'',
        lei:[],
        pinpai:[],
        jixing:[],
        shebei:[],
        guzhangtable:[],
        colortable:[],
        // Nlei:'',
        // Npinpai:'',
        // Njixing:'',
        equipment:'',
        equipmentId:'',
        equipmentId6:'',
        gusesion:'',
        colorsesion:'',
        colorId:'',
        gusesionId:'',
        formAdd:{
          uid:'',
          cid:'',
          amount:'',
          couponId:'',
          specific:'',
          programme:'',
          province:'',
          city:'',
          area:'',
          address:'',
          customer_service:'',
          state:'',
          appointment_time:'',
          eid:'',
          color1:'',
          userphone:'',
          paytypeItem:'',
          customer_img:[],
          type:'',
          payid:'',
          paystate:'',
          roadfare:'',
          thirdnumber:'',
          warrantytime:'',
          associated_orders:[],
          jwt:localStorage.getItem('jwt')
        },
        formItem:{
          Id:'',
          uid:'',
          cid:'',
          couponId:'',
          amount:'',
          hitch:'',
          paytypeItem:'',
          programme:'',
          province:'',
          city:'',
          area:'',
          address:'',
          customer_service:'',
          state:'',
          appointment_time:'',
          jixing:'',
          pinpai:'',
          jixing1:'',
          eid:'',
          color1:'',
          userphone:'',
          customer_img:[],
          type:'',
          payid:'',
          paystate:'',
          roadfare:'',
          thirdnumber:'',
          warrantytime:'',
          associated_orders:[],
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
        modalMap:false,
        modal4:true,
        modal41:false,
        modal412:true,
        zoom:14,
        zoom1:14,
        center:[121.6292529148,31.2035397816],
        center0:[121.6292529148,31.2035397816],
        center1:[121.6292529148,31.2035397816],
        center2:[114.30 ,30.57],
        center3:[114.30 ,30.57],
        // center:[],
        content:'',
        content1:'',
        content2:'',
        markers: [
          {
            events: {
              click: () => {
                this.modal4 = !this.modal4
                //此处点击是有bug
                // console.log('true电磁辐射的采访时说')
              }
            }
          }
        ],
        markers1: [
          {
            events: {
              click: () => {
                this.modal41 = !this.modal41
                //此处点击是有bug
                // console.log('true')
              }
            }
          }
        ],
        markers2: [
          {
            events: {
              click: () => {
                this.modal412 = !this.modal412
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
                // console.log('false是的撒所多')
              }
            }
          }
        ],
        infos1: [
          {
            events: {
              // open () {
              //   this.modal4 = true
              //   console.log('true1')
              // },
              close() {
                this.modal41 = false
                // console.log('false')
              }
            }
          }
        ],
        infos2: [
          {
            events: {
              // open () {
              //   this.modal4 = true
              //   console.log('true1')
              // },
              close() {
                this.modal412 = false
                // console.log('false')
              }
            }
          }
        ],
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
          {
            title: '详情',
            type: 'expand',
            // width: 70,
            render: (h, params) => {
              return h(tableDetail, {
                props: {
                  row: params.row
                }
              })
            }
          },
          {
            title: '订单类型',
            key: 'state',
            render: (h, params) => {
              return h('Tag', {
                props: {
                  color: params.row.state === 1 ? 'green' : params.row.state === 2 ? 'orange' : params.row.state === 3 ? 'red': params.row.state === 4 ? 'gray':params.row.state === 5 ? 'yellow':''
                }
              }, params.row.state === 1 ? '未开始' : params.row.state === 2 ? '进行' : params.row.state === 3 ? '结束' : params.row.state === 4 ? '疑难' : params.row.state === 5 ? '正在上门' : '');
            }
          },
          {
            title: '订单状态',
            key: 'type',
            render: (h, params) => {
              return h('Tag', {
                props: {
                  color: params.row.type === 1 ? 'green' : params.row.type === 2 ? 'red' : params.row.type === 3 ? 'orange':''
                }
              }, params.row.type === 1 ? '上门' : params.row.type === 2 ? '到店' : params.row.type === 3 ? '售后' : '');
            }
          },
          {
            title: '是否需要汇款',
            key: 'paytype',
            render: (h, params) => {
              return h('Tag', {
                props: {
                  color: params.row.paytype === 1 ? 'green' : params.row.paytype === 2 ? 'red' :''
                }
              }, params.row.paytype === 1 ? '汇款' : params.row.paytype === 2 ? '不汇款' : '');
            }
          },
          {
            title: '商品名称',
            key: 'payname'
          },
          {
            title: '机型大类',
            key: 'category'
          },
          {
            title: '预约金额',
            key: 'total',
            // width: 90
          },
          {
            title: '预约时间',
            key: 'appointment_time',
            // width: 150
          },
          {
            title: '编码',
            key: 'number',
            // width: 150
          },
          {
            title: '客户名称',
            key: 'customername',
            // width: 100
          },
          {
            title: '客户手机号',
            key: 'userphone',
            // width: 120
          },
          {
            title: '达人手机号',
            key: 'phone',
          },
          {
            title: '操作',
            key: 'action',
            align: 'center',
            width: 200,
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'info',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px',
                    marginBottom: '5px',
                    marginTop:'3px'
                    // float:'left'
                  },
                  on: {
                    click: () => {
                      this.xiugai(params.row);
                    }
                  }
                }, '修改'),
                h('A', {
                  attrs:{
                    href: 'http://54.223.48.127/repair/public/admin/order/pdf?Id=' + params.row.Id,
                    download: "pdf"
                  },
                  props: {
                    type: 'info',
                    size: 'small',
                  },
                  style: {
                    width:'20px',
                    marginRight: '5px',
                    marginBottom: '5px',
                    backgroundColor:'#f39800',
                    color:'#fff',
                    padding:'4.5px',
                    borderRadius: '10%',
                    marginTop:'0px',
                    border:'1px solid #f39800'
                  },
                  on: {
                    click: () => {
                      this.daochu(params.row);
                    }
                  }
                }, 'pdf导出'),
                h('Button', {
                  props: {
                    type: 'info',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px',
                    marginBottom: '5px',
                    // float:'right'
                  },
                  attrs: {
                    style: 'background-color:#9c56d8;border:1px solid #9c56d8'
                  },
                  on: {
                    click: () => {
                      this.map(params.row);
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
                    marginBottom: '5px',
                    // float:'left'
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
        data1: [],
        user:[],
        user5:[],
        user6:[],
        user7:[],
        cid:'',
        cid1:'',
        cusname:'',
        cusname1:'',
        user15:[],
        user16:[],
        user17:[],
        cus17:{},
        cus7:{},
        user18:[],
        usermoney:'',
        youhui:[],
        csv:[]
      }
    },
    created() {
      this.tableShow()
      this.username()
      // console.log(localStorage.getItem('Id'),'a参数123132')
      // console.log(location.hash)
    },
    methods: {
      //刷新
      shuanew(){
        this.$router.push({
          path:'/o_management',
          // query:{
          //   Id:this.mapArry[a.target.Uh.vid].Id
          // }
        })
        this.tableShow()
      },
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
        this.href = 'http://192.168.8.107/repair/public/admin/order/csv?' + this.csvArry
        // console.log(this.href,'选择改变')
      },
      // selectall (selection) {
      //   // console.log(selection,'3')
      //   // for(var i = 0; i < selection.length; i ++){
      //   //   this.csv[i]=selection[i].Id
      //   // }
      //   // console.log(selection,'全选')
      // },
      //pdf导出
      daochu(row){
        this.$axios({
          method: 'post',
          url: 'admin/order/pdf',
          data: this.$qs.stringify({
            Id:row.Id,
            jwt: localStorage.getItem('jwt')
          })
        }).then(res => {
          // console.log(res.data.table,'用户信息')
        }).catch(res => {
          this.$Message.error('请求超时,请稍后再试...');
        });
      },
      //导出CVS
      daochuc(){
        // console.log( this.csv)
        this.$axios({
          method: 'post',
          url: 'admin/order/csv',
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
      //用户信息展示
      tableShow(){
        // console.log(this.$route.query.uid,'123')
        // console.log(location.search,'123')
        // console.log(this.$route.query.times!=null,'456')
        if(this.$route.query.uid != null && this.$route.query.state != null && this.$route.query.times != null){//接收地图传值
          // console.log(this.$route.query.times!=null,'456')
          this.$axios({
            method: 'post',
            url: 'admin/order/show',
            data: this.$qs.stringify({
              uid:this.$route.query.uid,
              phone:this.searchPhone,
              state:this.$route.query.state,
              type:this.type4,
              time:this.timeArry,
              times:this.$route.query.times,
              page:this.page,
              jwt: localStorage.getItem('jwt')
            })
          }).then(res => {
            // console.log(this.$route.query.Id,'获取id')
            this.ajaxHistoryData = res.data.table;
            this.list = res.data.table;
            this.list1 = res.data.table;
            this.options2 = res.data.table;
            // console.log(res.data.table,'用户信息')
            // console.log( this.list1,'用户信息2222')
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
        }else if(this.$route.query.Id != null){
          this.$axios({
            method: 'post',
            url: 'admin/order/show',
            data: this.$qs.stringify({
              uid:this.model13,
              phone:this.searchPhone,
              state:this.state4,
              type:this.type4,
              time:this.timeArry,
              page:this.page,
              Id:localStorage.getItem('Id'),//接收地图传值
              jwt: localStorage.getItem('jwt')
            })
          }).then(res => {
            // console.log(this.$route.query.Id,'获取id')
            this.ajaxHistoryData = res.data.table;
            this.list = res.data.table;
            this.list1 = res.data.table;
            this.options2 = res.data.table;
            // console.log(res.data.table,'用户信息')
            // console.log( this.list1,'用户信息2222')
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
        }else if(this.$route.query.uid != null&&this.$route.query.state != null){
          this.$axios({
            method: 'post',
            url: 'admin/order/show',
            data: this.$qs.stringify({
              uid:this.$route.query.uid,
              phone:this.searchPhone,
              state:this.$route.query.state,
              type:this.type4,
              time:this.timeArry,
              page:this.page,
              jwt: localStorage.getItem('jwt')
            })
          }).then(res => {
            // console.log(this.$route.query.Id,'获取id')
            this.ajaxHistoryData = res.data.table;
            this.list = res.data.table;
            this.list1 = res.data.table;
            this.options2 = res.data.table;
            // console.log(res.data.table,'用户信息')
            // console.log( this.list1,'用户信息2222')
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
        } else {
          this.$axios({
            method: 'post',
            url: 'admin/order/show',
            data: this.$qs.stringify({
              uid:this.model13,
              phone:this.searchPhone,
              state:this.state4,
              type:this.type4,
              time:this.timeArry,
              page:this.page,
              jwt: localStorage.getItem('jwt')
            })
          }).then(res => {
            // console.log(this.$route.query.Id,'获取id')
            this.ajaxHistoryData = res.data.table;
            this.list = res.data.table;
            this.list1 = res.data.table;
            this.options2 = res.data.table;
            // console.log(res.data.table,'用户信息')
            // console.log( this.list1,'用户信息2222')
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
        }

      },
      //pdf导出
      daochu(row){
        this.$axios({
          method: 'post',
          url: 'admin/order/pdf',
          data: this.$qs.stringify({
            Id:row.Id,
            jwt: localStorage.getItem('jwt')
          })
        }).then(res => {
          // console.log(res.data.table,'用户信息')
        }).catch(res => {
          this.$Message.error('请求超时,请稍后再试...');
        });
      },
      //查看地图
      map(row){
          // console.log(row,'产看地图')
          this.modalMap=true
          this.center0=[row.marker[0].longitude,row.marker[0].latitude]
          this.center1=[row.marker[1].longitude,row.marker[1].latitude]
          // console.log(row.useradress,'content0产看地图')
          // console.log(row.orderadress,'content1产看地图1111111')
          // this.center=row.marker
          // this.center[0]=row.longitude
          // this.center[1]=row.latitude     此方式错误不显示
          this.content = row.useradress
          this.content1 = row.orderadress
      },
      ok2 () {
        this.tableShow()
      },
      cancel2 () {
        this.tableShow()
      },
      //搜索
      Schioce4(item){
        // console.log(item)
        this.state4=item.value

      },
      Schioce5(item){
        // console.log(item)
        this.type4=item.value
      },
      Schioce6(item){
        // console.log(item)
        this.searchNum=item.Id
      },
      //客户
      cus(){
        this.$axios({
          method: 'post',
          url: 'admin/customer/show',
          data: this.$qs.stringify({
            // name:query,
            jwt: localStorage.getItem('jwt')
          })
        }).then(res => {
          // console.log(res.data.table,'用户信息1100')
          this.list17 = res.data.table
          this.user17 = res.data.table
          this.list7 = res.data.table
          this.user7 = res.data.table

        }).catch(res => {
          this.$Message.error('请求超时,请稍后再试...');
        });
      },
      remoteMethod1 (query) {
        // console.log(query,'skjfdasfkasd')
        this.$axios({
          method: 'post',
          url: 'admin/user/show',
          data: this.$qs.stringify({
            name:query,
            jwt: localStorage.getItem('jwt')
          })
        }).then(res => {
          this.list = res.data.table
          // console.log(this.list,'用户信息11')
        }).catch(res => {
          this.$Message.error('请求超时,请稍后再试...');
        });
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
      remoteMethod5 (query) {
        // console.log(query,'skjfdasfkasd')
        this.$axios({
          method: 'post',
          url: 'admin/order/vagueequipment',
          data: this.$qs.stringify({
            equipment:query,
            jwt: localStorage.getItem('jwt')
          })
        }).then(res => {
          // console.log(res.data.table,'用户信息11')
          this.list5 = res.data.table
          this.user5 = res.data.table
          this.equipmentId = res.data.table[0].Id
          this.guzhang()
          this.color()
          // console.log(this.list,'用户信息11')
        }).catch(res => {
          this.$Message.error('请求超时,请稍后再试...');
        });
        if (query !== '') {
          this.loading5 = true;
          setTimeout(() => {
            this.loading5 = false;
            this.user5 = this.list5;
          }, 200);
        } else {
          this.user5 = [];
        }
        // console.log(this.model13)
      },
      remoteMethod6 (query) {
        // console.log(query,'skjfdasfkasd')
        this.$axios({
          method: 'post',
          url: 'admin/order/vagueequipment',
          data: this.$qs.stringify({
            equipment:query,
            jwt: localStorage.getItem('jwt')
          })
        }).then(res => {
          // console.log(res.data.table,'用户信息11')
          this.list6 = res.data.table
          this.user6 = res.data.table
          this.equipmentId6 = res.data.table[0].Id
          //故障
          this.$axios({
            method: 'post',
            url: 'admin/order/hitch',
            data: this.$qs.stringify({
              equipmentId: this.equipmentId6,
              jwt:localStorage.getItem('jwt')
            })
          }).then(res => {
            // console.log(res.data.table,'故障')
            this.guzhangtable=res.data.table
          }).catch(res => {
            this.$Message.error('请求超时,请稍后再试...');
          });
          //颜色
          this.$axios({
            method: 'post',
            url: 'admin/order/colour',
            data: this.$qs.stringify({
              equipmentId: this.equipmentId6,
              hitch: this.gusesion,
              jwt:localStorage.getItem('jwt')
            })
          }).then(res => {
            // console.log(res,'颜色')
            this.colortable=res.data.table
          }).catch(res => {
            this.$Message.error('请求超时,请稍后再试...');
          });
          // console.log(this.list,'用户信息11')
        }).catch(res => {
          // this.$Message.error('请求超时,请稍后再试...');
        });
        if (query !== '') {
          this.loading6 = true;
          setTimeout(() => {
            this.loading6 = false;
            this.user6 = this.list6;
          }, 200);
        } else {
          this.user6 = [];
        }
        // console.log(this.model13)
      },
      remoteMethod7 (query) {
        // console.log(query,'skjfdasfkasd')
        // this.tableShow()
        this.$axios({
          method: 'post',
          url: 'admin/customer/show',
          data: this.$qs.stringify({
            name:query,
            jwt: localStorage.getItem('jwt')
          })
        }).then(res => {
          // console.log(res.data.table[0],'用户信息1100')
          // console.log(typeof(res.data.table[0].Id),'用户信息1100')
          this.list7 = res.data.table
          this.cus7 = res.data.table[0]
          if(typeof(res.data.table[0]) === 'undefined'){
            this.formItem.userphone = ''
            this.formItem.province = ''
            // this.cid1 = this.cus17.Id
            this.cusname1 = query
            this.formItem.city = ''
            this.formItem.area = ''
            // console.log('wu修改客户')
            // this.cityListId=this.cus7.provinceid
            // this.cityListId1=this.cus7.cityid
            // this.cityListId2=this.cus7.areaid
            this.formItem.address = ''
            // console.log(this.cusname1,'无客户二胡额额㛑额额')
          }else {
            // console.log('you修改客户')

            //省
            this.$axios({
              url: 'admin/user/adress',
              method: 'get',
            }).then(res => {
              // console.log(res,'12345')
              this.cityList = res.data.table
            }).catch(res => {
              this.$Message.error('请求超时,请稍后再试...')
            });

            //市
            this.$axios({
              method: 'post',
              url: 'admin/user/getRegion',
              data: this.$qs.stringify({
                id: res.data.table[0].provinceid,
                type: 1,
                // jwt:localStorage.getItem('jwt')
              })
            }).then(res => {
              // console.log(res,'市三级联动')
              this.cityList1=res.data
            }).catch(res => {
              this.$Message.error('请求超时,请稍后再试...');
            });

            //区
            this.$axios({
              method: 'post',
              url: 'admin/user/getRegion',
              data: this.$qs.stringify({
                id: res.data.table[0].cityid,
                type: 2,
                // jwt:localStorage.getItem('jwt')
              })
            }).then(res => {
              // console.log(res,'市三级联动')
              this.cityList2=res.data
            }).catch(res => {
              this.$Message.error('请求超时,请稍后再试...');
            });

            this.formItem.userphone = this.cus7.phone
            // this.formItem.province = this.cus7.province
            // this.formItem.city = this.cus7.city
            // this.formItem.area = this.cus7.area
            // console.log(this.formItem.area,'市的方式发生三级联动')
            this.formItem.address = this.cus7.address
            this.cid1 = this.cus7.Id
            // console.log(this.cid1,'有客户市三级联动')
            this.cityListId=this.cus7.provinceid
            this.cityListId1=this.cus7.cityid
            this.cityListId2=this.cus7.areaid

          }


        }).catch(res => {
          // this.$Message.error('请求超时,请稍后再试...');
        });
        if (query !== '') {
          this.loading7 = true;
          setTimeout(() => {
            this.loading7 = false;
            this.user7 = this.list7;
          }, 200);
        } else {
          this.user7 = [];
        }
        // console.log(this.user17)
        // console.log(this.list17)
      },
      clear7(){
        // console.log('123')
        this.cid1 = ''
        this.formItem.userphone = ''
        this.formItem.province = ''
        this.formItem.city = ''
        this.formItem.area = ''
        this.formItem.address = ''
        this.cus()
      },
      remoteMethod15 (query) {
        // console.log(query,'skjfdasfkasd')
        // this.tableShow()

        this.$axios({
          method: 'post',
          url: 'admin/user/show',
          data: this.$qs.stringify({
            name:query,
            jwt: localStorage.getItem('jwt')
          })
        }).then(res => {
          this.list15 = res.data.table
          this.usermoney = res.data.table[0].Id

        }).catch(res => {
          this.$Message.error('请求超时,请稍后再试...');
        });

        //优惠券
        this.$axios({
          method: 'post',
          url: 'admin/order/coupon',
          data: this.$qs.stringify({
            uid: this.usermoney,
            jwt: localStorage.getItem('jwt')
          })
        }).then(res => {
          // console.log(res.data.table,'用户信息')
          this.youhui = res.data.table
        }).catch(res => {
          this.$Message.error('请求超时,请稍后再试...');
        });
        if (query !== '') {
          this.loading15 = true;
          setTimeout(() => {
            this.loading15 = false;
            this.user15 = this.list15;
          }, 200);
        } else {
          this.user15 = [];
        }
        // console.log(this.model13)
      },
      clear15(){
        // console.log('123')
        this.formAdd.uid = ''
        this.username()
      },
      remoteMethod16 (query) {
        // console.log(query,'skjfdasfkasd')
        // this.tableShow()
        this.$axios({
          method: 'post',
          url: 'admin/user/show',
          data: this.$qs.stringify({
            name:query,
            jwt: localStorage.getItem('jwt')
          })
        }).then(res => {
          this.list16 = res.data.table
          this.usermoney = res.data.table[0].Id
          // console.log(this.list16,'用户信息11')
        }).catch(res => {
          this.$Message.error('请求超时,请稍后再试...');
        });
        if (query !== '') {
          this.loading16 = true;
          setTimeout(() => {
            this.loading16 = false;
            this.user16 = this.list16;
          }, 200);
        } else {
          this.user16 = [];
        }
        // console.log(this.model13)
      },
      remoteMethod17 (query) {
        // console.log(query,'skjfdasfkasd')
        // this.tableShow()
        this.$axios({
          method: 'post',
          url: 'admin/customer/show',
          data: this.$qs.stringify({
            name:query,
            jwt: localStorage.getItem('jwt')
          })
        }).then(res => {

          this.list17 = res.data.table

          // this.cid = this.cus17.Id
          // console.log(typeof(res.data.table[0].Id),'11111111')
          // console.log(typeof(res.data.table[0].Id) == typeof(3))
          if(typeof(res.data.table[0].Id) == typeof(3)){

            this.cus17 = res.data.table[0]
            this.formAdd.userphone = this.cus17.phone
            this.formAdd.province = this.cus17.province


            //省
            this.$axios({
              url: 'admin/user/adress',
              method: 'get',
            }).then(res => {
              // console.log(res,'12345')
              this.cityList = res.data.table
            }).catch(res => {
              this.$Message.error('请求超时,请稍后再试...')
            });

            //市
            this.$axios({
              method: 'post',
              url: 'admin/user/getRegion',
              data: this.$qs.stringify({
                id: res.data.table[0].provinceid,
                type: 1,
                // jwt:localStorage.getItem('jwt')
              })
            }).then(res => {
              // console.log(res,'市三级联动')
              this.cityList1=res.data
            }).catch(res => {
              this.$Message.error('请求超时,请稍后再试...');
            });

            //区
            this.$axios({
              method: 'post',
              url: 'admin/user/getRegion',
              data: this.$qs.stringify({
                id: res.data.table[0].cityid,
                type: 2,
                // jwt:localStorage.getItem('jwt')
              })
            }).then(res => {
              // console.log(res,'市三级联动')
              this.cityList2=res.data
            }).catch(res => {
              this.$Message.error('请求超时,请稍后再试...');
            });
            this.formAdd.city = this.cus17.city
            this.formAdd.area = this.cus17.area

            this.cityListId=this.cus17.provinceid
            this.cityListId1=this.cus17.cityid
            this.cityListId2=this.cus17.areaid
            this.formAdd.address = this.cus17.address
            this.cid = this.cus17.Id

          }else {

            // console.log(typeof(res.data.table[0].Id),'1222222222222nei')
            this.formAdd.cid = ''
            this.formAdd.userphone = ''
            this.formAdd.province = ''
            this.formAdd.city = ''
            this.formAdd.area = ''
            this.formAdd.address = ''
            this.cusname = query
            // console.log(this.cusname,'无客户')

          }


        }).catch(res => {
          // this.$Message.error('请求超时,请稍后再试...');
        });
        if (query !== '') {
          this.loading17 = true;
          setTimeout(() => {
            this.loading17 = false;
            this.user17 = this.list17;
          }, 200);
        } else {
          this.user17 = [];
        }
        // console.log(this.user17)
        // console.log(this.list17)
      },
      clear17(){
        // console.log('123')
        this.formAdd.cid = ''
        this.formAdd.userphone = ''
        this.formAdd.province = ''
        this.formAdd.city = ''
        this.formAdd.area = ''
        // this.cityListId=''
        // this.cityListId1=''
        // this.cityListId2=''
        this.formAdd.address = ''
        this.cus()
      },
      handSeek(){
        this.tableShow()
      },
      //新增
      add(){
        this.modal3=true
        this.remoteMethod15()
        this. weixiu()
        //客户详情
        this.$axios({
          url: 'admin/customer/show',
          method: 'post',
          data: this.$qs.stringify({
            jwt:localStorage.getItem('jwt')
          })
        }).then(res => {
          // console.log(res,'12345客户详情')
          this.list17 = res.data.table
          this.user17 = res.data.table
        }).catch(res => {
          this.$Message.error('请求超时,请稍后再试...')
        });
        //省联动
        this.$axios({
          url: 'admin/user/adress',
          method: 'get',
        }).then(res => {
          // console.log(res,'12345')
          this.cityList = res.data.table
        }).catch(res => {
          this.$Message.error('请求超时,请稍后再试...')
        });
        //支付方式
        this.$axios({
          method: 'post',
          url: 'admin/Pay/show',
          data: this.$qs.stringify({
            jwt:localStorage.getItem('jwt')
          })
        }).then(res => {
          // console.log(res.data.table,'支付方式')
          this.pay=res.data.table
        }).catch(res => {
          this.$Message.error('请求超时,请稍后再试...');
        });
        //机型大类
        this.jiixnglei()
        this. username()

      },
      //用户列表
      username(){
        this.$axios({
          method: 'post',
          url: 'admin/user/show',
          data: this.$qs.stringify({
            jwt: localStorage.getItem('jwt')
          })
        }).then(res => {
          // console.log(res.data.table,'用户信息')
          this.user = res.data.table
          this.list16 = res.data.table
          this.list15 = res.data.table
          this.user15 = res.data.table
        }).catch(res => {
          this.$Message.error('请求超时,请稍后再试...');
        });
      },
      //省联动
      chioce(item){
        // console.log(JSON.stringify(item),'12345')
        // console.log(item,'1234554321')
        this.shengName = item.name
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
        this.shiName = item.name
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
        this.quName = item.name
      },
      //获取地图坐标点
      mapInput(){
        // console.log(this.formAdd.address,'123456')
        this.maptu = true
        // if(this.formAdd.address==!null){
        //   this.maptu = true
        // }else {
        //   this.maptu = false
        // }
        this.$axios({
          method: 'post',
          url: 'admin/order/query',
          data: this.$qs.stringify({
            address: this.shengName + this.shiName + this.quName + this.formAdd.address,
            jwt:localStorage.getItem('jwt')
          })
        }).then(res => {
          // console.log(res.data.table.location.lng,'市三级联动')
          // this.maoOrder=res.data.tabel
          // this.center1=[row.marker[1].longitude,row.marker[1].latitude]
          this.center2=[res.data.table.location.lng,res.data.table.location.lat]
          // this.center2=[114.30 ,30.57]
          // console.log(this.center2,'市三级联动')
        }).catch(res => {
          // this.$Message.error('请求超时,请稍后再试...');
        });
      },
      mapInput1(){
        // console.log(this.formAdd.address,'123456')
        this.maptu1 = true
        // if(this.formAdd.address==!null){
        //   this.maptu = true
        // }else {
        //   this.maptu = false
        // }
        this.$axios({
          method: 'post',
          url: 'admin/order/query',
          data: this.$qs.stringify({
            address: this.shengName + this.shiName + this.quName + this.formAdd.address,
            jwt:localStorage.getItem('jwt')
          })
        }).then(res => {
          // console.log(res.data.table.location.lng,'市三级联动')
          // this.maoOrder=res.data.tabel
          // this.center1=[row.marker[1].longitude,row.marker[1].latitude]
          this.center3=[res.data.table.location.lng,res.data.table.location.lat]
          // this.center2=[114.30 ,30.57]
          // console.log(this.center2,'市三级联动')
        }).catch(res => {
          // this.$Message.error('请求超时,请稍后再试...');
        });
      },
      //维修日期
      weixiu(){
        this.$axios({
          method: 'get',
          url: 'admin/Warrantytime/show',
          // data: this.$qs.stringify({
          //   jwt:localStorage.getItem('jwt')
          // })
        }).then(res => {
          // console.log(res,'weixiu')
          this.xiutable=res.data.table
        }).catch(res => {
          this.$Message.error('请求超时,请稍后再试...');
        });
      },
      remoteMethod2 (query) {
        this.tableShow()
        if (query !== '') {
          this.loading2 = true;
          setTimeout(() => {
            this.loading2 = false;
            this.options2 = this.list1;
            // console.log(this.options2,'多选')
            // const list = this.list.map(item => {
            //   return {
            //     value: item,
            //     label: item
            //   };
            // });

          }, 200);
        } else {
          this.options2 = [];
        }
        // console.log(this.options2,'多选')
      },
      change(value){
        // console.log(value,'gaibhian')
        this.formAdd.associated_orders = value
        // console.log(this.formAdd.associated_orders,'132223gaibhian')
      },
      //设备
      shebeilei(){
        this.$axios({
          method: 'post',
          url: 'admin/order/vagueequipment',
          data: this.$qs.stringify({
            // category: this.Nlei,
            // brand: this.Npinpai,
            equipment: this.equipment,
            jwt:localStorage.getItem('jwt')
          })
        }).then(res => {
          // console.log(res,'设备')
          this.shebei=res.data.table
        }).catch(res => {
          this.$Message.error('请求超时,请稍后再试...');
        });
      },
      //故障
      guzhang(){
        this.$axios({
          method: 'post',
          url: 'admin/order/hitch',
          data: this.$qs.stringify({
            equipmentId: this.equipmentId,
            jwt:localStorage.getItem('jwt')
          })
        }).then(res => {
          // console.log(res.data.table,'故障')
          this.guzhangtable=res.data.table
        }).catch(res => {
          this.$Message.error('请求超时,请稍后再试...');
        });
      },
      //颜色
      color(){
        this.$axios({
          method: 'post',
          url: 'admin/order/colour',
          data: this.$qs.stringify({
            equipmentId: this.equipmentId,
            hitch: this.gusesion,
            jwt:localStorage.getItem('jwt')
          })
        }).then(res => {
          // console.log(res,'颜色')
          this.colortable=res.data.table
        }).catch(res => {
          this.$Message.error('请求超时,请稍后再试...');
        });
      },
      chioce9(item){
        // console.log(item,'品牌1')
        this.Nlei=item.category
        //品牌
        this.pinpailei()
      },
      chioce3(item){
        // console.log(item,'品牌1')
        this.Npinpai=item.brand
        this.jixinglei1()
      },
      //机型
      chioce4(item){
        // console.log(item,'机型1')
        this.Njixing=item.version
        this.shebeilei()
      },
      //设备
      chioce5(item){
        // console.log(item,'设备')
        this.Nshebei=item.equipment
        this.formAdd.eid = item.Id
        this.guzhang()
      },
      chioceformItem5(item){
        // console.log(item,'设备')
        this.Nshebei=item.equipment
        this.formItem.eid = item.Id
        this.guzhang()
      },
      chiocegu(item){
        // console.log(item,'故障11111')
        this.gusesion = item.hitch
        this.gusesionId = item.Id
        this.formAdd.amount = item.amount
        this.formItem.amount = item.amount
        this.color()
      },
      chiocecolor(item){
        // console.log(item,'故障11111')
        this.colorsesion = item.color
        this.colorId = item.Id
        this.formAdd.amount = item.amount
      },
      chioce6(item){
        // console.log(item,'订单类型')
        this.formAdd.state = item.value
        this.formItem.state = item.value
      },
      chioce7(item){
        // console.log(item,'订单状态')
        this.formAdd.type = item.value
        this.formItem.type = item.value
      },
      chioce8(item){
        // console.log(item,'支付方式')
        this.formAdd.payid = item.Id
        this.formItem.payid = item.Id
        if(item.pay_type == 1){
          this.formItem.paytypeItem = '需要汇款'
          this.formAdd.paytypeItem = '需要汇款'
        }else if(item.pay_type == 2){
          this.formItem.paytypeItem = '不需要汇款'
          this.formAdd.paytypeItem = '不需要汇款'
        }
      },
      chioce10(item){
        // console.log(item,'yonghu')
        this.formAdd.uid = item.Id
        this.formItem.uid = item.Id
        //优惠券
        this.$axios({
          method: 'post',
          url: 'admin/order/coupon',
          data: this.$qs.stringify({
            uid: item.Id,
            jwt: localStorage.getItem('jwt')
          })
        }).then(res => {
          // console.log(res.data.table,'用户信息')
          this.youhui = res.data.table
        }).catch(res => {
          this.$Message.error('请求超时,请稍后再试...');
        });
      },
      chioce11(item){
        // console.log(item,'yoouhuiquan')
        this.formAdd.couponId = item.Id
        this.formItem.couponId = item.Id
      },
      chioce14(item){
        // console.log(item,'yoouhuiquan')
        this.formAdd.paystate = item.Id
      },
      chioceformItem14(item){
        // console.log(item,'yoouhuiquan')
        this.formItem.paystate = item.Id
      },
      chioce15(item){
        // console.log(item,'yoouhuiquan')
        this.formAdd.warrantytime = item.time
        this.formItem.warrantytime = item.time
      },
      chioce16(item){
        // console.log(item,'yoouhuiquan')
        // this.formAdd.warrantytime = item.time
      },
      changedateSou(res){
        // console.log(res,'时间内')
        this.timeArry[0]=res
      },
      changedate(res){
        // console.log(res,'时间内')
        this.adddate=res
      },
      changedateSou1(res){
        // console.log(res,'时间内')
        this.adddate1=res
        this.timeArry[1]=res
      },
      changedate2(res){
        // console.log(res,'时间内')
        this.adddate=res
      },
      changetime(res){
        // console.log(res,'分钟时间内')
        this.addtime=res
      },
      handleBeforUpload1 (file) {
        this.img1.image = file  // 将回调的文件信息存入data.file
      },
      handleSuccess1(response){
        // console.log(response,'图片')
        this.formAdd.customer_img.push(response.url)
        this.formItem.customer_img.push(response.url)
        // console.log(this.formAdd.customer_img,'图片1')
      },
      ok3 (formAdd) {
        console.log(typeof(this.cid),'验证')
        // console.log(typeof(this.cid) == typeof(2),'验证')
        if(typeof(this.cid) == typeof(2)){
          this.$refs[formAdd].validate((valid) => {
            if (valid) {
              this.$axios({
                method: 'post',
                url: 'admin/order/insert',
                data: this.$qs.stringify({
                  uid:this.usermoney,
                  cid:this.cid,
                  // cid:this.cusname,
                  couponId:this.formAdd.couponId,
                  // specific:this.formAdd.specific,
                  programme:this.formAdd.programme,
                  province: this.cityListId,
                  city: this.cityListId1,
                  area:this.cityListId2,
                  address:this.formAdd.address,
                  customer_service:this.formAdd.customer_service,
                  state:this.formAdd.state,
                  appointment_time:this.adddate + ' ' + this.addtime,
                  eid:this.gusesionId,
                  color:this.formAdd.color1,
                  userphone:this.formAdd.userphone,
                  customer_img:this.formAdd.customer_img,
                  type:this.formAdd.type,
                  payid:this.formAdd.payid,
                  paystate:this.formAdd.paystate,
                  roadfare:this.formAdd.roadfare,
                  thirdnumber:this.formAdd.thirdnumber,
                  warrantytime:this.formAdd.warrantytime,
                  associated_orders:this.formAdd.associated_orders,
                  jwt:localStorage.getItem('jwt')
                })
              }).then(res => {
                // console.log(res,'用户增加')
                this.tableShow()
                this.modal3 = false
                this.formAdd = {}
              }).catch(res => {
                this.modal3 = false
                this.tableShow()
                this.formAdd = {}
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
        }else {
          this.$refs[formAdd].validate((valid) => {
            if (valid) {
              this.$axios({
                method: 'post',
                url: 'admin/order/insert',
                data: this.$qs.stringify({
                  uid:this.usermoney,
                  // cid:this.cid,
                  cid:this.cusname,
                  couponId:this.formAdd.couponId,
                  // specific:this.formAdd.specific,
                  programme:this.formAdd.programme,
                  province: this.cityListId,
                  city: this.cityListId1,
                  area:this.cityListId2,
                  address:this.formAdd.address,
                  customer_service:this.formAdd.customer_service,
                  state:this.formAdd.state,
                  appointment_time:this.adddate + ' ' + this.addtime,
                  eid:this.gusesionId,
                  color:this.formAdd.color1,
                  userphone:this.formAdd.userphone,
                  customer_img:this.formAdd.customer_img,
                  type:this.formAdd.type,
                  payid:this.formAdd.payid,
                  paystate:this.formAdd.paystate,
                  roadfare:this.formAdd.roadfare,
                  thirdnumber:this.formAdd.thirdnumber,
                  warrantytime:this.formAdd.warrantytime,
                  associated_orders:this.formAdd.associated_orders,
                  jwt:localStorage.getItem('jwt')
                })
              }).then(res => {
                // console.log(res,'用户增加')
                this.formAdd = {}
                this.tableShow()
                this.modal3 = false

              }).catch(res => {
                this.modal3 = false
                this.tableShow()
                this.formAdd = {}
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
        }

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
        // this. username()
        this.modal1=true
        // this.formItem=row

        //达人
        this.$axios({
          method: 'post',
          url: 'admin/user/show',
          data: this.$qs.stringify({
            jwt: localStorage.getItem('jwt')
          })
        }).then(res => {
          // console.log(res.data.table,'用户信息')
          this.user = res.data.table
          this.user16 = res.data.table
        }).catch(res => {
          this.$Message.error('请求超时,请稍后再试...');
        });
        //优惠券
        this.$axios({
          method: 'post',
          url: 'admin/order/coupon',
          data: this.$qs.stringify({
            uid: row.uid,
            jwt: localStorage.getItem('jwt')
          })
        }).then(res => {
          // console.log(res.data.table,'用户信息')
          this.youhui = res.data.table
        }).catch(res => {
          this.$Message.error('请求超时,请稍后再试...');
        });
        //支付方式
        this.$axios({
          method: 'post',
          url: 'admin/Pay/show',
          data: this.$qs.stringify({
            jwt:localStorage.getItem('jwt')
          })
        }).then(res => {
          // console.log(res.data.table,'支付方式')
          this.pay=res.data.table
        }).catch(res => {
          this.$Message.error('请求超时,请稍后再试...');
        });
        //客户详情
        this.$axios({
          url: 'admin/customer/show',
          method: 'post',
          data: this.$qs.stringify({
            jwt:localStorage.getItem('jwt')
          })
        }).then(res => {
          // console.log(res,'12345')
          this.list7 = res.data.table
          this.user7 = res.data.table

        }).catch(res => {
          this.$Message.error('请求超时,请稍后再试...')
        });
        //省
        this.$axios({
          url: 'admin/user/adress',
          method: 'get',
        }).then(res => {
          // console.log(res,'12345')
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
          // console.log(res,'市三级联动')
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
          // console.log(res,'市三级联动')
          this.cityList2=res.data
        }).catch(res => {
          this.$Message.error('请求超时,请稍后再试...');
        });
        //设备
          this.$axios({
            method: 'post',
            url: 'admin/order/vagueequipment',
            data: this.$qs.stringify({
              equipment: row.equipment,
              jwt:localStorage.getItem('jwt')
            })
          }).then(res => {
            // console.log(res.data.table,'设备')
            this.shebei=res.data.table
            //故障
            this.$axios({
              method: 'post',
              url: 'admin/order/hitch',
              data: this.$qs.stringify({
                equipmentId: this.shebei[0].Id,
                jwt:localStorage.getItem('jwt')
              })
            }).then(res => {
              // console.log(res.data.table,'故障')
              this.guzhangtable=res.data.table
            }).catch(res => {
              this.$Message.error('请求超时,请稍后再试...');
            });
            //颜色
            this.$axios({
              method: 'post',
              url: 'admin/order/colour',
              data: this.$qs.stringify({
                equipmentId: this.shebei[0].Id,
                hitch: row.hitch,
                jwt:localStorage.getItem('jwt')
              })
            }).then(res => {
              // console.log(res,'颜色')
              this.colortable=res.data.table
            }).catch(res => {
              this.$Message.error('请求超时,请稍后再试...');
            });
          }).catch(res => {
            this.$Message.error('请求超时,请稍后再试...');
          });

        // this.formItem.uid=''
        this.formItem.Id=row.Id
        this.cityListId=row.provinceid
        this.cityListId1=row.cityid
        this.cityListId2=row.areaid
        this.formItem.programme=row.programme
        this.formItem.customer_service=row.customer_service
        this.formItem.userphone=row.userphone
        this.formItem.province=row.province
        this.formItem.city=row.city
        this.formItem.area=row.area
        this.formItem.address=row.address
        // this.formItem.cid=row.customername
        this.formItem.roadfare=row.roadfare
        this.formItem.thirdnumber=row.thirdnumber
        this.formItem.customer_img=row.customer_img
        // this.formItem.thirdnumber=row.thirdnumber
        this.formItem.eid=row.equipment
        this.formItem.hitch=row.hitch
        this.formItem.color1=row.colour
        this.gusesionId = row.specific
        this.formItem.amount = row.originalprice
        // this.formItem.warrantytime=row.warrantytime
        // this.add()
        this.weixiu()

        // console.log(this.user7,'客户最后')
        // this.jiixnglei()

        //订单状态
        if(row.paytype == 1){
          this.formItem.paytypeItem = '需要汇款'
        }else if(row.paytype == 2){
          this.formItem.paytypeItem = '不需要汇款'
        }
        //订单状态
        if(row.type == 1){
          this.formItem.type = '上门'
        }else if(row.type == 2){
          this.formItem.type = '到店'
        }else if(row.type == 3){
          this.formItem.type = '售后'
        }
        //订单类型
        if(row.state == 1){
          this.formItem.state = '未开始'
        }else if(row.state == 2){
          this.formItem.state = '进行'
        }else if(row.state == 3){
          this.formItem.state = '结束'
        }else if(row.state == 4){
          this.formItem.state = '疑难'
        }else if(row.state == 5){
          this.formItem.state = '正在上门'
        }
        支付方式
        if(row.payid == 1){
          this.formItem.payid = '汇款'
        }else if(row.payid == 2){
          this.formItem.payid = '不汇款'
        }
        //支付状态
        if(row.paystate == 1){
          this.formItem.paystate = '已支付'
        }else if(row.paystate == 2){
          this.formItem.paystate = '未支付'
        }

      },
      remoteMethodItem2 (query) {
        this.tableShow()
        if (query !== '') {
          this.loadingItem2 = true;
          setTimeout(() => {
            this.loadingItem2 = false;
            this.options2 = this.list1;
          }, 200);
        } else {
          this.options2 = [];
        }
        // console.log(this.options2,'多选')
      },
      changeItem(value){
        // console.log(value,'gaibhian')
        this.formItem.associated_orders = value
        // console.log(this.formAdd.associated_orders,'132223gaibhian')
      },
      ok (formItem) {
        // console.log(this.gusesionId,'113465654')
        // this.modal3=false
        // console.log(this.usermoney,'remoteMethod15')
        // console.log('remoteMethod15')
        // console.log(this.cid1)
        if(typeof(this.cid1) == typeof(2)){
          // console.log(this.cid1)
          this.$refs[formItem].validate((valid) => {
            if (valid) {
              this.$axios({
                method: 'post',
                url: 'admin/order/upd',
                data: this.$qs.stringify({
                  Id:this.formItem.Id,
                  uid:this.usermoney,
                  cid:this.cid1,
                  couponId:this.formItem.couponId,
                  // specific:this.formItem.specific,
                  programme:this.formItem.programme,
                  province: this.cityListId,
                  city: this.cityListId1,
                  area:this.cityListId2,
                  address:this.formItem.address,
                  customer_service:this.formItem.customer_service,
                  state:this.formItem.state,
                  appointment_time:this.adddate + ' ' + this.addtime,
                  eid:this.gusesionId,
                  color:this.formItem.color1,
                  userphone:this.formItem.userphone,
                  customer_img:this.formItem.customer_img,
                  type:this.formItem.type,
                  payid:this.formItem.payid,
                  paystate:this.formItem.paystate,
                  roadfare:this.formItem.roadfare,
                  thirdnumber:this.formItem.thirdnumber,
                  warrantytime:this.formItem.warrantytime,
                  associated_orders:this.formItem.associated_orders,
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
        }else {
          // console.log(this.cusname1)
          this.$refs[formItem].validate((valid) => {
            if (valid) {
              this.$axios({
                method: 'post',
                url: 'admin/order/upd',
                data: this.$qs.stringify({
                  Id:this.formItem.Id,
                  uid:this.usermoney,
                  cid:this.cusname1,
                  couponId:this.formItem.couponId,
                  // specific:this.formItem.specific,
                  programme:this.formItem.programme,
                  province: this.cityListId,
                  city: this.cityListId1,
                  area:this.cityListId2,
                  address:this.formItem.address,
                  customer_service:this.formItem.customer_service,
                  state:this.formItem.state,
                  appointment_time:this.adddate + ' ' + this.addtime,
                  eid:this.gusesionId,
                  color:this.formItem.color1,
                  userphone:this.formItem.userphone,
                  customer_img:this.formItem.customer_img,
                  type:this.formItem.type,
                  payid:this.formItem.payid,
                  paystate:this.formItem.paystate,
                  roadfare:this.formItem.roadfare,
                  thirdnumber:this.formItem.thirdnumber,
                  warrantytime:this.formItem.warrantytime,
                  associated_orders:this.formItem.associated_orders,
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
        }

        this.tableShow()
      },
      cancel () {
        this.modal3=false
        this.tableShow()
        // this.$Message.info('Clicked cancel');
      },
      // 修改上传图片
      xiugaiimg(row){
        // console.log(row)
        this.modal2=true
        // this.formImg=row
        this.formImg.Id=row.Id
      },
      handleBeforUpload (file) {
        // this.formImg.img = file;
        this.file = file  // 将回调的文件信息存入data.file
        return false
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
              url: 'admin/order/delete',
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
        // console.log(this.page,'123')
        this.tableShow()
        var _start = (index - 1) * this.pageSize;
        var _end = index * this.pageSize;
        this.data1 = this.ajaxHistoryData.slice(_start, _end);
      }
    },
    // mounted(){
    //   console.log(window.location.href.split("?")[1].split("=")[1],'a参数')
    //   console.log(localStorage.getItem('Id'),'a参数123132')
    //   this.$axios({
    //     method: 'post',
    //     url: 'admin/order/show',
    //     data: this.$qs.stringify({
    //       uid:this.model13,
    //       phone:this.searchPhone,
    //       state:this.state4,
    //       type:this.type4,
    //       time:this.timeArry,
    //       page:this.page,
    //       Id:localStorage.getItem('Id'),//接收地图传值
    //       jwt: localStorage.getItem('jwt')
    //     })
    //   }).then(res => {
    //     // console.log(this.$route.query.Id,'获取id')
    //     this.ajaxHistoryData = res.data.table;
    //     this.list = res.data.table;
    //     this.list1 = res.data.table;
    //     this.options2 = res.data.table;
    //     // console.log(res.data.table,'用户信息')
    //     // console.log( this.list1,'用户信息2222')
    //     this.dataCount = res.data.count;
    //     // 初始化显示，小于每页显示条数，全显，大于每页显示条数，取前每页条数显示
    //     if (res.data.count < this.pageSize) {
    //       // this.historyData = this.ajaxHistoryData;
    //       this.data1 = res.data.table
    //     } else {
    //       this.data1 = this.ajaxHistoryData.slice(0, this.pageSize);
    //     }
    //   }).catch(res => {
    //     this.$Message.error('请求超时,请稍后再试...');
    //   });
    // }
  }
</script>

<style scoped>
  .map {
    width: 100%;
    height: 400px;
  }
  .map1 {
    clear: both;
    width:500px;
    height: 400px;
  }
  .xiahuaxian{
    margin-bottom: 15px;
    border: 0.5px solid darkgray;
    width: 92%;
    margin-left: 3%
  }
</style>
