console.log("script loaded...");

// all selectors
const textInput = document.querySelector("#textInput");
const submitButton = document.querySelector("#button");
const dataDisplay = document.querySelector(".displayData");
const displayStatus = document.querySelector("#displayStatus");
// event listeners
submitButton.addEventListener("click", infinityScrolling);

// Data
let pageNumber = 1;
const apiData = [];

// functions
async function infinityScrolling(e) {
  e.preventDefault();
  const userText = textInput.value;

  // changing displayStatus
  dataDisplay.innerText = "";
  displayStatus.innerText = "Loading....";
  //   getting text of textInput
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

window.addEventListener("scroll", async function () {
  const userText = textInput.value;

  // check if page has scroll
  //   console.log(
  //     "scrollHeight",
  //     scrollHeight,
  //     "scrollTop",
  //     scrollTop,
  //     "clientHeight",
  //     clientHeight
  //   );
  //   console.log(scrollTop + clientHeight);
  const { scrollHeight, scrollTop, clientHeight } = document.documentElement;
  if (scrollTop + clientHeight >= scrollHeight) {
    // console.log((pageNumber = pageNumber + 1));
    const apiData2 = [];
    await axios
      .get(
        `https://openlibrary.org/search.json?q=${userText}?page=${pageNumber++}`
      )
      .then(function (response) {
        response.data.docs.map((data) => {
          apiData2.push(data.title_suggest);
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  } else {
    console.log("can't do generate pages ");
  }

  console.log("scrolling");
  // loop over the apiData
  apiData2.map((data) => {
    // creating h2 for appending to data display
    const dataH2 = document.createElement("h2");
    dataH2.innerText = data;
    // append to display
    dataDisplay.append(dataH2);
  });
});
