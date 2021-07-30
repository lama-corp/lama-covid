export const state = () => ({
  resources: {
    dailyPositives: {},
    hospitalizations: {},
  },
})

export const actions = {
  async getAndStoreDailyPositives({ state, commit }) {
    if (!state.resources.dailyPositives?.meta) {
      commit(
        'setDailyPositives',
        await this.$axios.$get('/dailyPositives.json')
        // await this.$axios.$get('/dailyPositives_20210720.json')
      )
    }
  },
  async getAndStoreHospitalizations({ state, commit }) {
    if (!state.resources.hospitalizations.meta) {
      commit(
        'setHospitalizations',
        await this.$axios.$get('/hospitalizations.json')
        // await this.$axios.$get('/hospitalizations_20210723.json')
      )
    }
  },
}

export const mutations = {
  setDailyPositives(state, data) {
    state.resources.dailyPositives = data
  },
  setHospitalizations(state, data) {
    state.resources.hospitalizations = data
  },
}
