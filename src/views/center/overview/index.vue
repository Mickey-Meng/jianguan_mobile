<template>
  <div class="wrapper" :style="{ height: scrollerHeight }">
    <div class="header common-card">{{data.projectName}}</div>
    <div class="content">
      <div class="content-left common-card">
        <div class="title">项目进度安排</div>
        <ul>
          <li>
            <div class="quarter"><span>一季度</span><img :src="require(`assets/image/sgawg.png`)" alt="" /></div>
            <div class="text">
              季末累计完成：{{data.firstQuarter}}
            </div>
          </li>
          <li>
            <div class="quarter"><span>二季度</span><img :src="require(`assets/image/sgawg.png`)" alt="" /></div>
            <div class="text">
              季末累计完成：{{data.secondQuarter}}
            </div>
          </li>
          <li>
            <div class="quarter"><span>三季度</span><img :src="require(`assets/image/sgawg.png`)" alt="" /></div>
            <div class="text">
              季末累计完成：{{data.thirdQuarter}}
            </div>
          </li>
          <li>
            <div class="quarter"><span>四季度</span><img :src="require(`assets/image/sgawg.png`)" alt="" /></div>
            <div class="text">
              季末累计完成：{{data.fourthQuarter}}
            </div>
          </li>
        </ul>
      </div>
      <div class="content-right">
        <div class="content-right-top common-card">
          <div class="title">投资项目概况</div>
          <div class="text-content">
            <div class="small-title">建设内容和开竣工时间</div>
            <div class="small-text about-text">
              <p>
                {{data.investmentProjectOverview}}
              </p>
            </div>
          </div>
        </div>
        <div class="content-right-bottom common-card">
          <div class="title">项目保障措施</div>
          <div class="card-content">
            <div>
              <div class="s-title">压实责任</div>
              <ul style="min-height:8rem!important;height:unset !important">
                <li>
                  <span>建设单位:</span>
<!--                  <span>池州乌沙港口运输有限公司</span>-->
                  <span>{{data.builddpt}}</span>
                </li>
                <li>
                  <span>设计单位:</span
                  ><span>{{data.desgindpt}}</span>
                </li>

                <li>
                  <span>管理单位:</span
                  ><span>{{data.managedpt}}</span>
                </li>
                <li>
                  <span>施工单位：</span
                  ><span
                >{{data.constructdpt}}</span
                >
                </li>
                <li>
                  <span>监理单位：</span>
                  <span>{{data.supervisordpt}}</span>
                </li>
                <li>
                  <span>审计单位：</span>
                  <span>{{data.auditUnit}}</span>
                </li>
              </ul>
            </div>
            <div>
              <div class="s-title">落实保障</div>
              <div class="s-content">
                {{data.implementGuarantee}}
              </div>
            </div>
            <div>
              <div class="s-title">抓实进度</div>
              <div class="s-content">
                {{data.graspTheProgress}} 
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getProjectDetail } from '@/api/project.js'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      data: {}
    }
  },
  computed: {
    scrollerHeight: function() {
      return window.innerHeight - 82 + 'px'
    },
    ...mapGetters(['curProject'])
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      getProjectDetail({projectId: this.curProject.child[0].id}).then(data => {
        this.data = data;
      })
    },
  }  
}
</script>

<style scoped lang="scss">
.wrapper {
  color: #4a4a4a;
  height: 100%;
  font-size: 16px;
  overflow-y: auto;
  .header {
    background-color: white;
    text-align: center;
    color: #333333;
    font-size: 18px;
    font-weight: bold;
    padding: 10px;
  }
  .content {
    height: calc(100% - 100px);
    .content-left {
      background-color: #fff;
      padding: 10px;
      .title {
        font-size: 16px;
        color: #333;
        font-weight: bold;
        margin-bottom: 10px;
      }
      ul {
        li {
          display: flex;
          justify-content: space-between;
          margin: 5px 0;
          height: 130px;
          background-color: #ebecee;
          border-radius: 5px;
          .quarter {
            width: 25%;
            display: flex;
            justify-content: center;
            align-items: center;
            img {
              margin-left: 5px;
            }
          }
          .text {
            width: 73%;
            display: flex;
            align-items: center;
            line-height: 25px;
          }
        }
      }
    }
    .content-right {
      padding-bottom: 2px;
      .content-right-top {
        height: 39%;
        background-color: #ffffff;
        padding: 10px;
        .title {
          font-size: 16px;
          color: #333;
          font-weight: bold;
          margin-bottom: 10px;
        }
        .text-content {
          width: 100%;
          height: calc(100% - 35px);
          background-color: #ebecee;
          border-radius: 5px;
          .small-title {
            height: 50px;
            line-height: 50px;
            font-size: 16px;
            font-weight: 600;
            color: #555;
            text-align: center;
            margin-top: 10px;
          }
          .target-text {
            text-indent: 2em;
            height: calc(40% - 30px);
          }
          .small-text {
            padding: 0 10px 10px 10px;
            overflow: auto;
            letter-spacing: 1px;
            p {
              margin: 0;
              text-indent: 2em;
            }
          }
        }
      }
      .content-right-bottom {
        padding: 10px;
        height: 59%;
        background-color: #ffffff;
        .title {
          font-size: 16px;
          color: #333;
          font-weight: bold;
          margin-bottom: 10px;
        }
        .card-content {
          margin-top: 10px;
          height: calc(100% - 40px);
          > div {
            .s-title {
              background-color: #387afd;
              color: #fff;
              height: 30px;
              text-align: center;
              line-height: 30px;
              border-radius: 5px;
              margin-bottom: 5px;
              margin-top: 10px;
            }
            ul {
              height: 300px;
              background-color: #ebecee;
              border-radius: 5px;
              padding: 10px;
              li {
                margin: 10px 0;
                display: flex;
                align-items: center;
                span:first-of-type {
                  width: 35%;
                }
                span:last-of-type {
                  width: 65%;
                  line-height: 25px;
                }
              }
            }
            .s-content {
              height: 300px;
              background-color: #ebecee;
              border-radius: 5px;
              padding: 10px;
              line-height: 25px;
              text-indent: 2em;
            }
          }
        }
      }
    }
  }
}
</style>
