const searchField = document.getElementById('search-field');
const searchResult =document.getElementById('search-result');
const errorDiv = document.getElementById('error');
// -----search input------
const searchBook = () => {
  const searchText = searchField.value;
    //clear
    searchField.value ='';
    searchResult.innerHTML='';
    // fetching api========
    const url =`https://openlibrary.org/search.json?q=${searchText}`
    spinner.classList.remove("d-none");
    fetch(url)
    .then(res => res.json())
    .then(data =>displaySearchResult(data.docs))
    .finally(()=>{
      spinner.classList.add("d-none");
    })
    const displaySearchResult = docs =>{
    //  =========errror handle========
    const bookCount=docs.length;
    // loop for errors======
    if(searchText===''){
      errorDiv.innerText="Search field cannot be empty"
    }
    else if(docs!=0){
      errorDiv.innerText=`There are ${bookCount} results found for ${searchText}`
    }
    else{
      errorDiv.innerText= `No result found for ${searchText}`;
    }
    // loop for create book cards  
    docs.forEach(doc => {
        console.log(doc);
        const div =document.createElement('div');
        div.classList.add('col');
        div.innerHTML=`<div class="card fs-5 h-100" style="color:white;     background-color: rgb(15, 1, 65);">
        <img src="https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg" class="card-img-top h-100 my-auto" alt="...">
        <div class="card-body">
          <h5 class="card-title">Title: ${doc.title}</h5>
          <p class="card-text"></p>
        </div>
        <ul class="list-group list-group-flush" >
          <li class="list-group-item h-100" style="color:white;     background-color: rgb(8, 2, 37);" >Author: ${doc.author_name}</li>
          <li class="list-group-item h-100" style="color:white;     background-color: rgb(15, 1, 65);">First publish year: ${doc.first_publish_year}</li>
        </ul>
      </div>`;
      searchResult.appendChild(div);
    });   
}
}