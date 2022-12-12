export enum SUPPORTED_WALLET {
    Keplr = 'Keplr',
    Cosmostation = 'Cosmostation'
}

export enum SUPPORTED_BROWSER {
    chrome = 'chrome',
    firefox = 'firefox',
    edge = 'edge',
}

export const SUPPORTED_EXTENSIONS: WALLET_EXTENSION = {
    [SUPPORTED_WALLET.Keplr]: {
        URL: {
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
