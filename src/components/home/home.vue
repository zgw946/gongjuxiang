<template>
  <div class="mycon">
    <el-container>
      <!-- 头部区域 -->
      <el-header class="headers">
        <!--头部组件  -->
        <TopHead />
      </el-header>
      <!-- 内容主体区域 -->
      <el-main class="min">
        <!-- main部分 -->
        <section class="main">
          <!-- 搜索 -->
          <el-card class="cards">
            <!-- 标题名称 -->
            <span class="headline">
              <h2>甩手掌柜从此开始</h2>
            </span>
            <!-- 查询 -->
            <el-row class="headline">
              <el-radio-group v-model="searchType" @change="handleChange">
                <el-radio-button label="查宝贝" border></el-radio-button>
                <el-radio-button label="查黑号" border></el-radio-button>
                <el-radio-button label="查排名" border></el-radio-button>
              </el-radio-group>
              <!-- <el-button>查宝贝</el-button>
              <el-button>查黑号</el-button>
              <el-button>查排名</el-button>-->
            </el-row>

            <!-- input输入查询框 -->
            <div style="margin-top: 17px;">
              <el-input :placeholder="msg" v-model="input1" class="input-with-select buttn">
                <el-button slot="append" @click="handleClick">
                  <i class="el-icon-search"></i>
                </el-button>
              </el-input>
            </div>
          </el-card>
          <!-- 卡片分类区域 -->
          <el-divider class="divider">
            <span class="divider_text">运营工具</span>
          </el-divider>
          <div class="spaces">
            <!-- <el-link :underline="false" class="links"> -->
            <el-card class="fiche" shadow="hover">
              <el-link :underline="false" class="el_lk">
                <h2>商品透视</h2>
              </el-link>
              <el-link :underline="false">
                <span>全网任意商品透视</span>
              </el-link>
            </el-card>
            <el-card class="fiche" shadow="hover">
              <el-link :underline="false" class="el_lk">
                <h2>类目蓝海词</h2>
              </el-link>
              <el-link :underline="false">
                <span>透视全网蓝海优质词</span>
              </el-link>
            </el-card>
            <el-card class="fiche" shadow="hover">
              <el-link :underline="false" class="el_lk">
                <h2>关键词查询</h2>
              </el-link>
              <el-link :underline="false">
                <span>实时数据关键词数据分析</span>
              </el-link>
            </el-card>
            <el-card class="fiche" shadow="hover">
              <el-link :underline="false" class="el_lk">
                <h2>查排名</h2>
              </el-link>
              <el-link :underline="false">
                <span>实时排名</span>
              </el-link>
            </el-card>
          </div>
          <el-divider class="divider">
            <span class="divider_text">补单神器</span>
          </el-divider>
          <div class="spaces">
            <el-card class="fiche" shadow="hover">
              <el-link :underline="false" class="el_lk">
                <h2>查黑号</h2>
              </el-link>
              <el-link :underline="false">
                <span>降权,黑号查询,实时用户标签及消费能力查询</span>
              </el-link>
            </el-card>
            <el-card class="fiche" shadow="hover">
              <el-link :underline="false" class="el_lk">
                <h2>猜你喜欢淘口令</h2>
              </el-link>
              <el-link :underline="false">
                <span>流量入口专用,无需二维码即可卡你首屏</span>
              </el-link>
            </el-card>
            <el-card class="fiche" shadow="hover">
              <el-link :underline="false" class="el_lk">
                <h2>旺旺标签权重评分</h2>
              </el-link>
              <el-link :underline="false">
                <span>一单顶十单,透视精准人群</span>
              </el-link>
            </el-card>
            <el-card class="fiche" shadow="hover">
              <el-link :underline="false" class="el_lk">
                <h2>微信查询</h2>
              </el-link>
              <el-link :underline="false">
                <span>骗子,狐狸,早发现少损失</span>
              </el-link>
            </el-card>
            <!-- </el-link> -->
          </div>
        </section>
        <!-- footer区域 -->
        <el-card class="footers">
          <div class="footers_main">
            <el-row :gutter="20">
              <!-- 客服 -->
              <el-col :span="10">
                <i class="el-icon-service ics"></i>
                <!-- 联习方式 -->
                <el-col>
                  <span></span>
                  <h3 class="sn_kf">客服微信</h3>
                  <el-col class="cl_df">
                    <span class="lx_df">qq:xxxxxxxxx</span>
                    <span class="lx_df">手机:xxxxxxxxx</span>
                    <span class="lx_df">微信:xxxxxxxxx</span>
                  </el-col>
                  <el-col>
                    <h3 class="tool">掌柜工具箱 xxx.com版本所有</h3>
                  </el-col>
                </el-col>
              </el-col>
              <!-- 扫码关注 -->
              <el-col :span="4" class="avatar">
                <img
                  src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
                  alt="掌柜工具箱小程序"
                />
                <h3>掌柜工具箱小程序</h3>
              </el-col>
              <el-col :span="4" class="avatar">
                <img
                  src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
                  alt="掌柜工具箱公众号"
                />
                <h3>掌柜工具箱公众号</h3>
              </el-col>
              <el-col :span="4" class="avatar">
                <img
                  src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
                  alt="客服微信号"
                />
                <h3>客服微信号</h3>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </el-main>
    </el-container>
  </div>
</template>
<script>
// 引入头部组件
import TopHead from "../layout/tophead/tophead";
export default {
  data() {
    return {
      // 设置默认的input的输入框
      input1: "",
      searchType: "查宝贝",
      msg: "请输入宝贝链接/ID"
      // 占位扫码图片
    };
  },
  methods: {
    // gofirst:function(){
    //   this.$router.push({path:"/treasure"})
    // }
    handleClick() {
      if (this.input1 === "") {
        if (this.searchType === "查宝贝") this.$message("请输入宝贝链接/ID");
        else if (this.searchType === "查排名") this.$message("请输入关键词");
        else this.$message("请输入旺旺号");
        return;
      }
      let type = 0;
      if (this.searchType === "查宝贝") type = 0;
      else if (this.searchType === "查排名") type = 1;
      this.$router.push({
        name: "treasure_main",
        params: {
          id: this.input1,
          type
        }
      });
    },
    handleChange(el) {
      if (el === "查宝贝") this.msg = "请输入宝贝链接/ID";
      else if (el === "查排名") this.msg = "请输入关键词";
      else this.msg = "请输入旺旺号";
    }
  },
  components: {
    TopHead
  }
};
</script>
<style scoped>
.el-menu {
  background-color: rgb(179, 192, 209);
  border: 0;
}

.el-header,
.el-footer {
  background-color: #f2f2f2;
  color: #333;
  /* text-align: center; */
  line-height: 60px;
}
.el-main {
  background-color: #f6f7fb;
  color: #333;
}

.el-container {
  height: 100%;
}
/* 导航栏样式 */
.el-dropdown-link:hover {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.headline {
  text-align: center;
}
.buttn {
  width: 50%;
  margin-left: 50px;
  margin-bottom: 20px;
}
.cards {
  width: 100%;
  height: 263px;
  text-align: center;
  margin: 40px auto;
}
/* 卡片分类 */
.fiche {
  width: 20%;
  height: 170px;
  /* display: inline-block; */
  margin-top: 20px;
  margin-bottom: 20px;
}
.spaces {
  margin: 40px auto;
  text-align: center;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
}
.el_lk {
  display: block;
}
.min {
  width: 100%;
  height: 100%;
  padding: 0;
}
.links {
  text-align: center;
  /* width: 1100px; */
}
.card_height {
  height: 280px;
}
.ics {
  display: inline-block;
  font-size: 80px;
  margin: 30px 40px;
}
.sn_kf {
  display: block;
  margin: -113px 150px;
  width: 100px;
}
.lx_df {
  display: block;
  margin: 12px 149px;
}
.cl_df {
  margin: -70px 0px;
}
.tool {
  margin: 50px 50px;
}
/* main容器样式*/
.main {
  width: 80%;
  margin: 0 auto;
}
/* footer */
.footers_main {
  width: 1250px;
  margin: 0 auto;
}
/* divider 分割线样式*/
.divider {
  width: 500px;
  margin: 0 auto;
}
.divider_text {
  font-size: 28px;
  font-family: "微软雅黑", sans-serif;
  letter-spacing: 2.8px;
  font-weight: 400;
  /* color: #1469C1; */
}
/* 底部二维码样式 */
.avatar {
  text-align: center;
  margin: 30px 10px 0;
}
.avatar img {
  width: 100%;
  height: 160px;
}
</style>