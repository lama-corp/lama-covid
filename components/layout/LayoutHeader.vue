<template>
  <nav class="bg-white border-b border-gray-200">
    <div class="flex w-11/12 mx-auto">
      <div class="flex flex-grow h-16">
        <div class="flex flex-grow">
          <div class="flex-shrink-0 flex items-center">
            <IconVirus class="w-8 h-8 text-indigo-600" />
          </div>
          <div class="flex-grow flex justify-between">
            <div class="-my-px ml-6 flex space-x-8">
              <a
                href="#graphs"
                class="
                  font-semibold
                  text-lg
                  border-indigo-500
                  text-gray-900
                  inline-flex
                  items-center
                  px-1
                  pt-1
                  border-b-2
                  text-sm
                  font-medium
                "
                aria-current="page"
              >
                Prochaine vague
              </a>
            </div>
            <div class="flex items-center">
              <a
                href="https://github.com/lama-corp/lama-covid"
                target="_blank"
                type="button"
                class="
                  inline-flex
                  items-center
                  px-4
                  py-2
                  border border-gray-300
                  shadow-sm
                  text-base
                  font-medium
                  rounded-md
                  text-gray-700
                  bg-white
                  hover:bg-gray-50
                  focus:outline-none
                  focus:ring-2
                  focus:ring-offset-2
                  focus:ring-indigo-500
                "
              >
                Code source
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import IconVirus from '~/assets/icons/icon-virus.svg?inline'

export default {
  name: 'LayoutHeader',
  components: {
    IconVirus,
  },
}
</script>
