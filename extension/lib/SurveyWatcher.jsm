const { utils: Cu } = Components;
Cu.import("resource://gre/modules/Services.jsm");
Cu.import("resource://gre/modules/XPCOMUtils.jsm");

XPCOMUtils.defineLazyModuleGetter(
  this, "ActiveURIService", "resource://pioneer-online-news-survey-fix/lib/ActiveURIService.jsm"
);
XPCOMUtils.defineLazyModuleGetter(
  this, "State", "resource://pioneer-online-news-survey-fix/lib/State.jsm"
);
XPCOMUtils.defineLazyModuleGetter(
  this, "StudyAddonManager", "resource://pioneer-online-news-survey-fix/lib/StudyAddonManager.jsm"
);

this.EXPORTED_SYMBOLS = ["SurveyWatcher"];


this.SurveyWatcher = {
  startup() {
    ActiveURIService.addObserver(this);
  },

  endSurvey() {
    const state = State.load();
    state.promptsRemaining[state.phaseName] = 0;
    State.save(state);
  },

  async onFocusURI(data) {
    const isStudyInstalled = await StudyAddonManager.isInstalled();
    if (isStudyInstalled && data.uri && this.uriMatchesSurveyURL(data.uri)) {
      this.endSurvey();
    }
  },

  uriMatchesSurveyURL(uri) {
    const state = State.load();
    const { surveyURL } = Config.phases[state.phaseName];
    return uri.spec.startsWith(surveyURL);
  },

  observe(subject, topic, data) {
    switch (topic) {
      case "uriFocused":
        this.onFocusURI(data);
        break;
    }
  },
};
