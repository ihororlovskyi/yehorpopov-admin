Releases = new Mongo.Collection('releases');

Releases.allow({
  insert: function(userId, doc) {
    return !!userId;
  }
});

ReleaseSchema = new SimpleSchema({
  artist: {
    type: String,
    label: "Artist"
  },
  title: {
    type: String,
    label: "Title"
  },
  slug: {
    type: String,
    label: "Slug"
  },
  bandcamp: {
    type: String,
    label: "Bandcamp"
  },
  dateCreated: {
    type: Date,
    label: "Date Created",
    autoValue: function(argument) {
      return new Date()
    },
    autoform: {
      type: "hidden"
    }
  },
  author: {
    type: String,
    label: "Author",
    autoValue: function(argument) {
      return this.userId
    },
    autoform: {
      type: "hidden"
    }
  }
});

Meteor.methods({
  deleteRelease: function(id) {
    Releases.remove(id);
  }
});

Releases.attachSchema( ReleaseSchema );
