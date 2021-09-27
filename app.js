let carts = [
  {
    name: 'Gate',
    lat: 50.44899640645422,
    lng: 30.513536575185956,
    title: 'Gate',
    icon: 'icon/marker.svg',
    id: 1,
    content:
      '<h3>Golden Gate</h3>' +
      '<p>Построенные в 1980-х годах ворота, повторяющие укрепительное сооружение XI века, служившее въездом в город.</p>',
  },
]

let inputLat = document.getElementById('lat')
let inputLng = document.getElementById('lng')
let inputTitle = document.getElementById('title')
let inputInfo = document.getElementById('description')
let submitGeo = document.getElementById('geo')

// let textTitle = document.querySelector('.title')
// let textLat = document.querySelector('.lat')
// let textLng = document.querySelector('.lng')
// let textInfo = document.querySelector('.info')

let cartBlock = document.querySelector('.block-cart')
let newList = document.createElement('div')
let newUl = document.createElement('ul')
let newLiTitle = document.createElement('li')
let newTitle = document.createElement('h5')
let newLiLat = document.createElement('li')
let newLat = document.createElement('p')
let newLiLng = document.createElement('li')
let newLng = document.createElement('p')
let newLiInfo = document.createElement('li')
let newInfo = document.createElement('p')

submitGeo.addEventListener('click', function () {
  let valueLat = inputLat.value
  let valueLng = inputLng.value
  let newLat = Number(valueLat.replace(/,/, '.'))
  let newLng = Number(valueLng.replace(/,/, '.'))
  let newTitle = inputTitle.value
  let newInfo = inputInfo.value

  let newLocation = {
    name: newTitle,
    lat: newLat,
    lng: newLng,
    title: newTitle,
    icon: 'icon/marker.svg',
    id: carts.length + 1,
    content: `<h3>${newTitle}</h3>` + `<p>${newInfo}</p>`,
  }
  carts.push(newLocation)
  console.log(carts)
  initMap()
  cartsPush()

  // closeImag()
  inputClean()
})

function initMap() {
  let map = new google.maps.Map(document.getElementById('map'), {
    center: {
      lat: 50.45042327419173,
      lng: 30.523412568175253,
    },
    zoom: 11,
    styles: [
      {
        featureType: 'all',
        elementType: 'labels.text.fill',
        stylers: [
          {
            saturation: 36,
          },
          {
            color: '#000000',
          },
          {
            lightness: 40,
          },
        ],
      },
      {
        featureType: 'all',
        elementType: 'labels.text.stroke',
        stylers: [
          {
            visibility: 'on',
          },
          {
            color: '#000000',
          },
          {
            lightness: 16,
          },
        ],
      },
      {
        featureType: 'all',
        elementType: 'labels.icon',
        stylers: [
          {
            visibility: 'off',
          },
        ],
      },
      {
        featureType: 'administrative',
        elementType: 'geometry.fill',
        stylers: [
          {
            color: '#000000',
          },
          {
            lightness: 20,
          },
        ],
      },
      {
        featureType: 'administrative',
        elementType: 'geometry.stroke',
        stylers: [
          {
            color: '#000000',
          },
          {
            lightness: 17,
          },
          {
            weight: 1.2,
          },
        ],
      },
      {
        featureType: 'landscape',
        elementType: 'geometry',
        stylers: [
          {
            color: '#000000',
          },
          {
            lightness: 20,
          },
        ],
      },
      {
        featureType: 'poi',
        elementType: 'geometry',
        stylers: [
          {
            color: '#000000',
          },
          {
            lightness: 21,
          },
        ],
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry.fill',
        stylers: [
          {
            color: '#000000',
          },
          {
            lightness: 17,
          },
        ],
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [
          {
            color: '#000000',
          },
          {
            lightness: 29,
          },
          {
            weight: 0.2,
          },
        ],
      },
      {
        featureType: 'road.arterial',
        elementType: 'geometry',
        stylers: [
          {
            color: '#000000',
          },
          {
            lightness: 18,
          },
        ],
      },
      {
        featureType: 'road.local',
        elementType: 'geometry',
        stylers: [
          {
            color: '#000000',
          },
          {
            lightness: 16,
          },
        ],
      },
      {
        featureType: 'transit',
        elementType: 'geometry',
        stylers: [
          {
            color: '#000000',
          },
          {
            lightness: 19,
          },
        ],
      },
      {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [
          {
            color: '#000000',
          },
          {
            lightness: 17,
          },
        ],
      },
    ],
  })

  let markers = []

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function showPosition(position) {
      let latMy = position.coords.latitude
      let lngMy = position.coords.longitude
      console.log('lat=', latMy)
      console.log('lng=', lngMy)

      let objMy = new google.maps.LatLng(latMy, lngMy)
      let marker = new google.maps.Marker({
        position: objMy,
        map: map,
        icon: 'icon/location.svg',
      })

      markers.push(marker)
      marker.setMap(map)
      map.setCenter(objMy)
    }, showError)
  } else {
    alert('Геолокация не поддерживается этим браузером.')
  }

  for (let i = 0; i < carts.length; i++) {
    let item = carts[i]
    let marker = new google.maps.Marker({
      position: { lat: item.lat, lng: item.lng },
      map: map,
      icon: item.icon,
      id: i,
    })
    markers.push(marker)
    marker.setMap(map)

    let infoCart = new google.maps.InfoWindow({
      content: item.content,
    })
    marker.addListener('click', () => {
      infoCart.open(map, marker)
    })
  }
}

function cartsPush() {
  for (let k = 0; k < carts.length; k++) {
    let cart = carts[k]

    newList.classList.add('block-list')
    cartBlock.appendChild(newList)
    newUl.classList.add('list')
    newList.appendChild(newUl)

    newLiTitle.classList.add('link-title')
    newUl.appendChild(newLiTitle)

    newTitle.classList.add('title')
    newTitle.innerHTML = cart.title
    newLiTitle.appendChild(newTitle)

    newLiLat.classList.add('link-lat')
    newUl.appendChild(newLiLat)

    newLat.classList.add('lat')
    newLat.innerHTML = parseFloat(cart.lat.toFixed(3))
    newLiLat.appendChild(newLat)

    newLiLng.classList.add('link-lng')
    newUl.appendChild(newLiLng)

    newLng.classList.add('lng')
    newLng.innerHTML = parseFloat(cart.lng.toFixed(3))
    newLiLng.appendChild(newLng)

    newLiInfo.classList.add('link-info')
    newUl.appendChild(newLiInfo)

    newInfo.classList.add('info')
    newInfo.innerHTML = cart.content
    newLiInfo.appendChild(newInfo)

    // let blockList = document.querySelector('.block-list')
    // let cloneInput = blockList.cloneNode(true)
    // console.log(cloneInput)
    // cartBlock.appendChild(cloneInput)
  }
}

// cartsPush()

function closeImag() {
  let divImg = document.createElement('div')
  divImg.classList.add('block-button')
  newList.appendChild(divImg)
  let imgButton = document.createElement('img')
  imgButton.classList.add('close')
  let srcItm = imgButton.setAttribute('src', '/icon/close_icon.svg')
  divImg.appendChild(imgButton)
}

function showError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      alert('Пользователь отклонил запрос на геолокацию.')
      break
    case error.POSITION_UNAVAILABLE:
      alert('Информация о местоположении недоступна.')
      break
    case error.TIMEOUT:
      alert('Запрос на получение тайм-аута местоположения пользователя.')
      break
    case error.UNKNOWN_ERROR:
      alert('Произошла неизвестная ошибка.')
      break
  }
}

function inputClean() {
  inputLat.value = ''
  inputLng.value = ''
  inputTitle.value = ''
  inputInfo.value = ''
}
