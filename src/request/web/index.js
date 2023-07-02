import server from "../index.js";

export const getAll = (data = null) => {
    return server.get('/no/web', {
        params: data
    })
}

export const getWebInfo = (webFeedUrl) => {
    return server.post('/web/info', {
        webUrl: webFeedUrl
    })
}

export const createWebSite = (web) => {
    return server.post('/web/create', {
        title: web.title,
        url: web.url,
        feedUrl: web.feedUrl,
        description: web.description
    })
}

export const getDeeds = () => {
    return server.get('/web/deeds')
}

export const getWebByNum = (num) => {
    return server.get(`/no/web/${num}`)
}

export const getAllFeeds = (data = null) => {
    return server.get('/no/feeds', {
        params: data
    })
}

export const search = (data) => {
    return server.post('/no/search',{
        search:data
    })
}
