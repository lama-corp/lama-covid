<template>
  <div>
    <div class="sm:hidden">
      <input-select
        :value="value"
        :items="tabs"
        :t-path="tPath"
        label="Sélectionnez un graphique"
        @input="$emit('input', $event)"
      />
    </div>
    <div class="hidden sm:block">
      <div class="border-b border-gray-200">
        <nav class="-mb-px flex space-x-8" aria-label="Tabs">
          <a
            v-for="tab in tabs"
            :key="tab"
            href="#"
            :class="
              value === tab
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            "
            class="whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
            @click="$emit('input', tab)"
          >
            {{ $t(`${tPath}.${tab}`) }}
          </a>
        </nav>
      </div>
    </div>
    <slot />
  </div>
</template>

<script>
export default {
  name: 'Tabs',
  props: {
    tPath: {
      type: String,
      default: '',
    },
    value: {
      type: String,
      default: '',
    },
    tabs: {
      type: Array,
      default() {
        return []
      },
    },
  },
}
</script>
