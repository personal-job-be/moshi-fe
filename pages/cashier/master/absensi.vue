<template>
  <div class="section">
    <div class="title is-5">Master > Absensi</div>
    <div class="box">
      <div class="columns">
        <div class="column is-4">
          <b-field label="Select a date">
            <b-datepicker
                type="month"
                placeholder="Click to select..."
                icon="calendar-today"
                v-model="selectedMonth"
                @input="changedMonth"
                trap-focus>
            </b-datepicker>
          </b-field>
        </div>
        <div class="column is-4">
          <b-field label="Therapist : ">
            <b-select placeholder="Pilih Therapist" v-model="choosenTherapist" @input="getAbsence">
              <option
                  v-for="(therapist,index) in therapists"
                  :value="therapist.id"
                  :key="index">
                  {{ therapist.name }}
              </option>
            </b-select>
          </b-field>
        </div>
      </div>
      <div class="columns is-multiline">
        <div v-for="(day,index) in dayOfMonth" :key="index" class="column is-2">
          <b-field>
            {{index + 1}} : 
            <b-switch v-model="isSwitchedCustom[index]"
                true-value="Masuk"
                false-value="Tidak">
                {{ isSwitchedCustom[index] }}
            </b-switch>
          </b-field>
        </div>
      </div>
      <div class="is-flex is-justify-content-center">
        <b-button class="is-success" @click="save">Simpan</b-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedMonth: new Date(),
      dayOfMonth : 0,
      isSwitchedCustom: [],
      choosenTherapist : null,
      therapists : [],
      idAbsence : null,
      userJwt : localStorage.getItem('userJwt'),
      isExist : false,
      presence : {},
      user : localStorage.getItem('userId')
    }
  },
  mounted () {
    this.changedMonth()
    this.getTherapists()
  },
  methods: {
    async getTherapists() {
      try {
        const response = await this.$axios.get(`${this.$config.BASE_URL}/api/therapists/all`,{
          headers: {
            token: this.userJwt,
          },
        })
        if(response.status === 200)
          this.therapists = response.data.data
      } catch (error) {
          this.isLoading = false
          this.$buefy.snackbar.open({
            message: 'Session Expired ',
            queue: false,
          })
          this.$store.dispatch('auth/logout') 
          this.$router.push('/')
      }
    },

    async changedMonth() {
      const month = this.selectedMonth.getMonth() + 1
      const year = this.selectedMonth.getFullYear()
      this.dayOfMonth = new Date(year, month, 0).getDate()
      for (let index = 0; index < this.dayOfMonth; index++) 
        this.isSwitchedCustom[index] = "Tidak"
      await this.getAbsence()
    },

    async save() {
      const absence = this.isSwitchedCustom.map(abs=> abs === "Masuk" ? "1" : "0")
      if(!this.isExist) {
        this.presence = {
          month : this.selectedMonth.getMonth() + 1,
          year : this.selectedMonth.getFullYear(),
          attendance : absence,
          therapist : this.choosenTherapist,
          user : this.user
        }
        try {
          const response = await this.$axios.post(`${this.$config.BASE_URL}/api/absence`,this.presence,{
              headers : {
                token : this.userJwt
              }
            })
          if(response.status === 200)
            this.$buefy.toast.open({
              message: `Data Saved Successfully`,
              type: 'is-success',
            })
        } catch (error) {
            this.isLoading = false
            this.$buefy.snackbar.open({
              message: 'Session Expired ',
              queue: false,
            })
            this.$store.dispatch('auth/logout') 
            this.$router.push('/')
        }
      }
      else {
        this.presence = {
          attendance : absence,
          user : this.user
        }
        try {
          console.log(this.idAbsence);
          const response = await this.$axios.put(`${this.$config.BASE_URL}/api/absence/${this.idAbsence}`,this.presence,{
            headers : {
              token : this.userJwt
            }
          })
          if(response.status === 200)
            this.$buefy.toast.open({
              message: `Data Saved Successfully`,
              type: 'is-success',
            })
        } catch (error) {
            this.isLoading = false
            this.$buefy.snackbar.open({
              message: 'Session Expired ',
              queue: false,
            })
            this.$store.dispatch('auth/logout') 
            this.$router.push('/')
        }
      }
    },

    async getAbsence() {
      try {
        if(this.choosenTherapist !== null)
        {
          for (let index = 0; index < this.dayOfMonth; index++) 
            this.isSwitchedCustom[index] = "Tidak"
          const month = this.selectedMonth.getMonth() + 1
          const year = this.selectedMonth.getFullYear()
          const response = await this.$axios.get(`${this.$config.BASE_URL}/api/absence/${month}/${year}`,{
            headers : {
              therapist : this.choosenTherapist,
              token : this.userJwt
            }
          })
          if(response.data.data.length > 0)
          {
            this.isSwitchedCustom = response.data.data.reduce(data => data).attendance
            this.isSwitchedCustom = this.isSwitchedCustom.map(absence => absence === "1" ? "Masuk" : "Tidak" )
            this.isExist = true
            this.idAbsence = response.data.data.reduce(data => data).id
          }
          else {
            this.isExist = false
          }
        }
      } catch (error) {
        this.isLoading = false
        this.$buefy.snackbar.open({
          message: 'Session Expired ',
          queue: false,
        })
        this.$store.dispatch('auth/logout') 
        this.$router.push('/')
      }
    }
  },
}
</script>

<style>

</style>