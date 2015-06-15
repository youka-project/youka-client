import Service from '../common/service';
import $ from 'jquery';


export default Service.extend({
  channelName: 'socket',
  socket: null,

  initialize() {
    this.start();

    this.socket = io.connect('http://localhost:9000');
    console.log(this.socket);
    this.socket.on('news', (data) => {
      console.log(data);
      this.socket.emit('my other event', { my: 'data' });
    });

  },

});
