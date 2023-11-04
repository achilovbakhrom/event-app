import { createApp, provide, h } from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import { DefaultApolloClient } from '@vue/apollo-composable'
import apolloClient from './plugins/apollo'
import '@vuepic/vue-datepicker/dist/main.css'

loadFonts()

createApp({
  setup: () => {
    provide(DefaultApolloClient, apolloClient)
  },
  render: () => h(App)
})
  .use(router)
  .use(vuetify)
  .mount('#app')
