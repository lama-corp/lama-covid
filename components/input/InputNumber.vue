<template>
  <div>
    <label for="email" class="block text-sm font-medium text-gray-700">{{
      label
    }}</label>
    <div class="mt-1">
      <input
        id="email"
        type="text"
        name="email"
        class="
          shadow-sm
          focus:ring-indigo-500 focus:border-indigo-500
          block
          w-full
          sm:text-sm
          border-gray-300
          rounded-md
        "
        :value="value * -100"
        placeholder="30"
        @change="updateValue"
      />
    </div>
    <p v-show="displayError" id="email-error" class="text-sm text-red-600">
      Merci de saisir un nombre entier.
    </p>
  </div>
</template>

<script>
export default {
  name: 'InputText',
  props: {
    value: {
      type: Number,
      default: 0,
    },
    label: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      displayError: false, // We should be using v-validate...
    }
  },
  methods: {
    updateValue(event) {
      const value = +event.target.value

      if (Number.isInteger(value)) {
        this.displayError = false
        this.$emit('input', value / -100)
      } else {
        this.displayError = true
      }
    },
  },
}
</script>
