type NavItem = {
    name: string,
    icon: string,
    href: string
}

export const navButtons: Array<NavItem> = [
    {
        name: "My Profile",
        icon: "img/profile.svg",
        href: "/"
    },
    {
        name: "Hostel Allotment",
        icon: "img/target.svg",
        href: "/allotment"
    },
    {
        name: "Fee Payments",
        icon: "img/credit-card.svg",
        href: "/fee-payment"
    },
    {
        name: "Notification",
        icon: "img/bell.svg",
        href: "/notifications"
    },
    {
        name: "Complain Box",
        icon: "img/inbox.svg",
        href: "/complain"
    }
]