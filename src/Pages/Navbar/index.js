import React, { useEffect, useRef, useState } from "react"
import { Link, useHistory, useLocation } from "react-router-dom"
import Logo from "../../Asset/logos/w.png"

const TOP_THRESHOLD = 4   // 判定在顶端的阈值(px)
const DIR_THRESHOLD = 8   // 判定滚动方向的阈值(px)

const NavBar = ({ routeMap = [] }) => {
  const history = useHistory()
  const location = useLocation()

  const [activeKey, setActiveKey] = useState("")
  const [menu, setMenu] = useState([])
  const [showNav, setShowNav] = useState(true)
  const lastY = useRef(0)

  // 构建菜单
  useEffect(() => {
    const m = routeMap
      .filter(r => r.path !== "/" && r.show)
      .map(r => ({ title: r.title, url: `/${String(r.title).toLowerCase()}` }))
    setMenu(m)
  }, [routeMap])

  // 工具函数：拿当前滚动位置
  const getScrollTop = () =>
    Math.max(
      window.pageYOffset || 0,
      document.documentElement?.scrollTop || 0,
      document.body?.scrollTop || 0
    )

  // 路由变化：高亮同步 + 默认隐藏（除非已在顶端）
  useEffect(() => {
    setActiveKey(location.pathname === "/" ? "/home" : location.pathname)
    const y = Math.max(getScrollTop(), 0)
    lastY.current = y
    // 自动隐藏；若当前已在顶端则显示
    setShowNav(y <= TOP_THRESHOLD)
  }, [location.pathname])

  // 滚动：下滚隐藏，上滚显示；到顶端一律显示
  useEffect(() => {
    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        let y = getScrollTop()
        if (y < 0) y = 0

        if (y <= TOP_THRESHOLD) {
          // 到顶端：显示
          setShowNav(true)
        } else {
          const delta = y - lastY.current
          if (delta > DIR_THRESHOLD) {
            // 下滚：隐藏
            setShowNav(false)
          } else if (delta < -DIR_THRESHOLD) {
            // 上滚：显示
            setShowNav(true)
          }
        }

        lastY.current = y
        ticking = false
      })
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    // 首次同步一次（防止初始状态不对）
    onScroll()
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        showNav
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 -translate-y-6 pointer-events-none"
      }`}
    >
      <nav className="backdrop-blur-md bg-white/60 shadow-sm">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex h-14 items-center justify-between">
            <img
              src={Logo}
              alt="Logo"
              className="w-10 h-10 object-contain cursor-pointer"
              onClick={() => history.push("/")}
            />
            <div className="flex items-center gap-4">
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
