<template>
  <div class="modal-card" style="width: 960px">
    <header class="modal-card-head" style="justify-content: space-between;">
      <p class="has-text-weight-bold">Detail Transaksi {{ transaction.note }}</p>
      <b-button class="is-success is-small" @click="$emit('close')">
        <b-icon
          icon="close"
          size="is-small"
        >
        </b-icon>
      </b-button>
    </header>
    <section class="modal-card-body">
      <div class="title is-6">Kode : {{ transaction.member.kode }}</div>
      <div class="title is-6">Nama : {{ transaction.member.name }}</div>
      <div class="title is-6">Total : {{ `Rp. ${parseFloat(transaction.total).toLocaleString('id-ID')}`}}</div>
      <b-table
        :data="isEmpty ? [] : transaction.detail"
        :bordered="isBordered"
        :striped="isStriped"
        :hoverable="isHoverable"
        :paginated="isPaginated"
        :per-page="perPage"
        :current-page.sync="currentPage"
        :default-sort-direction="defaultSortDirection"
        default-sort="user.first_name"
        aria-next-label="Next page"
        aria-previous-label="Previous page"
        aria-page-label="Page"
        aria-current-label="Current page"
        @dblclick="getMember($event)"
        style="cursor: pointer;"
      >
          <b-table-column field="Promo" label="Jenis Promo" width="40" v-slot="props">
            {{ props.row.promo.name }}
          </b-table-column>

          <b-table-column field="Therapist" label="Therapist" width="40" v-slot="props">
            {{ props.row.therapist.name }}
          </b-table-column>

          <b-table-column field="Massage" label="Jenis Pijatan" width="40" v-slot="props">
            {{ props.row.type.name }}
          </b-table-column>
          
          <b-table-column field="Price" label="Harga" width="40" v-slot="props">
            {{ `Rp. ${parseFloat(props.row.type.sale_price).toLocaleString('id-ID')}`}}
          </b-table-column>

          <b-table-column field="Disc" label="Potongan" width="40" v-slot="props">
            <div v-if="props.row.promo.type">
              {{`Rp. ${parseFloat(props.row.promo.value).toLocaleString('id-ID')}`}}
            </div>
            <div v-else>
              {{ props.row.promo.value }} %
            </div>
          </b-table-column>

          <b-table-column field="Disc" label="Potongan" width="40" v-slot="props">
            <div v-if="props.row.promo.type">
              {{`Rp. ${parseFloat(props.row.type.sale_price - props.row.promo.value).toLocaleString('id-ID')}`}}
            </div>
            <div v-else>
              {{ `Rp. ${parseFloat(props.row.type.sale_price * (100 - props.row.promo.value) / 100).toLocaleString('id-ID')}` }} 
            </div>
          </b-table-column>

          <template #empty>
              <div class="has-text-centered">No records</div>
          </template>
      </b-table>
    </section>
    <footer class="modal-card-foot is-justify-content-center">
        <!-- <b-button type="is-success" @click="save">Simpan</b-button> -->
    </footer>
  </div>
</template>

<script>
export default {
  props: {
    transaction: {
      type: Object,
      default: null
    },
  },
  mounted () {
    console.log(this.transaction);
  },

}
</script>

<style>

</style>