function generateInput() {
    let question = document.getElementById("inputs");
    
    let copy = question.cloneNode(deep);

    question.appendChild(copy);

}