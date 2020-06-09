import React from 'react'
import { Button, Card} from 'semantic-ui-react'
import classes from './cards.module.css';
import UpdatePostModal from '../Modal/UpdatePostModal/UpdatePostModal';
const cards =(props)=>{

    //let tempposts=[{content: "fdsgfdgf", title: "test", userId: "dBvDbLfE11g4TmjZlD7EDeiSlQ32", id: "-M9HvLq9mI0veIS8xPgy"},,{content: "jncweo", title: "ksdjfk", userId: "dBvDbLfE11g4TmjZlD7EDeiSlQ32", id: "-M9GSHvDg1QcBinixIyz"},{content: "dfggh", title: "dsf", userId: "dBvDbLfE11g4TmjZlD7EDeiSlQ32", id: "-M9GWoheROdYhFtfpj5N"},{content: "jskdhfj", title: "teshjkfsdkfk", userId: "dBvDbLfE11g4TmjZlD7EDeiSlQ32", id: "-M9GSFQsqZWybt3_6Sbk"},{content: "hfhjshdjh", title: "teshjk", userId: "dBvDbLfE11g4TmjZlD7EDeiSlQ32", id: "-M9GSCNOQdI6MRvY0BvU"}];
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
                            {/*updateHandler={props.onUpdateHandler}*/}
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