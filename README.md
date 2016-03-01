# PUG Server

Pug server repository for all your pug api routes.

### Version
1.0.0

### Installation

```sh
$ npm install
$ grunt deploy
```

### Todos

 - Prevent creation of duplicate events (same address and time)
 - More efficient way to remove expired events from a user's events list

### API Routes Examples

```sh
'/api/users/:id/event'
GET request
Request body : {}
Response body: Array of event ids
```

```sh
'/api/events'
GET request
Request body : {}
Response body: Array of event objects
```

```sh
'/api/events/:id'
GET request
Request body : {}
Response body: Event object
```

```sh
'/api/events'
POST request
Request body : {
    type: String,
    location: String,
    latitude: Number,
    longitude: Number,
    startTime: Date,
    endTime: Date,
    skillLevel: String
}
Response body: Event object
```

```sh
'/api/events/users/:id'
POST request
Request body : {
    eventId: String
}
Response body: none
```

```sh
'/api/events/users/:id'
DELETE request
Request body : {
    eventId: String
}
Response body: none
```

License
----

MIT

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)
  [node.js]: <http://nodejs.org>
  [express]: <http://expressjs.com>
  [Grunt]: <http://gruntjs.com/>