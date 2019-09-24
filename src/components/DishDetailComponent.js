import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Button, Label, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => !(val) || (val.length >= len);

class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            isModalOpen: false
        }
    }
    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit(values) {
        this.toggleModal();
        this.props.addComment(this.props.dishId, values.rating, values.author, values.comment)
    }

    render() {
        return (
            <div>
                <Button outline onClick={this.toggleModal}>
                    <span className="fa fa-pencil fa-lg" />
                    Submit Comment
                </Button>
                <Modal toggle={this.toggleModal} isOpen={this.state.isModalOpen}>
                    <ModalHeader toggle={this.toggleModal}>
                        Submit comment
                        </ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => { this.handleSubmit(values) }}>
                            <div className="form-group">
                                <Label forHtml="rating">Rating:</Label>
                                <Control.select model=".rating" name="rating"
                                    className="form-control">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Control.select>
                            </div>
                            <div className="form-group">
                                <Label forHtml="author">Author:</Label>
                                <Control.text model=".author" name="author" className="form-control"
                                    placeholder="Author"
                                    validators={{
                                        required, minLength: minLength(3), maxLength: maxLength(15)
                                    }} />
                                <Errors className="text-danger"
                                    model=".author"
                                    show="touched"
                                    messages={{
                                        required: 'Required',
                                        minLength: 'Must be greater than 2 characters',
                                        maxLength: 'Must be 15 characters or less',
                                    }} />
                            </div>
                            <div className="form-group">
                                <Label htmlFor="comment">Comment</Label>
                                <Control.textarea model=".comment" id="comment" name="comment"
                                    className="form-control" rows="8"
                                />
                            </div>
                            <Button type="submit" color="primary">Submit</Button>
                        </LocalForm>
                    </ModalBody>
                </Modal>

            </div>

        );
    }
}
const DishDetail = (props) => {
    console.log(props.dish)



    if (props.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    else if (props.errMess) {
        return (
            <div className="container">
                <div className="row">
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    }
    else if (props.dish != null) {
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={props.dish} />
                    </div>
                    {/* <div className="col-12 col-md-5 m-1"> */}
                    <RenderComments comments={props.comments} addComment={props.addComment}
                        dishId={props.dish.id} />
                    {/* </div> */}
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

function RenderDish({ dish }) {
    if (dish != null)
        return (
            <Card>
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

function RenderComments({ comments, addComment, dishId }) {
    if (comments != null) {
        return (
            <div className="col-12 col-md-5 m-1">
                <h4>Comments:</h4>
                <ul className="list-unstyled">
                    {comments.map(comment => {
                        return (
                            <li key={comment.id}>
                                <p>{comment.comment}</p>
                                <p>{"-- " + comment.author + " ," + new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(comment.date)))}</p>
                            </li>
                        )
                    })}
                </ul>
                <CommentForm dishId={dishId} addComment={addComment} />
            </div>
        )
    }
    else {
        return (
            <div className="col-12 col-md-5 m-1">
                <h3>Error loading comments</h3>
            </div>
        );
    }
}
export default DishDetail;