<template>
  <div class="p-grid">
    <div class="p-col-12">
      <div class="card">

        <h1>
          {{ title }}
          <Button style="float: right" icon="pi pi-arrow-circle-left" class="p-button-rounded p-button-secondary p-shadow-7 " @click="openConsult"
                  v-tooltip.left="$t('product.lbl_consult_title')"/>
        </h1>

        <div class="p-fluid p-formgrid p-grid">

          <div class="p-field p-col-12 p-md-4">
            <label required for="codeProduct">{{ $t('product.lbl_code') }}</label>
            <InputText id="codeProduct" autocomplete="off" v-model="entity.code" type="text" :class="{'p-invalid' :$v.entity.code.$invalid && submitted}"/>
            <small v-show="$v.entity.code.$invalid && submitted" class="p-error">{{ $t('msg_required') }}</small>
          </div>
          <div class="p-field p-col-12 p-md-4">
            <label required for="nameProduct">{{ $t('product.lbl_name') }}</label>
            <InputText id="nameProduct" autocomplete="off" v-model="entity.name" type="text" :class="{'p-invalid' :$v.entity.name.$invalid  && submitted}"/>
            <small v-show="$v.entity.name.$invalid && submitted" class="p-error">{{ $t('msg_required') }}</small>
          </div>

          <div class="p-field p-col-12 p-md-4">
            <label required for="statusStock">{{ $t('product.lbl_type_product') }}</label>
            <Dropdown id="typeProduct" v-model="entity.type" :options="typeProductList" optionLabel="desc" optionValue="label"
                      placeholder="Selecione..." class="p-column-filter" :class="{'p-invalid' :$v.entity.type.$invalid && submitted}">
              <template #option="slotProps">
                <div class="p-clearfix p-dropdown-car-option">
                  <span>{{ slotProps.option.desc }}</span>
                </div>
              </template>
            </Dropdown>
            <small v-show="$v.entity.type.$invalid && submitted" class="p-error">{{ $t('msg_required') }}</small>
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
import ProductService from "../../../service/product-service";

const productService = new ProductService();

export default {
  name: "CreateProduct",
  mixins: [CRUDCreate],
  data() {
    return {
      title: this.$t('product.lbl_create_title'),
      crud: "product",
      typeProductList: [
        {label: 'FIXED', desc: this.$t('lbl_fixed')},
        {label: 'VARIABLE', desc: this.$t('lbl_variable')}
      ],
      entity: {
        status: "ACTIVE"
      }
    }
  },
  validations: {
    entity: {
      code: {required},
      name: {required},
      type: {required},
      status: {required}
    }
  },
  computed: {
    getTypeDesc(value) {
      if (value) {
        return value == "FIXED" ? this.$t('lbl_fixed') : this.$t('lbl_variable')
      }
      return "";
    }
  },
  methods: {
    getService() {
      return productService;
    },
    getModel() {
      return this.entity;
    },
  }
}
</script>

<style scoped>

</style>