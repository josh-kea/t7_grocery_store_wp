const template = document.querySelector("#grocerydetail-template").content;
const params = new URLSearchParams(window.location.search);
const groceryID = params.get("groceryid");

function loadOne(groceryID){
	fetch(baseLink+"groceries/"+groceryID+"?_embed").then(e=>e.json()).then(showOne);
}

function showOne(grocery){
	console.log(grocery);
	const clone = template.cloneNode(true);
	const detailsImg = clone.querySelector(".detailsImg");

	if(grocery._embedded['wp:featuredmedia'][0].media_details.sizes.large){
		detailsImg.src=grocery._embedded['wp:featuredmedia'][0].media_details.sizes.large.source_url;
	}else{
		detailsImg.src=grocery._embedded['wp:featuredmedia'][0].media_details.sizes.full.source_url;
	}


  clone.querySelector("h2").textContent = grocery.title.rendered;;
	clone.querySelector(".price span").textContent = grocery.acf.price;
	clone.querySelector(".unitsize span").textContent = grocery.acf.unit_size;
  clone.querySelector("#description").innerHTML = grocery.content.rendered;
	document.querySelector('main').appendChild(clone);

}

loadOne(groceryID);
