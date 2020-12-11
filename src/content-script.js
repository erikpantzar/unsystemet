window.addEventListener('load', (event) => { 
  const SYS_DRINK_HEADING_SELECTOR = '.css-3kck9p'
  const SYS_DRINK_LIST_SELECTOR = '.css-1ftiqdp'
  
  
  const heading = document.querySelector(SYS_DRINK_HEADING_SELECTOR)
  const inside = document.querySelectorAll(SYS_DRINK_LIST_SELECTOR)

  if (heading) {
    try {
      const elem = document.createElement('div')
      elem.className = 'unsystemet'
      elem.innerHTML = 'ERIK WAS HERE'
      heading.append(elem)
    } catch (error) {
      console.log(error)
    }
  }


  if (inside) {
    console.log('Inside was true')

    const elem = document.createElement('div')
    elem.className = 'unsystemet-list'
    elem.innerHTML = 'eRiK is StiLl HerE'
    inside.forEach(el => {
      const current = el.innerHTML

      console.log(el.innerHTML)
      console.log(el)  
      el.innerHTML = current + ' eRiK wAs HErEE agAin'
    })
  }
  
})

