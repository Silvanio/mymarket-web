<template>
  <div>
    <div class="product-grid-item card p-shadow-8" :class="styleFlash">
      <div class="product-grid-item-top-end ">
        <i class="fa fa-times" v-if="removeButton" v-tooltip.left="$t('track_market.lbl_remove_stock')"
           style="fontSize: 0.7rem; cursor: pointer;" @click="onCardStockRemove(item)"/>
      </div>
      <div class="product-grid-item-top">
        <div>
                <span class="product-category">
                   <div class="product-name">{{ item.codeStock }}</div>
                </span>
        </div>
        <span class="product-badge-price">
                   <div class="price status-positive">
                        <label>{{ item.price | toCurrency }}</label>
                   </div>
        </span>
        <span class="product-badge">
                   <div style="white-space: nowrap;"
                        v-bind:class="[item.priceVariationDay > 0 ? 'product-badge percent status-positive' : item.priceVariationDay < 0 ? 'product-badge percent status-negative':'product-badge percent status-zero']">
                     <i v-if="item.priceVariationDay > 0" class="fa fa-fw fa fa-arrow-up"></i>
                     <i v-if="item.priceVariationDay < 0" class="fa fa-fw fa fa-arrow-down"></i>
                     <label>{{ item.priceVariationDay | toCurrency }}%</label>
                    </div>
        </span>
      </div>
      <div class="product-grid-item-top">
        <div>
                <span class="product-category">
                   <div class="product-description" style="white-space: nowrap;">{{ item.stock.name }}</div>
                </span>
        </div>

      </div>
      <apexchart style="margin-left: -15px; margin-top: -23px;margin-bottom: -9px;" v-if="chartVisible" type="area"
                 height="100" :options="getChartOptions(item)" :series="getSeries(item)"/>
      <hr class="separator" v-if="!chartVisible">
      <div class="p-grid  p-justify-center ">
        <div class="p-col-6 p-md-6">
          <div class="p-inputgroup" style="height: 21px;">
            <span class="p-inputgroup-addon" style="font-weight: 800; font-size: 12px; ">MIN</span>
            <InputText :placeholder="item.low | toCurrency" disabled style="font-weight: 600; font-size: 12px;"/>
          </div>
        </div>

        <div class="p-col-6 p-md-6">
          <div class="p-inputgroup" style="height: 21px;">
            <span class="p-inputgroup-addon" style="font-weight: 800; font-size: 12px; ">MAX</span>
            <InputText :placeholder="item.high | toCurrency" disabled style="font-weight: 600; font-size: 12px;"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";

export default {
  name: "card-stock",
  props: {
    chartVisible: Boolean,
    removeButton: Boolean,
    item: Object
  },
  data() {
    return {
      styleFlash: '',
    }
  },
  mounted() {
    const vm = this;
    Vue.prototype.$socketstock.$on("STOCK_QUOTE", function (message, event) {
      if (message.codeStock === vm.item.codeStock) {
        if (vm.item.priceVariationDay > message.priceVariationDay) {
          vm.styleFlash = 'stock-down';
        }

        if (vm.item.priceVariationDay < message.priceVariationDay) {
          vm.styleFlash = 'stock-up';
        }
        vm.item.price = message.price;
        vm.item.priceVariationDay = message.priceVariationDay;
        vm.item.low = message.low;
        vm.item.high = message.high;

        this.refreshFlash = setTimeout(() => {
          vm.styleFlash = '';
        }, 1000)
      }
      if (event) {
        event.preventDefault();
      }
    });
  },

  methods: {
    onCardStockRemove(item) {
      this.$emit('card-stock-delete', item);
    },
    getSeries: function (stock) {
      let priceList = [];
      if (stock.stockHistoricalDataList) {
        stock.stockHistoricalDataList.forEach(function (value) {
          priceList.push(value.close)
        });
      }
      let series = [{
        name: this.$t('track_market.lbl_price'),
        data: priceList
      }];
      return series;
    },

    getChartOptions: function (stock) {

      let dataList = [];

      if (stock.stockHistoricalDataList) {
        stock.stockHistoricalDataList.forEach(function (value) {
          dataList.push(value.dateQuote)
        });
      }
      let colorChart = stock.priceVariationDay > 0 ? '#256029' : stock.priceVariationDay < 0 ? '#c63737' : '#4599ec';
      let colorChatList = [];
      colorChatList.push(colorChart);
      let options = {
        noData: {
          text: this.$t('track_market.msg_chart_available'),
          align: 'center',
          verticalAlign: 'middle',
          offsetX: 0,
          offsetY: 0,
          style: {
            color: '#e9ecef',
            fontSize: '14px',
          }
        },
        chart: {
          parentHeightOffset: 0,
          toolbar: {
            show: false,
          },
        },
        colors: colorChatList,
        grid: {
          show: false,
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: 'smooth',
          width: 2
        },
        xaxis: {
          tooltip: {
            enabled: false,
          },
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
          labels: {
            show: false
          },
          type: 'datetime',
          categories: dataList
        },
        yaxis: {
          tooltip: {
            enabled: false,
          },
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
          labels: {
            show: false
          },
        },
        tooltip: {
          x: {
            show: true,
            format: 'dd/MM/yyyy'
          },
        },

      };
      return options;
    },
  }
}
</script>

<style scoped>
.product-grid-item {
  margin: .3rem;
  border: 1px solid #dee2e6;
}

.product-grid-item-top, .product-grid-item-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.product-grid-item-top-end {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.product-name {
  font-size: 1.2rem;
  font-weight: 700;
}

.product-description {
  color: #aaabaa;
  font-size: 0.7rem;
}

.product-badge {
  border-radius: 2px;
  padding: .25em .5rem;
  text-transform: uppercase;
  font-weight: 700;
  font-size: 12px;
  letter-spacing: .3px;
}

.product-badge-price {
  border-radius: 2px;
  font-weight: 700;
  font-size: 14px;
}

.product-badge.percent.status-positive {
  background: #c8e6c9;
  color: #256029;
}

.product-badge.percent.status-negative {
  background: #ffcdd2;
  color: #c63737;
}

.product-badge.percent.status-zero {
  background: #b9cfee;
  color: #4599ec;
}

.price.status-positive {
  font-size: 15px;
}

.price.status-negative {
  font-size: 15px;
}

hr.separator {
  border-top: 0.2px solid #6c757d !important;
}

.card {
  padding: 10px !important;
}

.stock-up {
  -webkit-animation-name: up;
  -webkit-animation-duration: 500ms;
  -webkit-animation-iteration-count: 1;
  -webkit-animation-timing-function: linear;
  -moz-animation-name: up;
  -moz-animation-duration: 500ms;
  -moz-animation-iteration-count: 1;
  -moz-animation-timing-function: linear;
}

.stock-down {
  -webkit-animation-name: down;
  -webkit-animation-duration: 500ms;
  -webkit-animation-iteration-count: 1;
  -webkit-animation-timing-function: linear;
  -moz-animation-name: down;
  -moz-animation-duration: 500ms;
  -moz-animation-iteration-count: 1;
  -moz-animation-timing-function: linear;
}

@-webkit-keyframes up {
  0% {
    background-color: #c8e6c9;
    opacity: 1;
  }
  22% {
    background-color: #c8e6c9;
  }
  80% {
    background-color: #c8e6c9;
  }
  100% {
    background-color: #FFFFFF;
  }
}

@-webkit-keyframes down {
  0% {
    background-color: #ffcdd2;
    opacity: 1;
  }
  22% {
    background-color: #ffcdd2;
  }
  80% {
    background-color: #ffcdd2;
  }
  100% {
    background-color: #FFFFFF;
  }
}


</style>