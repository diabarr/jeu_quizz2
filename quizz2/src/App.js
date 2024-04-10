import { useState } from 'react'
import { quiz } from './questions'
import './App.css'

const Quiz = () => {
  const [activeQuestion, setActiveQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState('')
  // const [activeTheme, setActiveTheme] = useState('')
  const [activeTheme, setActiveTheme] = useState('Mythologie')
  const [showResult, setShowResult] = useState(false)
  const [inMenu, setInMenu] = useState(true)
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null)
  const [result, setResult] = useState({
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
  })

  const { questions } = quiz
  const { theme, image, image2, question, choices, correctAnswer, explication } = questions[activeTheme][activeQuestion]

  // const onClickNext = () => {
  //   setSelectedAnswerIndex(null)
  //   setResult((prev) =>
  //     selectedAnswer
  //       ? {
  //           ...prev,
  //           score: prev.score + 5,
  //           correctAnswers: prev.correctAnswers + 1,
  //         }
  //       : { ...prev, wrongAnswers: prev.wrongAnswers + 1 }
  //   )
  //   if (activeQuestion !== questions[activeTheme].length - 1) {
  //     setActiveQuestion((prev) => prev + 1)
  //   } else {
  //     setActiveQuestion(0)
  //     setShowResult(true)
  //   }
  // }

  const onClickNext = () => {
    setSelectedAnswerIndex(null)
    setResult((prev) =>
      selectedAnswer
        ? {
            ...prev,
            score: prev.score + 5,
            correctAnswers: prev.correctAnswers + 1,
          }
        : { ...prev, wrongAnswers: prev.wrongAnswers + 1 }
    )
    if (activeQuestion !== questions[activeTheme].length - 1) {
      setActiveQuestion((prev) => prev + 1)
    } else {
      setInMenu (true)
      setActiveQuestion (0)
      setActiveTheme ('Mythologie')
      setSelectedAnswer ('')
      setShowResult (false)
    }
  }

  const onClickTheme = (theme) => {
    setActiveTheme (theme)
    setInMenu (false)
    setActiveQuestion (0)
    setSelectedAnswer ('')
    setShowResult (false)
  }

  const onClickMenu = () =>{
    setInMenu (true)
    setActiveQuestion (0)
    setActiveTheme ('Mythologie')
    setSelectedAnswer ('')
    setShowResult (false)
  }

  const onClickShowResult = () =>{
    showResult ? (
      setShowResult (false)
      ):(
        setShowResult (true)
      )
  }

  const onAnswerSelected = (answer, index) => {
    setSelectedAnswerIndex(index)
    if (answer === correctAnswer) {
      setSelectedAnswer(true)
    } else {
      setSelectedAnswer(false)
    }
  }

  const addLeadingZero = (number) => (number > 9 ? number : `0${number}`)

  const showResult_question = (theme) =>{
    return (<div className="quiz-container">
      {
        <div>
        <button onClick={() => onClickMenu()} >
          Menu
        </button>
          <div>
            <span className="active-question-no">{addLeadingZero(activeQuestion + 1)}</span>
            <span className="total-question">/{addLeadingZero(questions[activeTheme].length)}</span>
            <h2>{theme}</h2>
          </div>
          <img align="center" alt={image2} src={image2} width="800px"/>
          <h2>{question}</h2>
          <ul>
            {choices.map((answer, index) => (
              <li
                onClick={() => onAnswerSelected(answer, index)}
                key={answer}
                className={answer === correctAnswer ? 'right-answer' : 'wrong-answer'}>
                {answer}
              </li>
            ))}
          </ul>
          <h2>Explication: </h2>
          <h3>{explication}</h3>
          <div className="flex-right">
            <button onClick={onClickShowResult} disabled={selectedAnswerIndex === null}>
              Show Results
            </button>
            <button onClick={onClickNext} disabled={selectedAnswerIndex === null}>
              {activeQuestion === questions[activeTheme].length - 1 ? 'Finish' : 'Next'}
            </button>
          </div>
        </div>
      }
    </div>)
  }

  const single_quizz = (theme) =>{
    return (<div className="quiz-container">
      {!showResult ? (
        <div>
        <button onClick={() => onClickMenu()} >
          Menu
        </button>
          <div>
            <span className="active-question-no">{addLeadingZero(activeQuestion + 1)}</span>
            <span className="total-question">/{addLeadingZero(questions[activeTheme].length)}</span>
          </div>
          <img align="center" alt={image} src={image} width="800px"/>
          <h2>{question}</h2>
          <ul>
            {choices.map((answer, index) => (
              <li
                onClick={() => onAnswerSelected(answer, index)}
                key={answer}
                className={selectedAnswerIndex === index ? 'selected-answer' : null}>
                {answer}
              </li>
            ))}
          </ul>
          <div className="flex-right">
            <button onClick={onClickShowResult} disabled={selectedAnswerIndex === null}>
              Show Results
            </button>
            <button onClick={onClickNext} disabled={selectedAnswerIndex === null}>
              {activeQuestion === questions[activeTheme].length - 1 ? 'Finish' : 'Next'}
            </button>
          </div>
        </div>
      ) : (
        showResult_question (theme)
      )}
    </div>)
  }

  return (
    <div className="quiz-container">
      {!inMenu ? (
        single_quizz(activeTheme)
      ) : (
        <div className="result">
          <h1>C'est comme ça qu'on pose un classique</h1>
          <h3>Menu</h3>
          <table border="0">
            <tr>
              <th>
                <button onClick={() => onClickTheme('Mythologie')} >
                  Mythologie
                </button>
              </th>
              <th>
                <button onClick={() => onClickTheme('Musique')} >
                  Musique
                </button>
              </th>
            </tr>
            <tr>
              <th>
                <button onClick={() => onClickTheme('Cinema')} >
                  Cinéma
                </button>
              </th>
              <th>
                <button onClick={() => onClickTheme('Martine')} >
                  Martine
                </button>
              </th>
            </tr>
            <tr>
              <th>
                <button onClick={() => onClickTheme('Biere')} disabled >
                  Bière
                </button>
              </th>
              <th>
                <button onClick={() => onClickTheme('Internet')} >
                  Internet
                </button>
              </th>
            </tr>
            <tr>
              <th>
              <button onClick={() => onClickTheme('Series')} disabled >
                Séries
              </button>
              </th>
              <th>
              <button onClick={() => onClickTheme('JeuxVideos')} disabled >
                Jeux Vidéos
              </button>
              </th>
            </tr>
            <tr>
              <th>
                <button onClick={() => onClickTheme('GD')} disabled >
                  Gauche ou Droite
                </button>
              </th>
              <th>
                <button onClick={() => onClickTheme('Asylum')} >
                  The Asylum
                </button>
              </th>
            </tr>
            <tr>
              <th>
                <button onClick={() => onClickTheme('Cocktail')} >
                  Cocktail
                </button>
              </th>
              <th>
                <button onClick={() => onClickTheme('Zelda')} disabled >
                  Zelda
                </button>
              </th>
            </tr>
            <tr>
              <th>
                <button onClick={() => onClickTheme('Fusion')} >
                  Fusion
                </button>
              </th>
              <th>
                <button onClick={() => onClickTheme('Mashup')} disabled >
                  Mash-Up
                </button>
              </th>
            </tr>
          </table>
          
        </div>
      )}
    </div>
  )
}

export default Quiz