import React,{ PureComponent } from 'react';
import classes from './PostDetails.module.css';
import axios from '../../axios-posts';
import {connect} from 'react-redux';
import Spinner from '../../components/Spinner/Spinner';
class PostDetails extends PureComponent {

    state={
        loadedPost:null,
        loading:true
    }

    componentDidMount(){
        this.loadPost();
    }
    loadPost(){
        if(this.props.match.params.id){
            axios.get('/posts/'+this.props.match.params.id+'.json?auth='+this.props.isAuthenticatedToken)
            .then(response=>{
                this.setState({     
                    loadedPost:response.data,
                    loading:false
                });
            })
            .catch(error=>{
                console.log(error);
                this.setState({loading:false})
            })
        }
    }

    render () {
        let post=<Spinner/>;
        if(this.state.loadedPost!==null && !this.state.loading){
            post=(
                <div className={classes.PostDetails}>
                    <h2 className={classes.Title}>Post Details</h2>
                    <div className={classes.Container}>
                        <div className={classes.Heading}><h3><strong>Title : </strong></h3></div>
                        <div className={classes.Content}>{this.state.loadedPost.title}</div>
                    </div>
                    <div className={classes.Container}>
                    <div className={classes.Heading}><h3><strong>Content : </strong></h3></div>
                       <div className={classes.Content}>{this.state.loadedPost.content}</div> 
                    </div>
                    <div className={classes.Container}>
                    <div className={classes.Heading}><h3><strong>Description : </strong></h3></div>
                       <div className={classes.Content}>{this.state.loadedPost.description}</div> 
                    </div>
                </div>
            );
        }
        return (
            <>
                {post}
            </>
        
        );
    }
}

const mapStateToProps=(state)=>{
    return{
        isAuthenticatedToken:state.token
    }
};

export default connect(mapStateToProps)(PostDetails);
