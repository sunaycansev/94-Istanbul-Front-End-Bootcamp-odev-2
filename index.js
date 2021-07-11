let data = [];
// selecting elemnets
let filterButton = document.querySelector("#filterButton");
let nameInput = document.querySelector("#nameInput");
let isAdultBox = document.querySelector("#isAdult");
let isActiveBox = document.querySelector("#isActive");
let isAdultLabel = document.querySelector("#isAdultLabel");
let isActiveLabel = document.querySelector("#isActiveLabel");

// add event listeners to filter button

filterButton.addEventListener("click", filterData);

const fetchData = () => {
  //verinin çekildiği yer
  fetch("data.json")
    .then((response) => {
      return response.json();
    })
    .then((responseData) => {
      //json'dan okunan verinin data array'ine atanması
      data = responseData;

      //veri geldikten sonra filtreleme butonu görünür olsun

      filterButton.setAttribute("style", "");
      nameInput.setAttribute("style", "");
      isAdultLabel.setAttribute("style", "");
      isAdultBox.setAttribute("style", "");
      isActiveLabel.setAttribute("style", "");
      isActiveBox.setAttribute("style", "");
      //verinin html içerisinde listelendiği fonksiyon
      listData(responseData);
    })
    .catch((err) => {
      //hata yönetimi
      console.log(err);
      alert("Bir hata oluştu!");
    });
};

//verinin ul tag'i içerisinde listelenmesini sağlayan fonksiyon
const listData = (data) => {
  let list = document.querySelector(".list");
  list.innerHTML = data
    .map((element) => {
      return `
        <li id=${element.id}>
            <span class='bold'>name:</span> ${element.name}
            <span class='bold'>email:</span> ${element.email}
            <span class="bold">age:</span> ${element.age}
            <span class="bold">isActive:</span> ${element.isActive}
        </li>
        `;
    })
    .join("");
};

//verinin filtrelenmesini sağlayan fonksiyon
//TODO
function filterData() {
  // getting input values
  let nameInputValue = nameInput.value;
  let isAdultValue = isAdultBox.checked;
  let isActiveValue = isActiveBox.checked;
  let filteredData = [...data];

  //checking conditions
  if (isAdultValue) {
    filteredData = filteredData.filter((el) => el.age >= 18);
  }
  if (isActiveValue) {
    filteredData = filteredData.filter((el) => el.isActive);
  }
  if (isActiveValue && isAdultValue) {
    filteredData = filteredData.filter((el) => el.isActive && el.age > 18);
  }
  if (nameInputValue.length > 0) {
    filteredData = filteredData.filter(
      (el) => el.name.charAt(0).toLowerCase() === nameInputValue.toLowerCase()
    );
  }
  listData(filteredData);
}
