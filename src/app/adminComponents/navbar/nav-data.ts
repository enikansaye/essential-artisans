export const navbarData = [
    {
        routeLink: 'main',
        icon: 'fal fa-home',
        label: 'Dashboard'
    },
    {
        routeLink: 'adminAllArtisans',
        icon: 'fal fa-box-open',
        // icon: 'fal fa-user-group',
        label: 'Artsisans'
    },
    {
        routeLink: 'adminAllUsers',
        icon: 'fal fa-chart-bar',
        label: 'Users'
    },
    {
        routeLink: 'servicecategory',
        icon: 'fal fa-chart-bar',
        label: 'Service Category'
    },
    {
        routeLink: 'alltransactions',
        icon: 'fal fa-tags',
        label: 'Orders'
    },

    
    {
        routeLink: '',
        icon: 'fal fa-cog',
        label: 'Menu with Children',
        submenuLevel1: [
            {
                routeLink: '',
                icon: 'fal fa-cog', // icon if needed
                label: 'Sub menu level 1',
            },
            {
                routeLink: '',
                icon: 'fal fa-cog', // icon if needed
                label: 'Sub menu level 1',
                submenuLevel2: [
                    {
                        routeLink: '',
                        icon: 'fal fa-cog', // icon if needed
                        label: 'Sub menu level 2',
                    }
                ]
            }
        ]
    },

];