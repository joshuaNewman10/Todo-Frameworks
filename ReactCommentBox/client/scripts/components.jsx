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
    handleCommentSubmit: function(comment) {
      var comments = this.state.comments;
      var newComments = comments.concat([comment]);
      this.setState({comments: newComments});
     $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data:comment,
      success: function(data) {
        this.setState({
          comments: data
        });
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
     });
    },
    render: function() {
      return (
        <div className="outer-container">
          <h1>Comments</h1>
          <CommentList 
           comments = {this.state.comments}
          />
          <CommentForm 
            onCommentSubmit = {this.handleCommentSubmit}
          />
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
    handleSubmit: function(event) {
      event.preventDefault();
      var author = React.findDOMNode(this.refs.author).value.trim();
      var text = React.findDOMNode(this.refs.text).value.trim();
      if( !text || !author ) {
        return;
      }
      this.props.onCommentSubmit({
        author: author,
        text: text
      });
      React.findDOMNode(this.refs.author).value = '';
      React.findDOMNode(this.refs.text).value = '';
      return;
    },
    render: function() {
      return (
        <form className ="commentForm" onSubmit = {this.handleSubmit}>
          <input type="text" placeholder="your name" ref="author"/>
          <input type="text" placeholder="say something..." ref="text"/>
          <input type="submit" value="Post" />
        </form>
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