<template>
  <div class="p-grid">
    <div class="p-col-12">
      <div class="card">
        <h1>
          {{ title }}
        </h1>

        <div class="p-fluid p-formgrid p-grid">

          <div class="p-field p-col-12 p-md-3">
            <label required for="fileListID">{{ $t('import.lbl_type') }}</label>
            <Dropdown id="fileListID" v-model="typeSelect" :options="fileList" optionLabel="desc" optionValue="label"
                      placeholder="Selecione..." class="p-column-filter" :showClear="true">
              <template #option="slotProps">
                <div class="p-clearfix p-dropdown-car-option">
                  <span>{{ slotProps.option.desc }}</span>
                </div>
              </template>
            </Dropdown>
          </div>
          <div class="p-field p-col-12 p-md-12">
            <FileUpload file="file[]" :customUpload="true" @uploader="myUploader" chooseLabel="Selecione"
                        cancelLabel="Cancelar"/>
          </div>

        </div>


      </div>
    </div>


  </div>
</template>

<script>
import ImportService from "../../../service/import-service";
import Vue from "vue";

const importService = new ImportService();

export default {
  name: "ImportFiles",
  data() {
    return {
      title: this.$t('import.lbl_consult_title'),
      typeSelect: null,
      fileList: [
        {label: 'STOCK', desc: this.$t('import.lbl_file_stock')},
        {label: 'SEGMENT', desc: this.$t('import.lbl_file_segment')},
        {label: 'SEGMENT_FII', desc: this.$t('import.lbl_file_segment_fii')},
        {label: 'HISTORICAL_IBOV', desc: this.$t('import.lbl_file_historical_ibov')},
      ],
    }
  },
  methods: {
    myUploader(event) {
      if (this.typeSelect == 'STOCK') {
        importService.uploadStocks(event.files)
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
      } else if (this.typeSelect == 'SEGMENT') {
        importService.uploadSectors(event.files)
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
      } else if (this.typeSelect == 'SEGMENT_FII'){
        importService.uploadSegmentFII(event.files)
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
      }else if (this.typeSelect == 'HISTORICAL_IBOV'){
        importService.uploadHistoricalIBOV(event.files)
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
      }
    }
  }
}
</script>

<style scoped>

</style>