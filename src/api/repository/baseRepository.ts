class BaseRepository {
    getBaseUrl() {
        return process.env.NEXT_PUBLIC_BASE_URI;
    }
}
export default BaseRepository;
