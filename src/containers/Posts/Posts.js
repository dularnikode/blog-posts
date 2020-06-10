import React,{Component} from 'react';

import {connect} from 'react-redux';

import Modal from '../../components/Modal/CreatePostModal/CreatePostModal';
//import classes from './Posts.module.css';
import axios from '../../axios-posts';
import Cards from '../../components/Cards/cards';
import Spinner  from '../../components/Spinner/Spinner';
import * as actions from  '../../Store/Actions/index';
class Posts extends Component {

    state={
        post:{
            title:'',
            content:'',
            userId:''
        },
        allPosts:[],
        loading:true,
    }
    
    token=localStorage.getItem('token');
    userId=localStorage.getItem('userId');    

    authtoken=this.props.isAuthenticatedToken == null ? this.token:this.props.isAuthenticatedToken;
    uid=this.props.userId ==null ? this.userId : this.props.userId;
    componentDidMount(){
        if(this.props.isAuthenticatedToken==null){
            this.setState({loading:false});
        }
        if(this.authtoken!==null || undefined){
            this.setState({createPostLoading:true});
            const fetchqueryParams='?auth='+this.authtoken+'&orderBy="userId"&equalTo="'+this.uid+'"';
            axios.get(`/posts.json${fetchqueryParams}`)
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

    deletePostHandler=(deleteId)=>{
        console.log(deleteId);
        if(window.confirm('Do you really want to delete this post?')){
            axios.delete(`posts/${deleteId}.json?auth=${this.authtoken}`)
            .then(response=>{
                alert("Post deleted sucessfully");
                let postsAfterDelete=this.state.allPosts;
                let toDeleteIndex=postsAfterDelete.findIndex((post)=>{
                    if(post!==null && post.id===deleteId){return true;}
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


    postDataHandler=()=>{
        if(this.authtoken){
            const postData={...this.state.post,userId:this.props.userId};

            console.log("databefore post",postData);
            axios.post('/posts.json?auth='+this.authtoken,postData)
            .then( response => {
                alert("Post added successfully !");
                console.log(response.data);
                this.setState(prevState=>(
                    prevState.allPosts.push({...postData,id:response.data.name})
                )); 
 
            })
            .catch(error=>{
                console.log(error);
                this.setState({
                    loading:false
                })
            })
        }
        else{
            this.props.history.push('/login');
        }
    }

    editInputChangedHandler=(event,editPostId)=>{
        event.preventDefault();
        let toEditPostsArray=[...this.state.allPosts];
        let toEditIndex=toEditPostsArray.findIndex((post)=>post.id===editPostId);
        toEditPostsArray[toEditIndex][event.target.name]=event.target.value;
        //this.toupdatePost[event.target.name]=event.target.value;
        this.setState({
            post:toEditPostsArray[toEditIndex]
        });
        this.setState({
            allPosts:toEditPostsArray
        });
    }

    onUpdateHandler =(event,updateId)=>{ 
        event.preventDefault();
        if(this.authtoken){
            const updatedPost={...this.state.post};
 
            axios.patch(`posts/${updateId}.json?auth=${this.authtoken}`,updatedPost)
            .then(response => {
                    this.setState({updatePostLoading:false});
                    console.log(response);
                    alert("Post Edited Sucessfully");
            })
            .catch(error => {

                console.log(error);
            });
        }
        else{
            this.props.history.push('/login');
        }
        
    }

    render(){
        let cards=(
            <Cards
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
                    inputChangedHandler={this.inputChangedHandler}
                    postDataHandler={this.postDataHandler}/> 
                {cards}                   
            </>
        );
    }
}

const mapStateToProps=(state)=>{
    return{
        isAuthenticatedToken:state.token,
        userId:state.userId,
    }
};
const mapDispatchToProps = dispatch => {
    return {
        onRefresh:(token,userId)=>dispatch( actions.relogAfterRefresh(token,userId))
    };
};
export default connect(mapStateToProps,mapDispatchToProps)(Posts);