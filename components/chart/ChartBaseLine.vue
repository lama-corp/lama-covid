<script>
import { Line } from 'vue-chartjs'

export default {
  name: 'ChartBaseLine',
  extends: Line,
  props: ['data', 'options'],
  mounted() {
    console.log('IN0')
    this.renderChart(this.data, this.options)
  },
}
</script>
