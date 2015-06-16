import Service from '../common/service';
import $ from 'jquery';

import ConfirmSitView from './confirmSit/layout-view';
import SittingView from './sitting/layout-view';


export default Service.extend({
  channelName: 'socket',
  socket: null,
  currentConfirmSitViewSeat: null,
  userId: null,

  initialize(options) {
    this.container = options.container;

    this.start();

  },

  onStart(options) {

    this.channel.comply('register', this.register, this);

    //this.sittingView = new SittingView();
  },

  init(uri) {
    this.socket = window.io.connect(uri);
  },

  register(userId) {

    this.socket.emit('register', { userId });

    this.socket.on('sitConfirm', this.onSitConfirm.bind(this));
    this.socket.on('cancelSitConfirm', this.onCancelSitConfirm.bind(this));

  },

  openConfirmSit() {

    this.confirmSitView = new ConfirmSitView();

    this.listenTo(this.confirmSitView, 'confirmSit', this.onUiConfirmSit);
    this.listenTo(this.confirmSitView, 'discardSit', this.onUiDiscardSit);

    this.container.show(this.confirmSitView);
    setTimeout(() => {
      this.confirmSitView.show();
    }, 100);

  },

  closeConfirmSit() {
    this.confirmSitView.hide();
    this.currentConfirmSitViewSeat = null;
    setTimeout(() => {
      this.container.empty();
    }, 1000);
  },

  // UI EVENTS

  onUiConfirmSit() {
    console.log('onUiConfirmSit');
    this.socket.emit('confirmSit', { 
      userId: this.userId,
      seat: this.currentConfirmSitViewSeat
    });
  },

  onUiDiscardSit() {
    console.log('onUiDiscardSit');
    this.closeConfirmSit();
  },

  // SERVER SOCKET EVENTS

  onSitConfirm(data) {
    console.log('onSitConfirm', data);
    if (!this.currentConfirmSitViewSeat) {
      this.currentConfirmSitViewSeat = data.seat;
      this.openConfirmSit();
    }
  },

  onCancelSitConfirm(data) {
    console.log('onCancelSitConfirm', data);
    if (this.currentConfirmSitViewSeat === data.seat) {
      this.closeConfirmSit();
    }
  }

});
