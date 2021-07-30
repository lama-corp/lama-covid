export default {
  methods: {
    getDatesFromStartToEnd(dateStart, dateEnd) {
      const nbDays = this.$dayjs(dateEnd).diff(
        dateStart,
        'day'
      )

      const _this = this
      return Array(nbDays + 1)
        .fill()
        .map((_, i) =>
          _this
            .$dayjs(dateEnd)
            .subtract(i, 'day')
            .format('YYYY-MM-DD')
        )
        .sort()
    }
  }
}
