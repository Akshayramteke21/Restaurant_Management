import React from 'react';
import  delivery from './images/delivery.jpg'
import subscription from './images/subscription.jpg'
import Enquiry from './images/Enquiry.jpg'

const Home = () => (
  <div>
    <div className="jumbotron jumbotron-fluid text-white bg-dark">
      <div className="container text-center">
        <h1 className="display-2">Welcome to Our Restaurant</h1>
        <p className="lead">Dine, Deliver, Delight: Your Culinary Journey Starts Here </p>
      </div>
    </div>

    <div className="container mt-5">
      <div className="row">
        <div className="col-md-4">
          <div className="card">
            <img src={subscription}
             style={{width: '100%', height: '400px', objectFit: 'cover', aspectRatio:'3/2'}}
            
            className="card-img-top" alt="Monthly Subscription" />
            <div className="card-body">
              <h5 className="card-title">Monthly Subscription</h5>
              <p className="card-text">Enjoy exclusive benefits with our monthly subscription plans.</p>
              <a href="#" className="btn btn-primary">Learn More</a>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <img src={delivery} 
             style={{width: '100%', height: '400px', objectFit: 'cover', aspectRatio:'3/2'}}
            
            className="card-img-top" alt="Delivery Service" />
            <div className="card-body">
              <h5 className="card-title">Delivery Service</h5>
              <p className="card-text">From Our Kitchen to Your Couch: Favorite Meals, Delivered</p>
              <a href="#" className="btn btn-primary">Order Now</a>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <img src={Enquiry} 
             style={{width: '100%', height: '400px', objectFit: 'cover', aspectRatio:'3/2'}}
            
            className="card-img-top" alt="Food Enquiry" />
            <div className="card-body">
              <h5 className="card-title">Food Enquiry</h5>
              <p className="card-text">Have questions about our menu? Get in touch with us.</p>
              <a href="#" className="btn btn-primary">Contact Us</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Home;
