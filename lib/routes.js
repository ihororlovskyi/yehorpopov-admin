FlowRouter.route('/', {
  name: 'home',
  action() {
    BlazeLayout.render('HomeLayout');
  }
});

FlowRouter.route('/releases', {
  name: 'releases',
  action() {
    BlazeLayout.render('MainLayout', {main: 'Releases'});
  }
});

FlowRouter.route('/artists', {
  name: 'artists',
  action() {
    BlazeLayout.render('HomeLayout');
  }
});
