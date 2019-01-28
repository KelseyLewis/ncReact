import React, { Component } from 'react';
import Menu from './MenuComponent';
import DishDetail from './DishDetailComponent';
import { DISHES } from '../shared/dishes';
import { COMMENTS } from '../shared/comments';
import { LEADERS } from '../shared/leaders';
import { PROMOTIONS } from '../shared/promotions';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import About from './AboutComponent';
import Contact from './ContactComponent';
import { Switch, Route, Redirect} from 'react-router-dom';


class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
        dishes: DISHES,
        comments: COMMENTS,
        leaders: LEADERS,
        promos: PROMOTIONS
    };
  }

  render() {
    const HomePage = () => {
      return (
        <Home dish={this.state.dishes.filter((dish) => dish.featured)[0]}
          leader={this.state.leaders.filter((leader) => leader.featured)[0]}
          promo={this.state.promos.filter((promo) => promo.featured)[0]} />
      );
    }

    //because <Route link that calls this function has path="/menu/:dishId", 
    //everything after colon is passed as the {match} variable to the function.
    //In this case match = dishId as a string. Ex '0' - have to use match.params.name to access match value
    const DishWithId = ({match}) => {
      return(
        <DishDetail dish={this.state.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]} 
          //returns a comments array
          comments={this.state.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))} />
      );
    };

    return (
        <div>
            <Header />
            <Switch>
              <Route path="/home" component={HomePage} />
              <Route path="/aboutus" render={() => <About leaders={this.state.leaders} />} />
              <Route exact path="/menu" render={() => <Menu dishes={this.state.dishes} />} />
              <Route path="/menu/:dishId" component={DishWithId} />
              <Route exact path="/contactus" component={Contact} />
              <Redirect to="/home" />
            </Switch>
            <Footer />
        </div>
    );
  }
}

export default Main;
