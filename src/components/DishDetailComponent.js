import React from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';



    const DishDetail = (props) => {
        console.log(props.dish)
        const dish = props.dish;

        if (dish != null) {
            return (
                <div className="row">
                    {/* <Card>
                        <CardImg width="100%" src={dish.image} alt={dish.name} />
                        <CardBody>
                            <CardTitle>{dish.name}</CardTitle>
                            <CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card> */}
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={props.dish}/>
                    </div>

                    <div className="col-12 col-md-5 m-1">
                        <h4>Comments:</h4>
                        <RenderComments dish={props.dish}/>
                    </div>
                </div>
            )
        }
        else {
            return (
                <div></div>
            )
        }
    }

    function RenderDish({dish}) {
        if (dish != null)
            return (
                <Card key={dish.id} onClick={() => this.props.onClick(dish.id)}>
                    <CardImg top src={dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            );
        else
            return (
                <div></div>
            );
    }

    function RenderComments({dish}) {

        return (
            <ul className="list-unstyled">
                {dish.comments.map(comment => {
                    return (
                        <li key={comment.id}>
                            <p>{comment.comment}</p>
                            <p>{"-- " + comment.author + " ," + new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(comment.date)))}</p>
                        </li>
                    )
                })}
            </ul>
        );
    }



export default DishDetail;