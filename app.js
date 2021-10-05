let map

let markers = []

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {
      lat: 50.45042327419173,
      lng: 30.523412568175253,
    },
    zoom: 11,
    styles: [
      {
        featureType: 'all',
        elementType: 'geometry.fill',
        stylers: [
          {
            weight: '2.00',
          },
        ],
      },
      {
        featureType: 'all',
        elementType: 'geometry.stroke',
        stylers: [
          {
            color: '#9c9c9c',
          },
        ],
      },
      {
        featureType: 'all',
        elementType: 'labels.text',
        stylers: [
          {
            visibility: 'on',
          },
        ],
      },
      {
        featureType: 'landscape',
        elementType: 'all',
        stylers: [
          {
            color: '#f2f2f2',
          },
        ],
      },
      {
        featureType: 'landscape',
        elementType: 'geometry.fill',
        stylers: [
          {
            color: '#ffffff',
          },
        ],
      },
      {
        featureType: 'landscape.man_made',
        elementType: 'geometry.fill',
        stylers: [
          {
            color: '#ffffff',
          },
        ],
      },
      {
        featureType: 'poi',
        elementType: 'all',
        stylers: [
          {
            visibility: 'off',
          },
        ],
      },
      {
        featureType: 'road',
        elementType: 'all',
        stylers: [
          {
            saturation: -100,
          },
          {
            lightness: 45,
          },
        ],
      },
      {
        featureType: 'road',
        elementType: 'geometry.fill',
        stylers: [
          {
            color: '#eeeeee',
          },
        ],
      },
      {
        featureType: 'road',
        elementType: 'labels.text.fill',
        stylers: [
          {
            color: '#7b7b7b',
          },
        ],
      },
      {
        featureType: 'road',
        elementType: 'labels.text.stroke',
        stylers: [
          {
            color: '#ffffff',
          },
        ],
      },
      {
        featureType: 'road.highway',
        elementType: 'all',
        stylers: [
          {
            visibility: 'simplified',
          },
        ],
      },
      {
        featureType: 'road.arterial',
        elementType: 'labels.icon',
        stylers: [
          {
            visibility: 'off',
          },
        ],
      },
      {
        featureType: 'transit',
        elementType: 'all',
        stylers: [
          {
            visibility: 'off',
          },
        ],
      },
      {
        featureType: 'water',
        elementType: 'all',
        stylers: [
          {
            color: '#46bcec',
          },
          {
            visibility: 'on',
          },
        ],
      },
      {
        featureType: 'water',
        elementType: 'geometry.fill',
        stylers: [
          {
            color: '#c8d7d4',
          },
        ],
      },
      {
        featureType: 'water',
        elementType: 'labels.text.fill',
        stylers: [
          {
            color: '#070707',
          },
        ],
      },
      {
        featureType: 'water',
        elementType: 'labels.text.stroke',
        stylers: [
          {
            color: '#ffffff',
          },
        ],
      },
    ],
  })
  showGeolocation()
}

function showGeolocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError)
  } else {
    alert('Геолокация не поддерживается этим браузером.')
  }
}

function showPosition(position) {
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
  marker.setMap(map)
  map.setCenter(objMy)
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

function addMarkers() {
  let submitGeo = document.getElementById('geo')
  let inputLat = document.getElementById('lat')
  let inputLng = document.getElementById('lng')
  let inputTitle = document.getElementById('title')
  let inputInfo = document.getElementById('description')

  submitGeo.addEventListener('click', function () {
    let valueLat = inputLat.value
    let valueLng = inputLng.value
    let newLat = Number(valueLat.replace(/,/, '.'))
    let newLng = Number(valueLng.replace(/,/, '.'))
    let newTitle = inputTitle.value
    let newInfo = inputInfo.value

    const id = `${newLat}${newLng}`.replace(/\./g, '')

    let newLocation = {
      name: newTitle,
      lat: newLat,
      lng: newLng,
      title: newTitle,
      icon: 'icon/marker.svg',
      id: id,
      content: `<p>${newTitle}</p>` + `<p>${newInfo}</p>`,
      info: newInfo,
    }
    console.log(newLocation)

    let marker = new google.maps.Marker({
      position: { lat: newLocation.lat, lng: newLocation.lng },
      map: map,
      icon: 'icon/marker.svg',
      id: id,
    })
    console.log(marker.id)
    markers.push(marker)
    marker.setMap(map)
    map.setCenter(marker.position)

    let infoCart = new google.maps.InfoWindow({
      content: newLocation.content,
    })
    marker.addListener('click', () => {
      infoCart.open(map, marker)
    })

    inputClean(inputLat, inputLng, inputTitle, inputInfo)
    addMarkerToList(newLocation)
  })
}

function inputClean(inputLat, inputLng, inputTitle, inputInfo) {
  inputLat.value = ''
  inputLng.value = ''
  inputTitle.value = ''
  inputInfo.value = ''
}

function addMarkerToList(obLocation) {
  const id = obLocation.id

  let cartBlock = document.querySelector('.block-cart')
  let newList = document.createElement('div')

  newList.classList.add('block-list')
  cartBlock.appendChild(newList)
  let newUl = document.createElement('ul')
  newUl.classList.add('list')
  newList.appendChild(newUl)
  let newLiTitle = document.createElement('li')

  let newTitle = document.createElement('p')
  let newLiLat = document.createElement('li')
  let newLat = document.createElement('p')
  let newLiLng = document.createElement('li')
  let newLng = document.createElement('p')
  let newLiInfo = document.createElement('li')
  let newInfo = document.createElement('p')

  newLiTitle.classList.add('link-title')
  newUl.appendChild(newLiTitle)

  newTitle.classList.add('title')
  newTitle.innerHTML = `${obLocation.title}: `
  newLiTitle.appendChild(newTitle)

  newLiLat.classList.add('link-lat')
  newUl.appendChild(newLiLat)

  newLat.classList.add('lat')
  newLat.innerHTML = `широта = ${parseFloat(obLocation.lat.toFixed(3))}`
  newLiLat.appendChild(newLat)

  newLiLng.classList.add('link-lng')
  newUl.appendChild(newLiLng)

  newLng.classList.add('lng')
  newLng.innerHTML = `довгота = ${parseFloat(obLocation.lng.toFixed(3))}`
  newLiLng.appendChild(newLng)

  let divImg = document.createElement('div')
  divImg.classList.add('block-button')
  newList.appendChild(divImg)
  let imgButton = document.createElement('img')
  imgButton.classList.add('close')
  imgButton.setAttribute('src', '/icon/close_icon.svg')
  divImg.appendChild(imgButton)

  divImg.addEventListener('click', function () {
    console.log(markers, id)
    const findIndexMarker = markers.findIndex((index) => index.id === id)
    if (findIndexMarker !== -1) {
      markers[findIndexMarker].setMap(null)
      markers.splice(findIndexMarker, 1)
      cartBlock.removeChild(this.closest('.block-list'))
    }
  })
}

addMarkers()
