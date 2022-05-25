const todo = document.querySelector("ul");
const input = document.querySelector("input");
const addbtn = document.querySelector(".addbtn");
const dlt = document.querySelector(".clear");
var item = [];

const add = ()=>{
    const li = document.createElement("li");
    const span = document.createElement("span");
    const deletebtn = document.createElement("p");
    const val = validation(input.value);
    if(!val){
        span.innerHTML = input.value;
        item.push(input.value);
        li.appendChild(span);
        fraction();
        localStorage.setItem(input.value,"0");
        span.addEventListener("click",(e)=>{
            const parent = e.target.parentElement;
            if(parent.classList.contains("checked")){
                const upitem = li.querySelector("span");
                parent.classList.remove("checked");
                var inner = e.target.innerHTML;
                inner = inner.slice(2);
                e.target.innerHTML = inner;
                if(input.value==""){
                    localStorage.setItem(upitem.innerHTML,"0");
                }
                else{
                localStorage.setItem(input.value,"0");
                }
            }
            else{
                const upitem = li.querySelector("span");
                var inner = e.target.innerHTML;
                inner = "✓ "+inner;
                e.target.innerHTML = inner;
                parent.classList.add("checked");
                localStorage.setItem(upitem.innerHTML.slice(2),"1");
            }
            fraction();
        });
        deletebtn.addEventListener("click",()=>{
            const chk = li.classList.contains("checked");
            const delitem = li.querySelector("span");
            item.pop(delitem.innerHTML);
            if(chk){
                localStorage.removeItem(delitem.innerHTML.slice(2));
            }
            else{
                localStorage.removeItem(delitem.innerHTML);
            }
            li.remove();
            fraction();
        })
        deletebtn.innerHTML="<i class=\"fa-solid fa-trash-can\"></i>";
        deletebtn.classList.add("del");
        li.appendChild(deletebtn);
        todo.appendChild(li);
        input.placeholder="Enter Items";
    }
    else{
        input.classList.add('error');
        setTimeout(function() {
            input.classList.remove('error');
        }, 300);
        input.placeholder="Item already present";
    }    
    input.value="";
}

const fraction =()=>{
    const ele = document.querySelector(".frac");
    const chk = document.querySelectorAll(".checked");
    var chart = document.querySelector(".chart");
    const bottom = document.querySelector(".bottom");
    chart.remove();
    chart = document.createElement("div");
    ele.innerHTML = `${chk.length}/${item.length}`;
    var per = (chk.length/item.length)*100;
    per = parseInt(per);
    per = parseInt(per/10)*10;
    chart.style=`--value:${per}`;
    chart.role="chart";
    chart.classList.add("chart");
    bottom.appendChild(chart);
}

const validation=(str)=>{
    for(let i=0; i<item.length; i++){
        if(item[i]==str){
            return true;
        }
    }
    return false;
}

const onboot =()=>{
    const checked = [];
    for(let i=0; i<localStorage.length; i++){
        console.log(localStorage.key(i));
        console.log(localStorage.getItem(localStorage.key(i)));
        checked.push(localStorage.getItem(localStorage.key(i)));
        input.value = `${localStorage.key(i)}`;
        add();
    }
    const li_list = document.querySelectorAll("li");
    for(let i=0; i<localStorage.length; i++){
        if(checked[i]==1){
            li_list[i].classList.add("checked");
            const ele = li_list[i].querySelector('span');
            var inner = ele.innerHTML;
            inner = "✓ "+inner;
            ele.innerHTML = inner;
            localStorage.setItem(localStorage.key(i),checked[i]);
        }
    }
    fraction();
}
addbtn.addEventListener("click",add);

dlt.addEventListener("click",()=>{
    localStorage.clear()
    const li_list = document.querySelectorAll("li");
    for(let i=0; i<li_list.length; i++){
        li_list[i].remove();
    }
    item=[];
});

onboot();
