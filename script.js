const quizData = [
    {
      question: "Which company developed JavaScript?",
      options: ["Netscape", "Oracle", "Google", "Apple"],
      answer: "Netscape",
    },
    {
      question: "Javascript is an _______ language?",
      options: ["Assembly-language", "Object Based", "Procedural", "Object-Oriented"],
      answer: "Object-Oriented",
    },
    {
      question: "What is the use of the noscript tag in Javascript?",
      options: ["The contents are displayed by non-JS-based browsers" , "Clears all the cookies and cache", "Both A and B", "None of the above"],
      answer: "The contents are displayed by non-JS-based browsers" ,
    },
    {
      question: "How do we write a comment in javascript?",
      options: ["//", "/**/", "#", "$$"],
      answer: "//",
    },
    {
      question: "Which one of the following is the correct way for calling the JavaScript code?",
      options: [
        "Preprocessor",
        "Triggering Event",
        "RMI",
        "Function/Method",
      ],
      answer: "Function/Method",
    },
    {
      question: "In JavaScript the x===y statement implies that:",
      options: [
        "Both x and y are equal in value, type and reference address as well",
        "Both are x and y are equal in value only",
        "Both are equal in the value and data type",
        "Both are not same at all",
      ],
      answer: "Both are equal in the value and data type",
    },
    {
      question: "What keyword is used to declare an asynchronous function in Javascript?",
      options: [
        "async",
        "await",
        "setTimeout",
        "None of the above",
      ],
      answer: "async",
    },
    {
      question: "How can a datatype be declared to be a constant type?",
      options: ["var", "let", "const", "constant"],
      answer: "const",
    },
    {
      question: "Which of the following is not javascript data types?",
      options: [
        "Null type",
        "Undefined type",
        "Number type",
        "All of the mentioned",
      ],
      answer: "All of the mentioned",
    },
    {
      question: "Which of the following is not a Javascript framework?",
      options: ["Node", "Vue", "React", "Cassandra"],
      answer: "Cassandra",
    },
  ];
  
  const quizContainer = document.getElementById('quiz');
  const resultContainer = document.getElementById('result');
  const submitButton = document.getElementById('submit');
  const retryButton = document.getElementById('retry');
  const showAnswerButton = document.getElementById('showAnswer');
  
  let currentQuestion = 0;
  let score = 0;
  let incorrectAnswers = [];
  
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  
  function displayQuestion() {
    const questionData = quizData[currentQuestion];
  
    const questionElement = document.createElement('div');
    questionElement.className = 'question';
    questionElement.innerHTML = questionData.question;
  
    const optionsElement = document.createElement('div');
    optionsElement.className = 'options';
  
    const shuffledOptions = [...questionData.options];
    shuffleArray(shuffledOptions);
  
    for (let i = 0; i < shuffledOptions.length; i++) {
      const option = document.createElement('label');
      option.className = 'option';
  
      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = 'quiz';
      radio.value = shuffledOptions[i];
  
      const optionText = document.createTextNode(shuffledOptions[i]);
  
      option.appendChild(radio);
      option.appendChild(optionText);
      optionsElement.appendChild(option);
    }
  
    quizContainer.innerHTML = '';
    quizContainer.appendChild(questionElement);
    quizContainer.appendChild(optionsElement);
  }
  
  function checkAnswer() {
    const selectedOption = document.querySelector('input[name="quiz"]:checked');
    if (selectedOption) {
      const answer = selectedOption.value;
      if (answer === quizData[currentQuestion].answer) {
        score++;
      } else {
        incorrectAnswers.push({
          question: quizData[currentQuestion].question,
          incorrectAnswer: answer,
          correctAnswer: quizData[currentQuestion].answer,
        });
      }
      currentQuestion++;
      selectedOption.checked = false;
      if (currentQuestion < quizData.length) {
        displayQuestion();
      } else {
        displayResult();
      }
    }
  }
  
  function displayResult() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'inline-block';
    resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`;
  }
  
  function retryQuiz() {
    currentQuestion = 0;
    score = 0;
    incorrectAnswers = [];
    quizContainer.style.display = 'block';
    submitButton.style.display = 'inline-block';
    retryButton.style.display = 'none';
    showAnswerButton.style.display = 'none';
    resultContainer.innerHTML = '';
    displayQuestion();
  }
  
  function showAnswer() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'none';
  
    let incorrectAnswersHtml = '';
    for (let i = 0; i < incorrectAnswers.length; i++) {
      incorrectAnswersHtml += `
        <p>
          <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
          <strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
          <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}
        </p>
      `;
    }
  
    resultContainer.innerHTML = `
      <p>You scored ${score} out of ${quizData.length}!</p>
      <p>Incorrect Answers:</p>
      ${incorrectAnswersHtml}
    `;
  }
  
  submitButton.addEventListener('click', checkAnswer);
  retryButton.addEventListener('click', retryQuiz);
  showAnswerButton.addEventListener('click', showAnswer);
  
  displayQuestion();