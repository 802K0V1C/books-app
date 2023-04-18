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