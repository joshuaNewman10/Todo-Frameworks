/** @jsx React.Dom */

var app = app || {};
app.components = app.components || {};

(function() {
  var CommentBox = app.components.CommentBox = React.createClass({
    getInitialState: function() {
     return {
      comments: []
     };
    },
    componentWillMount: function() {
      console.log('about to put commentbox component on page');
    },
    loadCommentsFromServer: function() {
      $.ajax({
        url: this.props.url,
        dataType: 'json',
        success: function(data) {
          this.setState({comments: data}); //setting state here
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });
    },
    componentDidMount: function() {
      var data = this.loadCommentsFromServer();
      setInterval(this.loadCommentsFromServer, this.props.pollInterval);
    },
    render: function() {
      return (
        <div className="outer-container">
          <h1>Comments</h1>
          <CommentList 
           comments = {this.state.comments}
          />
          <CommentForm />
        </div>
      );
    }
  });

  var CommentList = app.components.CommentList = React.createClass({
    render: function() {
      return (
        <div className="comments">
          {this.props.comments.map(function(comment, index) {
            return (
              <Comment
               comment={comment}
               index={index}
              />
            );
          }.bind(this))}
        </div>
      );
    }
  });

  var CommentForm = app.components.CommentForm = React.createClass({
    render: function() {
      return (
        <div className="commentForm">
        Im the commentform
        </div>
      );
    }
  });

  var Comment = app.components.Comment = React.createClass({
    render: function() {
      return (
        <div className="comment">
          <p className="commentAuthor">
          {this.props.comment.author}
          {this.props.comment.text}
          </p>
        </div>
      );
    }
  });
})();