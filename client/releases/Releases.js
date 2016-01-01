Template.Releases.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('releases');
  })
})

Template.Releases.helpers({
  releases: ()=> {
    return Releases.find({}, {sort: {released: -1}});
  }
});
