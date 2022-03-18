export const pageview = (url) => {
    if (window && window.gtag) {
        window.gtag('config', 'G-HM718Q7C20', {
            page_path: url,
        })
    }
}

export const event = ({ action, params }) => {
    window.gtag('event', action, params)
}