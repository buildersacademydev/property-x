import {
    ArrowRight,
    Award,
    Bitcoin,
    Building,
    CheckCircle,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    ChevronUp,
    Clock,
    CloudAlert,
    DollarSign,
    Download,
    ExternalLink,
    Home,
    LaptopMinimalCheck,
    List,
    Loader2,
    LucideProps,
    Mail,
    Menu,
    MousePointerClick,
    Play,
    PlugZap,
    Power,
    Shield,
    Store,
    Target,
    TrendingUp,
    Unplug,
    User,
    Eye,
    EyeOff,
    Check,
    Copy,
    Users,
    Wallet,
    X,
    Zap,
    MoveRight,
} from "lucide-react"

type IconSize = { size?: number }
type SvgProps = React.HTMLAttributes<SVGSVGElement>
type IconProps = IconSize & SvgProps & LucideProps

export const Icons = {
    x: (props: IconProps) => <X {...props} />,
    arrowRight: (props: IconProps) => <ArrowRight {...props} />,
    shield: (props: IconProps) => <Shield {...props} />,
    bitcoin: (props: IconProps) => <Bitcoin {...props} />,
    building: (props: IconProps) => <Building {...props} />,
    users: (props: IconProps) => <Users {...props} />,
    user: (props: IconProps) => <User {...props} />,
    trendingUp: (props: IconProps) => <TrendingUp {...props} />,
    clock: (props: IconProps) => <Clock {...props} />,
    checkCircle: (props: IconProps) => <CheckCircle {...props} />,
    play: (props: IconProps) => <Play {...props} />,
    download: (props: IconProps) => <Download {...props} />,
    award: (props: IconProps) => <Award {...props} />,
    target: (props: IconProps) => <Target {...props} />,
    dollarSign: (props: IconProps) => <DollarSign {...props} />,
    menu: (props: IconProps) => <Menu {...props} />,
    chevronUp: (props: IconProps) => <ChevronUp {...props} />,
    chevronDown: (props: IconProps) => <ChevronDown {...props} />,
    chevronLeft: (props: IconProps) => <ChevronLeft {...props} />,
    chevronRight: (props: IconProps) => <ChevronRight {...props} />,
    externalLink: (props: IconProps) => <ExternalLink {...props} />,
    wallet: (props: IconProps) => <Wallet {...props} />,
    plug: (props: IconProps) => <PlugZap {...props} />,
    unplug: (props: IconProps) => <Unplug {...props} />,
    store: (props: IconProps) => <Store {...props} />,
    power: (props: IconProps) => <Power {...props} />,
    zap: (props: IconProps) => <Zap {...props} />,
    success: (props: IconProps) => <LaptopMinimalCheck {...props} />,
    error: (props: IconProps) => <CloudAlert {...props} />,
    click: (props: IconProps) => <MousePointerClick {...props} />,
    mail: (props: IconProps) => <Mail {...props} />,
    check: (props: IconProps) => <Check {...props} />,
    copy: (props: IconProps) => <Copy {...props} />,
    eye: (props: IconProps) => <Eye {...props} />,
    eyeOff: (props: IconProps) => <EyeOff {...props} />,
    home: (props: IconProps) => <Home {...props} />,
    list: (props: IconProps) => <List {...props} />,
    moveRight: (props: IconProps) => <MoveRight {...props} />,

    spinner: (props: IconProps) => (
        <Loader2 {...props} className="animate-spin" />
    ),
    // Logos
    logoPropertyX: (props: SvgProps) => (
        <svg width="104" height="121" viewBox="0 0 104 121" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path d="M82.7468 0C80.1361 0 79.0067 1.63271 78.0702 3.29921L39.2163 71.6518L64.0274 116.805C64.8881 118.344 66.2237 120.108 68.9025 120.108H86.345C87.395 120.108 88.2368 119.714 88.6644 118.982C89.1241 118.24 89.1146 117.265 88.6265 116.304L64.0084 71.7081C63.9857 71.6705 63.9857 71.6274 64.0084 71.5917L102.673 3.77964C103.157 2.82253 103.169 1.84666 102.711 1.10724C102.263 0.39035 101.436 0 100.384 0L82.7468 0Z" fill="#FF751F" />
            <path d="M9.37121 23.6988C8.32126 23.6988 7.49454 24.0929 7.05185 24.806C6.59214 25.5473 6.60539 26.5213 7.08969 27.484L18.974 47.7053C18.9833 47.7236 18.9882 47.7439 18.9882 47.7644C18.9882 47.7849 18.9833 47.8052 18.974 47.8235L0.36999 80.3277C-0.114312 81.2848 -0.12188 82.2607 0.339721 83.002C0.786187 83.7151 1.60723 84.1092 2.65908 84.1092H20.1678C22.7784 84.1092 23.957 82.4052 24.85 80.8062L43.768 47.7654C43.6924 47.6471 31.7134 27.0055 31.7134 27.0055C30.847 25.4666 29.5114 23.6988 26.8326 23.6988H9.39013H9.37121Z" fill="#FF751F" />
        </svg>

    ),
    logoLeather: (props: SvgProps) => (
        <svg
            style={{ width: "100%", height: "100%" }}
            viewBox="0 0 84 19"
            preserveAspectRatio="none"
            width="100%"
            height="100%"
            {...props}
        >
            <use href="#svg1581531772_2491" />
        </svg>
    ),

    logoBitcoin: (props: SvgProps) => (
        <svg
            {...props}
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 32 32"
        >
            <g fill="none" fillRule="evenodd">
                <use fill="#000" filter="url(#btc__a)" xlinkHref="#btc__b" />
                <use fill="#F7931A" xlinkHref="#btc__b" />
                <use
                    fill="url(#btc__c)"
                    style={{ mixBlendMode: "soft-light" }}
                    xlinkHref="#btc__b"
                />
                <circle cx="16" cy="15" r="14.5" stroke="#000" strokeOpacity=".097" />
                <g fillRule="nonzero">
                    <use fill="#000" filter="url(#btc__d)" xlinkHref="#btc__e" />
                    <use fill="#FFF" fillRule="evenodd" xlinkHref="#btc__e" />
                </g>
            </g>
        </svg>
    ),
} as const

export type TIconName = keyof typeof Icons
