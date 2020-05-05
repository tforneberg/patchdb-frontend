export class PagingProps {
    private itemsPerPage:number = 12;
    private currentPage:number = 0;

    public PagingProps(itemsPerPage:number = 12, currentPage:number = 0) {
        this.itemsPerPage = itemsPerPage;
    }

    public getItemsPerPage() : number {
        return this.itemsPerPage;
    }

    public setItemsPerPage(newSize:number) {
        this.itemsPerPage = newSize;
        this.currentPage = 0;
    }

    public getCurrentPage() : number {
        return this.currentPage;
    }

    public setCurrentPage(newCurrentPage:number) {
        this.currentPage = newCurrentPage;
    }

    public getPageAndSizeUrlString() : string {
        return '?page='+this.currentPage+'&size='+this.itemsPerPage;
    }
}