<template>
  <div class="p-grid">
    <div class="p-col-12">
      <div class="card">

        <h1>
          {{ title }}
          <Button style="float: right" icon="pi pi-arrow-circle-left" class="p-button-rounded p-button-secondary p-shadow-7 " @click="openConsult"
                  v-tooltip.left="$t('sub_sector.lbl_consult_title')"/>
        </h1>

        <div class="p-fluid p-formgrid p-grid">

          <div class="p-field p-col-12 p-md-4">
            <label required for="nameSubSector">{{ $t('sub_sector.lbl_name') }}</label>
            <InputText id="nameSubSector" autocomplete="off" v-model="entity.name" type="text" :class="{'p-invalid' :$v.entity.name.$invalid  && submitted}"/>
            <small v-show="$v.entity.name.$invalid && submitted" class="p-error">{{ $t('msg_required') }}</small>
          </div>

          <div class="p-field p-col-12 p-md-4">
            <label required for="sector">{{ $t('sub_sector.lbl_sector') }}</label>
            <Dropdown  id="sector" v-model="entity.sector" :options="subSectorList" optionLabel="name"
                      placeholder="Selecione..." class="p-column-filter" :showClear="true">
              <template #option="slotProps">
                <div class="p-clearfix p-dropdown-car-option">
                  <span>{{ slotProps.option.name }}</span>
                </div>
              </template>
            </Dropdown>
            <small v-show="$v.entity.sector.id.$invalid && submitted" class="p-error">{{ $t('msg_required') }}</small>
          </div>

          <div class="p-field p-col-12 p-md-4">
            <label required for="statusSubSector">{{ $t('lbl_status') }}</label>
            <Dropdown id="statusSubSector" v-model="entity.status" :options="statusList" optionLabel="desc" optionValue="label"
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
import SubSectorService from "../../../service/sub-sector-service";
import SectorService from "../../../service/sector-service";

const subSectorService = new SubSectorService();
const sectorService = new SectorService();

export default {
  name: "CreateSubSector",
  mixins: [CRUDCreate],
  data() {
    return {
      title: this.$t('sub_sector.lbl_create_title'),
      crud: "sub-sector",
      subSectorList: null,
      entity: {
        status: "ACTIVE",
        sector: {}
      }
    }
  },
  validations: {
    entity: {
      name: {required},
      sector: {
        id:{required}
      },
      status: {required}
    }
  },
  methods: {
    async initEdit(){
      this.subSectorList =  await sectorService.list();
    },
    async initCreate(){
      this.subSectorList =  await sectorService.list();
    },
    getService() {
      return subSectorService;
    },
    getModel() {
      return this.entity;
    },
  }
}
</script>

<style scoped>

</style>