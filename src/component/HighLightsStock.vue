<template>
  <div>
    <div class="product-grid-item card p-shadow-8">
      <div class="p-fluid p-grid">
      <div class="p-col-12 p-md-6 p-lg-3">
        <Dropdown v-model="productSelected" :options="productList" optionLabel="name"
                   class="p-column-filter" :showClear="false"
                   @change="onChangeProduct($event)">
          <template #option="slotProps">
            <div class="p-clearfix p-dropdown-car-option">
              <span>{{ slotProps.option.name }}</span>
            </div>
          </template>
        </Dropdown>

      </div>
      <div class="p-col-12 p-md-9 p-lg-9">
        <i class="fa fa-refresh" v-tooltip.left="$t('lbl_refresh')" style="fontSize: 1.2rem; cursor: pointer; float: right; margin-right: 20px;" @click="refresh"/>
      </div>

      <div class="p-col-12 p-md-6 p-lg-6">
        <DataTable id="idAltas" class="p-datatable-sm p-datatable-striped"
                   :value="pageUP.content" :lazy="true" :paginator="true" :rows="5"
                   :totalRecords="pageUP.totalElements" @page="onPageUP($event)">
          <template #header>
             <span>
                <i style="color: #256029" class="fa fa-fw fa fa-arrow-up"></i>
                Maiores Altas
            </span>
          </template>

          <Column headerStyle="display: none;" field="codeStock" bodyStyle="text-align: center;width: 10em"/>
          <Column headerStyle="display: none;" field="priceVariationDay" bodyStyle="text-align: center;">
            <template #body="slotProps">
              <span class="product-badge  status-positive">{{ slotProps.data.priceVariationDay | toCurrency }} %</span>
            </template>
          </Column>
          <Column headerStyle="display: none;" field="price" bodyStyle="text-align: center;">
            <template #body="slotProps">
              <span>  {{ slotProps.data.price | toCurrency }}</span>
            </template>
          </Column>
          <template #empty>
            {{ $t('msg_no_records_found') }}
          </template>
        </DataTable>
      </div>

      <div class="p-col-12 p-md-6 p-lg-6">
        <DataTable class="p-datatable-sm p-datatable-striped"
                   :value="pageDOWN.content" :lazy="true" :paginator="true" :rows="5"
                   :totalRecords="pageDOWN.totalElements" @page="onPageDOWN($event)">

          <template #header>
            <span>
                <i style="color: #c63737" class="fa fa-fw fa fa-arrow-down"></i>
                Maiores Baixas
            </span>
          </template>
          <Column headerStyle="display: none;" field="codeStock" bodyStyle="text-align: center;width: 10em"/>
          <Column headerStyle="display: none;" field="priceVariationDay" bodyStyle="text-align: center;">
            <template #body="slotProps">
              <span class="product-badge  status-negative">{{ slotProps.data.priceVariationDay | toCurrency }} %</span>
            </template>
          </Column>
          <Column headerStyle="display: none;" field="price" bodyStyle="text-align: center;">
            <template #body="slotProps">
              <span>{{ slotProps.data.price | toCurrency }}</span>
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
</template>

<script>
import ProductService from "@/service/product-service";
import TrackMarketService from "@/service/track-market-service";

const productService = new ProductService();
const trackMarketService = new TrackMarketService();

export default {
  name: "high-lights-stock",
  data() {
    return {
      productList: [],
      productSelected: null,
      pageUP: {
        content: [],
        totalElements: 0
      },
      pageableUP: {
        pageSize: 5,
        pageNumber: 0,
        offset: 0,
        dto: {
          idProduct: null
        }
      },
      pageDOWN: {
        content: [],
        totalElements: 0
      },
      pageableDOWN: {
        pageSize: 5,
        pageNumber: 0,
        offset: 0,
        dto: {
          idProduct: null
        }
      }
    }
  },
  mounted() {
    productService.listForHighLightsStock().then((response) => {
      this.productList = response;
      this.productSelected = this.productList[0];
      this.listHighLightsStockUP(this.productSelected.id);
      this.listHighLightsStockDOWN(this.productSelected.id);
    });
  },
  methods: {
    refresh(){
      this.listHighLightsStockUP(this.pageableUP.dto.idProduct);
      this.listHighLightsStockUP(this.pageableDOWN.dto.idProduct);
    },
    onChangeProduct(event){
      this.listHighLightsStockUP(event.value.id);
      this.listHighLightsStockDOWN(event.value.id);
    },
    listHighLightsStockUP(idProduct) {
      this.pageableUP.dto.idProduct = idProduct;
      trackMarketService.highLightsStockUP(this.pageableUP).then((response) => {
        this.pageUP = response;
      });
    },
    listHighLightsStockDOWN(idProduct) {
      this.pageableDOWN.dto.idProduct = idProduct;
      trackMarketService.highLightsStockDOWN(this.pageableDOWN).then((response) => {
        this.pageDOWN = response;
      });
    },
    onPageUP(event) {
      if (event) {
        this.pageableUP.pageSize = event.rows;
        this.pageableUP.pageNumber = event.first == 0 ? 0 : event.first / event.rows;
        this.pageableUP.offset = event.first;
      }
      this.listHighLightsStockUP(this.pageableUP.dto.idProduct);
    },
    onPageDOWN(event) {
      if (event) {
        this.pageableDOWN.pageSize = event.rows;
        this.pageableDOWN.pageNumber = event.first == 0 ? 0 : event.first / event.rows;
        this.pageableDOWN.offset = event.first;
      }
      this.listHighLightsStockDOWN(this.pageableDOWN.dto.idProduct);
    },
  }
}
</script>

<style scoped>
.product-badge {
  border-radius: 2px;
  padding: .25em .5rem;
  text-transform: uppercase;
  font-weight: 700;
  font-size: 12px;
  letter-spacing: .3px;
}

.product-grid-item {
  margin: .5rem;
  border: 1px solid #dee2e6;
}

.status-positive {
  background: #c8e6c9;
  color: #256029;
}

.status-negative {
  background: #ffcdd2;
  color: #c63737;
}
</style>