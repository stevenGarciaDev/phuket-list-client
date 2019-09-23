import React, { Component } from 'react';
import CommentForm from './CommentForm';
import Comment from './Comment';
import _ from 'lodash';

class CommentIcon extends Component {

  render() {
    const { postId, displayComments } = this.props;
    const { comments } = this.props;
    const commentList = _.orderBy(comments, ['dateCreated'], ['desc']);

    return (
      <React.Fragment>
        <div className="comment-icon-container">
          <i onClick={this.props.handleDropdown} className="fa fa-comment-o fa-2x" aria-hidden="true"></i>
          <span>{commentList.length}</span>
        </div>
        { displayComments &&
          <div>
            <CommentForm postId={postId} onNewComment={this.props.onNewComment}/>
            {commentList.length > 0 && commentList.map(comment => (
              <Comment
                author={comment.author}
                postId={postId}
                text={comment.text}
                dateCreated={comment.dateCreated}
              />
            ))}
          </div>
        }
      </React.Fragment>
    );
  }
}

export default CommentIcon;
