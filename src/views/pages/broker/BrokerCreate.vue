<template>
  <div class="p-grid">
    <div class="p-col-12">
      <div class="card">

        <h1>
          {{ title }}
          <Button style="float: right" icon="pi pi-arrow-circle-left" class="p-button-rounded p-button-secondary p-shadow-7 " @click="openConsult"
                  v-tooltip.left="$t('broker.lbl_consult_title')"/>
        </h1>

        <div class="p-fluid p-formgrid p-grid">

          <div class="p-field p-col-12 p-md-4">
            <label required for="codeBroker">{{ $t('broker.lbl_code') }}</label>
            <InputText id="codeBroker" autocomplete="off" v-model="entity.code" type="text" :class="{'p-invalid' :$v.entity.code.$invalid  && submitted}"/>
            <small v-show="$v.entity.code.$invalid && submitted" class="p-error">{{ $t('msg_required') }}</small>
          </div>
          <div class="p-field p-col-12 p-md-4">
            <label required for="nameBroker">{{ $t('broker.lbl_name') }}</label>
            <InputText id="nameBroker" autocomplete="off" v-model="entity.name" type="text" :class="{'p-invalid' :$v.entity.name.$invalid  && submitted}"/>
            <small v-show="$v.entity.name.$invalid && submitted" class="p-error">{{ $t('msg_required') }}</small>
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
import BrokerService from "../../../service/broker-service";

const brokerService = new BrokerService();

export default {
  name: "CreateBroker",
  mixins: [CRUDCreate],
  data() {
    return {
      title: this.$t('broker.lbl_create_title'),
      crud: "broker",
      entity: {
        status: "ACTIVE"
      }
    }
  },
  validations: {
    entity: {
      code: {required},
      name: {required},
      status: {required}
    }
  },
  methods: {
    getService() {
      return brokerService;
    },
    getModel() {
      return this.entity;
    },
  }
}
</script>

<style scoped>

</style>