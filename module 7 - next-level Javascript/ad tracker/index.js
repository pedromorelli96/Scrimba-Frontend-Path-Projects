const adData = {
    facebook: {
        site: "Facebook",
        adViews: 23477,
        clicks: 210,
        conversions: 5,
    },
    twitter: {
        site: "Twitter",
        adViews: 13904,
        clicks: 192,
        conversions: 9,
    },
    instagram: {
        site: "Instagram",
        adViews: 3256,
        clicks: 200,
        conversions: 2,
    },
};

class AdvertisingChannel {
    constructor(data) {
        Object.assign(this, data);
        this.conversionRate = ((this.conversions / this.clicks) * 100).toFixed(
            1
        );
    }
    getAdvertisingChannelHtml() {
        const { site, adViews, clicks, conversions, conversionRate } = this;
        return `
            <div class="site-name"> ${site} </div>
            <div>Views: ${adViews} </div>
            <div>Clicks: ${clicks} </div>
            <div>Conversions: ${conversions} </div>
            <div>Conv. Rate: <span class="highlight"> ${conversionRate} %</span></div> 
        `;
    }
}

const facebook = new AdvertisingChannel(adData.facebook);
const twitter = new AdvertisingChannel(adData.twitter);
const instagram = new AdvertisingChannel(adData.instagram);

document.getElementById("fb").innerHTML = facebook.getAdvertisingChannelHtml();
document.getElementById("twit").innerHTML = twitter.getAdvertisingChannelHtml();
document.getElementById("insta").innerHTML =
    instagram.getAdvertisingChannelHtml();
