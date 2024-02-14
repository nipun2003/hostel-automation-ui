const env = import.meta.env;
const conf = {
    appWriteUrl: String(env.VITE_APPWRITE_URL),
    appWriteProjectId: String(env.VITE_APPWRITE_PROJECT_ID),
    appWriteDatabaseId: String(env.VITE_APPWRITE_DATABASE_ID),
    appWriteStudentCollectionId: String(env.VITE_APPWRITE_STUDENT_COLLECTION_ID),
    serverBaseUrl : String(env.VITE_SERVER_URL),
    siteTitle: String(env.VITE_SITE_TITLE),
    siteUrl: String(env.VITE_SITE_URL),
};
export default conf;