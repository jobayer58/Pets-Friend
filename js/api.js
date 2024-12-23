console.log('Allah help me')
// 
// create load category btn
const btnLoadCategory = () => {
    // fetch the data
    fetch('https://openapi.programming-hero.com/api/peddy/categories')
        .then((res) => res.json())
        .then((data) => btnDisplay(data.categories))
        .catch((error) => console.log(error))
}

// create btn display category
const btnDisplay = (categories) => {
    const btnCategory = document.getElementById('btn-category')

    // add data in html
    categories.forEach((item) => {
        // console.log(item)
        // create a button
        const buttonContainer = document.createElement('div')
        buttonContainer.innerHTML = `
        <button id="btn-${item.category}" onClick="searchCard('${item.category}')" class="btn border-[1px] border-[#0E7A8126] md:gap-5 gap-2 md:w-[330px] md:h-[100px] w-[165px] h-[70px] text-xl rounded-xl md:text-2xl font-bold bg-[white] category-btn">
        <img src=${item.category_icon}/>
        <h1>${item.category}</h1>
        </button>
        `
        btnCategory.append(buttonContainer)

    })

}

const searchCard = (pets) => {
    // alert(id)
    fetch(`https://openapi.programming-hero.com/api/peddy/category/${pets}`)
    .then((res) => res.json())
    .then((data) => {
        // 
        removeActive()
        // 
        const activeButton = document.getElementById(`btn-${pets}`)
        activeButton.classList.add('bg-[#0E7A811A]','rounded-[120px]','border-[2px]')
        displayPetsCard(data.data)
    })
    .catch((error) => console.log(error))

    // setTimeout(() => {
    //     displayPetsCard()
    // }, 3000);
}

// active btn
const removeActive = () => {
    const buttons = document.getElementsByClassName('category-btn')
    for(const btn of buttons){
        btn.classList.remove('bg-[#0E7A811A]','rounded-[120px]','border-[2px]')
    }
}

// details modal btn
const modalDetails = async (petDot) => {
    console.log(petDot)
    const url = `https://openapi.programming-hero.com/api/peddy/pet/${petDot}`;
    const res = await fetch(url)
    const data = await res.json();
    displayModal(data.petData)
}

const displayModal = (modal) => {
    console.log(modal)
    const detailsContainer = document.getElementById('modal-content')
    detailsContainer.innerHTML = `
    <img class="rounded-lg h-[220px] w-full object-cover" src=${modal.image} />
    <h2 class="card-title font-bold text-2xl mt-2">${modal.pet_name}</h2>
    <div class="space-y-2 mt-2">
    <div class="flex gap-2">
    <img src="https://img.icons8.com/?size=24&id=325WdQacTlFj&format=png" >
    <p>${modal.breed || "Not Available"}</p>
    </div>
    <div class="flex gap-2">
    <img src="https://img.icons8.com/?size=24&id=117785&format=png" >
    <p>${modal.date_of_birth || "Not Available"}</p>
    </div>
    <div class="flex gap-2">
    <img src="https://img.icons8.com/?size=24&id=chxI7QFFrLLO&format=png" >
    <p>${modal.gender || "Not Available"}</p>
    </div>
    <div class="flex gap-2">
    <img src="https://img.icons8.com/?size=24&id=chxI7QFFrLLO&format=png" >
    <p>${modal.vaccinated_status || "Not Available"}</p>
    </div>
    <div class="flex gap-2">
    <img src="https://img.icons8.com/?size=24&id=85763&format=png" >
    <p>${modal.price ? `$${modal.price}` : 'Not Available'}</p>
    </div>

    </div>
    <hr class="mt-2" />
    <h1 class="mt-2 text-xl font-bold">Details Information</h1>
    <p class="mt-3">${modal.pet_details}</p>

    `

    // show Modal
    document.getElementById('customModal').showModal();

}


// create load category card 
const LoadCardPets = () => {
    // fetch the data
    fetch('https://openapi.programming-hero.com/api/peddy/pets')
        .then((res) => res.json())
        .then((data) => displayPetsCard(data.pets))
        .catch((error) => console.log(error))
}

// card demo
const cardDemo = {
    "petId": 15,
    "breed": "Holland Lop",
    "category": "Rabbit",
    "date_of_birth": "2023-07-15",
    "price": 200,
    "image": "https://i.ibb.co.com/RQ6smFK/pet-15.jpg",
    "gender": "Male",
    "pet_details": "This charming male Holland Lop rabbit, born on July 15, 2023, is playful and enjoys hopping around. Priced at $200, he makes a wonderful pet for children. He is not vaccinated.",
    "vaccinated_status": "Not",
    "pet_name": "Binky"
}

// create card pets display

const displayPetsCard = (card) => {
    const petsCard = document.getElementById('pets-card')
    petsCard.innerHTML = "";

    if (card.length == 0) {
        petsCard.classList.remove('md:grid-cols-3')
        petsCard.innerHTML = `
        <div class="min-h-[450px] rounded-lg w-[1200px] border-[1px] flex flex-col justify-center items-center space-y-5 bg-[#13131308] text-center ">
        <img class="" src="images/error.webp" />
        <h1 class="text-3xl font-extrabold">No Information Available</h1>
        <p class="text-[18px] text-[#606060]">We couldn't find any information about birds at the moment. Please check back later or explore other categories to <br/> discover a variety of pets waiting to become your perfect companion.</p>
        </div>
        `
        return;
    }else{
        petsCard.classList.add('md:grid-cols-3')
    }

    card.forEach((item) => {
        console.log(item)
        const card = document.createElement('div')
        card.classList = 'card bg-base-100 md:w-96 border-[1px]';
        card.innerHTML = `
        <figure class="md:px-5 px-2 pt-5 h-[230px]">
    <img
      src=${item.image}
      alt="Shoes"
      class="rounded-xl h-full w-full object-cover" />
  </figure>
  <div class="card-body">
    <h2 class="card-title font-bold text-2xl">${item.pet_name}</h2>
    <div class="space-y-2">
    <div class="flex gap-2">
    <img src="https://img.icons8.com/?size=24&id=325WdQacTlFj&format=png" >
    <p>${item.breed || "Not Available"}</p>
    </div>
    <div class="flex gap-2">
    <img src="https://img.icons8.com/?size=24&id=117785&format=png" >
    <p>${item.date_of_birth || "Not Available"}</p>
    </div>
    <div class="flex gap-2">
    <img src="https://img.icons8.com/?size=24&id=chxI7QFFrLLO&format=png" >
    <p>${item.gender || "Not Available"}</p>
    </div>
    <div class="flex gap-2">
    <img src="https://img.icons8.com/?size=24&id=85763&format=png" >
    <p>${item.price ? `$${item.price}` : 'Not Available'}</p>
    </div>

    <div/>
    <hr/>
    <div class="card-actions justify-between mt-2">
    <button onClick="showImage('${item.image}')" class="btn-ghost border-[1px] border-[#0E7A8126] w-[70px] h-[40px] rounded-lg flex items-center justify-center">
    <img src="https://img.icons8.com/?size=25&id=53vm80oFnyfa&format=png" />
    </button>
    <button class="btn-ghost border-[1px] border-[#0E7A8126] w-[95px] h-[40px] rounded-lg text-[#0E7A81] text-lg">Adopt</button>
     <button onClick="modalDetails(${item.petId})" class="btn-ghost border-[1px] border-[#0E7A8126] w-[95px] h-[40px] rounded-lg text-[#0E7A81] text-lg">Details</button>
    </div>
    </div>
        `
        petsCard.append(card)
    })
}

// image display
const showImage = (image) => {
    const displayImageShow = document.getElementById('displayImage')
    const div = document.createElement('div')
    div.classList = "inline-block "
    div.innerHTML = `
    <div class="px-4 pt-4">
    <img src=${image} class="rounded-lg w-[140px] h-[140px] object-cover" />
    </div>
    `
    displayImageShow.appendChild(div)
}


btnLoadCategory()
LoadCardPets()

