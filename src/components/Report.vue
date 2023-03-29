<template>
  <div class="report">
    <div class="condition">
      <!-- <div class="span-container reportType">
        <span>
          {{ this.reportType }}
        </span>
      </div> -->
      <div class="span-container date" @click="showDatePick">
        <span>
          {{ this.date }}
        </span>
      </div>
    </div>
    <ve-table
      :max-height="scrollerHeight"
      :columns="columns"
      :table-data="tableData"
      :border-around="true"
      :border-x="true"
      :border-y="true"
      v-if="tableData.length > 0"
    />
    <div class="no-data" v-else>
      <span>无数据！</span>
    </div>
    <van-action-sheet v-model="showReportType" :actions="reportTypes" @select="reportTypeChange" />
    <van-calendar :min-date="minDate" :max-date="maxDate" v-model="show" @confirm="onConfirm" color="#1989fa" />
    <van-calendar
      :default-date="defaultDate"
      :min-date="minDate"
      :max-date="maxDate"
      type="range"
      v-model="showDateRange"
      @confirm="onConfirm"
      color="#1989fa"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getStatus } from '@/api/project.js'
export default {
  data() {
    return {
      cellSpanOption: {
        bodyCellSpan: this.bodyCellSpan
      },
      columns: [
        {
          field: 'name',
          key: 'a',
          title: '分项名称',
          align: 'center',
          width: '20%',
          renderBodyCell: ({ row, column, rowIndex }, h) => {
            const cellData = row[column.field]
            return h(
              'div',
              {
                style: {
                  color: rowIndex === 1 || rowIndex === 3 || rowIndex === 5 || rowIndex === 8 ? '#1989fa' : '#000000d9'
                }
              },
              `${cellData}`
            )
          }
        },
        {
          field: 'count',
          key: 'b',
          title: '设计数量',
          align: 'center',
          width: '20%'
        },
        {
          field: 'todayFinish',
          key: 'c',
          title: '完成量',
          width: '20%',
          align: 'center',
          renderBodyCell: ({ row, column, rowIndex }, h) => {
            const cellData = row[column.field]
            return h(
              'div',
              {
                style: {
                  color: cellData !== 0 ? '#07c160' : '#000000d9'
                }
              },
              `${cellData}`
            )
          }
        },
        {
          field: 'finish',
          key: 'd',
          title: '累计完成',
          width: '20%',
          align: 'center'
        },
        {
          field: 'rate',
          key: 'e',
          title: '完成比例',
          width: '20%',
          align: 'center',
          renderBodyCell: ({ row, column, rowIndex }, h) => {
            let cellData = ((100 * parseInt(row['finish'])) / parseInt(row['count'])).toFixed(1)
            return h('div', {}, `${cellData}%`)
          }
        }
      ],
      tableData: [
        {
          name: '桩基',
          number: '1307',
          completed: '2',
          completedTotal: '1219',
          ratio: '93.3%'
        },
        {
          name: '承台',
          number: '476',
          completed: '0',
          completedTotal: '385',
          ratio: '81.5%'
        },
        {
          name: '桥台',
          number: '476',
          completed: '0',
          completedTotal: '3',
          ratio: '81.5%'
        },
        {
          name: '预制立柱',
          number: '649',
          completed: '0',
          completedTotal: '428',
          ratio: '82.3%'
        },
        {
          name: '现浇立柱',
          number: '649',
          completed: '1',
          completedTotal: '106',
          ratio: '82.3%'
        },
        {
          name: '预制盖梁',
          number: '318',
          completed: '2',
          completedTotal: '152',
          ratio: '76.7%'
        },
        {
          name: '现浇盖梁',
          number: '318',
          completed: '1',
          completedTotal: '45',
          ratio: '76.7%'
        },
        {
          name: '钢盖梁',
          number: '318',
          completed: '0',
          completedTotal: '47',
          ratio: '76.7%'
        },
        {
          name: '预制小箱梁',
          number: '1325',
          completed: '0',
          completedTotal: '806',
          ratio: '69.4%'
        },
        {
          name: '现浇箱梁',
          number: '1325',
          completed: '0',
          completedTotal: '10',
          ratio: '69.4%'
        },
        {
          name: '钢箱梁',
          number: '1325',
          completed: '0',
          completedTotal: '25',
          ratio: '69.4%'
        },
        {
          name: '钢混叠合梁',
          number: '1325',
          completed: '0',
          completedTotal: '78',
          ratio: '69.4%'
        },
        {
          name: '铺装',
          number: '138',
          completed: '0',
          completedTotal: '0',
          ratio: '0%'
        },
        {
          name: '伸缩缝',
          number: '149',
          completed: '0',
          completedTotal: '0',
          ratio: '0%'
        }
      ],
      reportType: '分项报表',
      reportTypes: [{ name: '分项报表' }],
      minDate: new Date(2010, 0, 1),
      maxDate: new Date(),
      date: this.moment(new Date()).format('YYYY年MM月DD日'),
      lastDate: this.moment(new Date()).format('YYYY年MM月DD日'),
      lastRangeDate:
        this.moment(new Date())
          .subtract(1, 'days')
          .format('MM月DD日') +
        ' - ' +
        this.moment(new Date()).format('MM月DD日'),
      show: false,
      showDateRange: false,
      showReportType: false,
      defaultDate: [new Date(this.moment(new Date()).subtract(1, 'days')), new Date()],
      startTime: this.moment(new Date())
        .subtract(7, 'days')
        .format('YYYY-MM-DD HH:mm:SS'),
      endTime: this.moment(new Date()).format('YYYY-MM-DD HH:mm:SS')
    }
  },
  computed: {
    ...mapGetters(['currentProject']),
    scrollerHeight: function() {
      return window.innerHeight - 134 + 'px'
    }
  },
  // watch: {
  //   currentProject: function(value) {
  //     this.getData(value)
  //   }
  // },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.reportTypeChange({ name: '分项报表' })
      this.getData()
    },
    getData() {
      console.log(this.currentProject.value);
      let type = this.currentProject.value
      getStatus({
        type: 1,
        sttime: this.startTime,
        endtime: this.endTime
      }).then(data => {
        console.log(data,type);
        this.tableData = data[type] || []
        console.log(this.tableData);
      })
    },
    showDatePick() {
      if (this.reportType === '分项报表') {
        this.showDateRange = true
      } else {
        this.show = true
      }
    },
    onConfirm(date) {
      if (date instanceof Array) {
        const [start, end] = date
        this.date = this.moment(start).format('MM月DD日') + ' - ' + this.moment(end).format('MM月DD日')
        this.showDateRange = false
        this.lastRangeDate = this.date
        this.startTime = this.moment(start).format('YYYY-MM-DD HH:mm:SS')
        this.endTime = this.moment(end).format('YYYY-MM-DD HH:mm:SS')
        this.getData()
      } else {
        this.date = this.moment(date).format('YYYY年MM月DD日')
        this.show = false
        this.lastDate = this.date
      }
    },
    reportTypeChange(item) {
      this.showReportType = false
      this.reportType = item.name
      this.date = this.reportType === '分项报表' ? this.lastRangeDate : this.lastDate
    },
    // body cell span
    bodyCellSpan({ row, column, rowIndex }) {
      // rowspan
      if (column.field === 'number' || column.field === 'ratio') {
        if (rowIndex === 1) {
          return {
            rowspan: 2,
            colspan: 1
          }
        }
        // does not need to be rendered
        else if (
          rowIndex === 2 ||
          rowIndex === 4 ||
          rowIndex === 6 ||
          rowIndex === 7 ||
          rowIndex === 9 ||
          rowIndex === 10 ||
          rowIndex === 11
        ) {
          return {
            rowspan: 0,
            colspan: 0
          }
        } else if (rowIndex === 3) {
          return {
            rowspan: 2,
            colspan: 1
          }
        } else if (rowIndex === 5) {
          return {
            rowspan: 3,
            colspan: 1
          }
        } else if (rowIndex === 8) {
          return {
            rowspan: 4,
            colspan: 1
          }
        }
      }
    }
  }
}
</script>
<style lang="scss">
.report {
  margin: 12px 0;
  .ve-table table.ve-table-content thead.ve-table-header tr.ve-table-header-tr th.ve-table-header-th {
    background-color: #6c9ac7 !important;
    padding: 0.26667rem;
    font-weight: 500;
    color: #ffffff !important;
    font-size: 12px !important;
  }
  .ve-table table.ve-table-content tbody.ve-table-body tr.ve-table-body-tr td.ve-table-body-td,
  .ve-table table.ve-table-content tbody.ve-table-body tr.ve-table-expand-tr td.ve-table-body-td,
  .ve-table table.ve-table-content tbody.ve-table-body tr.ve-table-body-tr td.ve-table-expand-td,
  .ve-table table.ve-table-content tbody.ve-table-body tr.ve-table-expand-tr td.ve-table-expand-td {
    background-color: #fff;
    color: #000000d9;
    height: inherit;
    font-size: 12px !important;
  }
  .ve-table .ve-table-container.ve-table-border-around .ve-table-border-y th.ve-table-last-column,
  .ve-table .ve-table-container.ve-table-border-around .ve-table-border-y td:last-child {
    border-right: 1px solid #eee !important;
  }
  .no-data {
    height: 60px;
    width: 100%;
    line-height: 60px;
    text-align: center;
  }
  .condition {
    height: 38px;
    line-height: 38px;
    text-align: center;
    font-size: 14px;
    width: 100%;
      background-color: white;
    .span-container {
      position: relative;
      border: 1px solid $active-color;
      border-radius: 5px;
      height: 26px;
      line-height: 26px;
      margin-top: 6px;
      span {
        float: left;
        margin-left: 10px;
      }
    }
    .reportType {
      float: left;
      margin-left: 10px;
      width: 120px;
      background-color: $active-color;
      color: white;
      border: none;
    }
    .date {
      float: right;
      margin-right: 10px;
      width: 200px;
    }
    .span-container::after {
      position: absolute;
      top: 50%;
      right: 10px;
      margin-top: -5px;
      border: 3px solid;
      border-color: transparent transparent #dcdee0 #dcdee0;
      -webkit-transform: rotate(-45deg);
      transform: rotate(-45deg);
      opacity: 0.8;
      content: '';
    }
  }
}
</style>
