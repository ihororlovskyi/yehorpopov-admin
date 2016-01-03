if (Meteor.isClient) {
  Accounts.onLogin(function() {
    FlowRouter.go('admin');
  });

  Accounts.onLogout(function() {
    FlowRouter.go('home');
  });
}

FlowRouter.route('/', {
  name: 'home',
  action() {
    GAnalytics.pageview();
    BlazeLayout.render('Default', {main: 'Home'});
  }
});

FlowRouter.route('/admin', {
  name: 'admin',
  action() {
    GAnalytics.pageview();
    BlazeLayout.render('Default', {main: 'Admin'});
  }
});

FlowRouter.route('/releases', {
  name: 'releases',
  action() {
    GAnalytics.pageview();
    BlazeLayout.render('Default', {main: 'Releases'});
  }
});

FlowRouter.route('/release/:id', {
  name: 'release',
  action() {
    GAnalytics.pageview();
    BlazeLayout.render('Default', {main: 'Release'});
  }
});

FlowRouter.route('/artists', {
  name: 'artists',
  action() {
    GAnalytics.pageview();
    BlazeLayout.render('Default', {main: 'Artists'});
  }
});

FlowRouter.route('/artist/:id', {
  name: 'artist',
  action() {
    GAnalytics.pageview();
    BlazeLayout.render('Default', {main: 'Artist'});
  }
});

