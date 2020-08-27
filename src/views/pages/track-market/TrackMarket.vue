<template>
  <div class="p-grid">
    <div class="p-col-12">
      <div class="card">
        <div class="p-grid">

          <div class="p-col-12" style="padding: 5px; padding-bottom: 8px;">
            <div>
              <Button style="float: right; margin-right: 10px; font-size: 13px;" label="Adicionar Ativo"
                      icon="pi pi-plus-circle" class="p-button-rounded p-button p-shadow-12" @click="openAddStock"/>
              <Button v-tooltip.left="$t('track_market.lbl_show_chart')" style="float: right; margin-right: 10px; "
                      icon="fa fa-line-chart" class="p-button-rounded  p-shadow-12" @click="changeVisibleChart"/>
              <Button v-tooltip.left="$t('track_market.lbl_show_highLights')" style="float: right; margin-right: 10px; "
                      icon="pi pi-sort-alt" class="p-button-rounded  p-shadow-12" @click="changeHighLights"/>
            </div>
          </div>
        </div>

        <div class="p-grid p-fluid ">
          <div v-for="item in myQuotes" :key="item.codeStock" class="p-col-12 p-md-6 p-lg-3">
            <card-stock :chart-visible="chartVisible" :item="item" :removeButton="true"
                        @card-stock-delete="deleteCardStock"/>
          </div>
        </div>

        <div class="p-grid p-fluid " v-if="highLightsVisible">
          <div class="p-col-12 p-md-12 p-lg-12">
            <high-lights-stock/>
          </div>
        </div>

        <Dialog :header="$t('track_market.lbl_add_stock')" :visible.sync="popUpAddStock"
                :contentStyle="{overflow: 'visible'}"
                :maximizable="true" :modal="true">
          <div class="p-fluid p-formgrid p-grid">
            <div class="p-field p-col-12">
              <label for="stockMarket">{{ $t('track_market.lbl_code_stock') }}</label>
              <AutoComplete minLength="2" id="stockMarket" :multiple="true" v-model="selectedStocks"
                            :suggestions="filteredStocks" @complete="findByCodeStarts($event)" field="code"/>
            </div>
          </div>
          <template #footer>
            <Button :label="$t('lbl_add')" icon="pi pi-check" @click="confirmAddStock"/>
            <Button :label="$t('lbl_close')" icon="pi pi-times" @click="closePopUp" class="p-button-secondary"/>
          </template>
        </Dialog>
      </div>
    </div>
  </div>
</template>
<script>

import Vue from "vue";
import TrackMarketService from "@/service/track-market-service";
import CardStock from "@/component/CardStock";
import StockService from "@/service/stock-service";
import HighLightsStock from "@/component/HighLightsStock";

const trackMarketService = new TrackMarketService();
const stockService = new StockService();


export default {
  name: "TrackMarket",
  components: {HighLightsStock, CardStock},
  data() {
    return {
      title: this.$t('track_market.lbl_title'),
      baseQuotes: null,
      myQuotes: null,
      popUpAddStock: false,
      chartVisible: true,
      highLightsVisible: true,
      selectedStocks: [],
      filteredStocks: null,
    }
  },
  async mounted() {
    this.myQuotes = await trackMarketService.listMyMarketQuotes();
    Vue.prototype.$socketstock.connect();
  },
  beforeDestroy() {
    Vue.prototype.$socketstock.disconnect();
  },
  methods: {

    async findByCodeStarts(event) {
      this.filteredStocks = await stockService.findByCodeStarts(event.query);
    },
    openAddStock() {
      this.popUpAddStock = true;
    },
    async deleteCardStock(myStock) {
      await trackMarketService.removeMyCardStock(myStock.codeStock);
      this.myQuotes = await trackMarketService.listMyMarketQuotes();
    },
    confirmAddStock() {
      if (Array.isArray(this.selectedStocks) && this.selectedStocks.length) {
        trackMarketService.saveList(this.selectedStocks).then((response) => {
          this.myQuotes = response;
          this.closePopUp();
        }).catch(error => {
          const code = error.response.status
          if (code === 400) {
            const message = JSON.parse(error.response.data);
            Vue.prototype.$msgbus.addMessageWarn(message.message, message.details);
          }
        });
      } else {
        Vue.prototype.$msgbus.addMessageInfo("msg_info_stock");
      }
    },
    closePopUp() {
      this.selectedStocks = [];
      this.popUpAddStock = false;
    },
    changeVisibleChart() {
      this.chartVisible = !this.chartVisible;
    },
    changeHighLights() {
      this.highLightsVisible = !this.highLightsVisible;
    },

  }
}
</script>

<style scoped>

</style>