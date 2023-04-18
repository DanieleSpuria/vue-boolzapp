const {createApp} = Vue;
import contacts from './db.js';

createApp({
  data() {
    return{
      contacts,
      userActive: contacts[0],
      inputMessage: ''
    }
  },

  methods: {
    active(contact) {
      this.userActive = {
        name: contact.name,
        avatar: contact.avatar,
        messages: contact.messages
      }
    },

    sendMessage() {
      this.userActive.messages.push({
        message: this.inputMessage,
        status: 'sent'
      }),
      this.inputMessage = ''
    }
  },

  mounted() {
    console.log(this.userActive.messages);
  }

}).mount('#app');