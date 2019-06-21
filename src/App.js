import React, { Component } from 'react';
import './App.scss';

const newQuiz = [
{
  name: "Food Quiz",
  author: "Will Luffey",
  questions: [
    {
      questionName: "What do you like most?",
      answers: [
        {
          text: "Bananas"
        },
        {
          text: "Apples"
        },
        {
          text: "Oranges"
        }
      ]
    },
    {
    questionName: "What do you like least?",
      answers: [
        {
          text: "Bananas"
        },
        {
          text: "Apples"
        },
        {
          text: "Oranges"
        }
      ]
    },
    {
    questionName: "What's your favorite color?",
    answers: [
      {
        text: "Red"
      },
      {
        text: "Green"
      },
      {
        text: "Blue"
      }
    ]
  }
  ]
}
]

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quizzes: newQuiz
    }
  }

  // componentDidMount() {
  //   fetch('http://localhost:8080/get-all-quizzes')
  //     .then(response => {
  //       return response.json();
  //     })
  //     .then(myJson => {
  //       this.setState({
  //         quizzes: myJson
  //       }, () => {
  //         console.log(this.state.quizzes);
  //       })
  //     });
  // }

  handleAddQuiz = (e) => {
    e.preventDefault();
    console.log(e);
    fetch('http://localhost:8080/add-quiz', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify(newQuiz),
    })
      .then(res => {
        if (res.status === 200) {
          console.log("Quiz Added")
        } else {
          console.log("Error");
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  render() {
    return (
      <div className="App bg-dark">
      <nav className="navbar navbar-light bg-light">
      <div class="navbar-brand">
      <i class="fas fa-brain mr-2"></i>
        Open Quiz
      </div>
        <i class="far fa-plus-square" onClick={e => this.handleAddQuiz(e)}></i>
      </nav>
      <div class="container">
        {this.state.quizzes.map((quiz, index) => {
          return (
            <div class="card bg-secondary text-light" key={index}>
            <div class="card-body">
              <h5 class="card-title">{quiz.name}</h5>
              <h6 class="card-subtitle mb-2 text-muted">{quiz.author}</h6>
              {quiz.questions.map((question, index) => {
                return (
                  <div className="mt-2" key={index}>
                    <p>{index + 1}. {question.questionName}</p>
                    <div className="btn-group btn-group-toggle" data-toggle="buttons">
                    {question.answers.map((answer, index) => {
                      return (
                        <label className="btn btn-danger">
                        <input type="radio" name="options" id="option{index + 1}" autocomplete="off"/> {answer.text}
                      </label>
                        // <button type="button" class="btn btn-danger">{answer.text}</button>
                      )
                    })}
                    </div>
                  </div>
                )
              })}
              </div>
            </div>
          )
        })}
        </div>
        {/* <button onClick={e => this.handleAddQuiz(e)}>Add Quiz</button> */}
      </div>
    );
  }
}

export default App;
