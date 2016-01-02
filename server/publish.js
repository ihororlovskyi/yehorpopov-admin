Meteor.publish('releases', function(){
  return Releases.find({author: this.userId});
  // return Releases.find({});
});

Meteor.publish('singleRelease', function(id){
  check(id, String);
  return Releases.find({slug: id});
});
