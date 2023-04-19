const template = Handlebars.compile(document.querySelector('#template-book').innerHTML);
// console.log(template);

function render(){
  const thisBookList = this;
  const booksList = document.querySelector('.books-list');
  // console.log(booksList);
  // eslint-disable-next-line no-undef
  for (let book of dataSource.books) {

    const ratingBgc = thisBookList.determineRatingBgc(book.rating);
    book.ratingWidth = book.rating * 10;
    book.ratingBgc = ratingBgc;
    
    const generatedHTML = template(book);
    booksList.innerHTML += generatedHTML;     
    // console.log(generatedHTML);
  }  
}
render();

function initActions(){
  const thisBookList = this;

  const favoriteBooks = [];
  const filters = [];

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

  // eslint-disable-next-line no-undef
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

function determineRatingBgc(rating) {
  let background = '';

  if(rating < 6) {
    background = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)'; 
  } else if(rating > 6 && rating <= 8) {
    background = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
  } else if(rating > 8 && rating <= 9) {
    background = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
  } else if(rating > 9) {
    background = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
  }  
  return background;
}
determineRatingBgc();