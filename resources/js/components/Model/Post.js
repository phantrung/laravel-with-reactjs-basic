import ModelAbstract from "./Abstract";

class Post extends ModelAbstract{
    constructor(props) {
        super(props);
        this.BASE_ENDPOINT = '/api/posts'
    }

}
const PostModel = new Post()
export default PostModel
