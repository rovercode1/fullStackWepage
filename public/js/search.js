let filterInput = document.querySelector("#filterInput"),
 product = document.querySelectorAll("#productBox"),
 title = document.querySelectorAll("#productTitle"),
 user = document.querySelectorAll("#userTitle"),
 productTab = document.querySelector('#product-tab'),
 userTab = document.querySelector('#user-tab');
 
 filterInput.addEventListener("keyup", productSearch);
 productTab.addEventListener('click', function(){
  filterInput.addEventListener("keyup", productSearch);
 });
 
 userTab.addEventListener('click', function(){
  
  filterInput.addEventListener("keyup", userSearch);
 });
 


function productSearch(){
  let inputValue = filterInput.value.toUpperCase();
  // Get value of input
  // Compare to product name
  for(let i = 0; i < product.length;i++){
    let a = title[i].innerHTML;
      if(a.toUpperCase().indexOf(inputValue) > -1){
        product[i].style.display='flex';
      }else{
    product[i].style.display='none';
    }
  }
}
function userSearch(){
    let inputValue = filterInput.value.toUpperCase();
    // Get value of input
    // Compare to product name
    for(let i = 0; i < user.length;i++){
        let a = user[i].innerHTML;
        if(a.toUpperCase().indexOf(inputValue) > -1){
            user[i].style.display='block';
        }else{
            user[i].style.display='none';
        }
    }
}


