<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <div class="bg-gray-50">
    <div class="max-w-7xl mx-auto py-12 px-4 sm:py-16 sm:px-6 lg:px-8">
      <div class="max-w-3xl mx-auto divide-y-2 divide-gray-200">
        <h2
          class="text-center text-3xl font-extrabold text-gray-900 sm:text-4xl"
        >
          Tout ce que vous devriez savoir sur le Covid-19
        </h2>
        <dl class="mt-6 space-y-6 divide-y divide-gray-200">
          <div class="pt-6">
            <dt class="text-lg">
              <!-- Expand/collapse question button -->
              <button
                type="button"
                class="
                  text-left
                  w-full
                  flex
                  justify-between
                  items-start
                  text-gray-400
                "
                aria-controls="faq-0"
                aria-expanded="false"
                @click="open = !open"
              >
                <span class="font-medium text-gray-900">
                  What&#039;s the best thing about Switzerland?
                </span>
                <span class="ml-6 h-7 flex items-center">
                  <!--
                  Expand/collapse icon, toggle classes based on question open state.
                -->
                  <IconChevronDown
                    :class="open ? '-rotate-180' : 'rotate-0'"
                    class="transform rotate-0 h-6 w-6"
                  />
                </span>
              </button>
            </dt>
            <dd id="faq-0" class="mt-2 pr-12">
              <p class="text-base text-gray-500">
                I don&#039;t know, but the flag is a big plus. Lorem ipsum dolor
                sit amet consectetur adipisicing elit. Quas cupiditate
                laboriosam fugiat.
              </p>
            </dd>
          </div>

          <!-- More questions... -->
        </dl>
      </div>
    </div>
  </div>
</template>

<script>
import IconChevronDown from '~/assets/icons/icon-chevron-down.svg?inline'

export default {
  components: {
    IconChevronDown,
  },
  data() {
    return {
      faqs: [
        {
          question: "What's the best thing about Switzerland?",
          answer:
            "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
        },
        // More questions...
      ],
      open: false,
    }
  },
}
</script>
