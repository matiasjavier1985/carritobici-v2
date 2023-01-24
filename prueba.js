
// let preciomayor= []
// for (let i = 0; i < bike.length; i++) {
//     const el = bike[i];
//     preciomayor.push(el.price)
//     console.log(preciomayor);
// }
// bike.sort( (a,b)=>{
//     if (a.price==b.price){
//         return 0
//     }if(a.price<b.price){
//         return 1;
//     }return -1;
// })

// let preciomayor = bike.map((precio)=>precio.price)
// preciomayor.sort((a,b)=>{
//     if (a==b){
//        return 0
//     }if(a<b){
//     return 1;
//     }return -1;
//     })
// console.log(preciomayor);

fetch('./data/bike.json')
      .then(response => response.json())
      .then(json => console.log(json))
      crearhtml(json)
// bike.sort((a,b)=>{return (a.price-b.price)})
// console.log(bike);
// bike.sort((a,b)=>{return (b.price-a.price)})
// console.log(bike);
// let preciomayor = bike.map((precio)=>precio.price)
// let preciomenor = bike.map((precio)=>precio.price)
// 
// preciomenor.sort((a,b)=>{return b - a})   
// console.log(preciomayor);
// console.log(preciomenor);
