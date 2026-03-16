import { useState, useEffect, useRef } from "react";

const TARJETAS_PREDEFINIDAS = [
  { id: "visa", nombre: "Visa", tipo: "credito", color: "#1a1f71", emoji: "💳" },
  { id: "mastercard", nombre: "Mastercard", tipo: "credito", color: "#eb001b", emoji: "💳" },
  { id: "amex", nombre: "American Express", tipo: "credito", color: "#007bc1", emoji: "💳" },
  { id: "naranja", nombre: "Naranja X", tipo: "credito", color: "#ff6200", emoji: "🟠" },
  { id: "galicia_visa", nombre: "Visa Galicia", tipo: "credito", color: "#e4032e", emoji: "🔴" },
  { id: "galicia_mc", nombre: "Mastercard Galicia", tipo: "credito", color: "#e4032e", emoji: "🔴" },
  { id: "bbva_visa", nombre: "Visa BBVA", tipo: "credito", color: "#004a97", emoji: "🔵" },
  { id: "santander_visa", nombre: "Visa Santander", tipo: "credito", color: "#ec0000", emoji: "🔴" },
  { id: "hsbc_visa", nombre: "Visa HSBC", tipo: "credito", color: "#db0011", emoji: "🔴" },
  { id: "ciudad_mc", nombre: "Mastercard Ciudad", tipo: "credito", color: "#f5a800", emoji: "🟡" },
  { id: "macro_visa", nombre: "Visa Macro", tipo: "credito", color: "#00a650", emoji: "🟢" },
  { id: "cabal", nombre: "Cabal", tipo: "credito", color: "#005baa", emoji: "💳" },
  { id: "debito_visa", nombre: "Débito Visa", tipo: "debito", color: "#1a1f71", emoji: "🏦" },
  { id: "debito_mc", nombre: "Débito Mastercard", tipo: "debito", color: "#555", emoji: "🏦" },
  { id: "cuenta_dni", nombre: "Cuenta DNI (BNA)", tipo: "digital", color: "#00a0d6", emoji: "📱" },
  { id: "uala", nombre: "Ualá", tipo: "digital", color: "#7b2d8b", emoji: "📱" },
  { id: "mercadopago", nombre: "Mercado Pago", tipo: "digital", color: "#009ee3", emoji: "📱" },
  { id: "modo", nombre: "MODO", tipo: "digital", color: "#1800ff", emoji: "📱" },
];

const PROMOS_DB = [
  { id: 1, supermercado: "Carrefour", tarjeta_id: "galicia_visa", tipo: "descuento", valor: 20, descripcion: "20% OFF viernes", dias: ["Viernes"], tope: 2000 },
  { id: 2, supermercado: "Carrefour", tarjeta_id: "bbva_visa", tipo: "cuotas", valor: 3, descripcion: "3 cuotas sin interés", dias: null, tope: null },
  { id: 3, supermercado: "Carrefour", tarjeta_id: "uala", tipo: "reintegro", valor: 8, descripcion: "8% reintegro con Ualá", dias: null, tope: 600 },
  { id: 4, supermercado: "Coto", tarjeta_id: "galicia_mc", tipo: "descuento", valor: 15, descripcion: "15% OFF martes y miércoles", dias: ["Martes", "Miércoles"], tope: 1500 },
  { id: 5, supermercado: "Coto", tarjeta_id: "cuenta_dni", tipo: "reintegro", valor: 10, descripcion: "10% reintegro", dias: null, tope: 1000 },
  { id: 6, supermercado: "Coto", tarjeta_id: "modo", tipo: "descuento", valor: 12, descripcion: "12% OFF con MODO", dias: null, tope: 1200 },
  { id: 7, supermercado: "Jumbo", tarjeta_id: "santander_visa", tipo: "descuento", valor: 25, descripcion: "25% OFF jueves", dias: ["Jueves"], tope: 3000 },
  { id: 8, supermercado: "Jumbo", tarjeta_id: "hsbc_visa", tipo: "cuotas", valor: 6, descripcion: "6 cuotas sin interés", dias: null, tope: null },
  { id: 9, supermercado: "Jumbo", tarjeta_id: "amex", tipo: "cuotas", valor: 12, descripcion: "12 cuotas sin interés", dias: null, tope: null },
  { id: 10, supermercado: "Dia", tarjeta_id: "mercadopago", tipo: "descuento", valor: 10, descripcion: "10% OFF con Mercado Pago", dias: null, tope: 800 },
  { id: 11, supermercado: "Dia", tarjeta_id: "debito_visa", tipo: "descuento", valor: 5, descripcion: "5% OFF con débito", dias: null, tope: null },
  { id: 12, supermercado: "Disco", tarjeta_id: "ciudad_mc", tipo: "descuento", valor: 20, descripcion: "20% OFF lunes", dias: ["Lunes"], tope: 2500 },
  { id: 13, supermercado: "Disco", tarjeta_id: "naranja", tipo: "2x1", valor: null, descripcion: "2×1 en productos seleccionados", dias: null, tope: null },
  { id: 14, supermercado: "La Anonima", tarjeta_id: "macro_visa", tipo: "descuento", valor: 15, descripcion: "15% OFF todos los días", dias: null, tope: null },
];

const DIAS_SEMANA = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

const SUPERMERCADOS_INFO = {
  "Carrefour": { color: "#0066CC", emoji: "🔵" },
  "Coto": { color: "#E31B23", emoji: "🔴" },
  "Dia": { color: "#E8001A", emoji: "🟠" },
  "Jumbo": { color: "#00A651", emoji: "🟢" },
  "Disco": { color: "#FF6B00", emoji: "🟡" },
  "La Anonima": { color: "#0057A8", emoji: "🔷" },
};

const PRODUCTOS_DEMO = [
  // Lácteos
  { id: "7790580348752", nombre: "Leche La Serenísima entera 1L", marca: "La Serenísima", presentacion: "1L", categoria: "lácteos", precio_base: 1200 },
  { id: "7790580348753", nombre: "Leche La Serenísima descremada 1L", marca: "La Serenísima", presentacion: "1L", categoria: "lácteos", precio_base: 1250 },
  { id: "7790580348754", nombre: "Leche La Serenísima parcialmente descremada 1L", marca: "La Serenísima", presentacion: "1L", categoria: "lácteos", precio_base: 1230 },
  { id: "7790040348001", nombre: "Leche Ilolay entera 1L", marca: "Ilolay", presentacion: "1L", categoria: "lácteos", precio_base: 1150 },
  { id: "7790040348002", nombre: "Leche Sancor entera 1L", marca: "Sancor", presentacion: "1L", categoria: "lácteos", precio_base: 1180 },
  { id: "7790580348911", nombre: "Manteca La Serenísima 200g", marca: "La Serenísima", presentacion: "200g", categoria: "lácteos", precio_base: 1100 },
  { id: "7790580348912", nombre: "Manteca Sancor 200g", marca: "Sancor", presentacion: "200g", categoria: "lácteos", precio_base: 1050 },
  { id: "7790580349957", nombre: "Yogur Actimel frutilla x4", marca: "Actimel", presentacion: "x4", categoria: "lácteos", precio_base: 1650 },
  { id: "7790580349958", nombre: "Yogur Ser natural 190g", marca: "Ser", presentacion: "190g", categoria: "lácteos", precio_base: 620 },
  { id: "7790580349959", nombre: "Yogur La Serenísima firme vainilla 190g", marca: "La Serenísima", presentacion: "190g", categoria: "lácteos", precio_base: 580 },
  { id: "7790580349960", nombre: "Queso cremoso La Paulina 400g", marca: "La Paulina", presentacion: "400g", categoria: "lácteos", precio_base: 2200 },
  { id: "7790580349961", nombre: "Queso tybo La Serenísima 400g", marca: "La Serenísima", presentacion: "400g", categoria: "lácteos", precio_base: 2400 },
  // Panificados y cereales
  { id: "7790040139700", nombre: "Pan lactal Bimbo blanco 500g", marca: "Bimbo", presentacion: "500g", categoria: "panadería", precio_base: 950 },
  { id: "7790040139701", nombre: "Pan lactal Bimbo integral 500g", marca: "Bimbo", presentacion: "500g", categoria: "panadería", precio_base: 1020 },
  { id: "7790040139702", nombre: "Pan lactal Fargo familiar 600g", marca: "Fargo", presentacion: "600g", categoria: "panadería", precio_base: 880 },
  { id: "7790040139703", nombre: "Pan lactal Fargo sandwich 680g", marca: "Fargo", presentacion: "680g", categoria: "panadería", precio_base: 960 },
  { id: "7790040058209", nombre: "Galletitas Oreo original 117g", marca: "Oreo", presentacion: "117g", categoria: "panadería", precio_base: 850 },
  { id: "7790040058210", nombre: "Galletitas Oreo relleno doble 117g", marca: "Oreo", presentacion: "117g", categoria: "panadería", precio_base: 900 },
  { id: "7790040058211", nombre: "Galletitas Toddy chocolate 147g", marca: "Toddy", presentacion: "147g", categoria: "panadería", precio_base: 820 },
  { id: "7790040058212", nombre: "Galletitas Criollitas clásicas 230g", marca: "Criollitas", presentacion: "230g", categoria: "panadería", precio_base: 740 },
  { id: "7790040058213", nombre: "Galletitas de agua Crackers 170g", marca: "Crackers", presentacion: "170g", categoria: "panadería", precio_base: 680 },
  // Aceites y condimentos
  { id: "7790040098403", nombre: "Aceite Cocinero girasol 900ml", marca: "Cocinero", presentacion: "900ml", categoria: "aceites", precio_base: 1800 },
  { id: "7790040098404", nombre: "Aceite Cocinero girasol 1.5L", marca: "Cocinero", presentacion: "1.5L", categoria: "aceites", precio_base: 2600 },
  { id: "7790040098405", nombre: "Aceite Natura mezcla 900ml", marca: "Natura", presentacion: "900ml", categoria: "aceites", precio_base: 1750 },
  { id: "7790040098406", nombre: "Aceite de oliva Carbonell 500ml", marca: "Carbonell", presentacion: "500ml", categoria: "aceites", precio_base: 4200 },
  { id: "7790040099318", nombre: "Mayonesa Hellmann's 237g", marca: "Hellmann's", presentacion: "237g", categoria: "condimentos", precio_base: 780 },
  { id: "7790040099319", nombre: "Mayonesa Hellmann's 450g", marca: "Hellmann's", presentacion: "450g", categoria: "condimentos", precio_base: 1300 },
  { id: "7790040099320", nombre: "Ketchup Heinz 400g", marca: "Heinz", presentacion: "400g", categoria: "condimentos", precio_base: 1100 },
  { id: "7790040099321", nombre: "Mostaza Savora 250g", marca: "Savora", presentacion: "250g", categoria: "condimentos", precio_base: 650 },
  // Arroz, fideos y harinas
  { id: "7792080011456", nombre: "Arroz Gallo Oro largo fino 1kg", marca: "Gallo Oro", presentacion: "1kg", categoria: "secos", precio_base: 750 },
  { id: "7792080011457", nombre: "Arroz Gallo Oro doble carolina 1kg", marca: "Gallo Oro", presentacion: "1kg", categoria: "secos", precio_base: 780 },
  { id: "7792080011458", nombre: "Arroz Maximo largo fino 1kg", marca: "Máximo", presentacion: "1kg", categoria: "secos", precio_base: 700 },
  { id: "7790742001403", nombre: "Fideos Matarazzo spaghetti 500g", marca: "Matarazzo", presentacion: "500g", categoria: "secos", precio_base: 600 },
  { id: "7790742001404", nombre: "Fideos Matarazzo mostachol 500g", marca: "Matarazzo", presentacion: "500g", categoria: "secos", precio_base: 600 },
  { id: "7790742001405", nombre: "Fideos Matarazzo tallarines 500g", marca: "Matarazzo", presentacion: "500g", categoria: "secos", precio_base: 600 },
  { id: "7790742001406", nombre: "Fideos Don Vittorio spaghetti 500g", marca: "Don Vittorio", presentacion: "500g", categoria: "secos", precio_base: 580 },
  { id: "7790040099400", nombre: "Harina 000 Cañuelas 1kg", marca: "Cañuelas", presentacion: "1kg", categoria: "secos", precio_base: 520 },
  { id: "7790040099401", nombre: "Harina 0000 Pureza 1kg", marca: "Pureza", presentacion: "1kg", categoria: "secos", precio_base: 540 },
  { id: "7798062539763", nombre: "Azúcar Ledesma 1kg", marca: "Ledesma", presentacion: "1kg", categoria: "secos", precio_base: 680 },
  { id: "7798062539764", nombre: "Azúcar Chango 1kg", marca: "Chango", presentacion: "1kg", categoria: "secos", precio_base: 660 },
  { id: "7790040099402", nombre: "Sal fina Celusal 500g", marca: "Celusal", presentacion: "500g", categoria: "secos", precio_base: 320 },
  { id: "7790040099403", nombre: "Polenta Granix 500g", marca: "Granix", presentacion: "500g", categoria: "secos", precio_base: 480 },
  // Yerba y bebidas
  { id: "7790070010247", nombre: "Yerba Taragüi con palo 1kg", marca: "Taragüi", presentacion: "1kg", categoria: "infusiones", precio_base: 2200 },
  { id: "7790070010248", nombre: "Yerba Taragüi sin palo 1kg", marca: "Taragüi", presentacion: "1kg", categoria: "infusiones", precio_base: 2300 },
  { id: "7790070010249", nombre: "Yerba Rosamonte 1kg", marca: "Rosamonte", presentacion: "1kg", categoria: "infusiones", precio_base: 2100 },
  { id: "7790070010250", nombre: "Yerba CBSé energizante 1kg", marca: "CBSé", presentacion: "1kg", categoria: "infusiones", precio_base: 2400 },
  { id: "7790070010251", nombre: "Yerba La Merced 1kg", marca: "La Merced", presentacion: "1kg", categoria: "infusiones", precio_base: 2350 },
  { id: "7798100562700", nombre: "Café La Virginia molido 250g", marca: "La Virginia", presentacion: "250g", categoria: "infusiones", precio_base: 1400 },
  { id: "7798100562701", nombre: "Café Nescafé clásico 170g", marca: "Nescafé", presentacion: "170g", categoria: "infusiones", precio_base: 2800 },
  { id: "7798100562702", nombre: "Té Lipton x20 saquitos", marca: "Lipton", presentacion: "x20", categoria: "infusiones", precio_base: 750 },
  { id: "7798100562703", nombre: "Té Cachamai verde x20", marca: "Cachamai", presentacion: "x20", categoria: "infusiones", precio_base: 680 },
  { id: "7798100600001", nombre: "Agua mineral Villavicencio 2L", marca: "Villavicencio", presentacion: "2L", categoria: "bebidas", precio_base: 750 },
  { id: "7798100600002", nombre: "Agua mineral Eco de los Andes 2L", marca: "Eco de los Andes", presentacion: "2L", categoria: "bebidas", precio_base: 720 },
  { id: "7798100600003", nombre: "Jugo Tang naranja sobre 20g", marca: "Tang", presentacion: "20g", categoria: "bebidas", precio_base: 280 },
  { id: "7798100600004", nombre: "Gaseosa Coca-Cola 2.25L", marca: "Coca-Cola", presentacion: "2.25L", categoria: "bebidas", precio_base: 1800 },
  { id: "7798100600005", nombre: "Gaseosa Pepsi 2.25L", marca: "Pepsi", presentacion: "2.25L", categoria: "bebidas", precio_base: 1650 },
  { id: "7798100600006", nombre: "Gaseosa 7UP 2.25L", marca: "7UP", presentacion: "2.25L", categoria: "bebidas", precio_base: 1600 },
  { id: "7798100600007", nombre: "Soda Cunnington 1.5L x6", marca: "Cunnington", presentacion: "1.5L x6", categoria: "bebidas", precio_base: 1900 },
  // Limpieza
  { id: "7790040112903", nombre: "Detergente Skip líquido 750ml", marca: "Skip", presentacion: "750ml", categoria: "limpieza", precio_base: 1100 },
  { id: "7790040112904", nombre: "Detergente Magistral limón 750ml", marca: "Magistral", presentacion: "750ml", categoria: "limpieza", precio_base: 950 },
  { id: "7791337000052", nombre: "Jabón en polvo Ala 800g", marca: "Ala", presentacion: "800g", categoria: "limpieza", precio_base: 1650 },
  { id: "7791337000053", nombre: "Jabón en polvo Ariel 800g", marca: "Ariel", presentacion: "800g", categoria: "limpieza", precio_base: 1900 },
  { id: "7791337000054", nombre: "Suavizante Downy 900ml", marca: "Downy", presentacion: "900ml", categoria: "limpieza", precio_base: 1750 },
  { id: "7791337000055", nombre: "Lavandina Ayudín 1L", marca: "Ayudín", presentacion: "1L", categoria: "limpieza", precio_base: 580 },
  { id: "7791337000056", nombre: "Limpiador Lysoform baño 500ml", marca: "Lysoform", presentacion: "500ml", categoria: "limpieza", precio_base: 890 },
  { id: "7791337000057", nombre: "Esponja Scotch-Brite doble uso x2", marca: "Scotch-Brite", presentacion: "x2", categoria: "limpieza", precio_base: 680 },
  { id: "7791337000058", nombre: "Papel higiénico Elite doble hoja x4", marca: "Elite", presentacion: "x4 rollos", categoria: "limpieza", precio_base: 1200 },
  { id: "7791337000059", nombre: "Papel higiénico Higienol x4", marca: "Higienol", presentacion: "x4 rollos", categoria: "limpieza", precio_base: 980 },
  { id: "7791337000060", nombre: "Servilletas Familia 100u", marca: "Familia", presentacion: "100u", categoria: "limpieza", precio_base: 450 },
  // Higiene personal
  { id: "7790040148139", nombre: "Shampoo Head & Shoulders 375ml", marca: "Head & Shoulders", presentacion: "375ml", categoria: "higiene", precio_base: 1900 },
  { id: "7790040148140", nombre: "Shampoo Pantene hidratación 400ml", marca: "Pantene", presentacion: "400ml", categoria: "higiene", precio_base: 1850 },
  { id: "7790040148141", nombre: "Shampoo Dove nutritivo 400ml", marca: "Dove", presentacion: "400ml", categoria: "higiene", precio_base: 1800 },
  { id: "7790040148142", nombre: "Acondicionador Pantene 400ml", marca: "Pantene", presentacion: "400ml", categoria: "higiene", precio_base: 1850 },
  { id: "7790040148143", nombre: "Jabón Dove original x3", marca: "Dove", presentacion: "x3 u", categoria: "higiene", precio_base: 1400 },
  { id: "7790040148144", nombre: "Jabón líquido Palmolive 250ml", marca: "Palmolive", presentacion: "250ml", categoria: "higiene", precio_base: 980 },
  { id: "7790040148145", nombre: "Desodorante Rexona men 150ml", marca: "Rexona", presentacion: "150ml", categoria: "higiene", precio_base: 1600 },
  { id: "7790040148146", nombre: "Desodorante Dove original 150ml", marca: "Dove", presentacion: "150ml", categoria: "higiene", precio_base: 1580 },
  { id: "7790040148147", nombre: "Pasta dental Colgate triple acción 90g", marca: "Colgate", presentacion: "90g", categoria: "higiene", precio_base: 950 },
  { id: "7790040148148", nombre: "Pasta dental Colgate luminous white 90g", marca: "Colgate", presentacion: "90g", categoria: "higiene", precio_base: 1100 },
  { id: "7790040148149", nombre: "Cepillo dental Oral-B classic suave", marca: "Oral-B", presentacion: "x1", categoria: "higiene", precio_base: 780 },
  { id: "7790040148150", nombre: "Afeitadora Gillette prestobarba x2", marca: "Gillette", presentacion: "x2", categoria: "higiene", precio_base: 1200 },
  // Conservas y enlatados
  { id: "7790040200001", nombre: "Tomate triturado Arcor 520g", marca: "Arcor", presentacion: "520g", categoria: "conservas", precio_base: 480 },
  { id: "7790040200002", nombre: "Tomate perita La Campagnola 400g", marca: "La Campagnola", presentacion: "400g", categoria: "conservas", precio_base: 550 },
  { id: "7790040200003", nombre: "Arvejas La Campagnola 300g", marca: "La Campagnola", presentacion: "300g", categoria: "conservas", precio_base: 620 },
  { id: "7790040200004", nombre: "Choclo amarillo La Campagnola 300g", marca: "La Campagnola", presentacion: "300g", categoria: "conservas", precio_base: 580 },
  { id: "7790040200005", nombre: "Atún en aceite La Boat 170g", marca: "La Boat", presentacion: "170g", categoria: "conservas", precio_base: 950 },
  { id: "7790040200006", nombre: "Atún al natural Alicia 175g", marca: "Alicia", presentacion: "175g", categoria: "conservas", precio_base: 900 },
  { id: "7790040200007", nombre: "Sardinas La Capitana 125g", marca: "La Capitana", presentacion: "125g", categoria: "conservas", precio_base: 720 },
  { id: "7790040200008", nombre: "Mermelada de durazno Arcor 390g", marca: "Arcor", presentacion: "390g", categoria: "conservas", precio_base: 750 },
  { id: "7790040200009", nombre: "Mermelada de frutilla La Campagnola 390g", marca: "La Campagnola", presentacion: "390g", categoria: "conservas", precio_base: 780 },
  // Snacks y golosinas
  { id: "7790040300001", nombre: "Papas fritas Lay's clásicas 145g", marca: "Lay's", presentacion: "145g", categoria: "snacks", precio_base: 980 },
  { id: "7790040300002", nombre: "Papas fritas Pringles original 124g", marca: "Pringles", presentacion: "124g", categoria: "snacks", precio_base: 1100 },
  { id: "7790040300003", nombre: "Maní Traful tostado salado 200g", marca: "Traful", presentacion: "200g", categoria: "snacks", precio_base: 650 },
  { id: "7790040300004", nombre: "Alfajor Milka doble 55g", marca: "Milka", presentacion: "55g", categoria: "snacks", precio_base: 580 },
  { id: "7790040300005", nombre: "Alfajor Havanna chocolate x6", marca: "Havanna", presentacion: "x6", categoria: "snacks", precio_base: 3200 },
  { id: "7790040300006", nombre: "Chocolate Milka leche 100g", marca: "Milka", presentacion: "100g", categoria: "snacks", precio_base: 1100 },
  { id: "7790040300007", nombre: "Dulce de leche La Serenísima 400g", marca: "La Serenísima", presentacion: "400g", categoria: "snacks", precio_base: 1200 },
  { id: "7790040300008", nombre: "Dulce de leche Sancor repostero 400g", marca: "Sancor", presentacion: "400g", categoria: "snacks", precio_base: 1150 },
];

// Índice para búsqueda rápida
const BUSQUEDA_INDEX = PRODUCTOS_DEMO.flatMap(p => [
  p.nombre.toLowerCase(), p.marca?.toLowerCase(), p.categoria?.toLowerCase(), p.presentacion?.toLowerCase()
].filter(Boolean).map(term => ({ term, id: p.id })));

const PROXY_URL = "https://carritoya-proxy.vercel.app/api/proxy";


function generarPreciosFicticios(productoId) {
  const supers = Object.keys(SUPERMERCADOS_INFO);
  const p = PRODUCTOS_DEMO.find(x => x.id === productoId);
  if (!p) return [];
  return supers.map(nombre => ({
    cadena: nombre,
    precio: Math.round(p.precio_base * (0.82 + Math.random() * 0.4)),
    sucursal: `${nombre} - Sucursal cercana`,
    distancia: (0.3 + Math.random() * 3.5).toFixed(1),
  })).sort((a, b) => a.precio - b.precio);
}

function calcularPrecioFinal(precio, promo) {
  if (!promo) return precio;
  if (promo.tipo === "descuento" || promo.tipo === "reintegro") {
    const descuento = precio * promo.valor / 100;
    return precio - (promo.tope ? Math.min(descuento, promo.tope) : descuento);
  }
  return precio;
}

function PromoBadge({ promo, small }) {
  const styles = {
    descuento: { bg: "rgba(74,222,128,0.15)", color: "#4ade80", label: `${promo.valor}% OFF` },
    reintegro: { bg: "rgba(96,165,250,0.15)", color: "#60a5fa", label: `${promo.valor}% reintegro` },
    cuotas: { bg: "rgba(251,191,36,0.15)", color: "#fbbf24", label: `${promo.valor} cuotas s/i` },
    "2x1": { bg: "rgba(232,121,249,0.15)", color: "#e879f9", label: "2×1" },
  };
  const s = styles[promo.tipo] || { bg: "rgba(255,255,255,0.1)", color: "#fff", label: promo.tipo };
  return (
    <span style={{
      padding: small ? "2px 7px" : "3px 10px",
      borderRadius: 6, fontWeight: 700,
      fontSize: small ? 10 : 11,
      background: s.bg, color: s.color,
      whiteSpace: "nowrap",
    }}>{s.label}</span>
  );
}

function loadLS(k, fb) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : fb; } catch { return fb; } }
function saveLS(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} }

export default function CarritoYa() {
  const [screen, setScreen] = useState("home");
  const [ubicacion, setUbicacion] = useState(null);
  const [ubicacionTexto, setUbicacionTexto] = useState("");
  const [busqueda, setBusqueda] = useState("");
  const [resultados, setResultados] = useState([]);
  const [carrito, setCarrito] = useState(() => loadLS("carritoYa_carrito", []));
  const [tarjetas, setTarjetas] = useState(() => loadLS("carritoYa_tarjetas", []));
  const [comparacion, setComparacion] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modoDemo, setModoDemo] = useState(false);
  const [errorUbi, setErrorUbi] = useState("");
  const [toast, setToast] = useState(null);
  const [filtroTipo, setFiltroTipo] = useState("todas");
  const [vistaComparacion, setVistaComparacion] = useState("ranking");

  useEffect(() => { saveLS("carritoYa_carrito", carrito); }, [carrito]);
  useEffect(() => { saveLS("carritoYa_tarjetas", tarjetas); }, [tarjetas]);

  const showToast = (msg, tipo = "ok") => {
    setToast({ msg, tipo });
    setTimeout(() => setToast(null), 2200);
  };

  const totalUnidades = carrito.reduce((a, p) => a + (p.cantidad || 1), 0);

  const obtenerUbicacion = () => {
    setLoading(true); setErrorUbi("");
    if (!navigator.geolocation) { setErrorUbi("Tu navegador no soporta geolocalización."); setLoading(false); return; }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUbicacion({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setUbicacionTexto("Mi ubicación actual");
        setLoading(false); setScreen("buscar");
      },
      () => { setErrorUbi("No pudimos obtener tu ubicación. Usá el modo demo o ingresá coordenadas."); setLoading(false); }
    );
  };

  const usarDemo = () => {
    setUbicacion({ lat: -34.6037, lng: -58.3816 });
    setUbicacionTexto("Buenos Aires (demo)");
    setModoDemo(true); setScreen("buscar");
  };

  const buscarProductos = async (q) => {
    if (!q || q.length < 2) return;
    setLoading(true);
    try {
      if (modoDemo) throw new Error("demo");
      const lat = ubicacion?.lat || -34.6037, lng = ubicacion?.lng || -58.3816;
      const url = `${PROXY_URL}?endpoint=productos&string=${encodeURIComponent(q)}&lat=${lat}&lng=${lng}&limit=50`;
      const res = await fetch(url);
      const data = await res.json();
      if (data?.productos?.length > 0) { setResultados(data.productos); }
      else throw new Error("vacio");
    } catch {
      // Búsqueda demo por tokens: busca en nombre, marca, categoría y presentación
      const tokens = q.toLowerCase().trim().split(/\s+/).filter(t => t.length > 1);
      const scored = PRODUCTOS_DEMO.map(p => {
        const haystack = `${p.nombre} ${p.marca} ${p.categoria} ${p.presentacion}`.toLowerCase();
        const score = tokens.reduce((acc, t) => acc + (haystack.includes(t) ? 2 : 0) + (p.nombre.toLowerCase().includes(t) ? 1 : 0), 0);
        return { p, score };
      }).filter(x => x.score > 0).sort((a, b) => b.score - a.score);
      // Si no hay coincidencias exactas, mostrar toda la categoría relacionada
      if (scored.length === 0) {
        const cats = { leche: "lácteos", yogur: "lácteos", queso: "lácteos", manteca: "lácteos", pan: "panadería", galleta: "panadería", aceite: "aceites", mayo: "condimentos", arroz: "secos", fideo: "secos", harina: "secos", azucar: "secos", yerba: "infusiones", cafe: "infusiones", te: "infusiones", agua: "bebidas", gaseosa: "bebidas", limpieza: "limpieza", jabón: "limpieza", shampoo: "higiene", desodorante: "higiene", pasta: "higiene", atun: "conservas", tomate: "conservas", mermelada: "conservas", chips: "snacks", chocolate: "snacks" };
        const catMatch = Object.entries(cats).find(([k]) => q.toLowerCase().includes(k));
        if (catMatch) setResultados(PRODUCTOS_DEMO.filter(p => p.categoria === catMatch[1]));
        else setResultados(PRODUCTOS_DEMO.slice(0, 20)); // muestra los primeros 20 si no hay nada
      } else {
        setResultados(scored.map(x => x.p));
      }
      setModoDemo(true);
    }
    setLoading(false);
  };

  const toggleCarrito = (prod) => {
    const existe = carrito.find(p => p.id === prod.id);
    if (existe) {
      setCarrito(carrito.filter(p => p.id !== prod.id));
      showToast("Quitado del carrito", "warn");
    } else {
      setCarrito([...carrito, { ...prod, cantidad: 1 }]);
      showToast("¡Agregado al carrito! 🛒");
    }
  };

  const cambiarCantidad = (id, delta) => {
    setCarrito(prev => prev.map(p => {
      if (p.id !== id) return p;
      const nueva = (p.cantidad || 1) + delta;
      return nueva < 1 ? null : { ...p, cantidad: nueva };
    }).filter(Boolean));
  };

  const toggleTarjeta = (tid) => {
    if (tarjetas.includes(tid)) {
      setTarjetas(prev => prev.filter(t => t !== tid));
      showToast("Tarjeta removida", "warn");
    } else {
      setTarjetas(prev => [...prev, tid]);
      showToast("Tarjeta guardada 💳");
    }
  };

  const compararPrecios = async () => {
    setLoading(true); setScreen("comparar"); setComparacion(null);
    const lat = ubicacion?.lat || -34.6037, lng = ubicacion?.lng || -58.3816;
    const hoy = DIAS_SEMANA[new Date().getDay()];
    const totalesPorSuper = {};
    const detallesPorProducto = [];

    for (const producto of carrito) {
      let precios = [];
      try {
        if (modoDemo) throw new Error("demo");
        const url = `${PROXY_URL}?endpoint=producto&id_producto=${producto.id}&lat=${lat}&lng=${lng}&limit=30`;
        const res = await fetch(url);
        const data = await res.json();
        if (data?.sucursales?.length > 0) {
          precios = data.sucursales.map(s => ({
            cadena: s.comercioRazonSocial || s.banderaDescripcion || "Otro",
            precio: s.precioMin || s.precio,
            sucursal: s.sucursalNombre || s.direccion,
            distancia: s.distancia,
          })).sort((a, b) => a.precio - b.precio);
        } else throw new Error();
      } catch {
        precios = generarPreciosFicticios(producto.id);
      }

      const preciosConPromo = precios.map(sup => {
        const promosAplicables = PROMOS_DB.filter(pr => {
          const supMatch = sup.cadena?.toLowerCase().includes(pr.supermercado.toLowerCase()) || pr.supermercado.toLowerCase().includes(sup.cadena?.split(" ")[0]?.toLowerCase());
          const tarjetaMatch = tarjetas.includes(pr.tarjeta_id);
          const diaMatch = !pr.dias || pr.dias.includes(hoy);
          return supMatch && tarjetaMatch && diaMatch;
        });
        const mejorDescuento = promosAplicables
          .filter(p => p.tipo === "descuento" || p.tipo === "reintegro")
          .sort((a, b) => (b.valor || 0) - (a.valor || 0))[0];
        const precioOriginal = sup.precio * (producto.cantidad || 1);
        const precioFinal = mejorDescuento ? calcularPrecioFinal(precioOriginal, mejorDescuento) : precioOriginal;
        return { ...sup, promos: promosAplicables, precioOriginal, precioFinal };
      });

      detallesPorProducto.push({ producto: producto.nombre, cantidad: producto.cantidad || 1, precios: preciosConPromo });

      preciosConPromo.forEach(s => {
        if (!totalesPorSuper[s.cadena]) totalesPorSuper[s.cadena] = { total: 0, totalOriginal: 0, count: 0, sucursal: s.sucursal, distancia: s.distancia, promos: [] };
        totalesPorSuper[s.cadena].total += s.precioFinal;
        totalesPorSuper[s.cadena].totalOriginal += s.precioOriginal;
        totalesPorSuper[s.cadena].count += 1;
        s.promos.forEach(pr => { if (!totalesPorSuper[s.cadena].promos.find(x => x.id === pr.id)) totalesPorSuper[s.cadena].promos.push(pr); });
      });
    }

    const ranking = Object.entries(totalesPorSuper)
      .filter(([_, v]) => v.count >= Math.ceil(carrito.length * 0.5))
      .map(([cadena, v]) => ({ cadena, ...v }))
      .sort((a, b) => a.total - b.total);

    setComparacion({ ranking, detalles: detallesPorProducto, hoy });
    setLoading(false);
  };

  const getSupInfo = (nombre) => {
    const key = Object.keys(SUPERMERCADOS_INFO).find(k => nombre?.toLowerCase().includes(k.toLowerCase()));
    return key ? SUPERMERCADOS_INFO[key] : { color: "#666", emoji: "🏪" };
  };

  const tarjetasFiltradas = TARJETAS_PREDEFINIDAS.filter(t => filtroTipo === "todas" || t.tipo === filtroTipo);

  return (
    <div style={{ minHeight: "100vh", background: "#0d1117", color: "#e6edf3", fontFamily: "'Sora', sans-serif", overflowX: "hidden" }}>
      <link href="https://fonts.googleapis.com/css2?family=Sora:wght@300;400;600;700;800&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet" />
      <style>{`
        *{box-sizing:border-box;margin:0;padding:0}
        input{background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);color:#e6edf3;border-radius:10px;padding:12px 14px;font-size:14px;font-family:inherit;outline:none;width:100%}
        input:focus{border-color:rgba(74,222,128,0.5);background:rgba(74,222,128,0.04)}
        input::placeholder{color:rgba(255,255,255,0.22)}
        ::-webkit-scrollbar{width:3px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:rgba(255,255,255,0.08);border-radius:2px}
        @keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
        @keyframes toastPop{from{opacity:0;transform:translateX(12px)}to{opacity:1;transform:translateX(0)}}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.5}}
        @keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        .fade-up{animation:fadeUp 0.22s ease both}
        details summary{list-style:none}details summary::-webkit-details-marker{display:none}
      `}</style>

      {/* TOAST */}
      {toast && (
        <div style={{
          position: "fixed", bottom: 88, right: 16, zIndex: 999,
          padding: "10px 16px", borderRadius: 10, fontSize: 13, fontWeight: 600,
          background: toast.tipo === "warn" ? "rgba(251,146,60,0.95)" : "rgba(74,222,128,0.95)",
          color: "#0d1117", boxShadow: "0 4px 24px rgba(0,0,0,0.5)",
          animation: "toastPop 0.18s ease",
        }}>{toast.msg}</div>
      )}

      {/* HEADER */}
      <header style={{
        position: "sticky", top: 0, zIndex: 100,
        background: "rgba(13,17,23,0.94)", backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
        padding: "13px 18px", display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <button onClick={() => setScreen("home")} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 9 }}>
          <span style={{ fontSize: 20 }}>🛒</span>
          <span style={{ fontSize: 17, fontWeight: 800, color: "#4ade80", letterSpacing: "-0.5px" }}>CarritoYa</span>
        </button>
        {screen !== "home" && (
          <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
            {modoDemo && <span style={{ fontSize: 9, padding: "3px 7px", borderRadius: 20, background: "rgba(251,191,36,0.12)", color: "#fbbf24", border: "1px solid rgba(251,191,36,0.25)", fontWeight: 800, letterSpacing: 0.5 }}>DEMO</span>}
            {ubicacionTexto && <span style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", maxWidth: 120, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>📍 {ubicacionTexto}</span>}
          </div>
        )}
      </header>

      <main style={{ maxWidth: 660, margin: "0 auto", padding: "22px 15px 100px" }}>

        {/* HOME */}
        {screen === "home" && (
          <div className="fade-up" style={{ textAlign: "center", paddingTop: 28 }}>
            <div style={{ fontSize: 76, marginBottom: 14, filter: "drop-shadow(0 0 40px rgba(74,222,128,0.25))" }}>🛒</div>
            <h1 style={{ fontSize: 34, fontWeight: 800, letterSpacing: "-1.5px", lineHeight: 1.15, marginBottom: 12 }}>
              Armá tu carrito,<br /><span style={{ color: "#4ade80" }}>comprá más barato.</span>
            </h1>
            <p style={{ color: "rgba(255,255,255,0.42)", fontSize: 15, lineHeight: 1.75, marginBottom: 36 }}>
              Comparamos precios en tiempo real en Carrefour, Coto,<br />Jumbo, Día, Disco, La Anónima y más.<br />Con tus descuentos de tarjetas incluidos.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, maxWidth: 290, margin: "0 auto 32px" }}>
              <button onClick={obtenerUbicacion} disabled={loading} style={{
                padding: "15px", borderRadius: 12, border: "none",
                background: loading ? "rgba(74,222,128,0.35)" : "linear-gradient(135deg,#4ade80,#22c55e)",
                color: "#0d1117", fontSize: 15, fontWeight: 700, cursor: loading ? "default" : "pointer", fontFamily: "inherit",
              }}>
                {loading ? "Obteniendo ubicación…" : "📍 Usar mi ubicación"}
              </button>
              <button onClick={usarDemo} style={{
                padding: "13px", borderRadius: 12, border: "1px solid rgba(255,255,255,0.1)",
                background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.6)", fontSize: 14, cursor: "pointer", fontFamily: "inherit",
              }}>🎮 Probar con datos de ejemplo</button>
            </div>
            {errorUbi && <div style={{ color: "#f87171", fontSize: 13, maxWidth: 320, margin: "0 auto" }}>{errorUbi}</div>}
            <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
              {["Precios reales vía Precios Claros", "Descuentos por tarjeta", "Sin registro necesario"].map((f, i) => (
                <span key={i} style={{ padding: "6px 12px", borderRadius: 20, background: "rgba(74,222,128,0.07)", border: "1px solid rgba(74,222,128,0.15)", fontSize: 11, color: "#4ade80" }}>✓ {f}</span>
              ))}
            </div>
          </div>
        )}

        {/* BUSCAR */}
        {screen === "buscar" && (
          <div className="fade-up">
            <div style={{ display: "flex", gap: 8, marginBottom: 18 }}>
              <input
                placeholder="Buscá productos: leche, arroz, yerba…"
                value={busqueda}
                onChange={e => setBusqueda(e.target.value)}
                onKeyDown={e => e.key === "Enter" && buscarProductos(busqueda)}
                autoFocus
              />
              <button onClick={() => buscarProductos(busqueda)} style={{
                padding: "12px 18px", borderRadius: 10, border: "none",
                background: "linear-gradient(135deg,#4ade80,#22c55e)", color: "#0d1117",
                fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", whiteSpace: "nowrap",
              }}>{loading ? "…" : "Buscar"}</button>
            </div>

            {resultados.length === 0 && !loading && (
              <div style={{ textAlign: "center", paddingTop: 32, color: "rgba(255,255,255,0.2)", fontSize: 14 }}>
                <div style={{ fontSize: 40, marginBottom: 10 }}>🔍</div>
                Escribí un producto y presioná buscar
              </div>
            )}

            {resultados.length > 0 && (
              <>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.28)", marginBottom: 10 }}>{resultados.length} resultados</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {resultados.map((prod, i) => {
                    const item = carrito.find(p => p.id === prod.id);
                    return (
                      <div key={i} style={{
                        padding: "13px 14px", borderRadius: 12,
                        background: item ? "rgba(74,222,128,0.05)" : "rgba(255,255,255,0.03)",
                        border: `1px solid ${item ? "rgba(74,222,128,0.22)" : "rgba(255,255,255,0.07)"}`,
                        display: "flex", alignItems: "center", gap: 10, transition: "all 0.15s",
                      }}>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontWeight: 600, fontSize: 13, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{prod.nombre}</div>
                          {prod.marca && prod.marca !== "—" && (
                            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", marginTop: 2 }}>{prod.marca}{prod.presentacion ? ` · ${prod.presentacion}` : ""}</div>
                          )}
                        </div>
                        {item ? (
                          <div style={{ display: "flex", alignItems: "center", gap: 5, flexShrink: 0 }}>
                            <button onClick={() => cambiarCantidad(prod.id, -1)} style={{ width: 27, height: 27, borderRadius: 7, border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.05)", color: "#e6edf3", cursor: "pointer", fontSize: 15, fontFamily: "inherit" }}>−</button>
                            <span style={{ fontSize: 14, fontWeight: 700, minWidth: 18, textAlign: "center", color: "#4ade80" }}>{item.cantidad}</span>
                            <button onClick={() => cambiarCantidad(prod.id, 1)} style={{ width: 27, height: 27, borderRadius: 7, border: "1px solid rgba(74,222,128,0.3)", background: "rgba(74,222,128,0.1)", color: "#4ade80", cursor: "pointer", fontSize: 15, fontFamily: "inherit" }}>+</button>
                            <button onClick={() => toggleCarrito(prod)} style={{ width: 27, height: 27, borderRadius: 7, border: "1px solid rgba(239,68,68,0.25)", background: "rgba(239,68,68,0.07)", color: "#f87171", cursor: "pointer", fontSize: 12, fontFamily: "inherit", marginLeft: 2 }}>✕</button>
                          </div>
                        ) : (
                          <button onClick={() => toggleCarrito(prod)} style={{
                            padding: "7px 13px", borderRadius: 8, border: "1px solid rgba(74,222,128,0.3)",
                            background: "rgba(74,222,128,0.07)", color: "#4ade80", cursor: "pointer",
                            fontSize: 12, fontWeight: 700, fontFamily: "inherit", whiteSpace: "nowrap", flexShrink: 0,
                          }}>+ Agregar</button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </>
            )}

            {carrito.length > 0 && (
              <div style={{ marginTop: 22, padding: "15px", borderRadius: 14, background: "rgba(74,222,128,0.05)", border: "1px solid rgba(74,222,128,0.18)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: "#4ade80" }}>🛒 {totalUnidades} unidades · {carrito.length} productos</span>
                  {tarjetas.length > 0 && <span style={{ fontSize: 11, color: "#fbbf24" }}>💳 {tarjetas.length} tarjeta{tarjetas.length > 1 ? "s" : ""}</span>}
                </div>
                <button onClick={compararPrecios} style={{
                  width: "100%", padding: "13px", borderRadius: 10, border: "none",
                  background: "linear-gradient(135deg,#4ade80,#22c55e)", color: "#0d1117",
                  fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "inherit",
                }}>⚡ Comparar precios ahora</button>
              </div>
            )}
          </div>
        )}

        {/* TARJETAS */}
        {screen === "tarjetas" && (
          <div className="fade-up">
            <h2 style={{ fontSize: 19, fontWeight: 700, marginBottom: 4 }}>Mis tarjetas y medios de pago</h2>
            <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 13, marginBottom: 16 }}>
              Seleccioná las que tenés para ver tus descuentos automáticamente al comparar.
            </p>

            <div style={{ display: "flex", gap: 6, marginBottom: 16, flexWrap: "wrap" }}>
              {[["todas", "Todas"], ["credito", "Crédito"], ["debito", "Débito"], ["digital", "Digital / Billetera"]].map(([val, lbl]) => (
                <button key={val} onClick={() => setFiltroTipo(val)} style={{
                  padding: "5px 13px", borderRadius: 20, fontFamily: "inherit",
                  border: `1px solid ${filtroTipo === val ? "rgba(74,222,128,0.5)" : "rgba(255,255,255,0.09)"}`,
                  background: filtroTipo === val ? "rgba(74,222,128,0.1)" : "transparent",
                  color: filtroTipo === val ? "#4ade80" : "rgba(255,255,255,0.4)",
                  cursor: "pointer", fontSize: 12, fontWeight: 600,
                }}>{lbl}</button>
              ))}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 7 }}>
              {tarjetasFiltradas.map(t => {
                const activa = tarjetas.includes(t.id);
                return (
                  <button key={t.id} onClick={() => toggleTarjeta(t.id)} style={{
                    padding: "13px", borderRadius: 12, cursor: "pointer", textAlign: "left",
                    fontFamily: "inherit", transition: "all 0.15s",
                    border: `1px solid ${activa ? "rgba(74,222,128,0.35)" : "rgba(255,255,255,0.07)"}`,
                    background: activa ? "rgba(74,222,128,0.07)" : "rgba(255,255,255,0.02)",
                    display: "flex", alignItems: "center", gap: 9,
                  }}>
                    <div style={{
                      width: 34, height: 34, borderRadius: 8, flexShrink: 0,
                      display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17,
                      background: `${t.color}18`, border: `1px solid ${t.color}33`,
                    }}>{t.emoji}</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 12, fontWeight: 600, color: activa ? "#4ade80" : "#e6edf3", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{t.nombre}</div>
                      <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", textTransform: "capitalize", marginTop: 1 }}>{t.tipo}</div>
                    </div>
                    {activa && <span style={{ color: "#4ade80", fontSize: 14, flexShrink: 0 }}>✓</span>}
                  </button>
                );
              })}
            </div>

            {tarjetas.length > 0 && (() => {
              const promosActivas = PROMOS_DB.filter(p => tarjetas.includes(p.tarjeta_id));
              if (!promosActivas.length) return null;
              return (
                <div style={{ marginTop: 18, padding: "14px", borderRadius: 12, background: "rgba(251,191,36,0.05)", border: "1px solid rgba(251,191,36,0.18)" }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#fbbf24", letterSpacing: 1, marginBottom: 10 }}>🎯 PROMOS DISPONIBLES CON TUS TARJETAS</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                    {promosActivas.slice(0, 8).map(p => {
                      const tarjeta = TARJETAS_PREDEFINIDAS.find(t => t.id === p.tarjeta_id);
                      return (
                        <div key={p.id} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12 }}>
                          <PromoBadge promo={p} small />
                          <span style={{ color: "rgba(255,255,255,0.7)", fontWeight: 600 }}>{p.supermercado}</span>
                          <span style={{ color: "rgba(255,255,255,0.3)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.descripcion}</span>
                        </div>
                      );
                    })}
                    {promosActivas.length > 8 && <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)" }}>+{promosActivas.length - 8} promos más…</div>}
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* CARRITO */}
        {screen === "carrito" && (
          <div className="fade-up">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <h2 style={{ fontSize: 19, fontWeight: 700 }}>Mi carrito</h2>
              {carrito.length > 0 && (
                <button onClick={() => { setCarrito([]); showToast("Carrito vaciado", "warn"); }} style={{ fontSize: 12, color: "#f87171", background: "none", border: "none", cursor: "pointer", fontFamily: "inherit" }}>Vaciar todo</button>
              )}
            </div>

            {carrito.length === 0 ? (
              <div style={{ textAlign: "center", padding: "44px 0", color: "rgba(255,255,255,0.22)" }}>
                <div style={{ fontSize: 50, marginBottom: 12 }}>🛒</div>
                <div style={{ marginBottom: 16, fontSize: 14 }}>Tu carrito está vacío</div>
                <button onClick={() => setScreen("buscar")} style={{ padding: "10px 20px", borderRadius: 9, border: "1px solid rgba(255,255,255,0.1)", background: "transparent", color: "rgba(255,255,255,0.5)", cursor: "pointer", fontFamily: "inherit" }}>Buscar productos</button>
              </div>
            ) : (
              <>
                <div style={{ display: "flex", flexDirection: "column", gap: 7, marginBottom: 18 }}>
                  {carrito.map((p, i) => (
                    <div key={i} style={{ padding: "13px 14px", borderRadius: 12, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontWeight: 600, fontSize: 13, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.nombre}</div>
                        {p.marca && <div style={{ fontSize: 11, color: "rgba(255,255,255,0.28)", marginTop: 2 }}>{p.marca}</div>}
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 5, flexShrink: 0 }}>
                        <button onClick={() => cambiarCantidad(p.id, -1)} style={{ width: 27, height: 27, borderRadius: 7, border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.05)", color: "#e6edf3", cursor: "pointer", fontSize: 15, fontFamily: "inherit" }}>−</button>
                        <span style={{ fontSize: 14, fontWeight: 700, minWidth: 20, textAlign: "center", color: "#4ade80" }}>{p.cantidad || 1}</span>
                        <button onClick={() => cambiarCantidad(p.id, 1)} style={{ width: 27, height: 27, borderRadius: 7, border: "1px solid rgba(74,222,128,0.3)", background: "rgba(74,222,128,0.09)", color: "#4ade80", cursor: "pointer", fontSize: 15, fontFamily: "inherit" }}>+</button>
                        <button onClick={() => toggleCarrito(p)} style={{ width: 27, height: 27, borderRadius: 7, border: "1px solid rgba(239,68,68,0.22)", background: "rgba(239,68,68,0.06)", color: "#f87171", cursor: "pointer", fontSize: 12, fontFamily: "inherit", marginLeft: 2 }}>✕</button>
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ padding: "12px 14px", borderRadius: 10, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", marginBottom: 12 }}>
                  {[["Total de unidades", totalUnidades, "#e6edf3"], ["Tarjetas activas", tarjetas.length > 0 ? `${tarjetas.length} configuradas 💳` : "Ninguna", tarjetas.length > 0 ? "#fbbf24" : "rgba(255,255,255,0.35)"]].map(([k, v, c]) => (
                    <div key={k} style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 6 }}>
                      <span style={{ color: "rgba(255,255,255,0.38)" }}>{k}</span>
                      <span style={{ fontWeight: 600, color: c }}>{v}</span>
                    </div>
                  ))}
                </div>

                {tarjetas.length === 0 && (
                  <div onClick={() => setScreen("tarjetas")} style={{
                    padding: "12px 14px", borderRadius: 10, marginBottom: 12,
                    background: "rgba(251,191,36,0.06)", border: "1px solid rgba(251,191,36,0.18)",
                    cursor: "pointer", display: "flex", gap: 10, alignItems: "center",
                  }}>
                    <span style={{ fontSize: 22 }}>💳</span>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: "#fbbf24" }}>¿Tenés tarjetas con descuento?</div>
                      <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)" }}>Tocá para configurarlas y ver tus promos →</div>
                    </div>
                  </div>
                )}

                <button onClick={compararPrecios} style={{
                  width: "100%", padding: "14px", borderRadius: 11, border: "none",
                  background: "linear-gradient(135deg,#4ade80,#22c55e)", color: "#0d1117",
                  fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "inherit",
                }}>⚡ Comparar precios</button>
              </>
            )}
          </div>
        )}

        {/* COMPARAR */}
        {screen === "comparar" && (
          <div className="fade-up">
            {loading ? (
              <div style={{ textAlign: "center", padding: "56px 0" }}>
                <div style={{ fontSize: 44, marginBottom: 14, display: "inline-block", animation: "spin 0.75s linear infinite" }}>⚡</div>
                <div style={{ fontSize: 17, fontWeight: 600, marginBottom: 8 }}>Comparando precios…</div>
                <div style={{ color: "rgba(255,255,255,0.3)", fontSize: 13 }}>Consultando supermercados · Aplicando promos</div>
              </div>
            ) : comparacion && (
              <>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                  <h2 style={{ fontSize: 19, fontWeight: 700 }}>Resultado</h2>
                  {modoDemo && <span style={{ fontSize: 9, padding: "2px 7px", borderRadius: 20, background: "rgba(251,191,36,0.12)", color: "#fbbf24", border: "1px solid rgba(251,191,36,0.22)", fontWeight: 800 }}>DEMO</span>}
                </div>
                <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 12, marginBottom: 18 }}>
                  {carrito.length} producto{carrito.length > 1 ? "s" : ""} · {totalUnidades} unidades · {comparacion.hoy}
                  {tarjetas.length > 0 && ` · ${tarjetas.length} tarjeta${tarjetas.length > 1 ? "s" : ""} aplicada${tarjetas.length > 1 ? "s" : ""}`}
                </p>

                {comparacion.ranking.length === 0 ? (
                  <div style={{ textAlign: "center", padding: 40, color: "rgba(255,255,255,0.3)" }}>
                    <div style={{ fontSize: 38, marginBottom: 12 }}>😕</div>
                    No hay suficientes datos para comparar.
                    <div style={{ marginTop: 16 }}>
                      <button onClick={() => setScreen("buscar")} style={{ padding: "9px 18px", borderRadius: 9, border: "1px solid rgba(255,255,255,0.1)", background: "transparent", color: "rgba(255,255,255,0.5)", cursor: "pointer", fontFamily: "inherit" }}>← Volver</button>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Ganador */}
                    {(() => {
                      const g = comparacion.ranking[0];
                      const peor = comparacion.ranking[comparacion.ranking.length - 1];
                      const info = getSupInfo(g.cadena);
                      const ahorroCaro = peor.total - g.total;
                      const ahorroPromo = g.totalOriginal - g.total;
                      return (
                        <div style={{
                          padding: "20px", borderRadius: 16, marginBottom: 14,
                          background: "linear-gradient(135deg,rgba(74,222,128,0.1),rgba(34,197,94,0.05))",
                          border: "1px solid rgba(74,222,128,0.28)", position: "relative", overflow: "hidden",
                        }}>
                          <div style={{ position: "absolute", top: -25, right: -25, width: 130, height: 130, borderRadius: "50%", background: "rgba(74,222,128,0.05)" }} />
                          <div style={{ fontSize: 10, fontWeight: 700, color: "#4ade80", letterSpacing: 2, marginBottom: 7 }}>🏆 MÁS CONVENIENTE</div>
                          <div style={{ fontSize: 22, fontWeight: 800, marginBottom: 5 }}>{info.emoji} {g.cadena}</div>
                          <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 7 }}>
                            <span style={{ fontSize: 32, fontWeight: 800, color: "#4ade80", fontFamily: "DM Mono, monospace" }}>${g.total.toLocaleString("es-AR")}</span>
                            {ahorroPromo > 0 && <span style={{ fontSize: 14, color: "rgba(255,255,255,0.3)", textDecoration: "line-through", fontFamily: "DM Mono, monospace" }}>${g.totalOriginal.toLocaleString("es-AR")}</span>}
                          </div>
                          {g.sucursal && <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", marginBottom: 10 }}>📍 {g.sucursal}{g.distancia ? ` · ${g.distancia} km` : ""}</div>}
                          <div style={{ display: "flex", gap: 7, flexWrap: "wrap" }}>
                            {ahorroCaro > 0 && <span style={{ padding: "4px 11px", borderRadius: 7, background: "rgba(74,222,128,0.13)", border: "1px solid rgba(74,222,128,0.25)", fontSize: 12, fontWeight: 600, color: "#4ade80" }}>💰 Ahorrás ${ahorroCaro.toLocaleString("es-AR")} vs la más cara</span>}
                            {ahorroPromo > 0 && <span style={{ padding: "4px 11px", borderRadius: 7, background: "rgba(96,165,250,0.1)", border: "1px solid rgba(96,165,250,0.22)", fontSize: 12, fontWeight: 600, color: "#60a5fa" }}>💳 −${ahorroPromo.toLocaleString("es-AR")} por promo</span>}
                          </div>
                          {g.promos?.length > 0 && (
                            <div style={{ marginTop: 10, display: "flex", gap: 6, flexWrap: "wrap" }}>
                              {g.promos.map((p, i) => <PromoBadge key={i} promo={p} small />)}
                            </div>
                          )}
                        </div>
                      );
                    })()}

                    {/* Vista selector */}
                    <div style={{ display: "flex", gap: 6, marginBottom: 14 }}>
                      {[["ranking", "🏆 Ranking"], ["tabla", "📊 Tabla comparativa"]].map(([v, lbl]) => (
                        <button key={v} onClick={() => setVistaComparacion(v)} style={{
                          flex: 1, padding: "8px", borderRadius: 9, fontFamily: "inherit",
                          border: `1px solid ${vistaComparacion === v ? "rgba(74,222,128,0.4)" : "rgba(255,255,255,0.09)"}`,
                          background: vistaComparacion === v ? "rgba(74,222,128,0.1)" : "rgba(255,255,255,0.03)",
                          color: vistaComparacion === v ? "#4ade80" : "rgba(255,255,255,0.45)",
                          cursor: "pointer", fontSize: 12, fontWeight: 600,
                        }}>{lbl}</button>
                      ))}
                    </div>

                    {/* Vista: Ranking */}
                    {vistaComparacion === "ranking" && (
                      <div style={{ marginBottom: 18 }}>
                        {comparacion.ranking.map((sup, i) => {
                          const info = getSupInfo(sup.cadena);
                          const pct = comparacion.ranking[0].total > 0 ? ((sup.total - comparacion.ranking[0].total) / comparacion.ranking[0].total * 100) : 0;
                          const ahorroPromo = sup.totalOriginal - sup.total;
                          return (
                            <div key={i} style={{
                              padding: "13px 14px", borderRadius: 11, marginBottom: 6,
                              background: i === 0 ? "rgba(74,222,128,0.04)" : "rgba(255,255,255,0.02)",
                              border: `1px solid ${i === 0 ? "rgba(74,222,128,0.18)" : "rgba(255,255,255,0.06)"}`,
                              display: "flex", alignItems: "center", gap: 10,
                            }}>
                              <div style={{
                                width: 26, height: 26, borderRadius: "50%", flexShrink: 0,
                                background: i === 0 ? "#4ade80" : "rgba(255,255,255,0.07)",
                                color: i === 0 ? "#0d1117" : "rgba(255,255,255,0.35)",
                                display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800,
                              }}>{i + 1}</div>
                              <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{ fontWeight: 600, fontSize: 13 }}>{info.emoji} {sup.cadena}</div>
                                {sup.promos?.length > 0 && (
                                  <div style={{ display: "flex", gap: 5, marginTop: 4, flexWrap: "wrap" }}>
                                    {sup.promos.map((p, j) => <PromoBadge key={j} promo={p} small />)}
                                  </div>
                                )}
                              </div>
                              <div style={{ textAlign: "right", flexShrink: 0 }}>
                                <div style={{ fontWeight: 700, fontSize: 15, fontFamily: "DM Mono, monospace", color: i === 0 ? "#4ade80" : "#e6edf3" }}>${sup.total.toLocaleString("es-AR")}</div>
                                {ahorroPromo > 0 && <div style={{ fontSize: 10, color: "#60a5fa" }}>−${ahorroPromo.toLocaleString("es-AR")} promo</div>}
                                {i > 0 && pct > 0 && <div style={{ fontSize: 10, color: "#f87171" }}>+{pct.toFixed(0)}% más caro</div>}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* Vista: Tabla cruzada productos × supermercados */}
                    {vistaComparacion === "tabla" && (() => {
                      const supers = comparacion.ranking.map(r => r.cadena);
                      return (
                        <div style={{ marginBottom: 18, overflowX: "auto" }}>
                          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
                            <thead>
                              <tr>
                                <th style={{ padding: "8px 10px", textAlign: "left", color: "rgba(255,255,255,0.4)", fontWeight: 600, borderBottom: "1px solid rgba(255,255,255,0.08)", minWidth: 140 }}>Producto</th>
                                {supers.map((s, i) => {
                                  const info = getSupInfo(s);
                                  return (
                                    <th key={i} style={{ padding: "8px 8px", textAlign: "center", color: i === 0 ? "#4ade80" : "rgba(255,255,255,0.4)", fontWeight: 700, borderBottom: "1px solid rgba(255,255,255,0.08)", minWidth: 90, whiteSpace: "nowrap" }}>
                                      {info.emoji} {s.split(" ")[0]}
                                    </th>
                                  );
                                })}
                              </tr>
                            </thead>
                            <tbody>
                              {comparacion.detalles.map((det, ri) => {
                                // Encontrar precio más bajo de la fila
                                const preciosFila = supers.map(s => {
                                  const match = det.precios.find(p => p.cadena?.toLowerCase().includes(s.toLowerCase()) || s.toLowerCase().includes(p.cadena?.split(" ")[0]?.toLowerCase()));
                                  return match ? match.precioFinal : null;
                                });
                                const minPrecio = Math.min(...preciosFila.filter(Boolean));
                                return (
                                  <tr key={ri} style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                                    <td style={{ padding: "9px 10px", color: "rgba(255,255,255,0.7)", fontWeight: 500 }}>
                                      <div style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 140 }}>{det.producto}</div>
                                      {det.cantidad > 1 && <div style={{ fontSize: 10, color: "#4ade80" }}>×{det.cantidad}</div>}
                                    </td>
                                    {supers.map((s, ci) => {
                                      const precio = preciosFila[ci];
                                      const esMasBarato = precio === minPrecio && precio !== null;
                                      const match = det.precios.find(p => p.cadena?.toLowerCase().includes(s.toLowerCase()) || s.toLowerCase().includes(p.cadena?.split(" ")[0]?.toLowerCase()));
                                      const tienePromo = match && match.precioFinal < match.precioOriginal;
                                      return (
                                        <td key={ci} style={{ padding: "9px 8px", textAlign: "center", background: esMasBarato ? "rgba(74,222,128,0.06)" : "transparent" }}>
                                          {precio != null ? (
                                            <>
                                              <div style={{ fontFamily: "DM Mono, monospace", fontWeight: esMasBarato ? 700 : 500, color: esMasBarato ? "#4ade80" : "rgba(255,255,255,0.65)", fontSize: 12 }}>
                                                ${precio.toLocaleString("es-AR")}
                                              </div>
                                              {tienePromo && <div style={{ fontSize: 9, color: "#60a5fa" }}>promo</div>}
                                              {esMasBarato && <div style={{ fontSize: 9, color: "#4ade80" }}>✓ más barato</div>}
                                            </>
                                          ) : (
                                            <span style={{ color: "rgba(255,255,255,0.15)", fontSize: 11 }}>—</span>
                                          )}
                                        </td>
                                      );
                                    })}
                                  </tr>
                                );
                              })}
                              {/* Fila total */}
                              <tr style={{ borderTop: "2px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.02)" }}>
                                <td style={{ padding: "10px 10px", fontWeight: 700, color: "rgba(255,255,255,0.8)", fontSize: 12 }}>TOTAL</td>
                                {comparacion.ranking.map((sup, ci) => (
                                  <td key={ci} style={{ padding: "10px 8px", textAlign: "center" }}>
                                    <div style={{ fontFamily: "DM Mono, monospace", fontWeight: 800, fontSize: 13, color: ci === 0 ? "#4ade80" : "rgba(255,255,255,0.7)" }}>
                                      ${sup.total.toLocaleString("es-AR")}
                                    </div>
                                    {(sup.totalOriginal - sup.total) > 0 && (
                                      <div style={{ fontSize: 9, color: "#60a5fa" }}>−${(sup.totalOriginal - sup.total).toLocaleString("es-AR")}</div>
                                    )}
                                  </td>
                                ))}
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      );
                    })()}


                    <div style={{ display: "flex", gap: 8 }}>
                      <button onClick={() => setScreen("carrito")} style={{
                        flex: 1, padding: "12px", borderRadius: 10,
                        border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.04)",
                        color: "rgba(255,255,255,0.55)", cursor: "pointer", fontFamily: "inherit", fontSize: 13,
                      }}>← Editar carrito</button>
                      <button onClick={() => { setCarrito([]); setBusqueda(""); setResultados([]); setComparacion(null); setScreen("buscar"); }} style={{
                        flex: 1, padding: "12px", borderRadius: 10, border: "none",
                        background: "linear-gradient(135deg,#4ade80,#22c55e)", color: "#0d1117",
                        cursor: "pointer", fontFamily: "inherit", fontSize: 13, fontWeight: 700,
                      }}>🔄 Nueva comparación</button>
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        )}
      </main>

      {/* BOTTOM NAV */}
      {screen !== "home" && (
        <nav style={{
          position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 100,
          background: "rgba(13,17,23,0.96)", backdropFilter: "blur(20px)",
          borderTop: "1px solid rgba(255,255,255,0.07)",
          display: "flex", justifyContent: "space-around", padding: "9px 0 16px",
        }}>
          {[
            { id: "buscar", icon: "🔍", label: "Buscar" },
            { id: "tarjetas", icon: "💳", label: "Tarjetas", badge: tarjetas.length || null },
            { id: "carrito", icon: "🛒", label: "Carrito", badge: totalUnidades || null },
          ].map(tab => (
            <button key={tab.id} onClick={() => setScreen(tab.id)} style={{
              display: "flex", flexDirection: "column", alignItems: "center", gap: 3,
              background: "none", border: "none", cursor: "pointer", position: "relative", padding: "3px 18px",
            }}>
              <span style={{ fontSize: 21 }}>{tab.icon}</span>
              <span style={{ fontSize: 10, fontWeight: 600, fontFamily: "Sora, sans-serif", color: screen === tab.id ? "#4ade80" : "rgba(255,255,255,0.3)" }}>{tab.label}</span>
              {tab.badge > 0 && (
                <span style={{
                  position: "absolute", top: 0, right: 8, minWidth: 16, height: 16, borderRadius: 8,
                  background: tab.id === "tarjetas" ? "#fbbf24" : "#4ade80", color: "#0d1117",
                  fontSize: 9, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", padding: "0 4px",
                }}>{tab.badge}</span>
              )}
              {screen === tab.id && <div style={{ position: "absolute", bottom: -16, width: 18, height: 2, background: "#4ade80", borderRadius: 2 }} />}
            </button>
          ))}
        </nav>
      )}
    </div>
  );
}
