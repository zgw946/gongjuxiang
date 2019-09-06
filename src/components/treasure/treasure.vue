<template>
  <div class="mycon">
    <el-container>
      <el-header class="headers">
        <tophead />
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu class="mymenu" :router="true" :default-openeds="['1', '3']">
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-message"></i>
                <span>商品透视</span>
              </template>
              <!-- 添加子选项 -->
              <el-menu-item index="treasure_main">
                <span>查宝贝</span>
              </el-menu-item>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-menu"></i>验号工具
              </template>
              <el-menu-item-group>
                <el-menu-item index="2-1">查黑号</el-menu-item>
                <el-menu-item index="2-2">标签权重评分</el-menu-item>
                <el-menu-item index="2-2">查淘客订单</el-menu-item>
                <el-menu-item index="2-2">查微信</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-setting"></i>关键词透视
              </template>
              <el-menu-item-group>
                <el-menu-item index="3-1">查关键词</el-menu-item>
                <el-menu-item index="3-2">类目蓝海词</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="4">
              <template slot="title">
                <i class="el-icon-setting"></i>卡首屏
              </template>
              <el-menu-item-group>
                <el-menu-item index="4-1">猜你喜欢淘口令</el-menu-item>
                <el-menu-item index="4-2">关键词淘口令</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="5">
              <template slot="title">
                <i class="el-icon-setting"></i>个人中心
              </template>
              <el-menu-item-group>
                <el-menu-item index="5-1">收益中心</el-menu-item>
                <el-menu-item index="5-2">提现记录</el-menu-item>
                <el-menu-item index="5-3">我的团队</el-menu-item>
                <el-menu-item index="5-4">查询记录</el-menu-item>
                <el-menu-item index="5-5">常见问题</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>
          <!-- 内容主体部分 -->
          <!-- 添加一个路由 -->
          <router-view></router-view>
         
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
// 引入头部组件、
import tophead from "../layout/tophead/tophead";
export default {
  data() {
    return {};
  },
  components: {
    tophead
  }
};
</script>
<style scoped>
.el-footer,
header {
  background-color: #f2f2f2;
  color: #333;
  /* text-align: center; */
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  /* text-align: center; */
  line-height: 200px;
  height: 100%;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  height: 100%;
  /* text-align: center; */
  /* line-height: 160px; */
}

.el-container {
  height: 100%;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
.mycon {
  height: 100%;
}
.headers {
  padding: 0;
}
.submenus {
  height: 100%;
}
.mymenu {
  height: 100%;
}

</style>