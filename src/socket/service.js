import Service from '../common/service';
import $ from 'jquery';

import ConfirmSitView from './confirmSit/layout-view';
import SittingView from './sitting/layout-view';


export default Service.extend({
  channelName: 'socket',
  socket: null,
  currentConfirmSitViewSeat: null,
  userId: null,
  socketState: null,

  initialize(options) {
    this.container = options.container;
    this.start();
  },

  onStart() {
    this.channel.comply({
      bindEvents: this.bindEvents
    }, this);
  },

  init(uri) {
    this.socket = window.io.connect(uri);
  },

  bindEvents(userId) {
    this.userId = userId;
    this.socket.on('sitConfirm', this.onSitConfirm.bind(this));
    this.socket.on('sitConfirmed', this.onSitConfirmed.bind(this));
    this.socketState = 'ready';
  },


  // SERVER SOCKET EVENTS

  onSitConfirm(data) {
    console.log('onSitConfirm', data);
    if (this.socketState === 'ready') {
      this.currentConfirmSitViewSeat = data.seat;
      this.openConfirmSitModal();
    }
  },

  onSitConfirmed(data) {
    console.log('onSitConfirmed', data);

    // Currently displaying confirmSit modal
    if (this.socketState === 'waitingConfirmSit') {

      // Confirmed sit is the same as the one waiting to confirm
      if (this.currentConfirmSitViewSeat === data.seat) {
        this.closeConfirmSitModal(() => {

          // Confirmed user id is current user id -> link is confirmed
          if (data.userId === this.userId) {
            this.openSittingModal();
          } else {
            this.socketState = 'ready';
          }
        });
      } else {

      }
    }
  },


  // UI

  openConfirmSitModal() {

    this.socketState = 'waitingConfirmSit';
    this.confirmSitView = new ConfirmSitView();

    this.listenTo(this.confirmSitView, 'confirmSit', this.onUiConfirmSit, this);
    this.listenTo(this.confirmSitView, 'discardSit', this.onUiDiscardSit, this);

    this.container.show(this.confirmSitView);
    setTimeout(() => {
      this.confirmSitView.show();
    }, 100);
  },

  closeConfirmSitModal(done) {
    this.confirmSitView.hide();
    this.currentConfirmSitViewSeat = null;
    setTimeout(() => {
      this.container.empty();
      if (done) {
        done();
      }
    }, 300);
  },

  openSittingModal() {

    this.socketState = 'sitting';
    this.sittingView = new SittingView();

    // this.listenTo(this.sittingView, 'confirmSit', this.onUiConfirmSit);
    // this.listenTo(this.sittingView, 'discardSit', this.onUiDiscardSit);

    this.container.show(this.sittingView);

    setTimeout(() => {
      this.sittingView.show();
    }, 100);

  },


  // UI EVENTS

  onUiConfirmSit() {
    console.log('onUiConfirmSit', this);
    this.socket.emit('confirmSit', { 
      userId: this.userId,
      seat: this.currentConfirmSitViewSeat
    });
  },

  onUiDiscardSit() {
    console.log('onUiDiscardSit');
    this.socketState = 'ready';
    this.closeConfirmSitModal();
  }

});

