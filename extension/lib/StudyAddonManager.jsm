const { utils: Cu } = Components;
Cu.import("resource://gre/modules/Services.jsm");
Cu.import("resource://gre/modules/XPCOMUtils.jsm");

XPCOMUtils.defineLazyModuleGetter(
  this, "AddonManager", "resource://gre/modules/AddonManager.jsm"
);
XPCOMUtils.defineLazyModuleGetter(
  this, "Config", "resource://pioneer-online-news-survey-fix/Config.jsm"
);
XPCOMUtils.defineLazyModuleGetter(
  this, "PrefUtils", "resource://pioneer-online-news-survey-fix/lib/PrefUtils.jsm"
);

this.EXPORTED_SYMBOLS = ["StudyAddonManager"];

const STUDY_ADDON_ID = "pioneer-study-online-news@pioneer.mozilla.org";
const EXPIRATION_DATE_PREF = "extensions.pioneer-online-news.expirationDate";


this.StudyAddonManager = {
  async startup() {
    const isEligible = await this.isUserOptedIn();
    if (!isEligible) {
      this.uninstall();
      return;
    }

    let expirationDate = PrefUtils.getLongPref(EXPIRATION_DATE_PREF, 0);

    // Check if the study has expired
    if (expirationDate && Date.now() > expirationDate) {
      this.uninstall();
      return;
    }
  },

  isShieldEnabled() {
    return Services.prefs.getBoolPref("app.shield.optoutstudies.enabled", true);
  },

  async isUserOptedIn() {
    const addon = await AddonManager.getAddonByID("pioneer-opt-in@mozilla.org");
    return this.isShieldEnabled() && addon !== null && addon.isActive;
  },

  async isInstalled() {
    const addon = await AddonManager.getAddonByID(STUDY_ADDON_ID);
    return !!addon;
  },

  async uninstall() {
    const studyAddon = await AddonManager.getAddonByID(STUDY_ADDON_ID);
    if (studyAddon) {
      studyAddon.uninstall();
    }
    const selfAddon = await AddonManager.getAddonByID(Config.addonId);
    if (selfAddon) {
      selfAddon.uninstall();
    }
  },
};
