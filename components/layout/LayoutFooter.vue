<template>
  <!-- https://tailwindui.com/components/marketing/sections/footers#component-9841e88626b7f5254528b3846f6ed3b6 -->
  <footer class="bg-white">
    <div
      class="
        max-w-7xl
        mx-auto
        pt-6
        pb-3
        px-4
        sm:px-6
        md:flex md:items-center md:justify-between
        lg:px-8
      "
    >
      <div class="flex justify-center space-x-6 md:order-2">
        <a
          href="https://twitter.com/LamaCodeur"
          target="_blank"
          class="text-gray-400 hover:text-gray-500"
        >
          <span class="sr-only">Twitter</span>
          <IconTwitter class="w-6 h-6" />
        </a>

        <a
          href="https://github.com/lama-corp"
          target="_blank"
          class="text-gray-400 hover:text-gray-500"
        >
          <span class="sr-only">GitHub</span>
          <IconGithub class="w-6 h-6" />
        </a>

        <a
          href="https://www.twitch.tv/lamacodeur"
          target="_blank"
          class="text-gray-400 hover:text-gray-500"
        >
          <span class="sr-only">Twitch</span>
          <IconTwitch class="w-6 h-6 pt-0.5" />
        </a>

        <a
          href="https://www.youtube.com/channel/UCJ-pCPUnfgbzA6fDRMz14gA"
          target="_blank"
          class="text-gray-400 hover:text-gray-500"
        >
          <span class="sr-only">Youtube</span>
          <IconYoutube class="w-6 h-6" />
        </a>

        <a
          href="https://t.me/lamacodeur"
          target="_blank"
          class="text-gray-400 hover:text-gray-500"
        >
          <span class="sr-only">Telegram</span>
          <IconTelegram class="w-6 h-6 pb-0.5" />
        </a>
      </div>
      <div class="mt-8 md:mt-0 md:order-1">
        <p class="text-center text-base text-gray-400">
          &copy; {{ $t('layouts.footer.content') }}
        </p>
      </div>
    </div>
  </footer>
</template>

<script>
import IconGithub from 'assets/icons/icon-github.svg?inline'
import IconTelegram from 'assets/icons/icon-telegram.svg?inline'
import IconTwitch from 'assets/icons/icon-twitch.svg?inline'
import IconTwitter from 'assets/icons/icon-twitter.svg?inline'
import IconYoutube from 'assets/icons/icon-youtube.svg?inline'

export default {
  name: 'LayoutFooter',
  components: {
    IconGithub,
    IconTelegram,
    IconTwitch,
    IconTwitter,
    IconYoutube,
  },
}
</script>
