import './plugins';
import Backbone from 'backbone';
import $ from 'jquery';

import Application from './application/application';

import ModalService from './modal/service';
import HeaderService from './header/service';
import FlashesService from './flashes/service';

import IndexRouter from './index/router';
// import ColorsRouter from './colors/router';
// import BooksRouter from './books/router';
import UsersRouter from './users/router';

let app = new Application();

app.modal = new ModalService({
  container: app.layout.overlay
});

app.header = new HeaderService({
  container: app.layout.header
});

app.flashes = new FlashesService({
  container: app.layout.flashes
});

app.index = new IndexRouter({
  container: app.layout.content
});

// app.colors = new ColorsRouter({
//   container: app.layout.content
// });

// app.books = new BooksRouter({
//   container: app.layout.content
// });

app.users = new UsersRouter({
  container: app.layout.content
});

$(document).ajaxSend(function(event, request) {
   request.setRequestHeader('access_token', ''); //todo: use GET/POST parameter
});

Backbone.history.start();
