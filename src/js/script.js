const template = Handlebars.compile(document.querySelector('#template-book').innerHTML);
// console.log(template);
const booksList = document.querySelector('.books-list');
// console.log(booksList);

function render(){

  // eslint-disable-next-line no-undef
  for (let book of dataSource.books) {
    const generatedHTML = template(book);
    booksList.innerHTML += generatedHTML;     
    // console.log(generatedHTML);
  }  
}
render();

function initActions(){
  const thisBookList = this;

  const favoriteBooks = [];

  const booksImage = document.querySelectorAll('.book__image');

  for(let image of thisBookList.booksImage){
    image.addEventListener('dbclick', function(event){ 
      event.preventDefault();

      event.target.classList.toggle('favorite');

      const bookId = event.target.getAttribute('data-id'); 

      if(!favoriteBooks.includes(bookId)){ 
        favoriteBooks.push(bookId);  
        image.classlist.add('favorite');
      } else {
        favoriteBooks.splice(favoriteBooks.indexOf(bookId), 1);
        image.classList.remove('favorite');
      }
    });
  }
  
  const filters = [];

  thisBookList.filterList.addEventListener('click', function(event){

    const checkbox = event.target;
    
    if(checkbox.tagName == 'INPUT' && checkbox.type == 'checkbox' && checkbox.name == 'filter'){
      if(checkbox.checked){
        filters.push(checkbox.value);
      } else {
        filters.splice(filters.indexOf(checkbox.value), 1);
      }
      thisBookList.filterBooks(filters);
    }
  });
}
initActions();

function filterBooks(filters){

  for (const book of dataSource.books){
  
    const bookImage = document.querySelector('book__image[data-id="' + book.id + '"]');

    let shouldBeHidden = false;

    for (const filter of filters){
      if(!book.details[filter]){
        shouldBeHidden = true;
        break;
      } else {
        shouldBeHidden = false;
      }
    }
    if (shouldBeHidden){
      bookImage.classList.add('hidden');
    } else {
      bookImage.classList.remove('hidden');
    }
  }
}
filterBooks();