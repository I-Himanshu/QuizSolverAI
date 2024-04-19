
# AI Question Solver API Documentation

This API allows you to submit a question and receive an answer generated by an AI model.

## Usage

### Base URL

The base URL for all endpoints is `https://quiz-solver-ai.vercel.app`.

### Submit a Question

Send a POST request to `/question` endpoint with the question in the request body.

#### Request

- **URL:** `/question`
- **Method:** `POST`
- **Body:**
  - `question`: The question you want to ask the AI.

#### Response

- **200 OK** on successful request.
  - Body:
    ```json
    {
      "answer": "The answer generated by the AI"
    }
    ```
- **400 Bad Request** if question is not provided.
  - Body:
    ```json
    {
      "message": "Question is required"
    }
    ```

- **500 Internal Server Error** if an error occurs during processing.
  - Body:
    ```json
    {
      "message": "Internal server error"
    }
    ```

### Example Usage

#### Node.js (using `axios`)

```javascript
const axios = require('axios');

async function askQuestion(question) {
    try {
        const response = await axios.post('https://quiz-solver-ai.vercel.app/question', {
            question: question
        });
        return response.data.answer;
    } catch (error) {
        console.error('Error occurred:', error.response.data);
        throw error;
    }
}

// Example usage
const question = "YOUR_Question_HERE";
const answer = await askQuestion(question);
console.log('Answer:', answer);
```

#### Python (using requests)
```python
import requests

def ask_question(question):
    try:
        response = requests.post('https://quiz-solver-ai.vercel.app/question', json={'question': question})
        response.raise_for_status()
        return response.json()['answer']
    except requests.exceptions.RequestException as e:
        print('Error occurred:', e)
        raise

# Example usage
question = "YOUR_Question_HERE"
answer = ask_question(question)
print('Answer:', answer)
```

#### cURL

```bash
curl -X POST -H "Content-Type: application/json" -d '{"question": "YOUR_Question_HERE"}' https://quiz-solver-ai.vercel.app/question
```

Replace `YOUR_Question_HERE` with your actual question.

#### Real Life Example Usage: Quiz Solver Script (JavaScript)
You can also use this JavaScript code snippet to automatically solve quizzes on talentserve.org:

```javascript
window.onkeydown = function (e) {
  if(e.key != "a") return;
  var questionSpace = document.getElementById("questionSpace");
  var question = questionSpace.querySelector("p").innerText;
  var answers = questionSpace.querySelectorAll("input[name='answerRadio']");
  answers = Array.from(answers).map((answer) =>
    answer.parentElement.innerText.trim().replace(/^"(.*)"$/, "$1")
  );
  var ANSWER = "";
  answers.forEach((answer, i) => {
    ANSWER += `${String.fromCharCode(65 + i)}. ${answer}\n`;
  });
  var QUESTION = "Question: " + question + "\n" + ANSWER;
  fetch("https://your-api-url.com/question", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ question: QUESTION }),
  })
    .then((res) => res.json())
    .then((res) => {
      let message = res.answer;
      console.log(message, "message");
      var btn = document.querySelectorAll(".modButton")[1];
      console.log(btn);
      if (message == "a" || message == "A") {
        document.querySelector("#optionARadio").click();
        // setTimeout(() => btn.click(),Math.floor(Math.random() * 1000) + 1000);
      } else if (message == "b" || message == "B") {
        document.querySelector("#optionBRadio").click();
        // setTimeout(() => btn.click(),Math.floor(Math.random() * 1000) + 1000);
      } else if (message == "c" || message == "C") {
        document.querySelector("#optionCRadio").click();
        // setTimeout(() => btn.click(),Math.floor(Math.random() * 1000) + 1000);
      } else if (message == "d" || message == "D") {
        document.querySelector("#optionDRadio").click();
        // setTimeout(() => btn.click(),Math.floor(Math.random() * 1000) + 1000);
      }else{
        console.log("No answer found");
      }
    });
}
```
This script automatically solves the quiz questions on talentserve.org by utilizing the AI Question Solver API.



