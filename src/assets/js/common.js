import axios from 'axios'

export const token = {
    async getToken () {
        let getToken = ''

        const parameter = {
            grant_type:"client_credentials",
            client_id: process.env.VUE_APP_CLIENT_ID,
            client_secret: process.env.VUE_APP_CLIENT_SECRET
        }
        const config = {
            method: 'post',
            url: process.env.VUE_APP_TDX_TOKEN_URL,
            data: parameter,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        };

        await axios(config)
            .then(function (response) {
                getToken = response.data.access_token
            })
            .catch(function (error) {
                console.error('getToken 發生錯誤', error);
            });

        return getToken
    },
}