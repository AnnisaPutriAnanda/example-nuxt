// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss"],
  runtimeConfig: {
    public: {
      apiBase: 'http://127.0.0.1:8000/api'
    }
},
app: {
  head: {
    meta:[
    {charset: 'utf-8'},
    {name: "viewport", content: "width=device-width, initial-scale=1"}
    ],
    link: [
      {
        rel: 'stylesheet',
        href: 'https://cdn.jsdelivr.net/npm/sweetalert2@10',
        crossorigin: ''
      },
    ],
    script: [
      {
        src: 'https://unpkg.com/sweetalert/dist/sweetalert.min.js',
        type: 'text/javascript'
      },
          {
        src: 'https://code.jquery.com/jquery-2.1.4.min.js',
        type: 'text/javascript'
      }
    ]
  }
},

})