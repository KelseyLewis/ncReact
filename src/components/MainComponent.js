import React, { Component } from 'react';
import Menu from './MenuComponent';
import DishDetail from './DishDetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import About from './AboutComponent';
import Contact from './ContactComponent';
import { Switch, Route, Redirect, withRouter} from 'react-router-dom';
import { connect } from 'react-redux';


const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promos: state.promotions,
    leaders: state.leaders
  }
}


class Main extends Component {

  constructor(props) {
    super(props);

    };

  render() {
    const HomePage = () => {
      return (
        <Home dish={this.props.dishes.filter((dish) => dish.featured)[0]}
          leader={this.props.leaders.filter((leader) => leader.featured)[0]}
          promo={this.props.promos.filter((promo) => promo.featured)[0]} />
      );
    }

    //because <Route link that calls this function has path="/menu/:dishId", 
    //everything after colon is passed as the {match} variable to the function.
    //In this case match = dishId as a string. Ex '0' - have to use match.params.name to access match value
    const DishWithId = ({match}) => {
      return(
        <DishDetail dish={this.props.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]} 
          //returns a comments array
          comments={this.props.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))} />
      );
    };

    return (
        <div>
            <Header />
            <Switch>
              <Route path="/home" component={HomePage} />
              <Route path="/aboutus" render={() => <About leaders={this.props.leaders} />} />
              <Route exact path="/menu" render={() => <Menu dishes={this.props.dishes} />} />
              <Route path="/menu/:dishId" component={DishWithId} />
              <Route exact path="/contactus" component={Contact} />
              <Redirect to="/home" />
            </Switch>
            <Footer />
        </div>
    );
  }
}

export default withRouter(connect(mapStateToProps)(Main));
