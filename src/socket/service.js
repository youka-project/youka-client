import Service from '../common/service';
import $ from 'jquery';
import LayoutView from './layout-view';


export default Service.extend({
  channelName: 'socket',
  socket: null,

  initialize(options) {
    this.container = options.container;
    this.socket = window.io.connect('http://localhost:9000');

    this.start();

  },

  onStart() {

    this.channel.reply({
      'open' : this.open,
      'close' : this.close
    }, this);

    this.channel.comply('register', this.register, this);

    this.layout = new LayoutView();
  },

  register(userId) {

    this.socket.emit('register', { userId });

    this.socket.on('sit', (data) => {
      console.log('sit', data);
    });

  },

  open() {
    this.container.show(this.layout);
    setTimeout(() => {
      this.layout.show();
    }, 1000);
  },

  close() {
    this.container.empty();
  }

});
