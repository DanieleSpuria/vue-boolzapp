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
      clock: null,
      bho: false,
      click: false,
      play: new Audio('meatgrinder.wav'),
      flash: new Audio('risata.mp3')
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
      this.contacts.forEach(contact => {
        if (this.inputSearch === '') contact.visible = true;
        else {
          if (contact.name.toUpperCase().includes(this.inputSearch.toUpperCase())) contact.visible = true;
          else contact.visible = false;
        }  
      })
    },

    now() {
      setInterval(() => {
        this.clock = dt.now().toLocaleString(dt.DATETIME_SHORT_WITH_SECONDS); 
      },1000)
    },

    audioPlay(){
      this.play.play()
      this.click = !this.click;
    },
    
    audioPause(){
      this.play.pause()
      this.click = !this.click;
    },

    bHo() {
      this.bho = !this.bho;
      this.flash.play()
      this.audioPause()
    }
  },
  
  mounted(){
    this.now()
  }
}).mount('#app');