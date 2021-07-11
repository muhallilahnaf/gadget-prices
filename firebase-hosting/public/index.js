document.addEventListener('DOMContentLoaded', () => {
    // side nav
    let elemsSidenav = document.querySelectorAll('.sidenav')
    let instancesSidenav = M.Sidenav.init(elemsSidenav)

    // select
    let elemsSelect = document.querySelectorAll('select')
    let instancesSelect = M.FormSelect.init(elemsSelect)
})
