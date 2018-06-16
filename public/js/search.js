let filterInput = document.querySelector("#filterInput");
let product = document.querySelectorAll("#productBox");
let title = document.querySelectorAll("#productTitle");

filterInput.addEventListener("keyup", function(){
    // Get value of input
    let inputValue = filterInput.value.toUpperCase();
    // Compare to product name
    for(let i = 0; i < product.length;i++){
        let a = title[i];
        if(a.innerHTML.toUpperCase().indexOf(inputValue) > -1){
            product[i].style.display='';
        }else{
            product[i].style.display='none';
        }
    }
});


