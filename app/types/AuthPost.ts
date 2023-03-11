export type AuthPosts = {
    email: String
    id: String
    image: String
    name: String
    post: {
        id: String
        title: String
        comments?: {
            id: String
            postId: String
            userId: String
            message: String
        }
    }
}