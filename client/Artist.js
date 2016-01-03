Template.Artist.onCreated(function() {
  var self = this;
  self.autorun(function() {
    var id = FlowRouter.getParam('id');
    self.subscribe('singleArtist', id);
  })
});

Template.Artist.helpers({
  artist: ()=> {
    var id = FlowRouter.getParam('id');
    return Artists.findOne({slug: id});
  }
});
