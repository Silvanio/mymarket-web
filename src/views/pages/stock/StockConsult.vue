<template>
  <div class="p-grid">
    <div class="p-col-12">
      <div class="card">
        <h1>
          {{ title }}
          <Button style="float: right" icon="pi pi-plus-circle" class="p-button-rounded p-shadow-7" @click="openCreate" v-tooltip.left="$t('stock.lbl_create_title')"/>
        </h1>

        <div class="p-fluid p-formgrid p-grid">
          <div class="p-field p-col-12 p-md-3">
            <InputText type="text" id="codeStock" v-model="pageable.entity['code']" class="p-column-filter" :placeholder="$t('stock.lbl_code')"/>
          </div>

          <div class="p-field p-col-12 p-md-3">
            <InputText type="text" id="NameStock" v-model="pageable.entity['name']" class="p-column-filter"
                       :placeholder="$t('stock.lbl_name')"/>
          </div>

          <div class="p-field p-col-12 p-md-3">
            <Dropdown v-model="pageable.entity['product']" :options="productList" optionLabel="name"
                      :placeholder="$t('stock.lbl_product')" class="p-column-filter" :showClear="true">
              <template #option="slotProps">
                <div class="p-clearfix p-dropdown-car-option">
                  <span>{{ slotProps.option.name }}</span>
                </div>
              </template>
            </Dropdown>
          </div>

          <div class="p-field p-col-12 p-md-3">
            <Dropdown v-model="pageable.entity['segment']" :options="segmentList" optionLabel="name"
                      :placeholder="$t('stock.lbl_segment')" class="p-column-filter" :showClear="true">
              <template #option="slotProps">
                <div class="p-clearfix p-dropdown-car-option">
                  <span>{{ slotProps.option.name }}</span>
                </div>
              </template>
            </Dropdown>
          </div>

          <div class="p-field p-col-12 p-md-3">
            <Dropdown v-model="pageable.entity['status']" :options="statusList" optionLabel="desc" optionValue="label"
                      placeholder="Selecione..." class="p-column-filter" :showClear="true">
              <template #option="slotProps">
                <div class="p-clearfix p-dropdown-car-option">
                  <span>{{ slotProps.option.desc }}</span>
                </div>
              </template>
            </Dropdown>
          </div>
          <div class="p-field p-col-12 p-md-1">
            <Button :label="$t('lbl_filter')" @click="onPage()"/>
          </div>
          <div class="p-field p-col-12 p-md-2">
          </div>
        </div>


        <div class="p-fluid p-formgrid p-grid">
          <div class="p-field p-col-12">
            <DataTable class="p-datatable-responsive p-datatable-sm p-datatable-striped p-datatable-gridlines"
                       :value="page.content" :lazy="true" :filters="pageable.entity" :paginator="true" :rows="10"
                       :totalRecords="page.totalElements" @filter="onPage($event)" @page="onPage($event)" @sort="onPage($event)">

              <Column field="code" :header="$t('stock.lbl_code')" :sortable="true" filterMatchMode="contains"
                      headerStyle="text-align: center;width: 10em" bodyStyle="text-align: center;width: 10em"/>

              <Column field="name" :header="$t('stock.lbl_name')" :sortable="true" filterMatchMode="contains" headerStyle="text-align: center" bodyStyle="text-align: center;"/>

              <Column field="product.name" :header="$t('stock.lbl_product')" :sortable="true" filterMatchMode="contains" headerStyle="text-align: center"
                      bodyStyle="text-align: center;">
                <template #body="slotProps">
                  <span>{{ slotProps.data.product.name }}</span>
                  <i style="margin-left:5px " class="pi  pi-info-circle" v-if="slotProps.data.segment != null"
                     v-tooltip.right="getHintSegment(slotProps.data)" ></i>
                </template>
              </Column>

              <Column field="status" headerStyle="overflow: visible;text-align: center;width: 10em" :header="$t('lbl_status')" :sortable="true"
                      filterMatchMode="contains"
                      bodyStyle="text-align: center; overflow: visible; width: 10em">
                <template #body="slotProps">
                  <span >{{ getStatusDesc(slotProps.data.status) }}</span>
                </template>
              </Column>

              <Column headerStyle="text-align: center;width: 10em" :header="$t('lbl_action')"
                      bodyStyle="text-align: center; overflow: visible;width: 10em">
                <template #body="slotProps">
                  <Button type="button" icon="fa fa-fw fa-pencil-square-o" @click="openEdit(slotProps.data.id)" class="p-button-info"
                          style="margin-right: .5em" v-tooltip.left="$t('lbl_edit')"/>
                  <Button type="button" icon="fa fa-fw fa-trash-o" @click="remove(slotProps.data.id)" class="p-button-warning"
                          v-tooltip.left="$t('lbl_remove')"/>
                </template>
              </Column>
              <template #empty>
                {{ $t('msg_no_records_found') }}
              </template>

            </DataTable>
          </div>
        </div>

      </div>
    </div>

    <Dialog :header="$t('msg_confirm')" position="top" :visible.sync="popRemoveItem" :maximizable="true" :modal="true">
      <div class="p-grid p-fluid">
        <div class="p-col-12">
          <h3>{{ $t('msg_confirm_remove') }}</h3>
        </div>
      </div>
      <template #footer>
        <Button :label="$t('lbl_yes')" icon="pi pi-check" @click="confirmRemoveYes"/>
        <Button :label="$t('lbl_no')" icon="pi pi-times" @click="confirmRemoveNo" class="p-button-secondary"/>
      </template>
    </Dialog>

  </div>
</template>

<script>
import CRUDConsult from "../../../utils/CRUDConsult";
import StockService from "../../../service/stock-service";
import SegmentService from "../../../service/segment-service";
import ProductService from "../../../service/product-service";

const stockService = new StockService();
const segmentService = new SegmentService();
const productService = new ProductService();

export default {
  mixins: [CRUDConsult],
  name: "StockConsult",
  data() {
    return {
      crud: "stock",
      segmentList: null,
      productList: null,
      title: this.$t('stock.lbl_consult_title'),
    }
  },
  methods: {
    async initConsult() {
      this.segmentList = await segmentService.list();
      this.productList = await productService.list();
    },
    getHintSegment(value) {
      var segment = "";
      var subSector = "";
      var sector ="";
      if (value.segment) {
        segment = value.segment.name;
        if (value.segment.subSector) {
          subSector = "\n"+value.segment.subSector.name;
          if (value.segment.subSector.sector) {
            sector = "\n"+value.segment.subSector.sector.name;
          }
        }
      }
      return segment+subSector+sector;
    },
    getService() {
      return stockService;
    },
  }
}
</script>

<style scoped>

</style>