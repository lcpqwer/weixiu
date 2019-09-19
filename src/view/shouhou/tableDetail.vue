<template>
  <div class="tabledetail">
    <Row class="expand-row">
      <Col span="8" class="coll">
        <span class="expand-key">品牌: </span>
        <span class="expand-value">{{ row.brand }}</span>
      </Col>
      <Col span="8" class="coll">
        <span class="expand-key">机型: </span>
        <span class="expand-value">{{ row.version }}</span>
      </Col>
      <Col span="8" class="coll">
        <span class="expand-key">设备: </span>
        <span class="expand-value">{{ row.equipment }}</span>
      </Col>
    </Row>
    <Row class="expand-row">
      <Col span="8" class="coll">
        <span class="expand-key">创建时间： </span>
        <span class="expand-value">{{ row.time }}</span>
      </Col>
      <Col span="8" class="coll">
        <span class="expand-key">具体故障: </span>
        <span class="expand-value">{{ row.hitch }}</span>
      </Col>
      <Col span="8" class="coll">
        <span class="expand-key">维修方案: </span>
        <span class="expand-value">{{ row.programme }}</span>
      </Col>
    </Row>
    <Row class="expand-row">
      <Col span="8" class="coll">
        <span class="expand-key">城市: </span>
        <span class="expand-value">{{ row.province }}{{ row.city }}</span>
      </Col>
      <Col span="8" class="coll">
        <span class="expand-key">区域: </span>
        <span class="expand-value">{{ row.area }}</span>
      </Col>
      <Col span="8" class="coll">
        <span class="expand-key">详细地址: </span>
        <span class="expand-value">{{ row.address }}</span>
      </Col>
    </Row>
    <Row class="expand-row">
      <Col span="8" class="coll">
        <span class="expand-key">客服备注: </span>
        <span class="expand-value" style="margin-right: 10px">{{ row.customer_service }}</span>
      </Col>
      <Col span="8" class="coll" v-for="value in row.technician_detail">
        <span class="expand-key">技术员备注: </span>
        <span class="expand-value">{{ value.technician }}</span>
      </Col>
    </Row>
    <Row>
      <Col span="8" class="coll">
        <span class="expand-key">客服备注照片: </span><br>
        <div class="imag">
          <img v-for="img in row.customer_img" :src="img" preview="0" alt="">
        </div>
      </Col>
      <Col span="8" class="coll" v-for="value in row.technician_detail">
        <span class="expand-key">技术员备注图片: </span><br>
        <img v-for="imga in value.img" :src="imga" preview="2" alt="">
        <!--<span class="expand-value">{{ row.technician }}</span>-->
      </Col>
    </Row>
    <Row>
      <Col span="8" class="coll">
        <span class="expand-key">订单状态: </span><br>
        <div  v-for="detail in row.order_state">
          <span class="expand-value" v-if="detail.state==1&&detail.type==1">{{detail.name}}在{{detail.time}}上门维修开始</span>
          <span class="expand-value" v-else-if="detail.state==1&&detail.type==2">{{detail.name}}在{{detail.time}}上门维修进行中</span>
          <span class="expand-value" v-else-if="detail.state==1&&detail.type==3">{{detail.name}}在{{detail.time}}上门维修结束</span>
          <span class="expand-value" v-else-if="detail.state==2&&detail.type==1">{{detail.name}}在{{detail.time}}到店维修开始</span>
          <span class="expand-value" v-else-if="detail.state==2&&detail.type==2">{{detail.name}}在{{detail.time}}到店维修进行中</span>
          <span class="expand-value" v-else-if="detail.state==2&&detail.type==3">{{detail.name}}在{{detail.time}}上门维修结束</span>
          <span class="expand-value" v-else-if="detail.state==3&&detail.type==1">{{detail.name}}在{{detail.time}}售后维修开始</span>
          <span class="expand-value" v-else-if="detail.state==3&&detail.type==2">{{detail.name}}在{{detail.time}}售后维修进行中</span>
          <span class="expand-value" v-else-if="detail.state==3&&detail.type==3">{{detail.name}}在{{detail.time}}售后维修结束</span>
        </div>
      </Col>
      <Col span="8" class="coll" v-for="detail in row.technician_detail">
        <span class="expand-key">订单状态: </span><br>
        <div>
          <span class="expand-value" v-if="detail.upload_state==1&&detail.type==1">{{detail.name}}在{{detail.time}}订单开始</span>
          <span class="expand-value" v-else-if="detail.upload_state==1&&detail.type==2">{{detail.name}}在{{detail.time}}订单结束</span>
          <span class="expand-value" v-else-if="detail.upload_state==1&&detail.type==3">{{detail.name}}在{{detail.time}}订单遇到问题</span>
        </div>
      </Col>
      <Col span="8" class="coll">
        <span class="expand-key">客户: </span>
        <span class="expand-value" style="margin-right: 10px">{{ row.username }}</span>
      </Col>
    </Row>
    <Row class="expand-row">
      <Col span="8" class="coll">
        <span class="expand-key">支付状态: </span>
        <span class="expand-value" v-if="row.paystate==1">已支付</span>
        <span class="expand-value" v-else-if="row.paystate==2">未支付</span>
      </Col>
      <Col span="8" class="coll">
        <span class="expand-key">路费: </span>
        <span class="expand-value">{{ row.roadfare }}</span>
      </Col>
      <Col span="8" class="coll">
        <span class="expand-key">第三方订单号: </span>
        <span class="expand-value">{{ row.thirdnumber }}</span>
      </Col>
    </Row>
    <Row class="expand-row">
      <Col span="8" class="coll">
        <span class="expand-key">原价: </span>
        <span class="expand-value">{{ row.originalprice }}</span>
      </Col>
      <Col span="8" class="coll">
        <span class="expand-key">折扣金额: </span>
        <span class="expand-value">{{ row.discountamount }}</span>
      </Col>
      <Col span="8" class="coll">
        <span class="expand-key">保修截止日期: </span>
        <span class="expand-value">{{ row.warrantytime }}</span>
      </Col>
    </Row>
    <Row class="expand-row">
      <Col span="8" class="coll">
        <span class="expand-key">关联订单号: </span>
        <span class="expand-value" v-for="item in row.associated_orderss">{{ item }}</span>
      </Col>
      <Col span="8" class="coll">
        <span class="expand-key">颜色: </span>
        <span class="expand-value">{{ row.colour }}</span>
      </Col>
      <Col span="8" class="coll">
        <span class="expand-key">签字: </span>
        <span class="expand-value">{{ row.authentication }}</span>
      </Col>
    </Row>
    <Row class="expand-row">
      <Col span="8" class="coll">
        <span class="expand-key">评分: </span>
        <span class="expand-value">{{ row.score }}</span>
      </Col>
      <Col span="8" class="coll">
        <span class="expand-key">评价: </span>
        <span class="expand-value">{{ row.evaluate }}</span>
      </Col>
    </Row>
  </div>
</template>

<script>
    export default {
      name: "tableDetail",
      props: {
        row: Object
      }
    }
</script>

<style scoped>
  .tabledetail{
    height: auto;
  }
  .coll{
    width: 30%;
    margin-right: 10px;
  }
  .expand-row{
    margin-bottom: 10px;
  }
  .expand-key{
    font-weight: bolder;
  }
  .expand-value{
    margin-right: 10px;
  }
  img{
    width: 100px;
    height: 100px;
    margin-right: 10px;
  }
</style>
