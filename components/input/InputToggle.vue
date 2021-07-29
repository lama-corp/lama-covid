<template>
  <div>
    <!-- This example requires Tailwind CSS v2.0+ -->
    <div class="flex items-center">
      <button
        type="button"
        :class="value ? 'bg-indigo-600' : 'bg-gray-200'"
        class="
          relative
          inline-flex
          flex-shrink-0
          h-6
          w-11
          border-2 border-transparent
          rounded-full
          cursor-pointer
          transition-colors
          ease-in-out
          duration-200
          focus:outline-none
          focus:ring-2
          focus:ring-offset-2
          focus:ring-indigo-500
        "
        role="switch"
        aria-checked="false"
        aria-labelledby="annual-billing-label"
        @click="$emit('input', !value)"
      >
        <span
          aria-hidden="true"
          :class="value ? 'translate-x-5' : 'translate-x-0'"
          class="
            pointer-events-none
            inline-block
            h-5
            w-5
            rounded-full
            bg-white
            shadow
            transform
            ring-0
            transition
            ease-in-out
            duration-200
          "
        ></span>
      </button>
      <span id="annual-billing-label" class="ml-3">
        <span class="text-sm font-medium text-gray-900">{{ label }} </span>
        <span class="text-sm text-gray-500">{{ subLabel }}</span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InputToggle',
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    value: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: '',
    },
    subLabel: {
      type: String,
      default: '',
    },
  },
}
</script>
