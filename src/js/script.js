const template = Handlebars.compile(document.querySelector('#template-book').innerHTML);
// console.log(template);
class BooksList {

  constructor(){
    const thisBookList = this;
    this.filters = [];

    thisBookList.initData();
    thisBookList.render();
    thisBookList.getElements();
    thisBookList.initActions();
    thisBookList.filterBooks();
  }

  render(){
    const thisBookList = this;
    const bookList = document.querySelector('.books-list');
  
    // eslint-disable-next-line no-undef
    for (let book of thisBookList.data) {

      const ratingBgc = thisBookList.determineRatingBgc(book.rating);
      book.ratingWidth = book.rating * 10;
      book.ratingBgc = ratingBgc;
    
      const generatedHTML = template(book);
      bookList.innerHTML += generatedHTML;     
    }  
  }

  initData(){
    // eslint-disable-next-line no-undef
    this.data = dataSource.books;
  }

  getElements(){
    const thisBookList = this;

    thisBookList.booksList = document.querySelector('.books-list');
    thisBookList.booksImage = document.querySelectorAll('.book__image');
    thisBookList.filterList = document.querySelector('.filters');
  }

  initActions(){
    const thisBookList = this;

    const favoriteBooks = [];
    // const booksImage = document.querySelectorAll('.book__image');

    for(let image of thisBookList.booksImage){
      image.addEventListener('dblclick', function(event){ 
        event.preventDefault();
        event.target.classList.toggle('favorite');
        const bookId = event.target.getAttribute('data-id'); 

        if(!favoriteBooks.includes(bookId)){ 
          favoriteBooks.push(bookId);  
          image.classList.add('favorite');
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
          this.filters.push(checkbox.value);
        } else {
          this.filters.splice(this.filters.indexOf(checkbox.value), 1);
        }
        thisBookList.filterBooks();
      }
    });
  }

  filterBooks(){

    // eslint-disable-next-line no-undef
    for (const book of dataSource.books){
      const bookImage = document.querySelector('.book__image[data-id="' + book.id + '"]');
      let shouldBeHidden = false;

      for (const filter of this.filters){
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

  determineRatingBgc(rating) {
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
}

new BooksList();