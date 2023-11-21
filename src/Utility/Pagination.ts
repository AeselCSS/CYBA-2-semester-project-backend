
export default abstract class Pagination {

    offset = 0

    protected calculateOffset(pageSize: number, pageNum: number) {
        this.offset = (pageNum - 1) * pageSize;
    }
}