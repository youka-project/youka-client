import Service from '../common/service';
import $ from 'jquery';


export default Service.extend({
  channelName: 'socket',
  socket: null,

  initialize() {

    this.start();
    this.socket = window.io.connect('http://localhost:9000');

    this.channel.comply('register', this.register, this);

  },

  register(userId) {

    this.socket.emit('register', { userId });

    this.socket.on('sit', (data) => {
      console.log('sit');
    });

  }

});
