const {createApp} = Vue;
import contacts from './db.js';

createApp({
  data() {
    return{
      contacts,
      userActive: {}
    }
  },

  methods: {
    active() {
      this.contacts.forEach(contact => {
        if (contact.visible) {
          this.userActive = {
            name: contact.name,
            avatar: contact.avatar,
            messages: contact.messages
          }
        }
      })
    }
  },

  mounted(){
    this.active()
    console.log(this.userActive.messages);
  }
}).mount('#app');