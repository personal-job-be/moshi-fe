<template>
    <b-navbar :fixed-top= "true">
        <template #brand>
            <b-navbar-item tag="router-link" :to="{ path: '/' }">
                <img
                    src="/letter1.png"
                >
            </b-navbar-item>
        </template>

        
        <template #start>
            <b-navbar-item v-if="!$auth.isAuthenticated" href="/">
                Home 
            </b-navbar-item>
            <b-navbar-item v-if="!$auth.isAuthenticated" href="/galery">
                Gallery
            </b-navbar-item>
            <b-navbar-item v-if="!$auth.isAuthenticated" href="/about">
                About Us
            </b-navbar-item>
            <b-navbar-item v-if="!$auth.isAuthenticated" href="/auth/cashier">
                Cashier
            </b-navbar-item>
            <b-navbar-dropdown v-if="$auth.isAuthenticated && permission !== null" label="Master">
                <b-navbar-item v-if="permission.filter(p => p.name ==='type' && p.value === 'Aktif').length > 0" href="/cashier/master/types">
                    Tipe Pijatan 
                </b-navbar-item>
                <b-navbar-item v-if="permission.filter(p => p.name ==='therapist' && p.value === 'Aktif').length > 0" href="/cashier/master/therapists">
                    Therapist
                </b-navbar-item>
                <b-navbar-item v-if="permission.filter(p => p.name ==='promo' && p.value === 'Aktif').length > 0" href="/cashier/master/promos">
                    Promo
                </b-navbar-item>
                <b-navbar-item v-if="permission.filter(p => p.name ==='addMember' && p.value === 'Aktif').length > 0" href="/cashier/master/members">
                    Member
                </b-navbar-item>
                <b-navbar-item  v-if="permission.filter(p => p.name ==='absensi' && p.value === 'Aktif').length > 0" href="/cashier/master/absensi">
                    Absensi
                </b-navbar-item>
                <b-navbar-item v-if="permission.filter(p => p.name ==='user' && p.value === 'Aktif').length > 0" href="/cashier/master/user">
                    User Management
                </b-navbar-item>
                <b-navbar-item v-if="permission.filter(p => p.name ==='user' && p.value === 'Aktif').length > 0" href="/cashier/master/logs">
                    Logs
                </b-navbar-item>
            </b-navbar-dropdown>
            <b-navbar-item v-if="$auth.isAuthenticated && permission !== null && permission.filter(p => p.name ==='addTransaction' && p.value === 'Aktif').length > 0" href="/cashier/transaction">
                    Transaksi
            </b-navbar-item>
            <b-navbar-dropdown v-if="$auth.isAuthenticated && permission !== null" label="Laporan">
                <b-navbar-item v-if="permission.filter(p => p.name ==='dailyReport' && p.value === 'Aktif').length > 0" href="/cashier/report/daily">
                    Harian
                </b-navbar-item>
                <b-navbar-item  v-if="permission.filter(p => p.name ==='payroll' && p.value === 'Aktif').length > 0" href="/cashier/report/payroll">
                    Gaji / Komisi
                </b-navbar-item>
            </b-navbar-dropdown>
        </template>

        <template #end>
            <b-navbar-item tag="div">
                <div v-if="$auth.isAuthenticated" >
                    <b-button class="is-primary" @click="logout">
                        <strong>Log Out</strong>
                    </b-button>
                </div>
            </b-navbar-item>
        </template>
    </b-navbar>
</template>

<script>
export default {
    data() {
        return {
            userJwt : localStorage.getItem('userJwt'),
            userId: localStorage.getItem('userId'),
            permission: null
        }
    },
    async mounted () {
        try {
        const response = await this.$axios.get(`${this.$config.BASE_URL}/api/user/findone/${this.userId}`, {
          headers : {
            token: this.userJwt
          }
        })  
        if(response.status === 200) {
          this.permission = response.data.data.permission
        }
      } catch (error) {
        // this.$buefy.snackbar.open({
        //   message: 'Session Expired ',
        //   queue: false,
        // })
        // this.$store.dispatch('auth/logout') 
        // this.$router.push('/')
      }
    },
    methods: {
        logout() {
            this.$store.dispatch('auth/logout') 
            this.$router.push('/')
        }
    },
    
}
</script>