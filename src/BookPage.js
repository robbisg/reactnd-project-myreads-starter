import React, { Component } from 'react'
import * as BooksAPI from "./BooksAPI"

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FontIcon from 'material-ui/FontIcon';

class BookPage extends Component {

  state = {
    currentBook: "None"
  }

  componentWillMount() {
    console.log("componentDidMount")
    BooksAPI.get(this.props.bookId).then((book) => {
      console.log(book)
        this.setState({currentBook: book})
      }
    )
  }

  render () {
    console.log(this.props.bookId)
    const imgUrl = this.state.currentBook.imageLinks ? (this.state.currentBook.imageLinks.thumbnail) : ('http://placehold.it/128x193')
    let rating = this.state.currentBook.averageRating ? (this.state.currentBook.averageRating) : 0
    rating = Array.apply(null, Array(rating)).map(Number.prototype.valueOf,0)
    const cardStyle = {
      margin: "20px",
      padding: "15px"
    }
    console.log(rating)
    return (

      <Card style={cardStyle}>
        <div style={{position:"relative", display:"flex"}}>
          <div style={{width:"16.66%"}}>
            <CardMedia>
              <img src={imgUrl} alt="" />
            </CardMedia>
          </div>
          <div style={{width:"83.33%"}}>
            <CardTitle title={this.state.currentBook.title}
              subtitle={this.state.currentBook.authors && (<div>{this.state.currentBook.authors.map((author) => (<span>{author} </span>))}</div>)} />
            <CardText>{this.state.currentBook.description}</CardText>
            <CardActions>
              {rating.map((el, index) =>  ( <FontIcon id={index} className="material-icons">star</FontIcon>))}
            </CardActions>
          </div>
        </div>


      </Card>
    )

  }

}

export default BookPage;
