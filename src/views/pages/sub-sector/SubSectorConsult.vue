<template>
  <div class="p-grid">
    <div class="p-col-12">
      <div class="card">
        <h1>
          {{ title }}
          <Button style="float: right" icon="pi pi-plus-circle" class="p-button-rounded p-shadow-7" @click="openCreate" v-tooltip.left="$t('sub_sector.lbl_create_title')"/>
        </h1>

        <div class="p-fluid p-formgrid p-grid">

          <div class="p-field p-col-12 p-md-2">
            <InputText type="text" id="NameSubSector" v-model="pageable.entity['name']" class="p-column-filter"
                       :placeholder="$t('sub_sector.lbl_name')"/>
          </div>

          <div class="p-field p-col-12 p-md-2">
            <Dropdown v-model="pageable.entity['sector']" :options="subSectorList" optionLabel="name"
                      placeholder="Selecione..." class="p-column-filter" :showClear="true">
              <template #option="slotProps">
                <div class="p-clearfix p-dropdown-car-option">
                  <span>{{ slotProps.option.name }}</span>
                </div>
              </template>
            </Dropdown>
          </div>

          <div class="p-field p-col-12 p-md-2">
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

              <Column field="name" :header="$t('sub_sector.lbl_name')" :sortable="true" filterMatchMode="contains" headerStyle="text-align: center" bodyStyle="text-align: center;"/>

              <Column field="sector.name" :header="$t('sub_sector.lbl_sector')" :sortable="true" filterMatchMode="contains" headerStyle="text-align: center" bodyStyle="text-align: center;"/>


              <Column field="status" headerStyle="overflow: visible;text-align: center" :header="$t('lbl_status')" :sortable="true" filterMatchMode="contains"
                      bodyStyle="text-align: center; overflow: visible;">
                <template #body="slotProps">
                  <span>{{ getStatusDesc(slotProps.data.status) }}</span>
                </template>
              </Column>


              <Column headerStyle="text-align: center" :header="$t('lbl_action')" bodyStyle="text-align: center; overflow: visible">
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
import SubSectorService from "../../../service/sub-sector-service";
import SectorService from "../../../service/sector-service";

const subSectorService = new SubSectorService();
const sectorService = new SectorService();

export default {
  mixins: [CRUDConsult],
  name: "SubSectorConsult",
  data() {
    return {
      crud: "sub-sector",
      subSectorList: null,
      title: this.$t('sub_sector.lbl_consult_title'),
    }
  },
  methods: {
    async initConsult(){
      this.subSectorList =  await sectorService.list();
    },
    getService() {
      return subSectorService;
    },
  }
}
</script>

<style scoped>

</style>