# ! When you create a new layout !

To improve performances, we disabled I18n SEO option

BECAUSE OF THAT We have to define the following lines in ALL layouts

```
export default {
  head() {
    return this.$nuxtI18nHead({ addSeoAttributes: true })
  },
},
```

An example is available in default.vue layout

More information: https://i18n.nuxtjs.org/seo#improving-performance
