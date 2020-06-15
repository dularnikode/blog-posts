import React,{Component} from 'react';
import {connect} from 'react-redux';
import Modal from '../../components/Modal/CreatePostModal/CreatePostModal';
import Cards from '../../components/Cards/cards';
import Spinner  from '../../components/Spinner/Spinner';
import * as actions from  '../../Store/Actions/index';
import * as actionTypes from '../../Store/Actions/actionTypes';
import {deletePost,createPost,updatePost,fetchAllPosts} from '../../axios-helper';
import {postValidation} from '../../Shared/Utility';

class Posts extends Component {
    state={
        post:{
            title:'',
            content:'',
            description:'',
            userId:''
        },
        allPosts:[],
        loading:true, 
        errorMessage:''
           
    }
    token=localStorage.getItem('token');
    userId=localStorage.getItem('userId');    
    authtoken=this.props.isAuthenticatedToken == null ? this.token:this.props.isAuthenticatedToken;
    uid=this.props.userId ==null ? this.userId : this.props.userId;
    componentDidMount(){
        this.props.onLoad("posts");
        if(this.props.isAuthenticatedToken==null){
            this.setState({loading:false});
        }
        if(this.authtoken!==null || undefined){
            this.setState({createPostLoading:true});

            fetchAllPosts(this.authtoken,this.uid)
            .then( response => {
                const fetchedPosts= [];
                for ( let Key in response.data ) {
                    fetchedPosts.push( {
                        ...response.data[Key],
                        id:Key
                    });
                }
                this.setState({
                    allPosts:fetchedPosts,
                    loading:false
                });
            })
            .catch(error=>{
                this.setState({
                    loading:false
                });
                console.log(error);
            })
        }
    }

    deletePostHandler=(event,deleteId)=>{
        if(window.confirm('Do you really want to delete this post?')){
            deletePost(this.authtoken,deleteId)
            .then(response=>{
                alert("Post deleted sucessfully !");
                let postsAfterDelete=this.state.allPosts;
                let toDeleteIndex=postsAfterDelete.findIndex((post)=>{
                    let del=false;
                    if(post!==null && post.id===deleteId){del=true}
                    return del;
                });
                postsAfterDelete.splice(toDeleteIndex,1);
                this.setState({allPosts:postsAfterDelete});
            })
            .catch(error=>{
                console.error(error);
            })
        }
    }

    inputChangedHandler=(event)=>{
        let updatedPost={...this.state.post};
        updatedPost[event.target.name]=event.target.value;
        this.setState({post:updatedPost});
    }

    postDataHandler=(event)=>{
        if(this.authtoken){
            if(postValidation(this.state.post)){
                const postData={...this.state.post,userId:this.props.userId};

                createPost(this.authtoken,postData)
                .then( response => {
                    alert("Post added successfully !");
                    this.setState(prevState=>(
                        prevState.allPosts.push({...postData,id:response.data.name})
                    )); 
                    this.setState({
                        errorMessage:''
                    });
                })
                .catch(error=>{
                    console.log(error);
                })    
                return true;
            }else{
                this.setState({
                        errorMessage:"* Please fill required details"
                    });
                return false;
            }   
        }else{
            this.props.history.push('/login');
        }
    }

    editInputChangedHandler=(event,editPostId)=>{
        event.preventDefault();
        let toEditPostsArray=[...this.state.allPosts];
        let toEditIndex=toEditPostsArray.findIndex((post)=>post.id===editPostId);
        toEditPostsArray[toEditIndex][event.target.name]=event.target.value;
        this.setState({
            post:toEditPostsArray[toEditIndex],
            allPosts:toEditPostsArray
        });
    }
    onUpdateHandler =(event,updateId)=>{ 
        event.preventDefault();
        if(this.authtoken){
            const updatedPost={
                title:this.state.post.title,
                content:this.state.post.content,
                description:this.state.post.description,
                userId:this.state.post.userId                
            };
            if(postValidation(updatedPost)){
                updatePost(this.authtoken,updateId,updatedPost)
                .then(response => {
                        this.setState({errorMessage:''});
                        alert("Post Edited Sucessfully");
                })
                .catch(error => {
                    console.log(error);
                });
                return true;
            }
            else{
                this.setState({
                    errorMessage:"* Please fill required details"
                });
                return false;
            }
            
        }
        else{
            this.props.history.push('/login');
        }
        
    }
    postSelectedHandler = (event,postId ) => {
        this.props.history.push( '/posts/' + postId );
    }
    render(){
        
        let cards=(
            <Cards
            errorMessage={this.state.errorMessage}
            isLoggedIn={this.props.isAuthenticatedToken !==null }
            clickHandler={this.postSelectedHandler}
            deletePostHandler={this.deletePostHandler} 
            allPosts={this.state.allPosts}
            editInputChangedHandler={this.editInputChangedHandler}
            onUpdateHandler={this.onUpdateHandler}/>
        );
        if(this.state.loading){
            cards=(<Spinner/>);
        }
        return(
            <>
                <Modal
                    errorMessage={this.state.errorMessage}
                    isLoggedIn={this.props.isAuthenticatedToken!==null}
                    inputChangedHandler={this.inputChangedHandler}
                    postDataHandler={this.postDataHandler}/> 
                {cards}              
            </>
        );
    }
}

const mapStateToProps=(state)=>{
    return{
        isAuthenticatedToken:state.auth.token,
        userId:state.auth.userId,
    }
};
const mapDispatchToProps = dispatch => {
    return {
        onRefresh:(token,userId)=>dispatch( actions.relogAfterRefresh(token,userId)),
        onLoad:(activeMenu)=>dispatch({type:actionTypes.CHANGE_ACTIVE_STATE,ActiveState:activeMenu})
    };
};
export default connect(mapStateToProps,mapDispatchToProps)(Posts);