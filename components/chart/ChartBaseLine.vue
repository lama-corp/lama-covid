<script>
import { Line } from 'vue-chartjs'

export default {
  name: 'ChartBaseLine',
  extends: Line,
  props: ['data', 'options', 'updateChart'],
  watch: {
    updateChart(value) {
      console.log('updateChart', value)
      if (value) { // Not called on init
        this.renderChart(this.data, this.options)
        console.log('RENDERED')
      }
    }
  }
}
</script>
