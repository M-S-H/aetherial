class RippleMaker {
  _container;

  constructor (container) {
    this._container = container
  }

  ripple (x, y) {
    let ripple = document.createElement('div')
    ripple.classList.add('av-ripple-enter')

    // Determine click position relative to the container element
    let rect = this._container.getBoundingClientRect()
    let xPos = x - rect.left
    let yPos = y - rect.top

    // Determine distance to farthest corner
    let corners = [[0, 0], [0, rect.height], [rect.width, 0], [rect.width, rect.height]]
    let maxDistance = Math.max(...corners.map(c => {
      return Math.sqrt(((c[0] - xPos) ** 2) + ((c[1] - yPos) ** 2))
    }))

    // Set ripple styles
    this._container.appendChild(ripple)
    ripple.style.width = maxDistance + 'px'
    ripple.style.height = maxDistance + 'px'
    ripple.style.left = (xPos - (maxDistance / 2)) + 'px'
    ripple.style.top = (yPos - (maxDistance / 2)) + 'px'

    // Add active class to begin animation
    setTimeout(() => {
      ripple.classList.add('av-ripple-active')
    }, 0)

    // Add leave class to fade out
    setTimeout(() => {
      ripple.classList.add('av-ripple-leave')

      // Remove the ripple element
      setTimeout(() => {
        this._container.removeChild(ripple)
      }, 450)
    }, 300)
  }
}

export default {
  inserted: (el) => {
    let rippler = new RippleMaker(el)
    el.addEventListener('mouseup', e => {
      rippler.ripple(e.clientX, e.clientY)
    })
  },

  unbind (el) {
    let rippler = new RippleMaker(el)
    el.addEventListener('mouseup', e => {
      rippler.ripple(e.clientX, e.clientY)
    })
  }
}
