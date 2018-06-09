function titleLength() {
    var str = document.querySelectorAll(".titleText").innerText;
    var res = str.substring(0, 4);
    if(str.length > 4 ){
        document.getElementById("demo").innerHTML = res;
    }

}