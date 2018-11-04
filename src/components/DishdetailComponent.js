import React from 'react';
import { Card,CardImg,CardText,CardBody,CardTitle } from 'reactstrap';


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

    function RenderComments({comments}) {
	if(comments != null) {
	var options = {month:"short",day:"numeric",year:"numeric"}
	var list = [];
	for(var i=0; i<4; i++)
	{
	    list.push(<li className="mb-2">{comments[i].comment}</li>);
	    list.push(<li className="mb-2"><span>--{comments[i].author}</span>,<span>{new Date(comments[i].date).toLocaleDateString("en-US",options)}</span></li>);
	}
	return (
	    <div>
	    <h3>Comments</h3>
	    <ul className="list-unstyled">
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

    const DishDetail = (props) =>  {
	if (props.dish != null) {
	return (
	   <div className="container">
	    <div className="row">
		<div className="col-12 col-md-5 m-1">
		    <RenderDish dish={props.dish} />
		</div>
		<div className="col-12 col-md-5 m-1">
		    <RenderComments comments={props.dish.comments} />
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
