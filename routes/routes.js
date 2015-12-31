FlowRouter.route('/', {
  name: 'home',
  action() {
    BlazeLayout.render('Default');
  }
});

FlowRouter.route('/releases', {
  name: 'releases',
  action() {
    BlazeLayout.render('Default', {main: 'Releases'});
  }
});

FlowRouter.route('/artists', {
  name: 'artists',
  action() {
    BlazeLayout.render('Default', {main: 'Artists'});
  }
});

FlowRouter.route('/admin', {
  name: 'admin',
  action() {
    BlazeLayout.render('Admin', {main: 'AdminReleases'});
  }
});

