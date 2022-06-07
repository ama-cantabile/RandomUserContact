$(document).ready(() => {

    init();

    function getData() {
        //Random User API URL
        const url = "https://randomuser.me/api/?results=12"

        //Fetch the JSON data from the URL
        return fetch(url)
            .then(response => {
                if (response.ok) { console.log("Great Sucess") }
                else {
                    console.log("There was a problem fetching the data", "alert-warning")
                }
                return response.json()
            })
            .then(data => { display(data); return data.results; })
            .catch(err => console.log("An Error has occurred: " + err, "alert-danger"))
    }

    async function init() {
        //get data from the getData function
        data = await getData();

        //If a user click one of the cards..
        $(`.card`).on("click", function (e) {
            //get the id from the card
            var cardIndex = $(this).attr(`id`);

            //this function update the modal corresponding the cardIndex which is the ID of the card div tag.
            function updateModal(cardIndex) {
                //data varaibles
                let picture = data[cardIndex].picture.large;
                let firstName = data[cardIndex].name.first;
                let lastName = data[cardIndex].name.last;
                let email = data[cardIndex].email;
                let city = data[cardIndex].location.city;
                let phoneNumber = data[cardIndex].phone;
                let streetNumber = data[cardIndex].location.street.number;
                let streetName = data[cardIndex].location.street.name;
                let state = data[cardIndex].location.state;
                let postCode = data[cardIndex].location.postcode;
                let birthDay = data[cardIndex].dob.date.substring(0, 10);

                //insert html contents to the modal-conatiner div.
                $('.modal-container').html(`
                <div class="modal">
                    <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                    <div class="modal-info-container">
                        <img class="modal-img" src="${picture}" alt="profile picture">
                        <h3 id="name" class="modal-name cap">${firstName} ${lastName}</h3>
                        <p class="modal-text">${email}</p>
                        <p class="modal-text cap">${city}</p>
                        <hr>
                        <p class="modal-text">${phoneNumber}</p>
                        <p class="modal-text">${streetNumber} ${streetName} ${city}, ${state} ${postCode}</p>
                        <p class="modal-text">Birthday: ${birthDay}</p>
                    </div >
                 `);
            }
            //this will call updateModal function
            updateModal(cardIndex);

            //display the modal from the hidden status
            var modalConatainer = document.querySelector('.modal-container');
            modalConatainer.style.display = "block";

            //if a user clicks a hide button in the modal, the modal will be hidden from the page.
            var modalCloseButton = document.querySelector('.modal-close-btn');
            modalCloseButton.addEventListener('click', () => {
                $(".modal-container").hide();
            })
        })

    }
    //this function display the first web page
    function display(data) {

        var galleryDiv = document.querySelector(".gallery");

        //iterates the data until the end of the data which is 12.
        for (var i = 0; i < data.results.length; i++) {

            //data variables
            let picture = data.results[i].picture.large;
            let firstName = data.results[i].name.first;
            let lastName = data.results[i].name.last;
            let email = data.results[i].email;
            let city = data.results[i].location.city;
            let state = data.results[i].location.state;

            //this string data will hold html contents including the employee data
            cardInfoHTML = `<div class="card" id=${i}>
            <div class="card-img-container" >
            <img class="card-img" src="${picture}" alt="profile picture">
        </div >
            <div class="card-info-container">
                <h3 id="name" class="card-name cap">${firstName} ${lastName}</h3>
                <p class="card-text">${email}</p>
                <p class="card-text cap">${city}, ${state}</p>
            </div>
         </div > `;

            //inserting the above html data to the gallery div tag
            galleryDiv.insertAdjacentHTML('beforeend', cardInfoHTML);
        }
    }
})