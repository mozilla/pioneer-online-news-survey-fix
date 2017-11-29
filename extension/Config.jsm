const { utils: Cu } = Components;
Cu.import("resource://gre/modules/Services.jsm");
Cu.import("resource://gre/modules/XPCOMUtils.jsm");

const EXPORTED_SYMBOLS = ["Config"];

const PRETREATMENT_DURATION_PREF = "extensions.pioneer-online-news.preTreatmentDuration";
const TREATMENT_DURATION_PREF = "extensions.pioneer-online-news.treatmentDuration";
const POSTTREATMENT_DURATION_PREF = "extensions.pioneer-online-news.postTreatmentDuration";
const POSTSTUDY_DURATION_PREF = "extensions.pioneer-online-news.postStudyDuration";
const UPDATE_TIMER_PREF = "extensions.pioneer-online-news.updateTimerInterval";

const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const WEEK = 7 * DAY;

const Config = {
  addonId: "pioneer-online-news-survey-fix@pioneer.mozilla.org",

  updateTimerInterval: Services.prefs.getIntPref(UPDATE_TIMER_PREF, 1 * DAY),

  firstPhase: "preTreatment",

  phases: {
    preTreatment: {
      duration: Services.prefs.getIntPref(PRETREATMENT_DURATION_PREF, 3 * WEEK),
      next: "treatment",
      surveyURL: "https://qsurvey.mozilla.com/s3/Pioneer-Online-News-Wave-1",
    },

    treatment: {
      duration: Services.prefs.getIntPref(TREATMENT_DURATION_PREF, 3 * WEEK),
      next: "postTreatment",
      surveyURL: "https://qsurvey.mozilla.com/s3/Pioneer-Online-News-Wave-2",
      treatment: true,
    },

    postTreatment: {
      duration: Services.prefs.getIntPref(POSTTREATMENT_DURATION_PREF, 3 * WEEK),
      next: "postStudy",
      surveyURL: "https://qsurvey.mozilla.com/s3/Pioneer-Online-News-Wave-3",
    },

    postStudy: {
      duration: Services.prefs.getIntPref(POSTSTUDY_DURATION_PREF, 1 * WEEK),
      surveyOnly: true,
      next: "studyEnd",
      surveyURL: "https://qsurvey.mozilla.com/s3/Pioneer-Online-News-Wave-4",
    },

    studyEnd: {
      lastPhase: true,
    }
  }
};
