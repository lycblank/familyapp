<template>
            <f7-toolbar tabbar labels>
              <f7-link icon="iconfont icon-ios7homeoutline" :text="$t('app.home')" tab-link="#home" active></f7-link>
              <f7-link icon="iconfont icon-ios7chatbubbleoutline" :text="$t('app.contacts')" tab-link="#contacts"></f7-link>
              <f7-link icon="iconfont icon-ios7gearoutline" :text="$t('app.settings')" tab-link="#settings"></f7-link>
            </f7-toolbar>
            <f7-tabs>
              <f7-tab id="home" active @tab:show="tabActived('home')">
                <home-view></home-view>  
              </f7-tab>
              <f7-tab id="contacts" @tab:show="tabActived('contacts')">
                <contacts-view></contacts-view>
              </f7-tab>
              <f7-tab id="settings" @tab:show="tabActived('settings')">
                <settings-view></settings-view>
              </f7-tab>
            </f7-tabs>
</template>
<script>
import HomeView from './home.vue'
import ContactsView from './contacts.vue'
import SettingsView from './settings.vue'
import CommentPopup from './comment.vue'
import PublisherPopup from './publisher.vue'
export default {
  data() {
    return {
      activedTab: 'home'
    }
  },
  computed: {
    navbarTitle() {
      switch(this.activedTab) {
      case 'home':
        return this.$t('app.app_name')
      case 'contacts':
        return this.$t('app.contacts')
      case 'settings':
        return this.$t('app.settings')
      }
    }
  },
  methods: {
    tabActived(tab) {
      this.activedTab = tab
    }
  },
  components: {
    HomeView,
    ContactsView,
    SettingsView,
    CommentPopup,
    PublisherPopup
  }
}
</script>
