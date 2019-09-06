<template>
  <div>
    <el-card>
      <div class="login_header_title">
        <a href="javascript:;" :class="{on: loginWay}" @click="jump">查宝贝</a>
        <a href="javascript:;" :class="{on: !loginWay}" @click="jump">查排名</a>
      </div>
      <el-row class="login_content">
        <form>
          <div :class="{on: loginWay}">
            <span>宝贝链接/ID</span>
            <input
              type="text"
              placeholder="请输入宝贝链接/ID"
              v-model.lazy="id"
              @keyup.enter="handleClick"
            />
            <el-button type="primary" icon="el-icon-search" @click="handleClick(0)">搜索</el-button>
          </div>
          <div :class="{on: !loginWay}">
            <span>宝贝链接/ID</span>
            <input
              type="text"
              placeholder="请输入商品ID或链接/口令"
              v-model.lazy="id"
              @keyup.enter="handleClick"
            />
            <el-button type="primary" icon="el-icon-search" @click="handleClick(1)">搜索</el-button>
          </div>
        </form>
      </el-row>
    </el-card>
    <!-- echarts 商品信息-->
    <el-card class="cards" v-show="isSearch && loginWay" v-loading="loading">
      <el-row class="login_header_title cards">
        <!-- <span :class="{on: loginWay}">商品信息</span> -->
        <el-divider content-position="left">
          <span class="divider_text">商品信息</span>
        </el-divider>
        <el-col>
          <div class="goods_img">
            <img :src="goodsInfo.images" alt />
          </div>
          <div class="goods_content">
            <p>
              <span>商品标题：</span>
              {{goodsInfo.goods_title}}
            </p>
            <p>
              <span>店铺名：</span>
              {{goodsInfo.shop_name}}
            </p>
            <p>
              <span>价格：</span>
              {{goodsInfo.price}}
            </p>
          </div>
        </el-col>
      </el-row>
      <!-- 表格数据 -->
      <el-divider content-position="left" class="divider">
        <span class="divider_text">数据分析</span>
      </el-divider>
      <div ref="main" id="main" style="width:1000px;height:500px;top:30px; margin: 20px auto 50px;"></div>
      <el-divider content-position="left" :style="{'margin-top': '60px' }">
        <span class="divider_text">搜索结果</span>
      </el-divider>
      <span
        class="el-icon-download"
        style="float: right;cursor:pointer;"
        title="导出表格"
        @click="export2Excel(0)"
      >导出表格</span>
      <el-table :data="goodsIng" stripe style="width: 100%" class="tables" id="goods">
        <el-table-column prop="time" label="日期" width="180" align="center"></el-table-column>
        <el-table-column prop="visitor_num" label="访客数" width="180" align="center"></el-table-column>
        <el-table-column prop="buyers_num" label="支付卖家" align="center"></el-table-column>
        <el-table-column prop="trade_amount" label="交易金额" width="180" align="center"></el-table-column>
        <el-table-column prop="uvjz" label="uv价值" width="180" align="center"></el-table-column>
        <el-table-column prop="conversion" label="支付转换率" align="center"></el-table-column>
        <el-table-column prop="kdj" label="平均客单价" align="center"></el-table-column>
      </el-table>
      <!-- 表格分页 -->
      <el-pagination
        @size-change="handleGoodsSizeChange"
        @current-change="handleGoodsCurrentChange"
        :current-page="g_current"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="g_size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="g_total"
        class="pagination"
      ></el-pagination>
    </el-card>
    <!-- 查排名 -->
    <el-card class="cards" v-show=" !loginWay && isSearch " v-loading="loadingCard">
      <el-divider content-position="left">
        <span class="divider_text">搜索结果</span>
      </el-divider>
      <el-radio-group v-model="type" @change="handleTypeChange">
        <el-radio-button label="1">APP无线端</el-radio-button>
        <el-radio-button label="2">PC综合</el-radio-button>
        <el-radio-button label="3">无线直通车</el-radio-button>
        <el-date-picker
          v-model="time"
          align="right"
          type="date"
          placeholder="选择日期"
          class="picker"
          @change="handlePickerChange"
        ></el-date-picker>
      </el-radio-group>
      <i
        class="el-icon-download"
        style="float: right;cursor:pointer;"
        title="导出表格"
        @click="export2Excel(1)"
      ></i>
      <el-table
        :data="goodsRanking.data"
        stripe
        style="width: 100%"
        class="tables"
        v-loading="loading"
      >
        <el-table-column prop="key_wod" label="关键词" align="center"></el-table-column>
        <el-table-column prop="digit" label="排名" align="center"></el-table-column>
      </el-table>
      <el-pagination
        background
        @current-change="handleCurrentChange"
        layout="prev, pager, next"
        :page-count="pageCount"
        class="pagination"
      ></el-pagination>
    </el-card>
  </div>
</template>
<script>
// 引入 echarts
import echarts from "echarts";
import { getSign } from "@/util";
import fileSaver from "file-saver";
import xlsx from "xlsx";
export default {
  data() {
    return {
      loginWay: true,
      isSearch: false,
      id: "",
      goodsInfo: "",
      goodsIndex: [],
      goodsIng: [],
      type: "1",
      goodsRanking: "",
      pageSize: 10,
      pageCount: 1,
      loading: false,
      time: "",
      loadingCard: false,
      preId: "",
      g_current: 1,
      g_size: 10,
      g_total: 0
    };
  },
  methods: {
    // 控制跳转
    jump() {
      this.loginWay = !this.loginWay;
      if (this.id !== "") {
        if (this.loginWay) this.handleClick(0);
        else this.handleClick(1);
      }
    },
    // 获取用户信息
    getUserInfo() {
      const { uid, token, sign } = this.$store.state;
      this.$http
        .post("/user/getUserInfo", {
          uid,
          token,
          sign
        })
        .then(res => {
          console.log(res);
        });
    },
    // 查找指定宝贝
    async handleClick(flag) {
      if (
        this.preId === this.id &&
        this.goodsInfo != "" &&
        this.goodsRanking != ""
      )
        return;
      this.loadingCard = true;
      const { uid, token } = this.$store.state;
      let goods_url = this.id;
      // let goods_url = "23883488910";
      this.loading = true;
      if (flag === 0) {
        this.preId = this.id;
        let sign = getSign({ uid, token, goods_url });
        let { data } = await this.$http.post("/api/getGoodsQuota", {
          uid,
          token,
          sign,
          goods_url
        });
        if (data.code === 200) {
          this.goodsInfo = data.data.goods_info;
          this.goodsIndex = data.data.goods_index;
          this.goodsPagination();
          this.isSearch = true;
          this.loadingCard = false;
          this.loading = false;
          this.$nextTick(() => {
            this.drawEcharts();
          });
        } else {
          alert(data.msg);
        }
      } else {
        this.preId = this.id;
        await this.getRanking();
      }
    },
    // 排行中Type改变
    handleTypeChange(type) {
      this.getRanking(1, type);
    },
    // 画图
    drawEcharts() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(this.$refs.main);
      let goodsIndex = this.goodsIndex;
      let trade_amount = [];
      let visitor_num = [];
      let buyers_num = [];
      let conversion = [];
      let uvjz = [];
      let timeArray = [];
      goodsIndex.forEach( el => {
        timeArray.unshift(el.time)
        trade_amount.unshift(el.trade_amount)
        visitor_num.unshift(el.visitor_num)
        buyers_num.unshift(el.buyers_num)
        conversion.unshift(el.conversion)
        uvjz.unshift(el.uvjz)
      })
      let option = {
        title: {
          text: "数据分析"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985"
            }
          }
        },
        legend: {
          data: ["交易金额", "访客人数", "支付人数", "支付转化率", "uv价值"]
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: timeArray
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "交易金额",
            type: "line",
            // stack: "总量",
          
            data: trade_amount
          },
          {
            name: "访客人数",
            type: "line",
            // stack: "总量",
           
            data: visitor_num
          },
          {
            name: "支付人数",
            type: "line",
            // stack: "总量",
         
            data: buyers_num
          },
          // {
          //   name: "支付件数",
          //   type: "line",
          //   stack: "总量",
          //   areaStyle: { normal: {} },
          //   data: [320, 332, 301, 334, 390, 330, 320]
          // },
          {
            name: "支付转化率",
            type: "line",
            // stack: "总量",
            label: {
              normal: {
                show: true,
                position: "top"
              }
            },
            areaStyle: { normal: {} },
            data: conversion
          },
          {
            name: "uv价值",
            type: "line",
            // stack: "总量",
            label: {
              normal: {
                show: true,
                position: "top"
              }
            },
            areaStyle: { normal: {} },
            data: uvjz
          }
        ]
      };
      // 初始化
      myChart.setOption(option);
    },
    // 日期选择器
    async handlePickerChange(time) {
      time = new Date(time).toLocaleDateString();
      await this.getRanking(1, this.type, time);
    },
    // 当前页码改变 Ranking
    async handleCurrentChange(size) {
      await this.getRanking(size);
    },
    // 初始化 Ranking的分页
    pagination() {
      this.pageSize = this.goodsRanking.data.length;
      this.pageCount = this.goodsRanking.page_total;
    },
    async getRanking(
      page = 1,
      type = 1,
      date = new Date().toLocaleDateString()
    ) {
      this.loadingCard = false;
      let goods_url = this.id;
      let time = date.replace(/\//g, "-");
      this.loading = true;
      // let goods_url = "23883488910";
      const { uid, token } = this.$store.state;
      let sign = getSign({ uid, token, goods_url, type, page, time });
      let { data } = await this.$http.post("/api/getKeyWordRanking", {
        uid,
        token,
        sign,
        goods_url,
        type,
        page,
        time
      });
      this.loading = false;
      if (data.code === 200) {
        this.goodsRanking = data.data;
        this.pagination();
        document.documentElement.scrollTop = 0;
        this.isSearch = true;
      } else {
        console.log(data.msg);
      }
    },
    // goods 页码大小改变
    handleGoodsSizeChange(size) {
      this.g_size = size;
      this.loading = true;
      this.goodsIng = this.goodsIndex.slice(0, size);
      this.loading = false;
    },
    // goods 当前页码改变
    handleGoodsCurrentChange(page) {
      this.g_current = page;
      this.loading = true;
      console.log(
        (page - 1) * this.g_size,
        (page - 1) * this.g_size + this.g_size
      );
      this.goodsIng = this.goodsIndex.slice(
        (page - 1) * this.g_size,
        (page - 1) * this.g_size + this.g_size
      );
      this.loading = false;
    },
    // goods 初始化分页数据
    goodsPagination() {
      this.g_total = this.goodsIndex.length;
      this.goodsIng = this.goodsIndex.slice(0, this.g_size);
    },
    exportTable() {
      let box = xlsx.utils.table_to_book(document.querySelector("#goods"));
      let out = xlsx.write(box, {
        bookType: "xlsx",
        bookSST: true,
        type: "array"
      });
      try {
        fileSaver.saveAs(
          new Blob([out], {
            type: "application/octet-stream"
          }),
          "sheet.xlsx"
        );
      } catch (e) {
        // 错误处理方式
      }
      return out;
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]));
    },
    export2Excel(type) {
      if (!type) {
        require.ensure([], () => {
          const { export_json_to_excel } = require("../../vendor/Export2Excel");
          const tHeader = [
            "日期",
            "访客数",
            "支付买家数",
            "交易金额",
            "uv价值",
            "支付转换率",
            "平均客单价"
          ];
          const filterVal = [
            "time",
            "visitor_num",
            "buyers_num",
            "trade_amount",
            "uvjz",
            "conversion",
            "kdj"
          ];
          const list = this.goodsIndex;
          const data = this.formatJson(filterVal, list);
          export_json_to_excel(tHeader, data, "商品数据");
        });
      } else {
         require.ensure([], () => {
        const {
          export_json_to_excel
        } = require("../../vendor/Export2Excel");
        const tHeader = [
          "关键词",
          "排名"
        ];
        const filterVal = [
          "key_wod",
          "digit"
        ];
        const list = this.goodsRanking.data;
        const data = this.formatJson(filterVal, list);
        export_json_to_excel(tHeader, data, "商品排名");
      });
      }
    }
  },
  mounted() {
    let { params } = this.$route;
    if (JSON.stringify(params) !== "{}") {
      this.id = params.id;
      if (params.type) this.loginWay = !this.loginWay;
      this.handleClick(params.type);
    }
  }
};
</script>
<style scoped>
.tabs {
  /* height: 162px; */
  margin: 0 80px;
  text-align: center;
}
.tabs .el_naw::after {
  width: 20px;
}
.login_header .login_header_title {
  text-align: center;
  padding-top: -4px;
}
.login_header_title a {
  text-decoration: none;
  font-size: 14px;
  color: #333;
  padding-bottom: 4px;
}
.login_header_title a:first-child {
  margin-right: 40px;
}
.login_header_title a.on {
  color: #409eff;
  font-weight: bolder;
  border-bottom: 2px solid #409eff;
}
.login_header_title span.on {
  color: #409eff;
  font-weight: bolder;
  border-bottom: 2px solid #409eff;
  padding-bottom: 8px;
}
.login_content form div {
  display: none;
}
.login_content form div.on {
  height: 100%;
  display: block;
}
.login_content form input {
  width: 50%;
  height: 40px;
  border: 1px solid #ddd;
  border-radius: 4px;
  outline: none;
  padding-left: 15px;
  /* margin-top: 20px;
  margin-left: 10px; */
  margin: 20px 10px;
  box-sizing: border-box;
}
.login_content form input:focus {
  border: 1px solid #409eff;
}
.cards {
  margin-top: 20px;
  /* height: 1000px; */
}
.tables {
  margin-top: 30px;
}
.divider {
  margin-bottom: 30px;
  margin-top: 60px;
}
.divider_text {
  font-size: 24px;
  font-family: "微软雅黑", sans-serif;
  letter-spacing: 2.8px;
  font-weight: 400;
  color: #409eff;
}
/* 图片样式 */
.goods_img {
  width: 140px;
  height: 160px;
  overflow: hidden;
  float: left;
  margin-right: 20px;
}
.goods_img img {
  width: 100%;
}
.goods_content span {
  color: #444;
  font-weight: 600;
}
.pagination {
  margin-top: 24px;
  margin-bottom: 24px;
  /* margin-left: calc(50% - 100px) !important; */
  float: right;
}
.picker {
  top: 5px;
  left: 30px;
}
</style>