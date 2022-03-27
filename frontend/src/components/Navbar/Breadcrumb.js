import React from 'react'
import { useLocation } from 'react-router-dom'



import { CBreadcrumb, CBreadcrumbItem } from '@coreui/react'

const AppBreadcrumb = () => {
    const routes = [
        { path: '/', exact: true, name: 'Home' },
        { path: '/dashboard', name: 'Dashboard', component: Dashboard },
        { path: '/theme', name: 'Theme', component: Colors, exact: true },
        { path: '/theme/colors', name: 'Colors', component: Colors },
        { path: '/theme/typography', name: 'Typography', component: Typography },
        { path: '/base', name: 'Base', component: Cards, exact: true },
        { path: '/base/accordion', name: 'Accordion', component: Accordion },
        { path: '/base/breadcrumbs', name: 'Breadcrumbs', component: Breadcrumbs },
        { path: '/base/cards', name: 'Cards', component: Cards },
        { path: '/base/carousels', name: 'Carousel', component: Carousels },
        { path: '/base/collapses', name: 'Collapse', component: Collapses },
        { path: '/base/list-groups', name: 'List Groups', component: ListGroups },
        { path: '/base/navs', name: 'Navs', component: Navs },
        { path: '/base/paginations', name: 'Paginations', component: Paginations },
        { path: '/base/placeholders', name: 'Placeholders', component: Placeholders },
        { path: '/base/popovers', name: 'Popovers', component: Popovers },
        { path: '/base/progress', name: 'Progress', component: Progress },
        { path: '/base/spinners', name: 'Spinners', component: Spinners },
        { path: '/base/tables', name: 'Tables', component: Tables },
        { path: '/base/tooltips', name: 'Tooltips', component: Tooltips },
        { path: '/buttons', name: 'Buttons', component: Buttons, exact: true },
        { path: '/buttons/buttons', name: 'Buttons', component: Buttons },
        { path: '/buttons/dropdowns', name: 'Dropdowns', component: Dropdowns },
        { path: '/buttons/button-groups', name: 'Button Groups', component: ButtonGroups },
        { path: '/charts', name: 'Charts', component: Charts },
        { path: '/forms', name: 'Forms', component: FormControl, exact: true },
        { path: '/forms/form-control', name: 'Form Control', component: FormControl },
        { path: '/forms/select', name: 'Select', component: Select },
        { path: '/forms/checks-radios', name: 'Checks & Radios', component: ChecksRadios },
        { path: '/forms/range', name: 'Range', component: Range },
        { path: '/forms/input-group', name: 'Input Group', component: InputGroup },
        { path: '/forms/floating-labels', name: 'Floating Labels', component: FloatingLabels },
        { path: '/forms/layout', name: 'Layout', component: Layout },
        { path: '/forms/validation', name: 'Validation', component: Validation },
        { path: '/icons', exact: true, name: 'Icons', component: CoreUIIcons },
        { path: '/icons/coreui-icons', name: 'CoreUI Icons', component: CoreUIIcons },
        { path: '/icons/flags', name: 'Flags', component: Flags },
        { path: '/icons/brands', name: 'Brands', component: Brands },
        { path: '/notifications', name: 'Notifications', component: Alerts, exact: true },
        { path: '/notifications/alerts', name: 'Alerts', component: Alerts },
        { path: '/notifications/badges', name: 'Badges', component: Badges },
        { path: '/notifications/modals', name: 'Modals', component: Modals },
        { path: '/notifications/toasts', name: 'Toasts', component: Toasts },
        { path: '/widgets', name: 'Widgets', component: Widgets },
      ]
      
  const currentLocation = useLocation().pathname

  const getRouteName = (pathname, routes) => {
    const currentRoute = routes.find((route) => route.path === pathname)
    return currentRoute.name
  }

  const getBreadcrumbs = (location) => {
    const breadcrumbs = []
    location.split('/').reduce((prev, curr, index, array) => {
      const currentPathname = `${prev}/${curr}`
      breadcrumbs.push({
        pathname: currentPathname,
        name: getRouteName(currentPathname, routes),
        active: index + 1 === array.length ? true : false,
      })
      return currentPathname
    })
    return breadcrumbs
  }

  const breadcrumbs = getBreadcrumbs(currentLocation)

  return (
    <CBreadcrumb className="m-0 ms-2">
      <CBreadcrumbItem href="/">Home</CBreadcrumbItem>
      {breadcrumbs.map((breadcrumb, index) => {
        return (
          <CBreadcrumbItem
            {...(breadcrumb.active ? { active: true } : { href: breadcrumb.pathname })}
            key={index}
          >
            {breadcrumb.name}
          </CBreadcrumbItem>
        )
      })}
    </CBreadcrumb>
  )
}

export default React.memo(AppBreadcrumb)