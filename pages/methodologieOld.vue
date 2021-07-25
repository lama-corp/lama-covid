<template>
  <div>
    <LineChart :data="data" :options="options" />
  </div>
</template>

<script>
export default {
  name: 'PageMethodologie',
  data() {
    const dailyPositivesResp = require('~/ressources/dailyPositives.json')
    const dailyPositivesData = dailyPositivesResp.data['70-79']
    const dailyPositivesData20 = dailyPositivesResp.data['20-29']
    const dailyPositivesAllData = dailyPositivesResp.data.all
    const hospitalizationsResp = require('~/ressources/hospitalizations.json')
    const hospitalizationsData = hospitalizationsResp.data['70-79']
    const dailyNewAdmissionsReaData =
      require('~/ressources/dailyNewAdmissionsRea.json').data
    const dailyNewAdmissionsReaData2 = this.$lodash.merge(
      [],
      dailyNewAdmissionsReaData
    )

    const nbDays = this.$dayjs(dailyPositivesResp.meta.dateEnd).diff(
      dailyPositivesResp.meta.dateStart,
      'day'
    )

    const _this = this
    const dates = Array(nbDays + 1)
      .fill()
      .map((_, i) =>
        _this
          .$dayjs(dailyPositivesResp.meta.dateEnd)
          .subtract(i, 'day')
          .format('YYYY-MM-DD')
      )
      .sort()

    const nbDaysAnalyze = 105
    const RtsPositives = []
    const RtsPositives20 = []
    const RtsPositivesAll = []
    const RtsHospitalizations = []
    const RtsAdmissions = []
    const RtsAdmissionsDelayed = []
    for (let i = 0; i < nbDaysAnalyze; i++) {
      console.log(i)
      // Positives 70-79
      RtsPositives.push({
        date: dates[dates.length - 1 - i],
        rt: this.getWeekRt(dailyPositivesData),
        nb: dailyPositivesData.length,
      })
      dailyPositivesData.splice(-1, 1)
      // Positives 20-29
      RtsPositives20.push({
        date: dates[dates.length - 1 - i],
        rt: this.getWeekRt(dailyPositivesData20),
        nb: dailyPositivesData20.length,
      })
      dailyPositivesData20.splice(-1, 1)
      // Positives All
      RtsPositivesAll.push({
        date: dates[dates.length - 1 - i],
        rt: this.getWeekRt(dailyPositivesAllData),
        nb: dailyPositivesAllData.length,
      })
      dailyPositivesAllData.splice(-1, 1)
      // Hosp
      RtsHospitalizations.push({
        date: dates[dates.length - 1 - i],
        rt: this.getWeekRt(hospitalizationsData),
        nb: hospitalizationsData.length,
      })
      hospitalizationsData.splice(-1, 1)
      // Admissions
      RtsAdmissions.push({
        date: dates[dates.length - 1 - i],
        rt: this.getWeekRt(dailyNewAdmissionsReaData),
        nb: dailyNewAdmissionsReaData.length,
      })
      dailyNewAdmissionsReaData.splice(-1, 1)
      // Admissions
      RtsAdmissionsDelayed.push({
        date: dates[dates.length - 1 - i - 6],
        rt: this.getWeekRt(dailyNewAdmissionsReaData2),
        nb: dailyNewAdmissionsReaData2.length,
      })
      dailyNewAdmissionsReaData2.splice(-1, 1)
    }
    console.log(RtsPositives, RtsHospitalizations, RtsAdmissions)

    const datasets = [
      {
        label: 'Rt Positives 70-79',
        data: RtsPositives.map((val, idx) => ({
          x: val.date,
          y: parseFloat(val.rt),
        })),
        type: 'line',
        fill: false,
        borderColor: '#0f34fd', // Line color
        pointBorderColor: '#0f34fd', // Point color
        hidden: false, // Hide line
        pointRadius: 3, // Avoid displaying points
        pointHitRadius: 5,
        yAxisID: 'moyennes',
      },
      {
        label: 'Rt Positives 20-29',
        data: RtsPositives20.map((val, idx) => ({
          x: val.date,
          y: parseFloat(val.rt),
        })),
        type: 'line',
        fill: false,
        borderColor: '#9f34fd', // Line color
        pointBorderColor: '#9f34fd', // Point color
        hidden: false, // Hide line
        pointRadius: 3, // Avoid displaying points
        pointHitRadius: 5,
        yAxisID: 'moyennes',
      },
      {
        label: 'Rt Positives all',
        data: RtsPositivesAll.map((val, idx) => ({
          x: val.date,
          y: parseFloat(val.rt),
        })),
        type: 'line',
        fill: false,
        borderColor: '#5634fd', // Line color
        pointBorderColor: '#5634fd', // Point color
        hidden: false, // Hide line
        pointRadius: 3, // Avoid displaying points
        pointHitRadius: 20,
        yAxisID: 'moyennes',
      }, // {
      // label: 'Rt hospitalisation',
      // data: RtsHospitalizations.map((val, idx) => ({
      //   x: val.date,
      //   y: parseFloat(val.rt),
      // })),
      // type: 'line',
      // fill: false,
      // borderColor: '#fd1164', // Line color
      // pointBorderColor: '#fd1164', // Point color
      // hidden: false, // Hide line
      // pointRadius: 3, // Avoid displaying points
      // // pointHitRadius: 5,
      // yAxisID: 'moyennes',
      // },
      {
        label: 'Rt admissions',
        data: RtsAdmissions.map((val, idx) => ({
          x: val.date,
          y: parseFloat(val.rt),
        })),
        type: 'line',
        fill: false,
        borderColor: '#fd1164', // Line color
        pointBorderColor: '#fd1164', // Point color
        hidden: false, // Hide line
        pointRadius: 3, // Avoid displaying points
        // pointHitRadius: 5,
        yAxisID: 'moyennes',
      },
      {
        label: 'Rt admissions delayed',
        data: RtsAdmissionsDelayed.map((val, idx) => ({
          x: val.date,
          y: parseFloat(val.rt),
        })),
        type: 'line',
        fill: false,
        borderColor: '#fd1164', // Line color
        pointBorderColor: '#fd1164', // Point color
        hidden: false, // Hide line
        pointRadius: 3, // Avoid displaying points
        // pointHitRadius: 5,
        yAxisID: 'moyennes',
      },
    ]

    return {
      labels: dates,
      data: {
        labels: dates,
        datasets,
      },
      options: {
        aspectRatio: 1,
        maintainAspectRatio: true,
        legend: {
          display: true,
        },
        scales: {
          yAxes: [
            {
              id: 'moyennes',
              stacked: false,
              display: true,
              gridLines: {
                display: true,
              },
            },
          ],
          xAxes: [
            {
              // offset: true,
              stacked: true,
              type: 'time',
              distribution: 'linear',
              gridLines: {
                display: false,
              },
              time: {
                min: dates[dates.length - nbDaysAnalyze],
                max: dates[dates.length - 1],
              },
            },
          ],
        },
        annotation: {
          events: ['click'],
          annotations: [],
        },
      },
    }
  },
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
      console.log(duplicated)

      return (
        duplicated.splice(-7, 7).reduce(reducer) /
        duplicated.splice(-7, 7).reduce(reducer)
      )
    },
  },
}
</script>
