console.log("script loaded...");

// all selectors
const textInput = document.querySelector("#textInput");
const submitButton = document.querySelector("#button");
const dataDisplay = document.querySelector(".displayData");
const displayStatus = document.querySelector("#displayStatus");
// event listeners
submitButton.addEventListener("click", infinityScrolling);

// functions
async function infinityScrolling(e) {
  e.preventDefault();

  // changing displayStatus
  dataDisplay.innerText = "";
  displayStatus.innerText = "Loading....";
  //   getting text of textInput
  const userText = textInput.value;
  const apiData = [];
  await axios
    .get(`https://openlibrary.org/search.json?q=${userText}`)
    // .get(`https://openlibrary.org/search.json?q=marvel`)
    .then(function (response) {
      response.data.docs.map((data) => {
        apiData.push(data.title_suggest);
      });
    })
    .catch(function (error) {
      console.log(error);
    });

  displayStatus.innerText = "";

  // loop over the apiData
  apiData.map((data) => {
    // creating h2 for appending to data display
    const dataH2 = document.createElement("h2");
    dataH2.innerText = data;
    // append to display
    dataDisplay.append(dataH2);
  });
}
