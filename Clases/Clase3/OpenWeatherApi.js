// Geocoding API
const API_KEY = ""

const consultarCoordenadas = async (ciudad, provincia, pais) => {
  const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?1=${ciudad},${provincia},${pais}&limit=1&appid=${API_KEY}`)
  const datos = await response.json()
  return datos[0] 
}

const consultarClima = async(ciudad, provincia, pais) => {
  const {lat, lon} = await consultarCoordenadas(ciudad, provincia, pais)
  console.log(lat, lon)
  // Ahora hacemos la solictud a Open Weather Map
  const response = fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
  // Convertir grados a celcius: &units=metric
  const clima = await response.json()
  console.log(clima)
}

consultarClima('Trelew', 'chubut', 'arg')