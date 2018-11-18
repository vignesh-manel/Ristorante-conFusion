import React, { Component } from 'react';
import { Card,CardImg,CardText,CardBody,CardTitle,
	Breadcrumb, BreadcrumbItem, Button,
	Modal, ModalHeader, ModalBody,Row, Col, Label } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';

const maxLength = (len) => (val) => !(val) || (val.length <=len );
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends Component {

	constructor(props) {
	    super(props);

	    this.state= {
		isModalOpen: false
	    }

	    this.toggleModal = this.toggleModal.bind(this);
	    this.handleSubmit = this.handleSubmit.bind(this);

	}

	handleSubmit(values) {
	    this.toggleModal();
	    this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
	}

	toggleModal() {
	    this.setState({
		isModalOpen: !this.state.isModalOpen
	    });
	}

	render() {

	return (
	    <div>
		<Button outline onClick={this.toggleModal}><span className="fa fa-pencil fa-lg"></span> Submit Comment </Button>
		<Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal} >
		    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
		    <ModalBody>
			<LocalForm onSubmit={(values) => this.handleSubmit(values)}>
			    <Row className="form-group">
				<Label xs={12} htmlFor="rating">Rating</Label>
				<Col>
				    <Control.select model=".rating" name="rating" className="form-control" >
					<option>1</option>
					<option>2</option>
					<option>3</option>
					<option>4</option>
					<option>5</option>
				    </Control.select>
				</Col>
			    </Row>
			    <Row className="form-group">
				<Label xs={12} htmlFor="author">Your Name</Label>
				<Col xs={12}>
				<Control.text model=".author" name="author" id="author" placeholder="Your Name" className="form-control" 
				validators={{minLength: minLength(3), maxLength: maxLength(15) }}/>
				</Col>
				<Col>
				<Errors className="text-danger"  model=".author" show="touched" 
				messages={{minLength: 'Must be atleast 3 characters', maxLength: 'Must be 15 characters or less'}}/>
				</Col>
			    </Row>
			    <Row className="form-group">
			    <Label xs={12} htmlFor="comment">Comment</Label>
			    <Col>
				<Control.textarea model=".comment" name="comment" id="comment" rows="6" className="form-control" />
			    </Col>
			    </Row>
			    <Row className="form-group">
				<Col>
				    <Button type="submit" color="primary">Submit</Button>
				</Col>
			    </Row>
			</LocalForm>
		    </ModalBody>
		</Modal>
	    </div>
	);
    }
}

    function RenderDish({dish}) {
	if (dish != null) {
	    return (
		<Card>
		    <CardImg width="100%" src={dish.image} alt={dish.name} />
		    <CardBody>
			<CardTitle>{dish.name}</CardTitle>
			<CardText>{dish.description}</CardText>
		    </CardBody>
		</Card>
	    );
	}
	else {
	     return (
		<div></div>
	     );
	}
    }

    function RenderComments({comments,addComment, dishId}) {
	if(comments != null) {
	var options = {month:"short",day:"numeric",year:"numeric"}
	var list = [];
	for(var i=0; i<comments.length; i++)
	{
	    list.push(<li className="mb-2">{comments[i].comment}</li>);
	    list.push(<li className="mb-2"><span>--{comments[i].author}</span>,<span>{new Date(comments[i].date).toLocaleDateString("en-US",options)}</span></li>);
	}
	return (
	    <div className="container">
	    <h3>Comments</h3>
	    <ul className="list-unstyled">
		{list}
	    </ul>
	    <CommentForm dishId={dishId} addComment={addComment}/>
	    </div>
	);
	}
	else {
	    return (
		<div></div>
	    );
	}
    }

    const DishDetail = (props) =>  {
	if (props.isLoading) {
	    return (
	    	<div className="container">
		    <div className="row">
			<Loading />
		    </div>
		</div>
	    );
	}
	else if(props.errMess) {
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
			<BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
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
		<div className="col-12 col-md-5 m-1">
		    <RenderComments comments={props.comments} addComment={props.addComment}
			dishId={props.dish.id}/>
		</div>
	    </div>
	    </div>
    );
    }
    else {
	return (
	    <div></div>
	);
    }
    }



export default DishDetail;
