/** @jsx React.Dom */

var app = app || {};

app.FIXTURES = [
  {author: "Pete Hunt", text: "This is one comment"},
  {author: "Jordan Walke", text: "This is another comment"}
];

(function() {
  'use strict';

  app.init = function() {
    var CommentBox = app.components.CommentBox;
    React.render(
      <CommentBox 
        url="comments.json"
        pollInterval = {2000}
      />,
      document.getElementById('comments')
    );
  };
  app.getData = function() {
   console.log('getting fixutres');
   return app.FIXTURES;
  };
  app.init();
})();