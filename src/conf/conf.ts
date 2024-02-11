const env = import.meta.env;
const conf = {
    appWriteUrl: String(env.VITE_APPWRITE_URL),
    appWriteProjectId: String(env.VITE_APPWRITE_PROJECT_ID),
    appWriteDatabaseId: String(env.VITE_APPWRITE_DATABASE_ID),
    appWriteStudentCollectionId: String(env.VITE_APPWRITE_STUDENT_COLLECTION_ID),
};
export default conf;