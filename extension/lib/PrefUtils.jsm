const { utils: Cu } = Components;
Cu.import("resource://gre/modules/Services.jsm");

const EXPIRATION_DATE_PREF = "extensions.pioneer-online-news-patch.expirationDate";


const PrefUtils = {
  setLongPref(name, value) {
    return Services.prefs.setCharPref(name, `${value}`);
  },

  getLongPref(name, defaultValue) {
    return parseInt(Services.prefs.getCharPref(name, `${defaultValue}`), 10);
  },

  setExpiryDate(value) {
    this.setLongPref(EXPIRATION_DATE_PREF, value);
  },

  getExpiryDate() {
    return this.getLongPref(EXPIRATION_DATE_PREF, 0);
  }
};

this.EXPORTED_SYMBOLS = ["PrefUtils"];
