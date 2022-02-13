const axios = require("axios");

const getPriceConvert = async (pairConvert) => {
    try {
        const price = cache.get(pairConvert);
        if (!price) {
            const res = await axios.get(
                process.env.APICONVERT + "/convert?q=" + pairConvert + "&apiKey=" + process.env.APICONVERTKEY
            );

            if (!res.data.results) {
                return { error: res.error };
            } else {
                const priceResult = res.data.results[pairConvert];
                cache.set(pairConvert, priceResult.val)
                return priceResult.val;
            }
        }
        return price;
    } catch (err) {
        return { error: err };
    }
};
module.exports = {
    getPriceConvert
};