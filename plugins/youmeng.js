export default ({ app: { router }, store }) => {
  router.afterEach((to, from) => {
    /* 告诉增加一个PV */
    try {
      if (window._czc) {
        let location = window.location
        let contentUrl = location.pathname + location.hash
        let refererUrl = '/'
        window._czc.push(['_trackPageview', contentUrl, refererUrl])
      }
    } catch (e) {}
  })
}
