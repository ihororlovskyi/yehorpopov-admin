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
  released: {
    type: Date,
    label: "Released",
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

Releases.attachSchema( ReleaseSchema );
