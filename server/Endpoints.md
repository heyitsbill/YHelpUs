/messages
    GET /:userID
        returns all messages from or to the user
    GET /:postID
        returns all messages on the post from anyone
    POST /:currentPost/:currentUser
        creates message using the body of the request

/user/
    

/posts/
    POST /
        creates new post using request body
    GET /active
        returns all active posts
    DELETE /:postID
        deletes post specified
    GET /
        returns ALL posts
    GET /:userID
        returns all posts relating to the user
    GET /mine/:userID
        returns all posts created by user
    GET /theirs/:userID
        returns all posts accepted by user

