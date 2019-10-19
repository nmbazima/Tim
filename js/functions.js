const P = new ProType()

// View Controllers
class Landing extends P.ViewController {
    preload() {
        this.state = {
            expand: false
        }
    }
    willShow() {
        this.menu()
        this.mountGroups(
            this.view.querySelectorAll(".article"), // All groups element
            Article // The Group class
        )
    }
    menu() {
        this.menuColor()
        this.expandable()
    }
    menuColor() {
        this.menu = this.view.querySelector(".menu")
        this.article = document.querySelector("article")
        this.sup = typeof this.article !== "undefined" && this.article !== null ? window.innerHeight / 2 - 30 : window.innerHeight - 30
        this.hero = this.view.querySelector(".hero")

        addEventListener("scroll", () => {
            requestAnimationFrame(this.effectRendering.bind(this))
        })
    }

    effectRendering() {
        if (window.scrollY > this.sup) {
            this.menu.querySelectorAll(".item").forEach(el => el.style.color = "var(--opposite)")
            this.menu.querySelector(".triangle").style["border-top"] = "17.32px solid var(--opposite)"

            const expandable = this.menu.querySelector(".expandable")
            expandable.style["border-color"] = "var(--opposite)"
            expandable.style["background"] = "var(--white)"
            expandable.style["color"] = "var(--opposite)"
            expandable.querySelector(".triangle").style["border-top"] = "17.32px solid var(--opposite)"
        } else {
            this.menu.querySelectorAll(".item").forEach(el => el.style.color = "#fff")
            this.menu.querySelector(".triangle").style["border-top"] = "17.32px solid #fff"

            const expandable = this.menu.querySelector(".expandable")
            expandable.style["border-color"] = "#fff"
            expandable.style["background"] = "#111"
            expandable.style["color"] = "#fff"
            expandable.querySelector(".triangle").style["border-top"] = "17.32px solid #fff"
        }

        if (this.article) {
            const f = window.scrollY / this.sup > 1 ? 1 : window.scrollY / this.sup
            this.article.style.opacity = f
            const isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1
            if (!isFirefox) {
                this.hero.style.filter = `saturate(180%) blur(${20 * f}px)`
            }
            if (f >= 1) {
                this.hero.style.display = "none"
            } else {
                this.hero.style.display = "block"
            }
        }

    }
    expandable() {
        const menu = this.view.querySelector(".expand")
        menu.addEventListener("click", e => {
            this.state = {
                expand: !this.state.expand
            }
            const menu = this.view.querySelector(".expandable")
            if (this.state.expand === true) {
                menu.style.display = "block"
                document.querySelector(".expand > .triangle").style.transform = "rotate(180deg)"
            } else {
                menu.style.display = "none"
                document.querySelector(".expand > .triangle").style.transform = "rotate(0deg)"
            }
        })
    }
}


// Groups
class Article extends P.Group {
    init() {
        this.group.addEventListener("click", e => {
            const url = this.group.getAttribute("link")
            window.location = url
        })
    }
}

P.mount([
    "Landing",
    document.body,
    Landing
])

P.set("Landing")