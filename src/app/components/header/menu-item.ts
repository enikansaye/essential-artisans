export interface MenuItem {
    label: string;
    icon: string;
    routeLink:string;
    buttonClickValue: () => void;
    showOnMobile: boolean;
    showOnTablet: boolean;
    showOnDesktop: boolean;
}
