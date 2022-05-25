const todo = document.querySelector("ul");
const input = document.querySelector("input");
const addbtn = document.querySelector(".addbtn");
var item = [];


const add = ()=>{
    const li = document.createElement("li");
    const span = document.createElement("span");
    const deletebtn = document.createElement("p");
    span.innerHTML = input.value;
    item.push(input.value);
    li.appendChild(span);
    span.addEventListener("click",(e)=>{
        console.log(e.target.parentElement);
        const parent = e.target.parentElement;
        if(parent.classList.contains("checked")){
            parent.classList.remove("checked");
            var inner = e.target.innerHTML;
            inner = inner.slice(2);
            e.target.innerHTML = inner;
        }
        else{
            var inner = e.target.innerHTML;
            inner = "✓ "+inner;
            e.target.innerHTML = inner;
            parent.classList.add("checked");
        }
    });
    deletebtn.addEventListener("click",()=>{
        li.remove();
    })
    deletebtn.innerHTML="delete";
    deletebtn.classList.add("del");
    // li.innerHTML = input.value;
    li.appendChild(deletebtn);
    todo.appendChild(li);
}


addbtn.addEventListener("click",add);
