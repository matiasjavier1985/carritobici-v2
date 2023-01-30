
// ----------VARIABLES------------
const btnfinalizarcompra= document.getElementById("btnfinalizarcompra")

// ----------FUNCIONES------------
const pintarCarrito= ()=>{ 
    modalbody.innerHTML=""
    carrito.forEach((product)=>{
    let modalbody = document.createElement("div");
      modalbody.className="modal-body border"
      modalbody.innerHTML=`
            <img class="img-thumbnail w-25 shadow" src="${product.img}">   
            <h6 class="ps-1 d-inline-block">${product.brand}-${product.model}</h6>
            <h6 class="d-block">Precio:${product.price}</h6>
            <button class="btn btn-body border rounded p-1 d-inline-block restarproduct">➖</button>
            <p class="border rounded p-2 d-inline-block">Cant: ${product.amount}</p>
            <button class="btn btn-body border rounded p-1 d-inline-block sumarproduct">➕</button>
            <p class="badge bg-success d-inline-block">Sub-Total: $ ${product.amount * product.price}</p>
            `
    modalcontainer.append(modalbody)

    let restar = modalbody.querySelector(".restarproduct") 
    restar.addEventListener("click",()=>{
      if(product.amount !==1){
         product.amount--
      }
      guardarLS()
      totalgastado()
      pintarCarrito()
    })
     
    let sumar = modalbody.querySelector(".sumarproduct")
    sumar.addEventListener("click",()=>{
      product.amount++
      guardarLS()
      totalgastado()
      pintarCarrito()
    })

    let eliminar =document.createElement("div")
    eliminar.innerHTML=`<button class="btn btn-danger">Eliminar ${product.brand}-${product.model}</button>`
    eliminar.style.cursor="pointer"
    eliminar.className="d-flex flex-row-reverse"
    
    modalbody.append(eliminar)
    eliminar.addEventListener("click", eliminarproducto)

  });
    const total = carrito.reduce((acc,totalprecio) => acc + totalprecio.price * totalprecio.amount,0);
    
    const totalbuying = document.createElement("div");
    totalbuying.className= "modal-footer";
    totalbuying.innerHTML =`🛒 Total a pagar:<h6>$ ${total}</h6>`
    modalbody.append(totalbuying)
  
};
const eliminarproducto=()=>{
  const foundID = carrito.find((element)=> element.id);
  carrito=carrito.filter((carritoID)=>{
  return carritoID !== foundID;
  });

  const Toast = Swal.mixin({
    toast: true,
    position: 'bottom-end',
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })
  Toast.fire({
    icon: 'success',
    title: 'Producto eliminado'
  })

  totalgastado()
  pintarCarrito()
  guardarLS()
  amountcarrito()
};
const amountcarrito=()=>{
  cantcarrito.className="translate-middle badge rounded-pill bg-danger"
  const carritolength = carrito.length
  localStorage.setItem("carritolength",JSON.stringify(carritolength));
  cantcarrito.innerText= localStorage.getItem("carritolength")
}
const totalgastado=()=>{
  const total = carrito.reduce((acc,totalprecio) => acc + totalprecio.price * totalprecio.amount,0); 
  const moneygastado= total
  localStorage.setItem("moneygastado",JSON.stringify(moneygastado))
  totalmoney.innerText = `$ ${localStorage.getItem("moneygastado")}`
}
// ----------Eventos-------------
vercarrito.addEventListener("click",pintarCarrito)
btnfinalizarcompra.addEventListener("click",()=>{
  Swal.fire({
    title: 'BIKESHOP',
    text: "Desea finalizar la Compra?",
    icon: 'warning',
    className: "red-bg",
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'SI'
  }).then((result) => {
    if (result.isConfirmed) {
    localStorage.removeItem("carrito")
    localStorage.removeItem("moneygastado")
    localStorage.setItem("carritolength", 0);
    modalbody.innerHTML="CARRITO VACIO"
      Swal.fire({
        icon:"success",
        text: "Compra exitosa?",
      })
      setTimeout(function(){
        window.location.reload();
     }, 2000);
    }
  }) 
  console.log("ok");
})
amountcarrito()



