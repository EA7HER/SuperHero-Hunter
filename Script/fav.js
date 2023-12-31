var FavoriteIdArray = [localStorage.getItem("FavoriteIdArray")];
localStorage.getItem("FavoriteIdArray");

const searchInput = document.getElementsByTagName("input")[0];
const favResults = document.getElementById("fav-results");
if (JSON.parse(localStorage.getItem("FavoriteIdArray")) != null) {
  FavoriteIdArray = JSON.parse(localStorage.getItem("FavoriteIdArray"));
}
var JsonResult;
localStorage.setItem("FavoriteIdArray", JSON.stringify(FavoriteIdArray));

function reStart() {
  FavoriteIdArray.forEach((element) => {
    fetchID(element);
  });
}
reStart();

async function fetchID(idd) {
  try {
    await fetch(
      `https://gateway.marvel.com/v1/public/characters/${idd}?&ts=1&apikey=0cbe73386e542e58f33dcd0ddab19376&hash=112b93cb8f62c831e33f6faa30e08f90`
    )
      .then((response) => response.json())
      .then((datas) => {
        JsonResult = datas.data.results;
        console.log(datas.data.results);
        showIDResults(datas.data.results);
      });
  } catch (error) {
    console.log(error);
  }
}

function showIDResults(APIdata) {
  APIdata.forEach((hero) => {
    var idid = true;
    if (FavoriteIdArray && FavoriteIdArray.length > 0) {
      FavoriteIdArray.forEach((id) => {
        if (hero.id == id) {
          idid = false;
        }
      });
    }

    favResults.innerHTML += `<!-- A div with container id to hold the card -->

                <div id="container">
                    <!-- A div with card class for the card  -->
                    <div class="card">
                        <img
                            src="${
                              hero.thumbnail.path +
                              "/landscape_incredible." +
                              hero.thumbnail.extension
                            }"
                            alt=""/>

                        <!-- A div with card__details class to hold the details in the card  -->
                        <div class="card__details">
                            <!-- Span with tag class for the tag -->
                            <span class="tag">ID : <i>${hero.id}</i></span>
                            <span class="tag">Comics :${
                              hero.comics.available
                            }</span>
                            <span class="tag">Events : ${
                              hero.events.available
                            }</span>
                            <span class="tag">Series :${
                              hero.series.available
                            }</span>
                            <span class="tag">Stories : ${
                              hero.stories.available
                            }</span>
                            <!-- A div with name class for the name of the card -->
                            <div class="name">${hero.name}</div>
                        </div>
                    </div>
                    <div id="favBtnNew" class="favBtnNew">
                        <div class="cardi">
                            <button id = "addToFavBtn"  class = "addToFavBtn" >
                            ${
                              idid
                                ? '<i  id = "adFAV"  class="fa-solid fa-heart fav-icon remFavBtn"></i> &nbsp; Add to Favourites</button>'
                                : '<i id = "rmFAV" class="fa-solid fa-heart-circle-minus addToFavBtnBtn"></i> &nbsp; Remove from Favourites'
                            }
                        </div>
                    </div>
                    <div id="knowmore" class="knowmore">
                        <div class="character-info" class="character-info" >
                            <div class="cardi">
                                <button id = "knowmorejs" class = "knowmorejs"
                                <i class="fa-solid fa-heart fav-icon"></i> &nbsp; Know More </button>
                            </div>
                        </div>
                    </div>

                </div>
                `;
  });
}
function renderAgain() {
  favResults.innerHTML = "";
  reStart();
}
document.addEventListener("click", handleDocumentClick);
function handleDocumentClick(e) {
  const eventTarget = e.target;
  if (
    eventTarget.className === "addToFavBtn" &&
    eventTarget.children[0].id == "adFAV"
  ) {
    FavIDafterClick =
      e.target.parentElement.parentElement.parentElement.children[0].children[1]
        .children[0].children[0].innerHTML;
    console.log("favvvv  ", FavIDafterClick);
    FavoriteIdArray.push(FavIDafterClick); // adding id
    function removeDuplicates(arr) {
      return arr.filter((item, index) => arr.indexOf(item) === index);
    }
    FavoriteIdArray = removeDuplicates(FavoriteIdArray);
    localStorage.setItem("FavoriteIdArray", JSON.stringify(FavoriteIdArray));
    renderAgain();
  }
  if (
    eventTarget.className === "addToFavBtn" &&
    eventTarget.children[0].id == "rmFAV"
  ) {
    FavIDafterClick =
      e.target.parentElement.parentElement.parentElement.children[0].children[1]
        .children[0].children[0].innerHTML;
    removeFavArray(FavoriteIdArray, FavIDafterClick); // removing id

    localStorage.setItem("FavoriteIdArray", JSON.stringify(FavoriteIdArray));
    renderAgain();
  }
  if (eventTarget.className === "knowmorejs") {
    console.log(
      e.target.parentElement.parentElement.parentElement.parentElement
        .children[0].children[1].children[0].children[0].innerHTML
    );
    var KnowMoreIDafterClick =
      e.target.parentElement.parentElement.parentElement.parentElement
        .children[0].children[1].children[0].children[0].innerHTML;
    localStorage.setItem("id", KnowMoreIDafterClick);
    window.location.assign("./SuperHero.html");
    renderAgain();
  }
}
function removeFavArray(FavoriteIdArray, heroid) {
  FavoriteIdArray.forEach((element) => {
    if (element == heroid) {
      let xx = FavoriteIdArray.indexOf(element);
      if (xx != -1) {
        console.log("Before ", FavoriteIdArray);
        FavoriteIdArray.splice(xx, 1);
        console.log("After ", FavoriteIdArray);
      }
    }
  });
}
