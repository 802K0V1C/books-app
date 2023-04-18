const template = Handlebars.compile(document.querySelector('#template-book').innerHTML);
// console.log(template);
const booksList = document.querySelector('.books-list');
// console.log(booksList);

function render() {

  // eslint-disable-next-line no-undef
  for (let book of dataSource.books) {
    const generatedHTML = template(book);
    booksList.innerHTML += generatedHTML;     
    // console.log(generatedHTML);
  }  
}
render();

const favoriteBooks = [];

function initActions(){

  const booksImage = document.querySelectorAll('.book__image');

  for(let image of booksImage){

    image.addEventListener('dbclick', function(event){ 
      event.preventDefault();

      const bookId = image.getAttribute('data-id'); 

      if(!favoriteBooks.includes(bookId)){ 
        favoriteBooks.push(bookId);  
        image.classlist.add('favorite');
      } else {
        favoriteBooks.splice(favoriteBooks.indexOf(bookId), 1);
        image.classList.remove('favorite');
      }
    });
  }
}

initActions();