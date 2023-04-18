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
      this.answer(),
      this.inputMessage = ''
    },

    answer() {
      setTimeout(() => {
        this.userActive.messages.push({
          message: 'ok!!',
          status: 'received'
        })
      }, 1000)
      
    }
  },

  mounted() {
    console.log(this.userActive.messages);
  }

}).mount('#app');