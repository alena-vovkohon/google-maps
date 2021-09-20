// let windowText = document.querySelector('.window__text')
let myLat = 0
let myLng = 0

getLocation()
let gate = {
  pos: {
    lat: 50.44899640645422,
    lng: 30.513536575185956,
  },
  content:
    '<h3>Golden Gate</h3>' +
    '<p>Построенные в 1980-х годах ворота, повторяющие укрепительное сооружение XI века, служившее въездом в город.</p>',

  title: 'Gate',
  icon: 'icon/marker.svg',
}

let monument = {
  pos: {
    lat: 50.4544110930226,
    lng: 30.518232795948528,
  },
  content:
    '<h3>Monument to Bohdan Khmelnytsky</h3>' +
    '<p>Внушительный памятник XIX века, изображающий казачьего предводителя Богдана Хмельницкого верхом на коне.</p>',
  title: 'Monument',
  icon: 'icon/marker.svg',
}

// let myLocation = {
//   pos: {
//     lat: '',
//     lng: '',
//   },
//   content: '<h3>My Location</h3>',

//   title: 'My Location',
//   icon: 'icon/location.svg',
// }

let pos = {
  lat: 50.45042327419173,
  lng: 30.523412568175253,
}
let opt = {
  center: pos,
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
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition)
  } else {
    alert('Геолокация не поддерживается этим браузером.')
  }
}

function showPosition(position) {
  let lat1 = position.coords.latitude
  let lng1 = position.coords.longitude

  myLat = lat1
  myLng = lng1

  initMap()
  console.log('let=', lat1)
  console.log('lng=', lng1)
}

function initMap() {
  let myMap = new google.maps.Map(document.getElementById('map'), opt)

  let myLocation = {
    pos: {
      lat: myLat,
      lng: myLng,
    },
    icon: 'icon/location.svg',
  }

  let markerMy = new google.maps.Marker({
    position: myLocation.pos,
    icon: myLocation.icon,
    map: myMap,
  })

  let markerGate = new google.maps.Marker({
    position: gate.pos,
    title: gate.title,
    icon: gate.icon,
    map: myMap,
  })

  let markerMonument = new google.maps.Marker({
    position: monument.pos,
    title: monument.title,
    icon: monument.icon,
    map: myMap,
  })

  let infoGate = new google.maps.InfoWindow({
    content: gate.content,
  })
  let infoMonument = new google.maps.InfoWindow({
    content: monument.content,
  })

  markerGate.addListener('click', () => {
    infoGate.open(myMap, markerGate)
  })

  markerMonument.addListener('click', () => {
    infoMonument.open(myMap, markerMonument)
  })
}
