export interface Root {
    blockerUserIds: any[];
    emailSchoolsProductUpdate: boolean;
    joinedClassroomIds: any[];
    hasFacebookId: boolean;
    trackingProperties: TrackingProperties;
    emailSchoolsPromotion: boolean;
    animationEnabled: boolean;
    totalXp: number;
    timezoneOffset: string;
    sessionCount: number;
    betaStatus: string;
    inviteURL: string;
    id: number;
    gemsConfig: GemsConfig;
    webNotificationIds: any[];
    emailClassroomJoin: boolean;
    lastResurrectionTimestamp: number;
    xpGains: XpGain[];
    blockedUserIds: any[];
    courses: Course[];
    emailClassroomLeave: boolean;
    emailAnnouncement: boolean;
    emailSchoolsNewsletter: boolean;
    weeklyXp: number;
    streak: number;
    creationDate: number;
    emailPass: boolean;
    emailSchoolsAnnouncement: boolean;
    enableMicrophone: boolean;
    acquisitionSurveyReason: string;
    name: string;
    emailEditSuggested: boolean;
    xpGoal: number;
    emailResearch: boolean;
    enableSoundEffects: boolean;
    optionalFeatures: OptionalFeature[];
    practiceReminderSettings: PracticeReminderSettings;
    emailFollow: boolean;
    rewardBundles: RewardBundle[];
    timezone: string;
    globalAmbassadorStatus: GlobalAmbassadorStatus;
    roles: string[];
    experiments: Experiments;
    emailWeeklyProgressReport: boolean;
    emailAssignmentComplete: boolean;
    emailPromotion: boolean;
    currentCourse: CurrentCourse;
    plusDiscounts: PlusDiscount[];
    emailEventsDigest: boolean;
    hasPlus: boolean;
    email: string;
    emailWeeklyReport: boolean;
    classroomLeaderboardsEnabled: boolean;
    persistentNotifications: string[];
    fromLanguage: string;
    observedClassroomIds: any[];
    adsConfig: AdsConfig;
    hasGoogleId: boolean;
    health: Health;
    emailStreamPost: boolean;
    referralInfo: ReferralInfo;
    privacySettings: string[];
    streakData: StreakData;
    picture: string;
    canUseModerationTools: boolean;
    emailVerified: boolean;
    currentCourseId: string;
    emailAssignment: boolean;
    lingots: number;
    monthlyXp: number;
    learningLanguage: string;
    enableSpeaker: boolean;
    username: string;
}

export interface TrackingProperties {
    disable_clubs: boolean;
    skill_tree_id: string;
    disable_social: boolean;
    notification_sms_enabled: boolean;
    has_item_weekend_amulet: boolean;
    beta_shake_to_report_enabled: any;
    creation_age: number;
    has_item_gold_subscription: boolean;
    creation_date_new: string;
    learning_language: string;
    has_item_streak_wager: boolean;
    disable_discussions: boolean;
    beta_enrollment_status: string;
    placement_depth: number;
    num_sessions_completed: number;
    goal: number;
    level: number;
    disable_friends_quests: boolean;
    disable_leaderboards: boolean;
    streak: number;
    acquisition_survey_reason: string;
    notification_wechat_enabled: boolean;
    disable_third_party_tracking: boolean;
    notification_whatsapp_enabled: boolean;
    has_item_immersive_subscription: boolean;
    gems: number;
    user_id: number;
    distinct_id: number;
    disable_personalized_ads: boolean;
    utc_offset: number;
    course_topic_id: string;
    has_picture: boolean;
    has_item_live_subscription: boolean;
    is_age_restricted: boolean;
    placement_section_index: number;
    num_followers: number;
    trial_account: boolean;
    prior_proficiency_onboarding: any;
    disable_stream: boolean;
    course_subject: string;
    has_item_premium_subscription: boolean;
    num_following: number;
    disable_kudos: boolean;
    direction: string;
    creation_date_millis: number;
    disable_profile_country: boolean;
    course_id: string;
    has_item_rupee_wager: boolean;
    num_item_streak_freeze: number;
    has_item_streak_freeze: boolean;
    learning_reason: string;
    disable_events: boolean;
    disable_mature_words: boolean;
    lingots: number;
    leaderboard_league: number;
    disable_immersion: boolean;
    username: string;
    ui_language: string;
}

export interface GemsConfig {
    gems: number;
    gemsPerSkill: number;
    useGems: boolean;
}

export interface XpGain {
    skillId?: string;
    xp: number;
    eventType?: string;
    time: number;
}

export interface Course {
    preload: boolean;
    placementTestAvailable: boolean;
    authorId: string;
    title: string;
    learningLanguage: string;
    xp: number;
    healthEnabled: boolean;
    fromLanguage: string;
    id: string;
    crowns: number;
}

export interface OptionalFeature {
    status: string;
    id: string;
}

export interface PracticeReminderSettings {
    ru: Ru;
    de: De;
    "nl-NL": NlNl;
    cs: Cs;
    ja: Ja;
    pl: Pl;
}

export interface Ru {
    timeInMinutes: number;
    pushEnabled: boolean;
    useSmartReminderTime: boolean;
    emailEnabled: boolean;
}

export interface De {
    timeInMinutes: number;
    pushEnabled: boolean;
    useSmartReminderTime: boolean;
    emailEnabled: boolean;
}

export interface NlNl {
    timeInMinutes: number;
    pushEnabled: boolean;
    useSmartReminderTime: boolean;
    emailEnabled: boolean;
}

export interface Cs {
    timeInMinutes: number;
    pushEnabled: boolean;
    useSmartReminderTime: boolean;
    emailEnabled: boolean;
}

export interface Ja {
    timeInMinutes: number;
    pushEnabled: boolean;
    useSmartReminderTime: boolean;
    emailEnabled: boolean;
}

export interface Pl {
    timeInMinutes: number;
    pushEnabled: boolean;
    useSmartReminderTime: boolean;
    emailEnabled: boolean;
}

export interface RewardBundle {
    rewards: Reward[];
    id: string;
    empty: boolean;
    rewardBundleType: string;
}

export interface Reward {
    tags: any[];
    consumed: boolean;
    rewardType: string;
    currency?: string;
    amount?: number;
    id: string;
    itemId?: string;
    items?: Item[];
}

export interface Item {
    count: number;
    itemType: string;
}

export interface GlobalAmbassadorStatus {}

export interface Experiments {
    path_web_persistent_headers_redesign: PathWebPersistentHeadersRedesign;
    path_web_sections_overview: PathWebSectionsOverview;
    spack_web_5xp_g_practice: SpackWeb5xpGPractice;
    spack_web_animation_checklist: SpackWebAnimationChecklist;
    tsl_web_tournament_fetch_data: TslWebTournamentFetchData;
    spack_web_copysolidate_hearts: SpackWebCopysolidateHearts;
    designsys_web_redesign_settings_page: DesignsysWebRedesignSettingsPage;
    connect_web_migrate_to_feed_service: ConnectWebMigrateToFeedService;
    path_web_remove_about_course_page: PathWebRemoveAboutCoursePage;
    retention_web_streak_earnback_challenge_v2: RetentionWebStreakEarnbackChallengeV2;
    minfra_web_stripe_setup_intent: MinfraWebStripeSetupIntent;
    path_web_hover: PathWebHover;
    spack_web_animation_longscroll: SpackWebAnimationLongscroll;
    connect_friends_quests_gifting_2: ConnectFriendsQuestsGifting2;
    path_web_duoradio_audio_controls_redesign_v2: PathWebDuoradioAudioControlsRedesignV2;
    spack_web_super_promo_d12_pf2_v2: SpackWebSuperPromoD12Pf2V2;
    gweb_diamond_tournament_dogfooding: GwebDiamondTournamentDogfooding;
    spack_web_upgrade_flow: SpackWebUpgradeFlow;
    path_web_course_complete_slides: PathWebCourseCompleteSlides;
    connect_enable_social_underage_v2: ConnectEnableSocialUnderageV2;
    spack_web_hearts_on_off: SpackWebHeartsOnOff;
    spack_web_fp_upgrade_hook: SpackWebFpUpgradeHook;
    path__web_gpt_info_stories: PathWebGptInfoStories;
    path_web_smec: PathWebSmec;
    tsl_web_tournament_port: TslWebTournamentPort;
    retention_web_fix_lapsed_banner_shows: RetentionWebFixLapsedBannerShows;
    path_web_example_sentences_with_transliterations: PathWebExampleSentencesWithTransliterations;
    spack_web_copysolidate_super_longscroll: SpackWebCopysolidateSuperLongscroll;
    spack_web_super_promo_d12_ft_ineligible: SpackWebSuperPromoD12FtIneligible;
}

export interface PathWebPersistentHeadersRedesign {
    name: string;
    eligible: boolean;
    contexts: any[];
    treated: boolean;
    condition: string;
    destiny: string;
}

export interface PathWebSectionsOverview {
    name: string;
    eligible: boolean;
    contexts: any[];
    treated: boolean;
    condition: string;
    destiny: string;
}

export interface SpackWeb5xpGPractice {
    name: string;
    eligible: boolean;
    contexts: any[];
    treated: boolean;
    condition: string;
    destiny: string;
}

export interface SpackWebAnimationChecklist {
    name: string;
    eligible: boolean;
    contexts: any[];
    treated: boolean;
    condition: string;
    destiny: string;
}

export interface TslWebTournamentFetchData {
    name: string;
    eligible: boolean;
    contexts: any[];
    treated: boolean;
    condition: string;
    destiny: string;
}

export interface SpackWebCopysolidateHearts {
    name: string;
    eligible: boolean;
    contexts: any[];
    treated: boolean;
    condition: string;
    destiny: string;
}

export interface DesignsysWebRedesignSettingsPage {
    name: string;
    eligible: boolean;
    contexts: any[];
    treated: boolean;
    condition: string;
    destiny: string;
}

export interface ConnectWebMigrateToFeedService {
    name: string;
    eligible: boolean;
    contexts: any[];
    treated: boolean;
    condition: string;
    destiny: string;
}

export interface PathWebRemoveAboutCoursePage {
    name: string;
    eligible: boolean;
    contexts: any[];
    treated: boolean;
    condition: string;
    destiny: string;
}

export interface RetentionWebStreakEarnbackChallengeV2 {
    name: string;
    eligible: boolean;
    contexts: any[];
    treated: boolean;
    condition: string;
    destiny: string;
}

export interface MinfraWebStripeSetupIntent {
    name: string;
    eligible: boolean;
    contexts: any[];
    treated: boolean;
    condition: string;
    destiny: string;
}

export interface PathWebHover {
    name: string;
    eligible: boolean;
    contexts: any[];
    treated: boolean;
    condition: string;
    destiny: string;
}

export interface SpackWebAnimationLongscroll {
    name: string;
    eligible: boolean;
    contexts: any[];
    treated: boolean;
    condition: string;
    destiny: string;
}

export interface ConnectFriendsQuestsGifting2 {
    name: string;
    eligible: boolean;
    contexts: string[];
    treated: boolean;
    condition: string;
    destiny: string;
}

export interface PathWebDuoradioAudioControlsRedesignV2 {
    name: string;
    eligible: boolean;
    contexts: any[];
    treated: boolean;
    condition: string;
    destiny: string;
}

export interface SpackWebSuperPromoD12Pf2V2 {
    name: string;
    eligible: boolean;
    contexts: any[];
    treated: boolean;
    condition: string;
    destiny: string;
}

export interface GwebDiamondTournamentDogfooding {
    name: string;
    eligible: boolean;
    contexts: any[];
    treated: boolean;
    condition: string;
    destiny: string;
}

export interface SpackWebUpgradeFlow {
    name: string;
    eligible: boolean;
    contexts: any[];
    treated: boolean;
    condition: string;
    destiny: string;
}

export interface PathWebCourseCompleteSlides {
    name: string;
    eligible: boolean;
    contexts: any[];
    treated: boolean;
    condition: string;
    destiny: string;
}

export interface ConnectEnableSocialUnderageV2 {
    name: string;
    eligible: boolean;
    contexts: any[];
    treated: boolean;
    condition: string;
    destiny: string;
}

export interface SpackWebHeartsOnOff {
    name: string;
    eligible: boolean;
    contexts: any[];
    treated: boolean;
    condition: string;
    destiny: string;
}

export interface SpackWebFpUpgradeHook {
    name: string;
    eligible: boolean;
    contexts: any[];
    treated: boolean;
    condition: string;
    destiny: string;
}

export interface PathWebGptInfoStories {
    name: string;
    eligible: boolean;
    contexts: any[];
    treated: boolean;
    condition: string;
    destiny: string;
}

export interface PathWebSmec {
    name: string;
    eligible: boolean;
    contexts: any[];
    treated: boolean;
    condition: string;
    destiny: string;
}

export interface TslWebTournamentPort {
    name: string;
    eligible: boolean;
    contexts: any[];
    treated: boolean;
    condition: string;
    destiny: string;
}

export interface RetentionWebFixLapsedBannerShows {
    name: string;
    eligible: boolean;
    contexts: any[];
    treated: boolean;
    condition: string;
    destiny: string;
}

export interface PathWebExampleSentencesWithTransliterations {
    name: string;
    eligible: boolean;
    contexts: any[];
    treated: boolean;
    condition: string;
    destiny: string;
}

export interface SpackWebCopysolidateSuperLongscroll {
    name: string;
    eligible: boolean;
    contexts: any[];
    treated: boolean;
    condition: string;
    destiny: string;
}

export interface SpackWebSuperPromoD12FtIneligible {
    name: string;
    eligible: boolean;
    contexts: any[];
    treated: boolean;
    condition: string;
    destiny: string;
}

export interface CurrentCourse {
    assignments: any[];
    progressVersion: number;
    managedInHouse: boolean;
    subject: string;
    pathSectioned: PathSectioned[];
    activePathSectionId: string;
    smartTips: any[];
    title: string;
    preload: boolean;
    trackingProperties: TrackingProperties2;
    placementDepth: any;
    ttsAccents: any;
    alphabetsPathProgressKey: any;
    numberOfWords: number;
    skills: Skill[][];
    path: any[];
    numberOfSentences: number;
    id: string;
    fromLanguage: string;
    wordsLearned: number;
    fluency: any;
    authorId: string;
    finalCheckpointSession: string;
    pathDetails: PathDetails;
    storiesTabPromotionLocation: any;
    sections: Section[];
    sideQuestProgress: SideQuestProgress;
    inLessonAvatars: any[];
    placementTestAvailable: boolean;
    learningLanguage: string;
    crowns: number;
    extraCrowns: number;
    xp: number;
    topic: string;
    healthEnabled: boolean;
    pathExperiments: string[];
    pathSectionsSummary: PathSectionsSummary[];
    checkpointTests: any[];
    status: string;
}

export interface PathSectioned {
    index: number;
    debugName: string;
    type: string;
    completedUnits: number;
    totalUnits: number;
    units: Unit[];
    cefr: any;
    summary?: Summary;
    exampleSentence: any;
}

export interface Unit {
    unitIndex: number;
    levels: Level[];
    guidebook?: Guidebook;
    teachingObjective?: string;
    cefrLevel: any;
}

export interface Level {
    id: string;
    state: string;
    finishedSessions: number;
    pathLevelMetadata: PathLevelMetadata;
    pathLevelClientData: PathLevelClientData;
    totalSessions: number;
    debugName: string;
    hasLevelReview: boolean;
    type: string;
    subtype: string;
    isInProgressSequence: boolean;
    dailyRefreshInfo?: DailyRefreshInfo;
}

export interface PathLevelMetadata {
    skillId?: string;
    crownLevelIndex?: number;
    anchorSkillId?: string;
    indexSinceAnchorSkill?: number;
    treeId?: string;
    unitIndex?: number;
    skillIds?: string[];
}

export interface PathLevelClientData {
    skillId?: string;
    crownLevelIndex?: number;
    hardModeLevelIndex?: number;
    teachingObjective?: string;
    assignmentInfo: any;
    skillIds?: string[];
    isPathExtension?: boolean;
    unitIndex?: number;
    numberOfLegendarySessions?: number;
    dailyRefreshIndex?: number;
    expiresAt?: number;
}

export interface DailyRefreshInfo {
    nodeIndex: number;
    expiresAt: number;
}

export interface Guidebook {
    url: string;
}

export interface Summary {
    grammarConceptUrl: string;
    cefrContentUrl: any;
}

export interface TrackingProperties2 {
    direction: string;
    learning_language: string;
    ui_language: string;
    max_cefr_level: any;
    max_tree_level: number;
    max_section_index: number;
    skill_tree_id: string;
    took_placementtest: boolean;
    course_subject: string;
    course_topic_id: string;
    course_id: string;
    path_position_active_node_index: number;
    path_position_active_unit_index: number;
    path_position_active_section_index: number;
    path_position_active_section_cefr: any;
    path_uses_unit_vision: boolean;
}

export interface Skill {
    accessible?: boolean;
    experimentIds: any[];
    experimentalLessons: any[];
    finalLevelTimeLimit: number;
    finishedLessons: number;
    finishedLevels: number;
    hasLevelReview: boolean;
    hasFinalLevel: boolean;
    iconId: number;
    id: string;
    lastLessonPerfect: boolean;
    lessons: number;
    levels: number;
    name: string;
    perfectLessonStreak: number;
    shortName: string;
    skillType: string;
    strength: any;
    tipsAndNotes?: string;
    urlName: string;
    bonus?: boolean;
}

export interface PathDetails {
    notifications: any[];
    clientNotifications: any[];
}

export interface Section {
    checkpointAccessible: boolean;
    checkpointFinished: boolean;
    checkpointSessionType: string;
    masteryScore: any;
    name: string;
    numRows: number;
    summary: any;
    cefrLevel: any;
}

export interface SideQuestProgress {
    "22": N22;
    "21": N21;
    "34": N34;
}

export interface N22 {
    starsEarned: number;
}

export interface N21 {
    starsEarned: number;
}

export interface N34 {
    starsEarned: number;
}

export interface PathSectionsSummary {
    id: string;
    index: number;
    debugName: string;
    type: string;
    completedLevels: CompletedLevels;
    totalLevels: TotalLevels;
    completedUnits: number;
    totalUnits: number;
    totalLevelsPerUnit: number[];
    completedLevelsPerUnit: number[];
    cefr: any;
    summary?: Summary2;
    exampleSentence: any;
    firstUnitTestNode?: FirstUnitTestNode;
    lastUnitReviewNode?: LastUnitReviewNode;
}

export interface CompletedLevels {
    skill?: number;
    practice?: number;
    chest?: number;
    unit_review?: number;
}

export interface TotalLevels {
    skill?: number;
    practice: number;
    chest?: number;
    unit_review: number;
}

export interface Summary2 {
    grammarConceptUrl: string;
    cefrContentUrl: any;
}

export interface FirstUnitTestNode {
    id: string;
    state: string;
    finishedSessions: number;
    pathLevelMetadata: PathLevelMetadata2;
    pathLevelClientData: PathLevelClientData2;
    totalSessions: number;
    debugName: string;
    hasLevelReview: boolean;
    type: string;
    subtype: string;
    isInProgressSequence: boolean;
    dailyRefreshInfo: any;
}

export interface PathLevelMetadata2 {
    unitIndex: number;
}

export interface PathLevelClientData2 {
    unitIndex: number;
    skillIds: string[];
    numberOfLegendarySessions: number;
    skillId?: string;
    crownLevelIndex?: number;
    assignmentInfo: any;
}

export interface LastUnitReviewNode {
    id: string;
    state: string;
    finishedSessions: number;
    pathLevelMetadata: PathLevelMetadata3;
    pathLevelClientData: PathLevelClientData3;
    totalSessions: number;
    debugName: string;
    hasLevelReview: boolean;
    type: string;
    subtype: string;
    isInProgressSequence: boolean;
    dailyRefreshInfo: any;
}

export interface PathLevelMetadata3 {
    unitIndex: number;
    anchorSkillId?: string;
    indexSinceAnchorSkill?: number;
}

export interface PathLevelClientData3 {
    skillIds: string[];
}

export interface PlusDiscount {
    secondsUntilExpiration: number;
    discountType: string;
}

export interface AdsConfig {
    units: Units;
    allowPersonalizedAds: boolean;
}

export interface Units {}

export interface Health {
    maxHearts: number;
    eligibleForFreeRefill: boolean;
    healthEnabled: boolean;
    secondsPerHeartSegment: number;
    unlimitedHeartsAvailable: boolean;
    hearts: number;
    secondsUntilNextHeartSegment: any;
    useHealth: boolean;
}

export interface ReferralInfo {
    inviterName: any;
    isEligibleForOffer: boolean;
    unconsumedInviteeName: any;
    unconsumedInviteeIds: any[];
    numBonusesReady: number;
    hasReachedCap: boolean;
    isEligibleForBonus: boolean;
}

export interface StreakData {
    currentStreak: CurrentStreak;
    previousStreak: PreviousStreak;
    longestStreak: LongestStreak;
}

export interface CurrentStreak {
    endDate: string;
    length: number;
    lastExtendedDate: string;
    startDate: string;
}

export interface PreviousStreak {
    endDate: string;
    length: number;
    lastExtendedDate: string;
    startDate: string;
}

export interface LongestStreak {
    endDate: string;
    length: number;
    achieveDate: string;
    startDate: string;
}
