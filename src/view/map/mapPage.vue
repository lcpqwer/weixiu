<template>
  <div>
    <div id="container">
      <!--<el-amap vid="amapDemo" class="amap" :zoom="zoom">-->
        <!--&lt;!&ndash;:title="item.orderadress"&ndash;&gt;-->
        <!--<el-amap-marker v-for="(item,index) in mapArry" :position="item.position" :events="currentWindow.events" :vid="index">-->
        <!--&lt;!&ndash;<el-amap-marker :position="position" :events="currentWindow.events" :vid="mapArrylength">&ndash;&gt;-->

        <!--</el-amap-marker>-->
        <!--<el-amap-info-window-->
          <!--:position="Wposition"-->
          <!--:content="Wcontent"-->
          <!--:visible="modal4[mapindex]"-->
          <!--:events="infos.events">-->
        <!--</el-amap-info-window>-->
        <!--&lt;!&ndash;"content.orderadress"&ndash;&gt;-->
      <!--</el-amap>-->
    </div>
  </div>
</template>
<script>
  export default {
    // components: { VDistpicker },
    data () {
      return {
        zoom:14,
        center:[121.6292529148,31.2035397816],
        mapArry:[],
        Wposition:[121.91949, 30.88303],
        mapArrylength:'',
        a:'',
        Wcontent:'123',
        modal4:[],
        mapindex:0,
        position:[],
        currentWindow: {
          position: [121.6292529148,31.2035397816],
          content: '浦东新区',
          events: {
            click: (a,b,c) => {
              // console.log(a.target.Uh.vid)
              this.mapindex = a.target.Uh.vid
              this.modal4[this.mapindex] = !this.modal4[this.mapindex]

              console.log(this.modal4[this.mapindex])
              console.log( this.mapindex )
              // this.$router.push({
              //   path:'/o_management',
              //   query:{
              //     Id:this.mapArry[a.target.Uh.vid].Id
              //   }
              // })
            },
          },
        },
        infos: {
          events: {
            // open () {
            //   this.modal4[this.mapindex] = !this.modal4[this.mapindex]
            //   console.log('true1')
            //   console.log('11111111')
            // },
            close() {
              this.modal4[this.mapindex] = false
              console.log(this.modal4[this.mapindex],'信息窗体')
              console.log(this.mapindex)
            }
          }
        },
      }
    },
    created() {
      this.tableShow()
      // this.mounted()
    },
    methods: {
      // manage(){
      //   this.modal4[this.mapindex] = !this.modal4[this.mapindex]
      //   console.log("信息窗体"+this.modal4[this.mapindex])
      // },
      //用户信息展示
      tableShow(){
        this.$axios({
          method: 'post',
          url: 'admin/order/marker',
          data: this.$qs.stringify({
            // time:this.model13,
            jwt: localStorage.getItem('jwt')
          })
        }).then(res => {
          // console.log(res.data.table)
          this.mapArry = res.data.table
          // var i = res.data.table.length
          for(var i = 0; i < res.data.table.length;i ++){
            this.modal4.push(JSON.parse('false'))
          }
        }).catch(res => {
          // this.$Message.error('请求超时,请稍后再试...');
        });
      },
      // tiaozhuan(){
      //   this.$router.push({
      //     path:'/o_management',
      //     query:{
      //       Id:res.data.table[i].Id
      //     }
      //   })
      // }
    },
    mounted(){
      // console.log('1112223')
      // console.log(location.search,'123')
      this.$axios({
        method: 'post',
        url: 'admin/order/marker',
        data: this.$qs.stringify({
          // time:this.model13,
          jwt: localStorage.getItem('jwt')
        })
      }).then(res => {
        // console.log(res.data.table)
        var map = new AMap.Map("container", {
          resizeEnable: true,
          // zoom: 16,
          // center:new AMap.LngLat(121.6292529148,31.2035397816)
        });

        var lnglats = [];
        for (var j = 0; j < res.data.table.length; j++){
          lnglats[j] = res.data.table[j].position
        }
        // console.log(lnglats,'总坐标点')
        var infoWindow = new AMap.InfoWindow({offset: new AMap.Pixel(0, -20)});
        // console.log(lnglats,'irutjreklgjdf')
        for (var i = 0, marker; i < res.data.table.length; i++) {
          var marker = new AMap.Marker({
            position: lnglats[i],
            map: map
          });

          localStorage.setItem('Id', res.data.table[i].Id)

          marker.content = '<strong>客户名称:</strong>' + res.data.table[i].customername + '<br>' +
                            '<strong>客户手机号：</strong>' + res.data.table[i].userphone + '<br>' +
                            '<strong>地址：</strong>' + res.data.table[i].orderadress + '<br>' +
                            '<strong>达人名称：</strong>' + res.data.table[i].username + '<br>' +
                            '<a href="http://www.maintance.pro/admin/#/o_management?Id='+
                            res.data.table[i].Id+
                            '">查看详情</a>' ;

          marker.on('click', markerClick);
          marker.emit('click', {target: marker});
        }

        function markerClick(e) {
          infoWindow.setContent(e.target.content);
          infoWindow.open(map, e.target.getPosition());
        }
        map.setFitView();
        map.setZoom(10);
        map.setZoomAndCenter(12, [121.6292529148, 31.2035397816]);
        // map.setCenter(121.6292529148,31.2035397816)
        // console.log(window.location.href.split("?")[1].split("=")[1],'a参数')
      }).catch(res => {
        // this.$Message.error('请求超时,请稍后再试...');
      });

    }
  }
</script>

<style>
  #container {
    width: 100%;
    height: 600px;
  }

</style>
