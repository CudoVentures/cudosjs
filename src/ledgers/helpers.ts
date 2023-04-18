import { CudosNetworkConsts } from '../utils';
import { detect as detectBrowser } from 'detect-browser';
import { decodeSignature, StdSignature } from '../amino';
import { verifyADR36Amino } from '@keplr-wallet/cosmos';
import { bech32 } from 'bech32'

import AgoricImg from './networkImgs/agoric.svg'
import AssetMantleImg from './networkImgs/assetmantle.png'
import AkashImg from './networkImgs/akt.svg'
import AxelarImg from './networkImgs/axelar.svg'
import BandProtocolImg from './networkImgs/band.svg'
import BostromImg from './networkImgs/bostrom.png'
import BitCannaImg from './networkImgs/bcna.svg'
import BitsongImg from './networkImgs/btsg.svg'
import TerraImg from './networkImgs/luna2.png'
import PersistenceImg from './networkImgs/xprt.png'
import CantoImg from './networkImgs/canto.png'
import CerberusImg from './networkImgs/cerberus.png'
import ChihuahuaImg from './networkImgs/huahua.png'
import ComdexImg from './networkImgs/cmdx.svg'
import CoreumImg from './networkImgs/coreum.svg'
import CosmosImg from './networkImgs/atom.svg'
import CronosImg from './networkImgs/cro.png'
import CrescentImg from './networkImgs/crescent.svg'
import CudosImg from './networkImgs/cudos.svg'
import DesmosImg from './networkImgs/desmos.svg'
import eMoneyImg from './networkImgs/emoney.png'
import EvmosImg from './networkImgs/evmos.svg'
import FetchAiImg from './networkImgs/fetch.png'
import GravityBridgeImg from './networkImgs/grav.svg'
import InjectiveImg from './networkImgs/injective.png'
import StarnameImg from './networkImgs/iov.png'
import IrisNetworkImg from './networkImgs/iris.svg'
import IXOImg from './networkImgs/ixo.png'
import JunoImg from './networkImgs/juno.svg'
import KavaImg from './networkImgs/kava.png'
import KonstellationImg from './networkImgs/darc.svg'
import KujiraImg from './networkImgs/kujira.png'
import KYVEImg from './networkImgs/kyve.svg'
import KiChainImg from './networkImgs/ki.svg'
import LikeCoinImg from './networkImgs/likecoin.svg'
import LumNetworkImg from './networkImgs/lum.svg'
import MarsImg from './networkImgs/mars-token.svg'
import MediblocImg from './networkImgs/medibloc.png'
import NobleImg from './networkImgs/stake.png'
import NyxImg from './networkImgs/nyx.png'
import OsmosisImg from './networkImgs/osmosis.svg'
import OmniFlixHubImg from './networkImgs/omniflixhub.png'
import OnomyImg from './networkImgs/nom.svg'
import PassageImg from './networkImgs/pasg.png'
import ProvenanceImg from './networkImgs/provenance.jpeg'
import QuasarImg from './networkImgs/quasar.svg'
import QuicksilverImg from './networkImgs/qck.png'
import RegenNetworkImg from './networkImgs/regen.png'
import RizonImg from './networkImgs/rizon.png'
import SecretNetworkImg from './networkImgs/scrt.svg'
import SentinelImg from './networkImgs/dvpn.png'
import ShentuImg from './networkImgs/certik.png'
import SifchainImg from './networkImgs/sifchain.png'
import SommelierImg from './networkImgs/sommelier.png'
import StaFiHubImg from './networkImgs/stafihub.png'
import StargazeImg from './networkImgs/stars.png'
import StrideImg from './networkImgs/strd.svg'
import TgradeImg from './networkImgs/tgrade.svg'
import TeritoriImg from './networkImgs/teritori.svg'
import XPLAImg from './networkImgs/xpla.svg'
import UmeeImg from './networkImgs/umee.png'

declare let window: {
    keplr: any;
    cosmostation: any;
}

enum CHAIN_NAMES {
    Agoric = 'Agoric',
    AssetMantle = 'AssetMantle',
    Akash = 'Akash',
    Axelar = 'Axelar',
    BandProtocol = 'Band Protocol',
    Bostrom = 'Bostrom',
    BitCanna = 'BitCanna',
    Bitsong = 'Bitsong',
    Terra = 'Terra',
    TerraV2 = 'Terra V2',
    Persistence = 'Persistence',
    Canto = 'Canto',
    Cerberus = 'Cerberus',
    Chihuahua = 'Chihuahua',
    Coreum = 'Coreum',
    Comdex = 'Comdex',
    Cosmos = 'Cosmos',
    Cronos = 'Cronos',
    Crescent = 'Crescent',
    Cudos = 'Cudos',
    Desmos = 'Desmos',
    eMoney = 'e-Money',
    FetchAI = 'Fetch.ai',
    Evmos = 'Evmos',
    GravityBridge = 'Gravity Bridge',
    Injective = 'Injective',
    Starname = 'Starname',
    IrisNetwork = 'Iris Network',
    IXO = 'IXO',
    IXOV2 = 'IXO V2',
    Juno = 'Juno',
    Kava = 'Kava',
    KYVE = 'KYVE',
    Konstellation = 'Konstellation',
    Kujira = 'Kujira',
    KiChain = 'Ki-Chain',
    LikeCoin = 'LikeCoin',
    LumNetwork = 'Lum Network',
    Mars = 'Mars',
    Medibloc = 'Medibloc',
    Nyx = 'Nyx',
    Noble = 'Noble',
    Osmosis = 'Osmosis',
    OmniFlixHub = 'OmniFlix Hub',
    Onomy = 'Onomy',
    Passage = 'Passage',
    Provenance = 'Provenance',
    Quasar = 'Quasar',
    Quicksilver = 'Quicksilver',
    QuicksilverV2 = 'Quicksilver V2',
    Rizon = 'Rizon',
    RegenNetwork = 'Regen Network',
    SecretNetwork = 'Secret Network',
    Sentinel = 'Sentinel',
    Shentu = 'Shentu',
    Sifchain = 'Sifchain',
    Sommelier = 'Sommelier',
    StafiHub = 'StaFi Hub',
    Stargaze = 'Stargaze',
    Stride = 'Stride',
    Teritori = 'Teritori',
    Tgrade = 'Tgrade',
    XPLA = 'XPLA',
    Umee = 'Umee',

}

const CHAIN_IDS = {
    [CHAIN_NAMES.Agoric]: 'agoric-3',
    [CHAIN_NAMES.AssetMantle]: 'mantle-1',
    [CHAIN_NAMES.Akash]: 'akashnet-2',
    [CHAIN_NAMES.Axelar]: 'axelar-dojo-1',
    [CHAIN_NAMES.BandProtocol]: 'laozi-mainnet',
    [CHAIN_NAMES.Bostrom]: 'bostrom',
    [CHAIN_NAMES.BitCanna]: 'bitcanna-1',
    [CHAIN_NAMES.Bitsong]: 'bitsong-2b',
    [CHAIN_NAMES.Terra]: 'columbus-5',
    [CHAIN_NAMES.TerraV2]: 'phoenix-1',
    [CHAIN_NAMES.Persistence]: 'core-1',
    [CHAIN_NAMES.Canto]: 'canto_7700-1',
    [CHAIN_NAMES.Cerberus]: 'cerberus-chain-1',
    [CHAIN_NAMES.Chihuahua]: 'chihuahua-1',
    [CHAIN_NAMES.Comdex]: 'comdex-1',
    [CHAIN_NAMES.Coreum]: 'coreum-mainnet-1',
    [CHAIN_NAMES.Cosmos]: 'cosmoshub-4',
    [CHAIN_NAMES.Cronos]: 'crypto-org-chain-mainnet-1',
    [CHAIN_NAMES.Crescent]: 'crescent-1',
    [CHAIN_NAMES.Cudos]: 'cudos-1',
    [CHAIN_NAMES.Desmos]: 'desmos-mainnet',
    [CHAIN_NAMES.FetchAI]: 'fetchhub-4',
    [CHAIN_NAMES.eMoney]: 'emoney-3',
    [CHAIN_NAMES.Evmos]: 'evmos_9001-2',
    [CHAIN_NAMES.GravityBridge]: 'gravity-bridge-3',
    [CHAIN_NAMES.Injective]: 'injective-1',
    [CHAIN_NAMES.Starname]: 'iov-mainnet-ibc',
    [CHAIN_NAMES.IrisNetwork]: 'irishub-1',
    [CHAIN_NAMES.IXO]: 'ixo-4',
    [CHAIN_NAMES.IXOV2]: 'ixo-5',
    [CHAIN_NAMES.Juno]: 'juno-1',
    [CHAIN_NAMES.Kava]: 'kava_2222-10',
    [CHAIN_NAMES.KYVE]: 'kyve-1',
    [CHAIN_NAMES.Konstellation]: 'darchub',
    [CHAIN_NAMES.Kujira]: 'kaiyo-1',
    [CHAIN_NAMES.KiChain]: 'kichain-2',
    [CHAIN_NAMES.LikeCoin]: 'likecoin-mainnet-2',
    [CHAIN_NAMES.LumNetwork]: 'lum-network-1',
    [CHAIN_NAMES.Mars]: 'mars-1',
    [CHAIN_NAMES.Medibloc]: 'panacea-3',
    [CHAIN_NAMES.Noble]: 'noble-1',
    [CHAIN_NAMES.Nyx]: 'nyx',
    [CHAIN_NAMES.Osmosis]: 'osmosis-1',
    [CHAIN_NAMES.OmniFlixHub]: 'omniflixhub-1',
    [CHAIN_NAMES.Onomy]: 'onomy-mainnet-1',
    [CHAIN_NAMES.Passage]: 'passage-1',
    [CHAIN_NAMES.Provenance]: 'pio-mainnet-1',
    [CHAIN_NAMES.Quasar]: 'quasar-1',
    [CHAIN_NAMES.Quicksilver]: 'quicksilver-1',
    [CHAIN_NAMES.QuicksilverV2]: 'quicksilver-2',
    [CHAIN_NAMES.RegenNetwork]: 'regen-1',
    [CHAIN_NAMES.Rizon]: 'titan-1',
    [CHAIN_NAMES.SecretNetwork]: 'secret-4',
    [CHAIN_NAMES.Sentinel]: 'sentinelhub-2',
    [CHAIN_NAMES.Shentu]: 'shentu-2.2',
    [CHAIN_NAMES.Sifchain]: 'sifchain-1',
    [CHAIN_NAMES.Sommelier]: 'sommelier-3',
    [CHAIN_NAMES.StafiHub]: 'stafihub-1',
    [CHAIN_NAMES.Stargaze]: 'stargaze-1',
    [CHAIN_NAMES.Stride]: 'stride-1',
    [CHAIN_NAMES.Teritori]: 'teritori-1',
    [CHAIN_NAMES.Tgrade]: 'tgrade-mainnet-1',
    [CHAIN_NAMES.XPLA]: 'dimension_37-1',
    [CHAIN_NAMES.Umee]: 'umee-1',
}

const CHAIN_ID_TO_ATOMSCAN_NETWORK_LOGO = {
    [CHAIN_IDS.Agoric]: AgoricImg,
    [CHAIN_IDS.AssetMantle]: AssetMantleImg,
    [CHAIN_IDS.Akash]: AkashImg,
    [CHAIN_IDS.Axelar]: AxelarImg,
    [CHAIN_IDS["Band Protocol"]]: BandProtocolImg,
    [CHAIN_IDS.Bostrom]: BostromImg,
    [CHAIN_IDS.BitCanna]: BitCannaImg,
    [CHAIN_IDS.Bitsong]: BitsongImg,
    [CHAIN_IDS.Terra]: TerraImg,
    [CHAIN_IDS["Terra V2"]]: TerraImg,
    [CHAIN_IDS.Persistence]: PersistenceImg,
    [CHAIN_IDS.Canto]: CantoImg,
    [CHAIN_IDS.Cerberus]: CerberusImg,
    [CHAIN_IDS.Chihuahua]: ChihuahuaImg,
    [CHAIN_IDS.Comdex]: ComdexImg,
    [CHAIN_IDS.Coreum]: CoreumImg,
    [CHAIN_IDS.Cosmos]: CosmosImg,
    [CHAIN_IDS.Cronos]: CronosImg,
    [CHAIN_IDS.Crescent]: CrescentImg,
    [CHAIN_IDS.Cudos]: CudosImg,
    [CHAIN_IDS.Desmos]: DesmosImg,
    [CHAIN_IDS["e-Money"]]: eMoneyImg,
    [CHAIN_IDS.Evmos]: EvmosImg,
    [CHAIN_IDS["Fetch.ai"]]: FetchAiImg,
    [CHAIN_IDS["Gravity Bridge"]]: GravityBridgeImg,
    [CHAIN_IDS.Injective]: InjectiveImg,
    [CHAIN_IDS.Starname]: StarnameImg,
    [CHAIN_IDS["Iris Network"]]: IrisNetworkImg,
    [CHAIN_IDS.IXO]: IXOImg,
    [CHAIN_IDS["IXO V2"]]: IXOImg,
    [CHAIN_IDS.Juno]: JunoImg,
    [CHAIN_IDS.Kava]: KavaImg,
    [CHAIN_IDS.Konstellation]: KonstellationImg,
    [CHAIN_IDS.Kujira]: KujiraImg,
    [CHAIN_IDS.KYVE]: KYVEImg,
    [CHAIN_IDS["Ki-Chain"]]: KiChainImg,
    [CHAIN_IDS.LikeCoin]: LikeCoinImg,
    [CHAIN_IDS["Lum Network"]]: LumNetworkImg,
    [CHAIN_IDS.Mars]: MarsImg,
    [CHAIN_IDS.Medibloc]: MediblocImg,
    [CHAIN_IDS.Noble]: NobleImg,
    [CHAIN_IDS.Nyx]: NyxImg,
    [CHAIN_IDS.Osmosis]: OsmosisImg,
    [CHAIN_IDS["OmniFlix Hub"]]: OmniFlixHubImg,
    [CHAIN_IDS.Onomy]: OnomyImg,
    [CHAIN_IDS.Passage]: PassageImg,
    [CHAIN_IDS.Provenance]: ProvenanceImg,
    [CHAIN_IDS.Quasar]: QuasarImg,
    [CHAIN_IDS.Quicksilver]: QuicksilverImg,
    [CHAIN_IDS["Quicksilver V2"]]: QuicksilverImg,
    [CHAIN_IDS["Regen Network"]]: RegenNetworkImg,
    [CHAIN_IDS.Rizon]: RizonImg,
    [CHAIN_IDS["Secret Network"]]: SecretNetworkImg,
    [CHAIN_IDS.Sentinel]: SentinelImg,
    [CHAIN_IDS.Shentu]: ShentuImg,
    [CHAIN_IDS.Sifchain]: SifchainImg,
    [CHAIN_IDS.Sommelier]: SommelierImg,
    [CHAIN_IDS["StaFi Hub"]]: StaFiHubImg,
    [CHAIN_IDS.Stargaze]: StargazeImg,
    [CHAIN_IDS.Stride]: StrideImg,
    [CHAIN_IDS.Tgrade]: TgradeImg,
    [CHAIN_IDS.Teritori]: TeritoriImg,
    [CHAIN_IDS.XPLA]: XPLAImg,
    [CHAIN_IDS.Umee]: UmeeImg,
}

const CHAIN_ID_TO_CHAIN_NAME = {
    [CHAIN_IDS.Agoric]: CHAIN_NAMES.Agoric,
    [CHAIN_IDS.AssetMantle]: CHAIN_NAMES.AssetMantle,
    [CHAIN_IDS.Akash]: CHAIN_NAMES.Akash,
    [CHAIN_IDS.Axelar]: CHAIN_NAMES.Axelar,
    [CHAIN_IDS["Band Protocol"]]: CHAIN_NAMES.BandProtocol,
    [CHAIN_IDS.Bostrom]: CHAIN_NAMES.Bostrom,
    [CHAIN_IDS.BitCanna]: CHAIN_NAMES.BitCanna,
    [CHAIN_IDS.Bitsong]: CHAIN_NAMES.Bitsong,
    [CHAIN_IDS.Terra]: CHAIN_NAMES.Terra,
    [CHAIN_IDS["Terra V2"]]: CHAIN_NAMES.TerraV2,
    [CHAIN_IDS.Persistence]: CHAIN_NAMES.Persistence,
    [CHAIN_IDS.Canto]: CHAIN_NAMES.Canto,
    [CHAIN_IDS.Cerberus]: CHAIN_NAMES.Cerberus,
    [CHAIN_IDS.Chihuahua]: CHAIN_NAMES.Chihuahua,
    [CHAIN_IDS.Comdex]: CHAIN_NAMES.Comdex,
    [CHAIN_IDS.Coreum]: CHAIN_NAMES.Coreum,
    [CHAIN_IDS.Cosmos]: CHAIN_NAMES.Cosmos,
    [CHAIN_IDS.Cronos]: CHAIN_NAMES.Cronos,
    [CHAIN_IDS.Crescent]: CHAIN_NAMES.Crescent,
    [CHAIN_IDS.Cudos]: CHAIN_NAMES.Cudos,
    [CHAIN_IDS.Desmos]: CHAIN_NAMES.Desmos,
    [CHAIN_IDS["e-Money"]]: CHAIN_NAMES.eMoney,
    [CHAIN_IDS.Evmos]: CHAIN_NAMES.Evmos,
    [CHAIN_IDS["Fetch.ai"]]: CHAIN_NAMES.FetchAI,
    [CHAIN_IDS["Gravity Bridge"]]: CHAIN_NAMES.GravityBridge,
    [CHAIN_IDS.Injective]: CHAIN_NAMES.Injective,
    [CHAIN_IDS.Starname]: CHAIN_NAMES.Starname,
    [CHAIN_IDS["Iris Network"]]: CHAIN_NAMES.IrisNetwork,
    [CHAIN_IDS.IXO]: CHAIN_NAMES.IXO,
    [CHAIN_IDS["IXO V2"]]: CHAIN_NAMES.IXOV2,
    [CHAIN_IDS.Juno]: CHAIN_NAMES.Juno,
    [CHAIN_IDS.Kava]: CHAIN_NAMES.Kava,
    [CHAIN_IDS.Konstellation]: CHAIN_NAMES.Konstellation,
    [CHAIN_IDS.Kujira]: CHAIN_NAMES.Kujira,
    [CHAIN_IDS.KYVE]: CHAIN_NAMES.KYVE,
    [CHAIN_IDS["Ki-Chain"]]: CHAIN_NAMES.KiChain,
    [CHAIN_IDS.LikeCoin]: CHAIN_NAMES.LikeCoin,
    [CHAIN_IDS["Lum Network"]]: CHAIN_NAMES.LumNetwork,
    [CHAIN_IDS.Mars]: CHAIN_NAMES.Mars,
    [CHAIN_IDS.Medibloc]: CHAIN_NAMES.Medibloc,
    [CHAIN_IDS.Noble]: CHAIN_NAMES.Noble,
    [CHAIN_IDS.Nyx]: CHAIN_NAMES.Nyx,
    [CHAIN_IDS.Osmosis]: CHAIN_NAMES.Osmosis,
    [CHAIN_IDS["OmniFlix Hub"]]: CHAIN_NAMES.OmniFlixHub,
    [CHAIN_IDS.Onomy]: CHAIN_NAMES.Onomy,
    [CHAIN_IDS.Passage]: CHAIN_NAMES.Passage,
    [CHAIN_IDS.Provenance]: CHAIN_NAMES.Provenance,
    [CHAIN_IDS.Quasar]: CHAIN_NAMES.Quasar,
    [CHAIN_IDS.Quicksilver]: CHAIN_NAMES.Quicksilver,
    [CHAIN_IDS["Quicksilver V2"]]: CHAIN_NAMES.QuicksilverV2,
    [CHAIN_IDS["Regen Network"]]: CHAIN_NAMES.RegenNetwork,
    [CHAIN_IDS.Rizon]: CHAIN_NAMES.Rizon,
    [CHAIN_IDS["Secret Network"]]: CHAIN_NAMES.SecretNetwork,
    [CHAIN_IDS.Sentinel]: CHAIN_NAMES.Sentinel,
    [CHAIN_IDS.Shentu]: CHAIN_NAMES.Shentu,
    [CHAIN_IDS.Sifchain]: CHAIN_NAMES.Sifchain,
    [CHAIN_IDS.Sommelier]: CHAIN_NAMES.Sommelier,
    [CHAIN_IDS["StaFi Hub"]]: CHAIN_NAMES.StafiHub,
    [CHAIN_IDS.Stargaze]: CHAIN_NAMES.Stargaze,
    [CHAIN_IDS.Stride]: CHAIN_NAMES.Stride,
    [CHAIN_IDS.Teritori]: CHAIN_NAMES.Teritori,
    [CHAIN_IDS.Tgrade]: CHAIN_NAMES.Tgrade,
    [CHAIN_IDS.XPLA]: CHAIN_NAMES.XPLA,
    [CHAIN_IDS.Umee]: CHAIN_NAMES.Umee,
}

const CHAIN_ID_TO_ATOMSCAN_URL_NETWORK = {
    [CHAIN_IDS.Agoric]: '/agoric',
    [CHAIN_IDS.AssetMantle]: '/assetmantle',
    [CHAIN_IDS.Akash]: '/akash',
    [CHAIN_IDS.Axelar]: '/axelar',
    [CHAIN_IDS["Band Protocol"]]: '/band-protocol',
    [CHAIN_IDS.Bostrom]: '/bostrom',
    [CHAIN_IDS.BitCanna]: '/bitcanna',
    [CHAIN_IDS.Bitsong]: '/bitsong',
    [CHAIN_IDS.Terra]: '/terra2',
    [CHAIN_IDS["Terra V2"]]: '/terra2',
    [CHAIN_IDS.Persistence]: '/persistence',
    [CHAIN_IDS.Canto]: '/canto',
    [CHAIN_IDS.Cerberus]: '/cerberus',
    [CHAIN_IDS.Chihuahua]: '/chihuahua',
    [CHAIN_IDS.Comdex]: '/comdex',
    [CHAIN_IDS.Coreum]: '/frontier/coreum',
    [CHAIN_IDS.Cosmos]: '',
    [CHAIN_IDS.Cronos]: '/cronos',
    [CHAIN_IDS.Crescent]: '/crescent',
    [CHAIN_IDS.Cudos]: '/cudos',
    [CHAIN_IDS.Desmos]: '/desmos',
    [CHAIN_IDS["e-Money"]]: '/emoney',
    [CHAIN_IDS.Evmos]: '/evmos',
    [CHAIN_IDS["Fetch.ai"]]: '/fetchai',
    [CHAIN_IDS["Gravity Bridge"]]: '/gravity-bridge',
    [CHAIN_IDS.Injective]: '/injective',
    [CHAIN_IDS.Starname]: '/starname',
    [CHAIN_IDS["Iris Network"]]: '/iris-network',
    [CHAIN_IDS.IXO]: '/ixo',
    [CHAIN_IDS["IXO V2"]]: '/ixo',
    [CHAIN_IDS.Juno]: '/juno',
    [CHAIN_IDS.Kava]: '/kava',
    [CHAIN_IDS.Konstellation]: '/konstellation',
    [CHAIN_IDS.Kujira]: '/kujira',
    [CHAIN_IDS.KYVE]: '/frontier/kyve',
    [CHAIN_IDS["Ki-Chain"]]: '/ki-chain',
    [CHAIN_IDS.LikeCoin]: '/likecoin',
    [CHAIN_IDS["Lum Network"]]: '/lum-network',
    [CHAIN_IDS.Mars]: '/frontier/mars',
    [CHAIN_IDS.Medibloc]: '/medibloc',
    [CHAIN_IDS.Noble]: '/frontier/noble',
    [CHAIN_IDS.Osmosis]: '/osmosis',
    [CHAIN_IDS["OmniFlix Hub"]]: '/omniflixhub',
    [CHAIN_IDS.Onomy]: '/frontier/onomy',
    [CHAIN_IDS.Passage]: '/passage',
    [CHAIN_IDS.Provenance]: '/provenance',
    [CHAIN_IDS.Noble]: '/frontier/quasar',
    [CHAIN_IDS.Quicksilver]: '/frontier/quicksilver',
    [CHAIN_IDS["Quicksilver V2"]]: '/frontier/quicksilver',
    [CHAIN_IDS.Nyx]: '/frontier/nyx',
    [CHAIN_IDS["Regen Network"]]: '/regen-network',
    [CHAIN_IDS.Rizon]: '/rizon',
    [CHAIN_IDS["Secret Network"]]: '/secret-network',
    [CHAIN_IDS.Sentinel]: '/sentinel',
    [CHAIN_IDS.Shentu]: '/shentu',
    [CHAIN_IDS.Sifchain]: '/sifchain',
    [CHAIN_IDS.Sommelier]: '/sommelier',
    [CHAIN_IDS["StaFi Hub"]]: '/stafihub',
    [CHAIN_IDS.Stargaze]: '/stargaze',
    [CHAIN_IDS.Stride]: '/stride',
    [CHAIN_IDS.Teritori]: '/teritori',
    [CHAIN_IDS.Tgrade]: '/tgrade',
    [CHAIN_IDS.XPLA]: '/frontier/xpla',
    [CHAIN_IDS.Umee]: '/umee',
}

export enum SUPPORTED_WALLET {
    Keplr = 'Keplr',
    Cosmostation = 'Cosmostation'
}

export enum SUPPORTED_BROWSER {
    opera = 'opera',
    chrome = 'chrome',
    firefox = 'firefox',
    edge = 'edge',
}

export const SUPPORTED_EXTENSIONS: WALLET_EXTENSION = {
    [SUPPORTED_WALLET.Keplr]: {
        URL: {
            [SUPPORTED_BROWSER.opera]: 'https://chrome.google.com/webstore/detail/keplr/dmkamcknogkgcdfhhbddcghachkejeap?hl=en',
            [SUPPORTED_BROWSER.chrome]: 'https://chrome.google.com/webstore/detail/keplr/dmkamcknogkgcdfhhbddcghachkejeap?hl=en',
            [SUPPORTED_BROWSER.firefox]: 'https://addons.mozilla.org/en-US/firefox/addon/keplr/',
            [SUPPORTED_BROWSER.edge]: 'https://microsoftedge.microsoft.com/addons/detail/keplr/efknohjclbjfppcmniflbmnokbihoofp?hl=en-GB'
        },
        isInstalled: () => {
            return window.keplr?.enable.length > 0
        }

    },
    [SUPPORTED_WALLET.Cosmostation]: {
        URL: {
            [SUPPORTED_BROWSER.chrome]: 'https://chrome.google.com/webstore/detail/cosmostation/fpkhgmpbidmiogeglndfbkegfdlnajnf?utm_source=chrome-ntp-icon'
        },
        isInstalled: () => {
            return window.cosmostation ? true : false
        }

    }
}

export type WALLET_EXTENSION_DETAILS = {
    URL: Partial<Record<SUPPORTED_BROWSER, string>>;
    isInstalled: () => boolean;
}

export type WALLET_EXTENSION = {
    [key in SUPPORTED_WALLET]: WALLET_EXTENSION_DETAILS;
}

export const detectUserBrowser = (): string => {
    let detectedBrowser = detectBrowser()?.name

    if (detectedBrowser === 'edge-chromium') {
        detectedBrowser = SUPPORTED_BROWSER.edge
    }

    return detectedBrowser || ''
}

export const isExtensionEnabled = (walletName: SUPPORTED_WALLET): boolean => {
    return SUPPORTED_EXTENSIONS[walletName].isInstalled()
}

export const isExtensionAvailableForBrowser = (walletName: SUPPORTED_WALLET, browser: SUPPORTED_BROWSER): boolean => {
    return SUPPORTED_EXTENSIONS[walletName].URL[browser as SUPPORTED_BROWSER] ? true : false
}

export const getExtensionUrlForBrowser = (walletName: SUPPORTED_WALLET, browser: SUPPORTED_BROWSER): string | undefined => {
    return SUPPORTED_EXTENSIONS[walletName].URL[browser as SUPPORTED_BROWSER]
}

export const getSupportedWallets = (): SUPPORTED_WALLET[] => {
    return Object.values(SUPPORTED_WALLET)
}

export const getSupportedBrowsersForWallet = (walletName: SUPPORTED_WALLET): SUPPORTED_BROWSER[] => {
    return Object.keys(SUPPORTED_EXTENSIONS[walletName].URL) as SUPPORTED_BROWSER[]
}

export const isSupportedBrowser = (browser: string) => {
    return SUPPORTED_BROWSER[browser.toLowerCase() as SUPPORTED_BROWSER] ? true : false
}

export const verifyArbitrarySignature = (signedTx: StdSignature, address: string, data: string | Uint8Array): boolean => {
    const { pubkey: decodedPubKey, signature: decodedSignature } = decodeSignature(signedTx)

    const verified = verifyADR36Amino(
        CudosNetworkConsts.BECH32_PREFIX_ACC_ADDR,
        address,
        data,
        decodedPubKey,
        decodedSignature,
    )

    return verified
}

export const isValidCosmosAddress = (addr: string) => {
    if (addr === '' || addr === undefined) return false
    try {
        const { prefix: decodedPrefix } = bech32.decode(addr)
        return addr.toLowerCase().startsWith(decodedPrefix.toLowerCase())

    } catch {
        // invalid checksum
        return false
    }
}

const getCosmosAddressPrefix = (addr: string) => {
    if (isValidCosmosAddress(addr)) {
        const { prefix: decodedPrefix } = bech32.decode(addr)
        return decodedPrefix
    }
    return 'invalidAddress'
}

export const getAtomscanExplorerUrl = (chainId: string, address: string): string => {
    let network = CHAIN_ID_TO_ATOMSCAN_URL_NETWORK[chainId]
    if (!network && chainId !== CHAIN_IDS.Cosmos) {
        network = getCosmosAddressPrefix(address)
    }
    return `https://atomscan.com${network}/accounts/${address}`
}

export const getCosmosNetworkImg = (chainId: string): string => {
    return CHAIN_ID_TO_ATOMSCAN_NETWORK_LOGO[chainId]
}

export const getCosmosNetworkPrettyName = (chainId: string): string => {
    return CHAIN_ID_TO_CHAIN_NAME[chainId]
}
