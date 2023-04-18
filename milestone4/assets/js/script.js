const {createApp} = Vue;
import contacts from './db.js';

createApp({
  data() {
    return{
      contacts,
      userActive: contacts[0],
      inputSearch: '',
      inputMessage: '',
      splitSearch: [],
      splitContact: []
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
      
    },

    search() {
      contacts.forEach(contact => {
        this.splitContact = contact.name.split('');
        for (let i = 0; i < this.splitSearch.length; i++) {
          if (this.splitContact.includes(this.splitSearch[i])) {
            contact.visible = true;
          } else {
            contact.visible = false;
          }



          // console.log(this.splitContact[i].toUpperCase().includes());
        }
      })
    }
  },

  computed: {
    ins() {
      this.splitSearch = this.inputSearch.split('')
      this.search()
      return this.splitSearch;
    }
  },

  mounted() {
    
    // console.log(this.);

  }

}).mount('#app');