// Storing the content of the template into the variable called listTemplate to later be appended to <Main>
const listTemplate = document.querySelector('#grocerylist-template').content;

// Creating the params object to be used later for queries within the search bar
const params = new URLSearchParams(window.location.search);

// Loading/fetching the groceries from the JSON file and then running the showAll function afterwards
// Make sure ?_embed is at the end in order to fetch the embedded featured image from wp later
function loadAll(){
	fetch(baseLink+"groceries?_embed").then(e=>e.json()).then(showAll);
}

// Creating a function to show all data (appending the template clones to the main tag) //
function showAll(data){
  console.log(data);

  //For Each list item it will change the tags content according to the the list item's field values. //
  data.forEach(grocery=>{
    // Cloning the template and storing it into a constant variable called clone (to be appended later to main)
    const clone = listTemplate.cloneNode(true);
    const price = grocery.acf.price;
    const unitsize = grocery.acf.unit_size;
    const title = grocery.title.rendered;

    // Changing the text content to be the fetched fields from JSON for each grocery
    clone.querySelector("h2").textContent = title;
    clone.querySelector(".price span").textContent = price;
    clone.querySelector(".unitsize span").textContent = unitsize;
    console.log(price);
    console.log(grocery.id);

		//Setting each "Show Details" of the products to link to the details page with the query of their id in the search paramater, to display the details of that item onto the details template when clicked
		clone.querySelector("a").href="details.html?groceryid="+grocery.id;

    // Setting Img to be the wordpress featured image assigned to each grocery posts (if it exists, otherwise removes <img> from html)
    if (grocery._embedded['wp:featuredmedia']){
    clone.querySelector("img").src=grocery._embedded['wp:featuredmedia'][0].media_details.sizes.medium.source_url;
  }else{
    clone.querySelector("img").remove();
  }
    // appending the clone to the main tag
    document.querySelector('main').appendChild(clone);
  })
}

// Category navigation appending from below
// Selecting the nav and storing it as a variable
const nav = document.querySelector("#categories-nav");

function loadCategories(){
	fetch(baseLink+"categories").then(e=>e.json()).then(makeCatMenu);
}

function makeCatMenu(cats){
	cats.forEach(cat=>{
		console.log(cat);
		const newA = document.createElement("a");
		newA.textContent=cat.name;
		newA.href="?catid="+cat.id;
		nav.appendChild(newA);
	})
}

// Fetching the current category ID from the params within the search bar
const catID = params.get("catid");

// If there is a category ID in the parameters of the URL, then run the function created to display only all the foods in that category onto the page, otherwise load the page normally
if(catID){
	loadCarsByCat(catID);
}else{
	loadAll();
}

function loadCarsByCat(catID){
	fetch(baseLink+"groceries?categories="+catID+"&_embed").then(e=>e.json()).then(showAll);
}

// Fetching categories from the JSON file, and then creating the category menu and appending it to the nav on the HTML



loadCategories();


//loading all functions
