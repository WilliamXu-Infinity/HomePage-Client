import { useEffect, useState } from "react"
import { Link, useHistory, useLocation } from "react-router-dom"
import Logo from "../../Asset/logos/w.png"

const NavBar = ({ routeMap = [] }) => {
  const history = useHistory()
  const location = useLocation()

  const [activeKey, setActiveKey] = useState("")
  const [menu, setMenu] = useState([])
  const [showNav, setShowNav] = useState(true)

  const isHome = location.pathname === "/" || location.pathname === "/home"


  // 构建菜单
  useEffect(() => {
    const m = routeMap
      .filter(r => r.path !== "/" && r.show)
      .map(r => ({ title: r.title, url: `/${String(r.title).toLowerCase()}` }))
    setMenu(m)
  }, [routeMap])

  // scroll + wheel detection
  useEffect(() => {
    const currentPath = location.pathname === "/" ? "/home" : location.pathname
    setActiveKey(currentPath)
    setShowNav(true)

    const onWheel = (e) => {
      if (!isHome) return
      if (e.deltaY > 0) {
        // 向下滚 → 隐藏
        setShowNav(false)
      } else {
        // 向上滚 → 显示
        setShowNav(true)
      }
    }

    window.addEventListener("wheel", onWheel)

    return () => {
      window.removeEventListener("wheel", onWheel)
    }
  }, [location.pathname])


  return (
    <div
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        showNav
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 -translate-y-6 pointer-events-none"
      }`}
    >
      <nav
        className={`shadow-sm ${
          isHome
            ? "backdrop-blur-md bg-white/60"
            : "bg-transparent shadow-none"
        }`}
      >
        <div className={`${isHome ? 'mx-auto max-w-6xl' : 'mx-2'}`}>
          <div className="flex h-14 items-center justify-between">
            {isHome && (
              <img
                src={Logo}
                alt="Logo"
                className="w-10 h-10 object-contain cursor-pointer"
                onClick={() => history.push("/")}
              />
            )}
            <div className="flex items-center gap-2 ml-auto">
              {menu.map(({ title, url }) => (
                <Link
                  key={url}
                  to={url}
                  className={`px-3 py-1 rounded-md transition-colors ${
                    activeKey === url
                      ? "text-orange-500"
                      : "text-black hover:text-orange-500"
                  }`}
                >
                  {title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default NavBar
