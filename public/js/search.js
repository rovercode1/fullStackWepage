let filterInput = document.querySelector("#filterInput");
let product = document.querySelectorAll("#productBox");
let title = document.querySelectorAll("#productTitle");

product.forEach(function(item){
    item.style.display='none';
});

filterInput.addEventListener("keyup", productSearch);

function productSearch(){
    // Get value of input
    let inputValue = filterInput.value.toUpperCase();
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


