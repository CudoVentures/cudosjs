import { CudosNetworkConsts } from '../utils';
import { detect as detectBrowser } from 'detect-browser';
import { decodeSignature, StdSignature } from '../amino';
import { verifyADR36Amino } from '@keplr-wallet/cosmos';

declare let window: {
    keplr: any;
    cosmostation: any;
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
