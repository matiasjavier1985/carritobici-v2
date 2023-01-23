let carrito= JSON.parse(localStorage.getItem("carrito"))||[];
let searchbike= document.getElementById("searchbike");
const shopcontent = document.getElementById("shopcontent");
const vercarrito = document.getElementById("vercarrito")
const modalcontainer=document.getElementById("modalbody")
const cantcarrito= document.getElementById("cantcarrito")
let selectbrand = document.getElementById("selectbrand")
let btnborrarselect = document.getElementById("borrarselect")
const preciomayormenor= document.getElementById("preciomayormenor")
const preciomenormayor= document.getElementById("preciomenormayor")
const az= document.getElementById("a-z")
const za= document.getElementById("z-a")

function crearhtml(bike){
  shopcontent.innerHTML=``
  bike.forEach(product => {
      const {img,brand,model,price}=product
      content= document.createElement("div");
      content.className="card d-inline-block mt-3 me-3 mb-3 border border-2 border-top-0"
      content.innerHTML=`
                              <img class="card-img-top" src="${img}">    
                              <h4 class="card-title bg-dark text-light shadow">${brand}</h3>
                              <h6 class ="card-text">${model}</h5>
                              <p class="card-text fs-5 text-success"><strong>$ ${price}</strong></p>
                              `
      let comprar = document.createElement("div");
      comprar.innerText="AGREGAR CARRITO";
      comprar.className="btn btn-outline-success m-1 shadow"
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
        const{id,brand,model,price,amount,img}= product
        carrito.push({id:id,brand:brand,model:model,price:price,amount:amount,img:img});    
      }
      totalgastado() 
      guardarLS()
      amountcarrito()
      }) 
  });
}
crearhtml(bike)

// -------filtrar por:--------------------

let precios = bike.filter((precio)=>precio.price)
let letras = bike.filter((letra)=>letra.brand)

function filtrarbike(filtro) {
  let filtrado = bike.filter((bici) => {
    return bici.brand.includes(filtro.toUpperCase());
  });
  return filtrado;
}
function preciomayor() {
  precios.sort((a,b)=>{
    if (a.price==b.price){
       return 0
    }if(a.price<b.price){
    return 1;
    }return -1;
    })
  return precios
}
function preciomenor() {
    precios.sort((a,b)=>{
      if (a.price==b.price){
         return 0
      }if(a.price>b.price){
      return 1;
      }return -1;
      })
    return precios
}
function ayz() {
  letras.sort((a,b)=>{
    if (a.brand==b.brand){
        return 0
    }if(a.brand>b.brand){
    return 1;
    }return -1;
    })
  return letras
}
function zya() {
  letras.sort((a,b)=>{
    if (a.brand==b.brand){
        return 0
    }if(a.brand<b.brand){
    return 1;
    }return -1;
    })
  return letras
}

searchbike.addEventListener("input",()=>{
  let filtro= filtrarbike(searchbike.value)
  crearhtml(filtro)
});
btnborrarselect.addEventListener("click",()=>{
  crearhtml(bike)
})
preciomayormenor.addEventListener("click",()=>{
  filtro = preciomayor(preciomayormenor)
  crearhtml(filtro)
})
preciomenormayor.addEventListener("click",()=>{
    filtro = preciomenor(preciomenormayor)
    crearhtml(filtro)
})
az.addEventListener("click",()=>{
  filtro = ayz(az)
  crearhtml(filtro)
})
za.addEventListener("click",()=>{
  filtro = zya(za)
  crearhtml(filtro)
})








  









//-----------FIN precio mayor
bici=[]
for (let i = 0; i < bike.length; i++) {
    const element = bike[i];
    bici.push(element.brand)  
}
const filtradobici = bici.filter((valor, indice) => {
    return bici.indexOf(valor) === indice;
  }
);
// ------------------------------------------------------
const filtromarca = document.getElementById("filtromarca")
const filtrobrands = bike.map((el)=>el.brand);

const filtradobicis = filtrobrands.filter((valor, indice) => {
  return bici.indexOf(valor) === indice;
});

filtradobicis.forEach(el => {
  let li= document.createElement("li")
  li.setAttribute("id", el);
  li.className="btn btn-light d-block text-start mb-1"
  li.innerText= el
  li.style="list-style:none";
  filtromarca.append(li)
});

function filtrarpormarca(filtro) {
  let filtrado= bike.filter((cleta)=>{
  return cleta.brand.includes(filtro);
})
  return filtrado
}
filtromarca.addEventListener("click",(e)=>{
  let buscar =e.target.id;
  let filtro= filtrarpormarca(buscar)
  console.log(buscar);
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


