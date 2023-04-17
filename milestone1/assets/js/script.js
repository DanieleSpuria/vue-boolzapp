const {createApp} = Vue;
import contacts from './db.js';

createApp({
  data() {
    return{
      contacts,
    }
  },

  mounted(){
    console.log(this.contacts);
  }
}).mount('#app');