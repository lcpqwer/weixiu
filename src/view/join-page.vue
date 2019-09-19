<template>
  <div>
    1231323
    <!--<div class="map">-->
      <!--<el-amap vid="amapDemo" class="amap" :center="center" :zoom="zoom">-->
        <!--<el-amap-marker :position="center" vid="amapMarker"></el-amap-marker>-->
      <!--</el-amap>-->
    <!--</div>-->
  </div>
</template>
<script>
  export default {
  name: 'join_page',
  components: { VDistpicker },
  data () {
    return {
      zoom:14,
      center:[121.6292529148,31.2035397816]
    }
  }
}
</script>

<style>
  .map {
    width: 100%;
    height: 600px;
  }

</style>
