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
            <Card  color="grey"  >
                <Card onClick={(event)=>props.clickHandler(event,post.id)} >
                    <Card.Content header={post.title}/>
                    <Card.Content description={post.content}/>
                </Card>
                <Card.Content extra>
                    <div className='ui two buttons'>
                            <UpdatePostModal
                                title={post.title}
                                content={post.content}
                                id={post.id}
                                description={post.description}
                                inputChangedHandler={props.editInputChangedHandler}
                                updateHandler={props.onUpdateHandler}
                                /> 
                            <Button 
                                basic color='red'
                                onClick={(event)=>props.deletePostHandler(event,post.id)}>Delete</Button>
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