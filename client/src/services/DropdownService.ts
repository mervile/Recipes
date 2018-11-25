interface DropdownI {
    toggleId: String,
    open: Boolean,
    parents: Array<DropdownI>
}

export class DropdownService {
    private dropdowns: Array<DropdownI>

    constructor() {
        this.dropdowns = [];
    }
}

export const dropdownService = new DropdownService();