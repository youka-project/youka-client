import Service from '../common/service';
import $ from 'jquery';

import ConfirmSitView from './confirmSit/layout-view';
import WaitingView from './waiting/layout-view';
import SittingView from './sitting/layout-view';

import storage from '../users/storage'

export default Service.extend({
  channelName: 'socket',
  socket: null,
  currentSeat: null,
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
    this.socket.on('sitLeave', this.onSitLeave.bind(this));

    storage.findAll().then(() => {
      storage.find(userId).then(user => {
        user.fetch();
        this.user = user;
      });
    });

    this.socketState = 'ready';
  },


  // SERVER SOCKET EVENTS

  onSitConfirm(data) {
    console.log('onSitConfirm', data);
    if (this.socketState === 'ready') {
      this.currentSeat = data.seat;
      this.openConfirmSitModal();
    }
  },

  onSitConfirmed(data) {
    console.log('onSitConfirmed', data);
    console.log('socketState', this.socketState);

    // Currently displaying confirmSit modal
    if (this.socketState === 'waitingConfirmSit') {

      // Confirmed sit is the same as the one waiting to confirm
      if (this.currentSeat === data.seat) {
        this.closeConfirmSitModal(() => {

          // Confirmed user id is current user id -> link is confirmed
          if (data.userId === this.userId) {

            // Both seats are connected
            if (data.full) {

              storage.find(data.peerId).then(user => {
                this.peer = user;
                this.openSittingModal();
              });

            } else {

              this.openWaitingModal();

            }

          } else {

            this.socketState = 'ready';

          }
        });
      } 

    // User has already confirmed
    } else if (this.socketState === 'waiting' && data.full) {

      this.closeWaitingModal(() => {

        storage.find(data.userId).then(user => {
          this.peer = user;
          this.openSittingModal();
        });
        
      });
    }
  },

  onSitLeave(data) {

    console.log('onSitLeave', data);

    if (this.socketState === 'waitingConfirmSit' && data.seat === this.currentSeat) {

      this.closeConfirmSitModal();
      this.currentSeat = null;
      this.socketState = 'ready';

    } else if (this.socketState === 'waiting' && data.seat === this.currentSeat) {

      this.closeWaitingModal();
      this.currentSeat = null;
      this.socketState = 'ready';

    } else if (this.socketState === 'sitting') {

      if (data.seat === this.currentSeat) {

        this.closeSittingModal();
        this.currentSeat = null;
        this.socketState = 'ready';

      } else {

        this.closeSittingModal(() => {

          this.openWaitingModal();

        });

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
    setTimeout(() => {
      this.container.empty();
      if (done) {
        done();
      }
    }, 300);
  },

  openWaitingModal() {

    this.socketState = 'waiting';
    this.waitingView = new WaitingView();
    this.waitingView.model = this.user;

    // this.listenTo(this.sittingView, 'confirmSit', this.onUiConfirmSit);
    // this.listenTo(this.sittingView, 'discardSit', this.onUiDiscardSit);

    this.container.show(this.waitingView);

    setTimeout(() => {
      this.waitingView.show();
    }, 100);

  },

  closeWaitingModal(done) {
    this.waitingView.hide();
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
    this.sittingView.model = this.peer;

    // this.listenTo(this.sittingView, 'confirmSit', this.onUiConfirmSit);
    // this.listenTo(this.sittingView, 'discardSit', this.onUiDiscardSit);

    this.container.show(this.sittingView);

    setTimeout(() => {
      this.sittingView.show();
    }, 100);

  },

  closeSittingModal(done) {
    this.sittingView.hide();
    setTimeout(() => {
      this.container.empty();
      if (done) {
        done();
      }
    }, 300);
  },


  // UI EVENTS

  onUiConfirmSit() {
    console.log('onUiConfirmSit', this);
    this.socket.emit('confirmSit', { 
      userId: this.userId,
      seat: this.currentSeat
    });
  },

  onUiDiscardSit() {
    console.log('onUiDiscardSit');
    this.socketState = 'ready';
    this.closeConfirmSitModal();
    this.currentSeat = null;
  }

});

