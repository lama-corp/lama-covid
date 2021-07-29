export default {
  methods: {
    // mainObject: { '0-9': [], '10-19': [], '20-29': [], ... }
    // keys: ['10-19', '20-29']
    // Returns: array
    cumulObjectsOfArray(mainObject, keys) {
      const result = []
      for (let i = 0; i < mainObject[keys[0]].length; i++) {
        let value = 0
        keys.forEach((key) => {
          value += mainObject[key][i]
        })
        result.push(value)
      }

      return result
    },
    // First 6 smoothed values will be incorrect and should never be displayed in charts
    getSmoothedWeekly(data) {
      return data.map(
        (value, index, array) => {
          let newValue = 0
          for (let i = 0; i < 7; i++) {
            newValue += array[index - i] ? array[index - i] : value
          }
          return parseInt(newValue / 7)
        }
      )
    },
    getWeekRt(values) {
      const reducer = (accumulator, currentValue) => accumulator + currentValue
      const duplicated = this.$lodash.merge([], values)

      return (
        duplicated.splice(-7, 7).reduce(reducer) /
        duplicated.splice(-7, 7).reduce(reducer)
      )
    },
    getRt(values) {
      return (
        values[values.length - 1] /
        values[values.length - 1 - 7]
      )
    },
    getRatio2Last(values) {
      return (
        values[values.length - 1] /
        values[values.length - 2]
      )
    },
  },
}
