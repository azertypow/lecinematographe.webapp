const PROXY_HOST = 'https://images.weserv.nl';

export function proxyUrl(imageUrl: string, maxWidth: number | null = null, maxHeight: number | null = null, output = 'jpg') {
    const url = new URL(PROXY_HOST);

    const params = new URLSearchParams({
        url: imageUrl,
        output,
        w: maxWidth ? maxWidth.toString() : 'null',
        h: maxHeight ? maxHeight.toString() : 'null',
        q: (70).toString(),
        fit: 'outside'
    });

    return `${url.protocol}//${url.hostname}${url.pathname}?${params.toString()}`
}
