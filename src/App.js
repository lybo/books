import React, { Component } from 'react';
import request from 'request-promise-native';
import './App.css';
// import bg from './bg.jpg';

class App extends Component {
  state = {
    userInfo: false,
    users: [],
    books: [],
  }

  async componentWillMount() {
    const users = await request({
      method: 'GET',
      uri: 'https://api.myjson.com/bins/18wtzc',
    });
    this.setState({
      users: JSON.parse(users),
    });
  }

  render() {
    return (
      <div
        className="App"
      >
        {!this.state.userInfo && (
          <div
            className="login"
          >
            <h2
              className="login__title"
            >
              Books
            </h2>
            <form
              className="login__form"
              onSubmit={async (e) => {
                e.preventDefault();
                const userInfo = this.state.users.find(user => user.username === this.username.value);

                if (!userInfo || !userInfo.uri) {
                  return;
                }

                const books = await request({
                  method: 'GET',
                  uri: userInfo.uri,
                });
                this.setState({
                  userInfo,
                  books: JSON.parse(books),
                });
              }}
            >
              <input
                id="username"
                type="text"
                name="username"
                defaultValue=""
                className="login__input"
                placeholder="Username"
                ref={(username) => this.username = username}
              />
              <button
                className="login__button"
              >
                Load books
              </button>
            </form>
          </div>
        )}
        {this.state.userInfo && (
          <div>
            <div
              className="user-info"
            >
              <div
                className="user-info__welcome"
              >
                hi, {this.state.userInfo.username}
              </div>
              <button
                className="user-info__logout"
                onClick={() => {
                  this.setState({
                    userInfo: false,
                    books: [],
                  });
                }}
              >
                load another user
              </button>
            </div>

            <div
              className="books"
            >
              {this.state.books.map(book => (
                <div
                  key={book.link}
                  className="book"
                >
                  <div
                    className="book_image-container"
                  >
                    <img
                      className="book__image"
                      src={book.img}
                      alt={book.title}
                    />
                  </div>
                  <div
                    className="book__content"
                  >
                    <h3
                      className="book__title"
                    >
                      {book.title}
                    </h3>
                    <a
                      className="book__link"
                      target="_blank"
                      rel="noopener noreferrer"
                      href={book.link}
                    >
                      visit
                    </a>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}
      </div>
    );
  }
}

export default App;
