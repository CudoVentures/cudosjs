import { CudosNetworkConsts } from '../utils';
import { detect as detectBrowser } from 'detect-browser';
import { decodeSignature, OfflineAminoSigner, StdSignature } from '../amino';
import { verifyADR36Amino } from '@keplr-wallet/cosmos';
import { bech32 } from 'bech32'
import { cosmos, Cosmos } from '@cosmostation/extension-client';
import { RequestAccountResponse, SignAminoDoc } from '@cosmostation/extension-client/types/message';
import { OfflineSigner } from '@cosmjs/proto-signing';
import { getOfflineSigner } from '@cosmostation/cosmos-client';

declare let window: {
    getOfflineSignerAuto: any;
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
    Gitopia = 'Gitopia',
    Medibloc = 'Medibloc',
    Nyx = 'Nyx',
    Noble = 'Noble',
    Neutron = 'Neutron',
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
    [CHAIN_NAMES.Neutron]: 'neutron-1',
    [CHAIN_NAMES.Gitopia]: 'gitopia',
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
    [CHAIN_IDS.Agoric]: 'https://atomscan.com/img/icons/chains/agoric.svg',
    [CHAIN_IDS.AssetMantle]: 'https://atomscan.com/img/icons/chains/assetmantle.png',
    [CHAIN_IDS.Akash]: 'https://atomscan.com/img/icons/chains/akt.svg',
    [CHAIN_IDS.Axelar]: 'https://atomscan.com/img/icons/chains/axelar.svg',
    [CHAIN_IDS["Band Protocol"]]: 'https://atomscan.com/img/icons/chains/band.svg',
    [CHAIN_IDS.Bostrom]: 'https://atomscan.com/img/icons/chains/bostrom.png',
    [CHAIN_IDS.BitCanna]: 'https://atomscan.com/img/icons/chains/bcna.svg',
    [CHAIN_IDS.Bitsong]: 'https://atomscan.com/img/icons/chains/btsg.svg',
    [CHAIN_IDS.Terra]: 'https://atomscan.com/img/icons/chains/luna2.png',
    [CHAIN_IDS["Terra V2"]]: 'https://atomscan.com/img/icons/chains/luna2.png',
    [CHAIN_IDS.Persistence]: 'https://atomscan.com/img/icons/chains/xprt.png',
    [CHAIN_IDS.Canto]: 'https://atomscan.com/img/icons/chains/canto.png',
    [CHAIN_IDS.Cerberus]: '	https://atomscan.com/img/icons/chains/cerberus.png',
    [CHAIN_IDS.Chihuahua]: 'https://atomscan.com/img/icons/chains/huahua.png',
    [CHAIN_IDS.Comdex]: 'https://atomscan.com/img/icons/chains/cmdx.svg',
    [CHAIN_IDS.Coreum]: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/coreum/images/coreum.svg',
    [CHAIN_IDS.Cosmos]: 'https://atomscan.com/img/icons/chains/atom.svg',
    [CHAIN_IDS.Cronos]: 'https://atomscan.com/img/icons/chains/cro.png',
    [CHAIN_IDS.Crescent]: 'https://atomscan.com/img/icons/chains/crescent.svg',
    [CHAIN_IDS.Cudos]: 'https://atomscan.com/img/icons/chains/cudos.svg',
    [CHAIN_IDS.Desmos]: 'https://atomscan.com/img/icons/chains/desmos.svg',
    [CHAIN_IDS.Gitopia]: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/gitopia/images/lore.svg',
    [CHAIN_IDS["e-Money"]]: 'https://atomscan.com/img/icons/chains/emoney.png',
    [CHAIN_IDS.Evmos]: 'https://atomscan.com/img/icons/chains/evmos.svg',
    [CHAIN_IDS["Fetch.ai"]]: 'https://atomscan.com/img/icons/chains/fetch.png',
    [CHAIN_IDS["Gravity Bridge"]]: 'https://atomscan.com/img/icons/chains/grav.svg',
    [CHAIN_IDS.Injective]: 'https://atomscan.com/img/icons/chains/injective.png',
    [CHAIN_IDS.Starname]: 'https://atomscan.com/img/icons/chains/iov.png',
    [CHAIN_IDS["Iris Network"]]: 'https://atomscan.com/img/icons/chains/iris.svg',
    [CHAIN_IDS.IXO]: 'https://atomscan.com/img/icons/chains/ixo.png',
    [CHAIN_IDS["IXO V2"]]: 'https://atomscan.com/img/icons/chains/ixo.png',
    [CHAIN_IDS.Juno]: 'https://atomscan.com/img/icons/chains/juno.svg',
    [CHAIN_IDS.Kava]: 'https://atomscan.com/img/icons/chains/kava.png',
    [CHAIN_IDS.Konstellation]: 'https://atomscan.com/img/icons/chains/darc.svg',
    [CHAIN_IDS.Neutron]: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/neutron/images/ntrn.svg',
    [CHAIN_IDS.Kujira]: 'https://atomscan.com/img/icons/chains/kujira.png',
    [CHAIN_IDS.KYVE]: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/kyve/images/kyve.svg',
    [CHAIN_IDS["Ki-Chain"]]: 'https://atomscan.com/img/icons/chains/ki.svg',
    [CHAIN_IDS.LikeCoin]: 'https://atomscan.com/img/icons/chains/likecoin.svg',
    [CHAIN_IDS["Lum Network"]]: 'https://atomscan.com/img/icons/chains/lum.svg',
    [CHAIN_IDS.Mars]: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/mars/images/mars-token.svg',
    [CHAIN_IDS.Medibloc]: 'https://atomscan.com/img/icons/chains/medibloc.png',
    [CHAIN_IDS.Noble]: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/noble/images/stake.png',
    [CHAIN_IDS.Nyx]: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/nyx/images/nyx.png',
    [CHAIN_IDS.Osmosis]: 'https://atomscan.com/img/icons/chains/osmosis.svg',
    [CHAIN_IDS["OmniFlix Hub"]]: 'https://atomscan.com/img/icons/chains/omniflixhub.png',
    [CHAIN_IDS.Onomy]: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/onomy/images/nom.svg',
    [CHAIN_IDS.Passage]: 'https://atomscan.com/img/icons/chains/pasg.png',
    [CHAIN_IDS.Provenance]: 'https://atomscan.com/img/icons/chains/provenance.jpeg',
    [CHAIN_IDS.Quasar]: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/quasar/images/quasar.svg',
    [CHAIN_IDS.Quicksilver]: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/quicksilver/images/qck.png',
    [CHAIN_IDS["Quicksilver V2"]]: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/quicksilver/images/qck.png',
    [CHAIN_IDS["Regen Network"]]: 'https://atomscan.com/img/icons/chains/regen.png',
    [CHAIN_IDS.Rizon]: 'https://atomscan.com/img/icons/chains/rizon.png',
    [CHAIN_IDS["Secret Network"]]: 'https://atomscan.com/img/icons/chains/scrt.svg',
    [CHAIN_IDS.Sentinel]: 'https://atomscan.com/img/icons/chains/dvpn.png',
    [CHAIN_IDS.Shentu]: 'https://atomscan.com/img/icons/chains/certik.png',
    [CHAIN_IDS.Sifchain]: 'https://atomscan.com/img/icons/chains/sifchain.png',
    [CHAIN_IDS.Sommelier]: 'https://atomscan.com/img/icons/chains/sommelier.png',
    [CHAIN_IDS["StaFi Hub"]]: 'https://atomscan.com/img/icons/chains/stafihub.png',
    [CHAIN_IDS.Stargaze]: 'https://atomscan.com/img/icons/chains/stars.png',
    [CHAIN_IDS.Stride]: 'https://atomscan.com/img/icons/chains/strd.svg',
    [CHAIN_IDS.Tgrade]: 'https://atomscan.com/img/icons/chains/tgrade.svg',
    [CHAIN_IDS.Teritori]: 'https://atomscan.com/img/icons/chains/teritori.svg',
    [CHAIN_IDS.XPLA]: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/xpla/images/xpla.svg',
    [CHAIN_IDS.Umee]: 'https://atomscan.com/img/icons/chains/umee.png',
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
    [CHAIN_IDS.Neutron]: CHAIN_NAMES.Neutron,
    [CHAIN_IDS.Crescent]: CHAIN_NAMES.Crescent,
    [CHAIN_IDS.Gitopia]: CHAIN_NAMES.Gitopia,
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
    [CHAIN_IDS.Gitopia]: '/frontier/gitopia',
    [CHAIN_IDS.Cosmos]: '',
    [CHAIN_IDS.Cronos]: '/cronos',
    [CHAIN_IDS.Crescent]: '/crescent',
    [CHAIN_IDS.Neutron]: '/frontier/neutron',
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

export const getLedgerSigner = async (
    connector: Cosmos,
    accountInfo: RequestAccountResponse,
    chainId: string
) => {
    const signer: OfflineAminoSigner = {
        getAccounts: async () => {
            return [
                {
                    address: accountInfo.address,
                    pubkey: accountInfo.publicKey,
                    algo: 'secp256k1'
                }
            ]
        },
        signAmino: async (_, signDoc) => {
            const response = await connector.signAmino(
                chainId,
                signDoc as unknown as SignAminoDoc
            )

            return {
                signed: response.signed_doc,
                signature: {
                    pub_key: response.pub_key,
                    signature: response.signature
                }
            }
        }
    }
    return signer
}

const cosmostationSigner = async (chainId: string): Promise<OfflineSigner> => {
    const provider = await cosmos()
    const account = await provider.requestAccount(chainId)
    if (account.isLedger) {
        return getLedgerSigner(provider, account, chainId)
    }
    return getOfflineSigner(chainId);
}

export const getOfflineSignerByType = async (walletName: SUPPORTED_WALLET, chainId: string): Promise<OfflineSigner | undefined> => {
    if (walletName === SUPPORTED_WALLET.Keplr) {
        return await window.getOfflineSignerAuto(chainId);
    }
    if (walletName === SUPPORTED_WALLET.Cosmostation) {
        return cosmostationSigner(chainId)
    }
    return undefined
}
