<template>
  <div class="p-grid">
    <div class="p-col-12">
      <div class="card">
        <h1>
          {{ title }}
        </h1>

        <div class="p-field p-col-12 p-md-12">

          <DataTable class="p-datatable-responsive p-datatable-sm p-datatable-striped p-datatable-gridlines"
                     :value="syncs" ::paginator="true" :rows="10">
            <Column field="name" header="Code"></Column>
            <Column field="desc" header="Name"></Column>

            <Column headerStyle="text-align: center;width: 20em" :header="$t('lbl_action')"
                    bodyStyle="text-align: center; overflow: visible;width: 10em">
              <template #body="slotProps">
                <Button type="button" icon="pi pi-play" class="p-button-primary" @click="sync(slotProps.data.action)"
                        v-tooltip.left="slotProps.data.title"/>
              </template>
            </Column>
          </DataTable>
        </div>

      </div>
    </div>


  </div>
</template>

<script>
import Vue from "vue";
import SyncService from "../../../service/sync-service";

const syncService = new SyncService();


export default {
  name: "ImportFiles",
  data() {
    return {
      title: this.$t('sync.lbl_consult_title'),
      typeSelect: null,
      syncs: [
        {
          name: this.$t('sync.lbl_historical_data'),
          desc: this.$t('sync.lbl_historical_data_desc'),
          title: this.$t('sync.lbl_consult_title'),
          action: "syncHistoricalDataStock"
        },
        {
          name: this.$t('sync.lbl_historical_ibovespa'),
          desc: this.$t('sync.lbl_historical_ibovespa_desc'),
          title: this.$t('sync.lbl_consult_title'),
          action: "syncHistoricalIbovespa"
        },
        {
          name: this.$t('sync.lbl_quote_real_time'),
          desc: this.$t('sync.lbl_quote_real_time_desc'),
          title: this.$t('sync.lbl_consult_title'),
          action: "syncQuoteStock"
        },
        {
          name: this.$t('sync.lbl_quote_real_time_crypto'),
          desc: this.$t('sync.lbl_quote_real_time_crypto_desc'),
          title: this.$t('sync.lbl_consult_title'),
          action: "syncQuoteCrypto"
        },

      ],
    }
  },
  methods: {
    sync(value) {
      console.log(value)
      if (value == 'syncHistoricalDataStock') {
        this.syncHistoricalDataStock();
      } else if (value == 'syncQuoteStock') {
        this.syncQuoteStock();
      } else if (value == 'syncQuoteCrypto') {
        this.syncQuoteCrypto();
      } else if (value == 'syncHistoricalIbovespa') {
        this.syncHistoricalIbovespa();
      }
    },

    syncHistoricalDataStock() {
      syncService.syncHistoricalDataStock()
          .then((response) => {
            Vue.prototype.$msgbus.addMessageSuccess(response.message, response.message);
            Object.assign(this.$data, this.$options.data.apply(this))
          })
          .catch(error => {
            const code = error.response.status
            if (code === 400) {
              const message = JSON.parse(error.response.data);
              Vue.prototype.$msgbus.addMessageWarn(message.message, message.details);
            }
          });
    },
    syncQuoteStock() {
      syncService.syncQuoteStock()
          .then((response) => {
            Vue.prototype.$msgbus.addMessageSuccess(response.message, response.message);
            Object.assign(this.$data, this.$options.data.apply(this))
          })
          .catch(error => {
            const code = error.response.status
            if (code === 400) {
              const message = JSON.parse(error.response.data);
              Vue.prototype.$msgbus.addMessageWarn(message.message, message.details);
            }
          });
    },
    syncQuoteCrypto() {
      syncService.syncQuoteCrypto()
          .then((response) => {
            Vue.prototype.$msgbus.addMessageSuccess(response.message, response.message);
            Object.assign(this.$data, this.$options.data.apply(this))
          })
          .catch(error => {
            const code = error.response.status
            if (code === 400) {
              const message = JSON.parse(error.response.data);
              Vue.prototype.$msgbus.addMessageWarn(message.message, message.details);
            }
          });
    },
    syncHistoricalIbovespa() {
      syncService.syncHistoricalIbovespa()
          .then((response) => {
            Vue.prototype.$msgbus.addMessageSuccess(response.message, response.message);
            Object.assign(this.$data, this.$options.data.apply(this))
          })
          .catch(error => {
            const code = error.response.status
            if (code === 400) {
              const message = JSON.parse(error.response.data);
              Vue.prototype.$msgbus.addMessageWarn(message.message, message.details);
            }
          });
    },

  }
}
</script>

<style scoped>

</style>