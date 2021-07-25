export default {
  methods: {
    getWeekRt(values) {
      // Duplicate initial array
      // get Rt from last seven values from duplicate / last seven value from duplicate
      // pop initial array
      // Duplicate initial array
      // get Rt from last seven values from duplicate / last seven value from duplicate
      // Do that 21 times

      // Do the same for hospitalizations & positives => compare
      // To do par "tranche d'âge" !!! Car c'est la tranche d'age qui impactera l'hospitalisation
      // => Vérifier cette logique à tête reposée
      // Ideally, this should be done not for seven days rows, but 3 or 4 days (if it accelerate => days off impact?)
      const reducer = (accumulator, currentValue) => accumulator + currentValue
      const duplicated = this.$lodash.merge([], values)

      return (
        duplicated.splice(-7, 7).reduce(reducer) /
        duplicated.splice(-7, 7).reduce(reducer)
      )
    },
  }
}
