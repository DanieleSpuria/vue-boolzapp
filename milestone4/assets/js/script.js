const {createApp} = Vue;
const dt = luxon.DateTime;
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
        status: 'sent',
        date: this.now
      }),
      this.answer(),
      this.inputMessage = ''
    },

    answer() {
      setTimeout(() => {
        this.userActive.messages.push({
          message: 'ok!!',
          status: 'received',
          date: this.now
        })
      }, 1000)
      
    },

    search() {
      this.splitSearch = this.inputSearch.toUpperCase().split('');
      contacts.forEach(contact => {
        this.splitContact = contact.name.toUpperCase().split('');
        
        if (this.splitSearch.length === 0) {
          contact.visible = true
        } else {
          for (let i = 0; i < this.splitSearch.length; i++) {
            if (this.splitContact.includes(this.splitSearch[i])) {
              contact.visible = true;
            } else {
              contact.visible = false;
            }
          }
        }
      })
    }
  },
  
  computed: {
    ins() {
      this.search()
    },

    now() {
      return dt.now().toLocaleString(dt.DATETIME_SHORT)
    }
  },

  mounted(){
    console.log();
  }
}).mount('#app');