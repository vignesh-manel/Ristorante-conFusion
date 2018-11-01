import React, { Component } from 'react';
import { Card,CardImg,CardText,CardBody,CardTitle } from 'reactstrap';

class DishDetail extends Component {
    constructor(props) {
	super(props);
    }


    renderDish(dish) {
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

    renderComments(dish) {
	if(dish != null) {
	const comments = dish.comments;
	var options = {month:"short",day:"numeric",year:"numeric"}
	var list = [];
	for(var i=0; i<4; i++)
	{
	    list.push(<li class="mb-2">{comments[i].comment}</li>);
	    list.push(<li class="mb-2"><span>--{comments[i].author}</span>,<span>{new Date(comments[i].date).toLocaleDateString("en-US",options)}</span></li>);
	}
	return (
	    <div>
	    <h3>Comments</h3>
	    <ul class="list-unstyled">
		{list}
	    </ul>
	    </div>
	);
	}
	else {
	    return (
		<div></div>
	    );
	}
    }

    render() {
	const dish = this.props.selectedDish;
	return (
	    <div class="row">
		<div class="col-12 col-md-5 m-1">
		    {this.renderDish(dish)}
		</div>
		<div class="col-12 col-md-5 m-1">
		    {this.renderComments(dish)}
		</div>
	    </div>
    );
    }
}


export default DishDetail;
