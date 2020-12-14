const API = "https://api.untappd.com/v4"
const CLIENT_SECRET = "867AD6FA1B829647D9E7851944C1270A5B78538D"
const CLIENT_ID = "107B77BE3D03E35B4E40FF20BE476D47EC689966"
const AUTH = `client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`

const getBeerBID = async (name) => {
  const response = await fetch(`${API}/search/beer?q=${name}&${AUTH}&limit=1`)
  const beers = await response.json()
  return beers
}

const getBeerRating = async (BID) => {
  const response = await fetch(`${API}/beer/info/${BID}?${AUTH}`)
  const beerInfo = await response.json()
  return beerInfo
}

window.addEventListener("load", async (event) => {
  const SYS_DRINK_HEADING_SELECTOR = ".css-3kck9p"
  const SYS_DRINK_LIST_SELECTOR = ".css-1ftiqdp"

  const inside = document.querySelectorAll(SYS_DRINK_LIST_SELECTOR)
  const heading = document.querySelector(SYS_DRINK_HEADING_SELECTOR)

  // search list
  const searchUrl = window.location.href.indexOf(encodeURI("categoryLevel1=Öl"))
  // details view

  const detailsUrl = window.location.href.indexOf("produkt/ol/")

  console.log({ searchUrl, detailsUrl })
  if (searchUrl > -1 || detailsUrl > -1) {
  } else {
    return false
  }

  if (heading) {
    console.log("Doing the heading bit")

    try {
      const beerIdReponse = await getBeerBID(
        encodeURI(heading.innerText.replace(/[^\w\s]/gi, ""))
      )
      const berden = await beerIdReponse.response
      const bid = berden.beers.items[0].beer.bid

      const ratingResponse = await getBeerRating(bid)
      const rating = await ratingResponse.response

      try {
        const elem = document.createElement("div")
        elem.className = "unsystemet"
        elem.innerHTML = `<div class="unsystemet-score">${
          Math.round((rating.beer.rating_score + Number.EPSILON) * 100) / 100
        }</div><div class="unsystemet-rated-by">Rated by ${
          rating.beer.rating_count
        }</div>`
        heading.append(elem)
      } catch (error) {
        console.log(error)
      }
    } catch (error) {
      console.error(error)

      const elem = document.createElement("div")
      elem.className = "unsystemet"
      elem.innerHTML = `<div class="unsystemet-score">404</div>
      <div class="unsystemet-rated-by">Couldnt find it 😭</div>`
      heading.append(elem)
    }
  }

  if (inside.length) {
    console.log("Inside was true")

    inside.forEach(async (el) => {
      const elem = document.createElement("div")

      try {
        const beerIdReponse = await getBeerBID(
          encodeURI(el.innerText.replace(/[^\w\s]/gi, ""))
        )
        const berden = await beerIdReponse.response
        const bid = berden.beers.items[0].beer.bid

        const ratingResponse = await getBeerRating(bid)
        const rating = await ratingResponse.response

        elem.className = "unsystemet-list"
        elem.innerHTML = `<div class="unsystemet-score unsystemet-score-item">
        ${Math.round((rating.beer.rating_score + Number.EPSILON) * 100) / 100}
        </div>`

        el.parentElement.appendChild(elem)
      } catch (error) {
        console.error(error)
        const elem = document.createElement("div")
        elem.className = "unsystemet-list"
        elem.innerHTML = `<div class="unsystemet-score unsystemet-score-item"> 😱 no..</div>`

        el.parentElement.appendChild(elem)
      }
    })
  }
})
