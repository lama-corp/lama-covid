<template>
  <div>
    <label for="tabs" class="sr-only">{{ label }}</label>
    <select
      id="tabs"
      :value="value"
      name="tabs"
      class="
          block
          w-full
          pl-3
          pr-10
          py-2
          text-base
          border-gray-300
          focus:outline-none focus:ring-indigo-500 focus:border-indigo-500
          sm:text-sm
          rounded-md
        "
      @input="$emit('input', $event.target.value)"
    >
      <option v-for="item in items" :key="item" :value="item">
        {{ $t(`${tPath}.${item}`) }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'InputSelect',
  props: {
    tPath: {
      type: String,
      default: '',
    },
    value: {
      type: String,
      default: '',
    },
    items: {
      type: Array,
      default() {
        return []
      },
    },
    label: {
      type: String,
      default: '',
    },
  }
}
</script>
