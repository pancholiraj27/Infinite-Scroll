console.log("script loaded...");

// all selectors
const textInput = document.querySelector("#textInput");
const submitButton = document.querySelector("#button");

// event listeners
submitButton.addEventListener("click", infinityScrolling);

// functions
async function infinityScrolling(e) {
  e.preventDefault();
  //   getting text of textInput
  const userText = textInput.value;
  const apiData = [];
  await axios
    // .get(`https://openlibrary.org/search.json?q=${userText}`)
    .get(`https://openlibrary.org/search.json?q=text`)
    .then(function (response) {
      response.data.docs.map((data) => {
        apiData.push(data.title_suggest);
      });
      //   apiData = response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
  console.log(apiData);
}
