let carrito= JSON.parse(localStorage.getItem("carrito"))||[];

let searchbike= document.getElementById("searchbike");

const shopcontent = document.getElementById("shopcontent");
const vercarrito = document.getElementById("vercarrito")
const modalcontainer=document.getElementById("modalbody")
const cantcarrito= document.getElementById("cantcarrito")
let selectbrand = document.getElementById("selectbrand")
let btnborrarselect = document.getElementById("borrarselect")

function filtrarbike(filtro) {
  let filtrado = bike.filter((bici) => {
    return bici.brand.includes(filtro.toUpperCase());
  });
  return filtrado;
}

function crearhtml(bike){
  shopcontent.innerHTML=``
  bike.forEach(product => {
      content= document.createElement("div");
      content.className="card d-inline-block mt-2 me-2"
      content.innerHTML=`
                              <img class="card-img-top" src="${product.img}">    
                              <h4 class="card-title bg-danger">${product.brand}</h3>
                              <h6 class ="card-text">${product.model}</h5>
                              <p class="card-text fs-5 text-success"><strong>$ ${product.price}</strong></p>
                              `
      let comprar = document.createElement("div");
      comprar.innerText="AGREGAR CARRITO";
      comprar.className="btn btn-dark m-1 shadow"
      shopcontent.appendChild(content)
      content.appendChild(comprar)

  comprar.addEventListener("click",()=>{ 
    const Toast = Swal.mixin({
      toast: true,
      position: 'bottom-end',
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    
    Toast.fire({
      icon: 'success',
      title: 'Producto agregado'
    })

      const repeat = carrito.some((repeatproduct)=> repeatproduct.id === product.id);
        if (repeat){
          carrito.map((prod)=>{
            if(prod.id === product.id){
              prod.amount++
            }
          });
        }else{
        carrito.push({
          id:product.id,
          brand:product.brand,
          model:product.model,
          price:product.price,
          amount: product.amount,
          img:product.img        
        });    
      }
      totalgastado() 
      guardarLS()
      amountcarrito()
      }) 
  });
}
crearhtml(bike)

searchbike.addEventListener("input",()=>{
  let filtro= filtrarbike(searchbike.value)
  crearhtml(filtro)
});

btnborrarselect.addEventListener("click",()=>{
  crearhtml(bike)
})

bici=[]
for (let i = 0; i < bike.length; i++) {
    const element = bike[i];
    bici.push(element.brand)  
}
const filtradobici = bici.filter((valor, indice) => {
    return bici.indexOf(valor) === indice;
  }
);
// -----------------------------
const filtromarca = document.getElementById("filtromarca")

const filtrobrands = bike.map((el)=>el.brand);

const filtradobicis = filtrobrands.filter((valor, indice) => {
  return bici.indexOf(valor) === indice;
});

filtradobicis.forEach(el => {
  let li= document.createElement("li")
  li.className= el
  li.innerText=el
  filtromarca.append(li)
});

function filtrarpormarca(filtro) {
  let filtrado= bike.filter((cleta)=>{
  return cleta.brand.includes(filtro);
})
  return filtrado
}

filtrarpormarca()

filtromarca.addEventListener("click",(e)=>{
  let buscar =e.target.className;
  let filtro= filtrarpormarca(buscar)
  crearhtml(filtro)
})

// --------------------------------



function selectbike(filtro) {
  let filtrado = bike.filter((bici) => {
    return bici.brand.includes(filtro);
  });
  return filtrado;
}
filtradobici.forEach((bicis) => {
  let option = document.createElement("option");
    option.value =bicis;
    option.innerText =bicis;
    selectbrand.appendChild(option);
});

selectbrand.addEventListener("change", () => {
  let opcion = selectbrand.options[selectbrand.selectedIndex].value;
  let filtro= selectbike(opcion)
  crearhtml(filtro)

});

//LocalStorage
//setitem
const guardarLS = ()=>{
  localStorage.setItem("carrito", JSON.stringify(carrito))
}


