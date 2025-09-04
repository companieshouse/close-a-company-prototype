//
// For guidance on how to add JavaScript see:
// https://prototype-kit.service.gov.uk/docs/adding-css-javascript-and-images
//

window.GOVUKPrototypeKit.documentReady(() => {


// Prevents inactive hyperlinks (those with href="#") from reloading/jumping to the top of the page
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll('a[href="#"]').forEach(function (link) {
    link.addEventListener("click", function (event) {
      event.preventDefault();
    });
  });
});




})
