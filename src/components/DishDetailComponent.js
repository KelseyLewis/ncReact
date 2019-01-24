import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';

class DishDetail extends Component {
    constructor (props) {
        super(props); 
    }

    componentDidMount() {
        console.log('DishDetail ComponentDidMount invoked');
    }

    componentDidUpdate() {
        console.log('DishDetail ComponentDidUpdate invoked');
    }

    renderDish(dish) {
        if (dish != null) {
            return (
                <Card>
                    <CardImg width="100%" src={dish.image} alt = {dish.name}></CardImg>
                    <CardBody>
                        <CardTitle> {dish.name}</CardTitle>
                        <CardText> {dish.description}</CardText>
                    </CardBody>
                </Card>
            )
        } else {
            return (
                <div></div>
            );
        }
    }

    renderComments(dish) {
        if (dish != null) {
            return (
                <div className = "col-12 col-md-5">
                    <h4> Comments</h4>
                    <ul className="list-unstyled">
                        {dish.comments.map((comment) => {
                            return (
                                <li key = {comment.id}>
                                    <p>{comment.comment}</p>
                                    <p>--{comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            );
        } else {
            return (
                <div></div>
            );
        }
    }

    render() {
        return (
            <div className = "container">
                <div className = "row">
                    <div className = "col-12 col-md-5 m-1">
                        {this.renderDish(this.props.selectedDish)}
                    </div>
                    {this.renderComments(this.props.selectedDish)}
                </div>
            </div>
        );
    }
}

export default DishDetail;
