Meteor.publish('releases', function(){
  return Releases.find({author: this.userId});
  // return Releases.find({});
});

Meteor.publish('singleRelease', function(id){
  check(id, String);
  return Releases.find({slug: id});
});

Meteor.publish('artists', function(){
  return Artists.find({author: this.userId});
  // return Artists.find({});
});

Meteor.publish('singleArtist', function(id){
  check(id, String);
  return Artists.find({slug: id});
});
