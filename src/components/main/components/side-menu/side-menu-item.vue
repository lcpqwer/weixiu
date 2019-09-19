<template>
  <Submenu :name="`${parentName}`">
    <template slot="title">
      <common-icon :type="parentItem.icon || ''"/>
      <!--他们的名字-->
      <span>{{ showTitle(parentItem) }}</span>
    </template>
    <template v-for="item in children">
      <!-- 下面是菜单里面的子菜单-->
      <template v-if="item.children && item.children.length === 1">
        <side-menu-item v-if="showChildren(item)" :key="`menu-${item.name}`" :parent-item="item"></side-menu-item>
        <menu-item v-else :name="getNameOrHref(item, true)" :key="`menu-${item.children[0].name}`"><common-icon :type="item.children[0].icon || ''"/><span>{{ showTitle(item.children[0]) }}</span></menu-item>
      </template>
      <template v-else>
        <side-menu-item v-if="showChildren(item)" :key="`menu-${item.name}`" :parent-item="item"></side-menu-item>
        <menu-item v-else :name="getNameOrHref(item)" :key="`menu-${item.name}`"><common-icon :type="item.icon || ''"/><span>{{ showTitle(item) }}</span></menu-item>
      </template>
    </template>
  </Submenu>
  <!-- 上面的是控制 左侧导航栏 -- 组件  上传数据 Excel 三个的-->
</template>
<script>
import mixin from './mixin'
import itemMixin from './item-mixin'
export default {
  name: 'SideMenuItem',
  mixins: [ mixin, itemMixin ]
}
</script>
