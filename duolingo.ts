import { DB } from "./data";
import { DuoApiResponse } from "./types";

type StreakInfo = {
    endDate: string;
    startDate: string;
    length: number;
    lastExtendedDate?: string;
    achieveDate?: string;
};

const CACHE_TIMEOUT_MINUTES = 5;

export async function getCachedDuoData(
    userId: string
): Promise<[Date, DuoApiResponse] | undefined> {
    const { client } = await DB();

    // Check if the user has a cached version
    const cachedData = await client.hGet("duoData", userId);
    const lastUpdated = await client.hGet("duoDataTimestamp", userId);
    if (cachedData && lastUpdated) {
        return [new Date(lastUpdated), JSON.parse(cachedData)];
    }
}

export async function getAllCachedUserData(): Promise<{
    [id: string]: { timestamp: Date; duo: DuoApiResponse };
}> {
    const { client } = await DB();

    const allData = await client.hGetAll("duoData");
    const allTimestamps = await client.hGetAll("duoDataTimestamp");

    return Object.fromEntries(
        Object.entries(allData)
            .filter(([id, data]) => data && JSON.parse(data) !== undefined)
            .map(([id, data], i) => {
                return [
                    id,
                    {
                        timestamp: new Date(allTimestamps[id]),
                        duo: JSON.parse(data),
                    },
                ];
            })
    );
}

/**
 *
 * @param userData The data you got from getDuoData
 * @param size One of the following: "xlarge" (200x200), "xxlarge" (1000x1000), "large" (90x90), "medium" (48x48), "small" (24x24)
 */
export function getAvatarUrl(
    userData: DuoApiResponse,
    size: "small" | "medium" | "large" | "xlarge" | "xxlarge" = "large"
) {
    return "https:" + userData.picture + `/${size}`;
}

export async function imageUrlToDataUrl(url: string) {
    const res = await fetch(url);

    if (!res.ok) {
        throw new Error("Failed to fetch image");
    }

    const blob = await res.arrayBuffer();

    const buffer = Buffer.from(blob);

    return `data:${res.headers.get("content-type")};base64,${buffer.toString(
        "base64"
    )}`;
}

export async function getDuoData(userId: string): Promise<DuoApiResponse> {
    const { client } = await DB();

    // Check if the user has a cached version
    const cachedData = await client.hGet("duoData", userId);
    const lastUpdated = await client.hGet("duoDataTimestamp", userId);
    if (cachedData && lastUpdated) {
        const lastUpdatedDate = new Date(lastUpdated);
        const now = new Date();
        const diff = Math.floor(
            (now.getTime() - lastUpdatedDate.getTime()) / (1000 * 60)
        );
        if (diff < CACHE_TIMEOUT_MINUTES) {
            return JSON.parse(cachedData);
        }
    }

    // If the data is not cached, fetch it
    const duoData = await fetch(
        `https://www.duolingo.com/2017-06-30/users/${userId}?fields=acquisitionSurveyReason,adsConfig,animationEnabled,betaStatus,blockedUserIds,blockerUserIds,canUseModerationTools,classroomLeaderboardsEnabled,courses,creationDate,currentCourseId,email,emailAnnouncement,emailAssignment,emailAssignmentComplete,emailClassroomJoin,emailClassroomLeave,emailEditSuggested,emailEventsDigest,emailFollow,emailPass,emailPromotion,emailResearch,emailWeeklyProgressReport,emailSchoolsAnnouncement,emailSchoolsNewsletter,emailSchoolsProductUpdate,emailSchoolsPromotion,emailStreamPost,emailVerified,emailWeeklyReport,enableMicrophone,enableSoundEffects,enableSpeaker,experiments{connect_enable_social_underage_v2,connect_friends_quests_gifting_2,connect_web_migrate_to_feed_service,designsys_web_redesign_settings_page,gweb_diamond_tournament_dogfooding,minfra_web_stripe_setup_intent,path__web_gpt_info_stories,path_web_course_complete_slides,path_web_duoradio_audio_controls_redesign_v2,path_web_example_sentences_with_transliterations,path_web_hover,path_web_persistent_headers_redesign,path_web_remove_about_course_page,path_web_sections_overview,path_web_smec,retention_web_fix_lapsed_banner_shows,retention_web_streak_earnback_challenge_v2,spack_web_5xp_g_practice,spack_web_animation_checklist,spack_web_animation_longscroll,spack_web_copysolidate_hearts,spack_web_copysolidate_super_longscroll,spack_web_fp_upgrade_hook,spack_web_hearts_on_off,spack_web_super_promo_d12_ft_ineligible,spack_web_super_promo_d12_pf2_v2,spack_web_upgrade_flow,tsl_web_tournament_fetch_data,tsl_web_tournament_port},facebookId,fromLanguage,gemsConfig,globalAmbassadorStatus,googleId,hasFacebookId,hasGoogleId,hasPlus,health,id,inviteURL,joinedClassroomIds,lastResurrectionTimestamp,learningLanguage,lingots,location,monthlyXp,name,observedClassroomIds,optionalFeatures,persistentNotifications,picture,plusDiscounts,practiceReminderSettings,privacySettings,referralInfo,rewardBundles,roles,sessionCount,streak,streakData{currentStreak,longestStreak,previousStreak},timezone,timezoneOffset,totalXp,trackingProperties,username,webNotificationIds,weeklyXp,xpGains,xpGoal,zhTw,currentCourse&_=1714854814337`
    ).then((res) => {
        if (!res.ok) {
            throw new Error("Failed to fetch data");
        }
        if (!res.headers.get("content-type")?.includes("application/json")) {
            throw new TypeError("Invalid data");
        }
        if (res.status !== 200) {
            throw new Error("Invalid status code");
        }
        return res.json() as Promise<DuoApiResponse>;
    });

    // Cache the data
    await client.hSet("duoData", userId, JSON.stringify(duoData));
    await client.hSet("duoDataTimestamp", userId, new Date().toISOString());

    return duoData;
}

export function calcStreakFreezes(streakInfo: StreakInfo) {
    const start = new Date(streakInfo.startDate);
    const now = new Date();
    const diff = Math.floor(
        (now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
    );
    return diff - streakInfo.length + 1;
}

export function hasDoneDuolingoToday(streakInfo: StreakInfo) {
    if (!streakInfo) return false;

    const today = new Date();
    const streakEnd = new Date(streakInfo.endDate);
    // If the streak end is today, then the user has done Duolingo today
    return streakEnd.toDateString() === today.toDateString();
}

export async function getAllUserData(
    userIds?: string[]
): Promise<{ id: string; duo: DuoApiResponse }[]> {
    const db = await DB();
    const users = await db.getUsers();
    return await Promise.allSettled(
        Object.entries(users).map(async (entry) => {
            const [id, user] = entry;
            const duoData = user.duoData;
            if (!duoData) return;

            // Get the streak data
            const streakData = await getDuoData(duoData.id);
            return { id, duo: streakData };
        })
    )
        .then((results) =>
            results.map((result) => {
                if (result.status === "fulfilled") return result.value;
            })
        )
        .then(
            (results) =>
                results.filter(
                    (result) => result && result.duo !== undefined
                ) as { id: string; duo: DuoApiResponse }[]
        );
}
