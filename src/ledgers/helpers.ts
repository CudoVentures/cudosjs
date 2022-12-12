import { detect as detectBrowser } from 'detect-browser'

import {
    SUPPORTED_BROWSER,
    SUPPORTED_EXTENSIONS,
    SUPPORTED_WALLET
} from './constants'

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
