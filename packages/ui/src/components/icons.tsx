import {
    ArrowRight,
    Award,
    Bitcoin,
    Building,
    CheckCircle,
    ChevronLeft,
    ChevronRight,
    ChevronUp,
    Clock,
    CloudAlert,
    DollarSign,
    Download,
    ExternalLink,
    LaptopMinimalCheck,
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
    Users,
    Wallet,
    X,
    Zap,
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
    spinner: (props: IconProps) => (
        <Loader2 {...props} className="animate-spin" />
    ),
    // Logos
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
