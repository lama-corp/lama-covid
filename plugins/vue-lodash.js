import Vue from 'vue'
import VueLodash from 'vue-lodash'
import { merge, reverse } from 'lodash-es'

// name is optional
Vue.use(VueLodash, { name: '$lodash', lodash: { merge, reverse } })
