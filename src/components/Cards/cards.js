import React from 'react'
import { Button, Card} from 'semantic-ui-react'
import classes from './cards.module.css';
import UpdatePostModal from '../Modal/UpdatePostModal/UpdatePostModal';
const cards =(props)=>{

    let allCards=(
        <div className={classes.ifNoPosts}>
            <p><strong>You don't have any post. Please Add Post </strong></p>
        </div>
    );
    if(props.allPosts.length > 0){
        allCards=props.allPosts.map(post=>(
        <div key={post.id} className={classes.Card}>
            <Card  color="grey">
                <Card.Content>
                    <Card.Header>{post.title}</Card.Header>
                    <Card.Description>{post.content}</Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <div className='ui two buttons'>
                        <UpdatePostModal
                            title={post.title}
                            content={post.content}
                            id={post.id}
                            inputChangedHandler={props.editInputChangedHandler}
                            updateHandler={props.onUpdateHandler}
                            /> 
                        <Button 
                            basic color='red'
                            onClick={()=>props.deletePostHandler(post.id)}>Delete</Button>
                    </div>
                </Card.Content>
            </Card>
        </div>
    ));
    }
    return(
        <div className={classes.Cards}>
            <Card.Group>
                {allCards}
            </Card.Group>
        </div>
    );
}

export default cards;