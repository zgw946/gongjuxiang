<template>
  <div class="tophead">
    <el-row class="rows">
      <el-col :span="7">
        <div class="grid-content bg-purple">
          <span class="el-dropdown-link fo_se">掌柜工具箱</span>
          <span class="el-dropdown-link shake">让你当甩手掌柜</span>
        </div>
      </el-col>
      <el-col :span="1.9">
        <div class="grid-content bg-purple-light rows fluoroscopy">
          <el-dropdown>
            <span class="el-dropdown-link rows" @click="gofirst">
              商品透视
              <i class="el-icon-caret-bottom"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>查宝贝</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-col>
      <el-col :span="1.9">
        <div class="grid-content bg-purple">
          <el-dropdown>
            <span class="el-dropdown-link rows">
              验号查询
              <i class="el-icon-caret-bottom"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>查黑号</el-dropdown-item>
              <el-dropdown-item>旺旺标签权重</el-dropdown-item>
              <el-dropdown-item>查淘宝订单</el-dropdown-item>
              <el-dropdown-item>查微信</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-col>
      <el-col :span="1.9">
        <div class="grid-content bg-purple">
          <el-dropdown>
            <span class="el-dropdown-link rows">
              关键词透视
              <i class="el-icon-caret-bottom"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>查关键词</el-dropdown-item>
              <el-dropdown-item>查排名</el-dropdown-item>
              <el-dropdown-item>类目蓝海词</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-col>
      <el-col :span="1.9">
        <div class="grid-content bg-purple">
          <el-dropdown>
            <span class="el-dropdown-link rows">
              卡首屏
              <i class="el-icon-caret-bottom"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>猜你喜欢淘口令</el-dropdown-item>
              <el-dropdown-item>关键词淘口令</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-col>
      <el-col :span="1.9">
        <div class="grid-content bg-purple">
          <el-dropdown>
            <span class="el-dropdown-link rows">
              vip特权中心
              <i class="el-icon-caret-bottom"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>甩手掌柜</el-dropdown-item>
              <el-dropdown-item>超级掌柜</el-dropdown-item>
              <el-dropdown-item>普通掌柜</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-col>

      <el-col :span="1.5">
        <div class="grid-content bg-purple">
          <el-dropdown>
            <span class="el-dropdown-link rows">
              个人中心
              <i class="el-icon-caret-bottom"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>收益中心</el-dropdown-item>
              <el-dropdown-item>我的团队</el-dropdown-item>
              <el-dropdown-item>查询记录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-col>
      <el-col :span="2" :offset="1">
        <!-- login登入 -->
        <Login />
      </el-col>
    </el-row>
  </div>
</template>
<script>
import Login from "../../login/login";
export default {
  data() {
    return {
      data() {
        return {};
      }
    };
  },
  methods: {
    gofirst() {
      this.$router.push({ path: "/treasure_main" });
    }
  },
  components: {
    Login
  }
};
</script>

<style scoped>
.rows {
  /* background-color: #b3c0d1; */
  padding: 0 15px;
}
/* 导航栏样式 */
.el-dropdown-link:hover {
  cursor: pointer;
  color: #409eff;
}
.fo_se {
  font-size: 18px;
  margin-left: 70px;
}
.shake {
  margin-left: 17px;
}
.tophead{
  width: 100%;
}
</style>