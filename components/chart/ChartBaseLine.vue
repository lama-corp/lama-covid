<script>
import { Line } from 'vue-chartjs'

export default {
  name: 'ChartBaseLine',
  extends: Line,
  props: {
    data: {
      type: Object,
      default() {
        return {
          labels: [],
          datasets: [],
        }
      }
    },
    options: {
      type: Object,
      default() {
        return {}
      }
    },
  },
  mounted() {
    // Not called on init
    if (this.$data._chart) {
      this.$data._chart.destroy()
    }
    this.renderChart(this.data, this.options)
  },
}
</script>
