const {createApp} = Vue;
const dt = luxon.DateTime;
import contacts from './db.js';

createApp({
  data() {
    return{
      clock: null,
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
        date: this.clock
      }),
      this.answer(),
      this.inputMessage = ''
    },

    answer() {
      setTimeout(() => {
        this.userActive.messages.push({
          message: 'ok!!',
          status: 'received',
          date: this.clock
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
    },

    now() {
      setInterval(() => {
        this.clock = dt.now().toLocaleString(dt.DATETIME_SHORT_WITH_SECONDS); 
      },1000)
    }
  },
  
  computed: {
    ins() {
      this.search()
    }
  },

  mounted(){
    this.now()
  }
}).mount('#app');