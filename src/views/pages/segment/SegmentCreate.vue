<template>
  <div class="p-grid">
    <div class="p-col-12">
      <div class="card">

        <h1>
          {{ title }}
          <Button style="float: right" icon="pi pi-arrow-circle-left" class="p-button-rounded p-button-secondary p-shadow-7 " @click="openConsult"
                  v-tooltip.left="$t('segment.lbl_consult_title')"/>
        </h1>

        <div class="p-fluid p-formgrid p-grid">

          <div class="p-field p-col-12 p-md-4">
            <label required for="nameSegment">{{ $t('segment.lbl_name') }}</label>
            <InputText id="nameSegment" autocomplete="off" v-model="entity.name" type="text" :class="{'p-invalid' :$v.entity.name.$invalid  && submitted}"/>
            <small v-show="$v.entity.name.$invalid && submitted" class="p-error">{{ $t('msg_required') }}</small>
          </div>

          <div class="p-field p-col-12 p-md-4">
            <label required for="subSectorDrop">{{ $t('segment.lbl_sub_sector') }}</label>
            <Dropdown  id="subSectorDrop" v-model="entity.subSector" :options="subSectorList" optionLabel="name"
                      placeholder="Selecione..." class="p-column-filter" :showClear="true">
              <template #option="slotProps">
                <div class="p-clearfix p-dropdown-car-option">
                  <span>{{ slotProps.option.name }}</span>
                </div>
              </template>
            </Dropdown>
            <small v-show="$v.entity.subSector.id.$invalid && submitted" class="p-error">{{ $t('msg_required') }}</small>
          </div>

          <div class="p-field p-col-12 p-md-4">
            <label required for="statusSegment">{{ $t('lbl_status') }}</label>
            <Dropdown id="statusSegment" v-model="entity.status" :options="statusList" optionLabel="desc" optionValue="label"
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
import SegmentService from "../../../service/segment-service";

const subSectorService = new SubSectorService();
const segmentService = new SegmentService();

export default {
  name: "CreateSegment",
  mixins: [CRUDCreate],
  data() {
    return {
      title: this.$t('segment.lbl_create_title'),
      crud: "segment",
      subSectorList: null,
      entity: {
        status: "ACTIVE",
        subSector: {}
      }
    }
  },
  validations: {
    entity: {
      name: {required},
      subSector: {
        id:{required}
      },
      status: {required}
    }
  },
  methods: {
    async initEdit(){
      this.subSectorList =  await subSectorService.list();
    },
    async initCreate(){
      this.subSectorList =  await subSectorService.list();
    },
    getService() {
      return segmentService;
    },
    getModel() {
      return this.entity;
    },
  }
}
</script>

<style scoped>

</style>