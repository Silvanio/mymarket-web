<template>
  <div class="p-grid">
    <div class="p-col-12">
      <div class="card">

        <h1>
          {{ title }}
          <Button style="float: right" icon="pi pi-arrow-circle-left" class="p-button-rounded p-button-secondary p-shadow-7 " @click="openConsult"
                  v-tooltip.left="$t('stock.lbl_consult_title')"/>
        </h1>

        <div class="p-fluid p-formgrid p-grid">

          <div class="p-field p-col-12 p-md-4">
            <label required for="codeStock">{{ $t('stock.lbl_code') }}</label>
            <InputText id="codeStock" autocomplete="off" v-model="entity.code" type="text" :class="{'p-invalid' :$v.entity.code.$invalid && submitted}"/>
            <small v-show="$v.entity.code.$invalid && submitted" class="p-error">{{ $t('msg_required') }}</small>
          </div>

          <div class="p-field p-col-12 p-md-4">
            <label required for="nameStock">{{ $t('stock.lbl_name') }}</label>
            <InputText id="nameStock" autocomplete="off" v-model="entity.name" type="text" :class="{'p-invalid' :$v.entity.name.$invalid  && submitted}"/>
            <small v-show="$v.entity.name.$invalid && submitted" class="p-error">{{ $t('msg_required') }}</small>
          </div>

          <div class="p-field p-col-12 p-md-4">
            <label required for="SegmentStock">{{ $t('stock.lbl_product') }}</label>
            <Dropdown id="productStock" v-model="entity.product" :options="productList" :filter="true" optionLabel="name"
                      placeholder="Selecione..." class="p-column-filter" :showClear="true">
              <template #option="slotProps">
                <div class="p-clearfix p-dropdown-car-option">
                  <span>{{ slotProps.option.name }}</span>
                </div>
              </template>
            </Dropdown>
            <small v-show="$v.entity.product.id.$invalid && submitted" class="p-error">{{ $t('msg_required') }}</small>
          </div>

          <div class="p-field p-col-12 p-md-4">
            <label  for="SegmentStock">{{ $t('stock.lbl_segment') }}</label>
            <Dropdown id="SegmentStock" v-model="entity.segment"  :options="segmentList" optionLabel="name"
                      placeholder="Selecione..." class="p-column-filter" :showClear="true" :filter="true" >
              <template #option="slotProps">
                <div class="p-clearfix p-dropdown-car-option">
                  <span>{{ slotProps.option.name }}</span>
                </div>
              </template>
            </Dropdown>
          </div>

          <div class="p-field p-col-12 p-md-4" v-if="entity.segment != null && entity.segment.subSector != null" >
            <label required for="SubSectorName">{{ $t('stock.lbl_sub_sector') }}</label>
            <InputText id="SubSectorName" autocomplete="off" disabled v-model="entity.segment.subSector.name" type="text"/>
          </div>

          <div class="p-field p-col-12 p-md-4" v-if="entity.segment != null && entity.segment.subSector != null && entity.segment.subSector.sector != null">
            <label required for="SectorName">{{ $t('stock.lbl_sector') }}</label>
            <InputText id="SectorName" autocomplete="off"
                       disabled v-model="entity.segment.subSector.sector.name" type="text"/>
          </div>

          <div class="p-field p-col-12 p-md-4">
            <label required for="statusStock">{{ $t('lbl_status') }}</label>
            <Dropdown id="statusStock" v-model="entity.status" :options="statusList" optionLabel="desc" optionValue="label"
                      placeholder="Selecione..." class="p-column-filter" :class="{'p-invalid' :$v.entity.status.$invalid && submitted}">
              <template #option="slotProps">
                <div class="p-clearfix p-dropdown-car-option">
                  <span>{{ slotProps.option.desc }}</span>
                </div>
              </template>
            </Dropdown>
            <small v-show="$v.entity.status.$invalid && submitted" class="p-error">{{ $t('msg_required') }}</small>
          </div>

        </div>
        <div class="p-grid p-fluid p-justify-end">
          <div class="p-sm-2">
            <Button :label="$t('lbl_save')" @click="save(!$v.$invalid)"/>
          </div>
        </div>

      </div>
    </div>
  </div>

</template>

<script>
import {required} from "vuelidate/lib/validators";
import CRUDCreate from "../../../utils/CRUDCreate";
import StockService from "../../../service/stock-service";
import SegmentService from "../../../service/segment-service";
import ProductService from "../../../service/product-service";

const stockService = new StockService();
const segmentService = new SegmentService();
const productService = new ProductService();

export default {
  name: "CreateStock",
  mixins: [CRUDCreate],
  data() {
    return {
      title: this.$t('stock.lbl_create_title'),
      crud: "stock",
      segmentList: null,
      productList: null,
      entity: {
        status: "ACTIVE",
        segment:null,
        product:{}
      }
    }
  },
  validations: {
    entity: {
      code: {required},
      name: {required},
      status: {required},
      product: {
        id:{required}
      }
    }
  },

  methods: {
    async initEdit() {
      this.segmentList = await segmentService.list();
      this.productList = await productService.list();
    },
    async initCreate() {
      this.segmentList = await segmentService.list();
      this.productList = await productService.list();
    },
    getService() {
      return stockService;
    },
    getModel() {
      return this.entity;
    },
  }
}
</script>

<style scoped>

</style>