import _ from 'lodash'

export default {
    data(){
        return {
            page: 1,
            pageSize: 5,
            pageCount: 0,
            allRecordsItems: [],
            recordsSubarray: [],
        }
    },
    methods: {
        setupPagination(allItems){
            this.allRecordsItems = _.chunk(allItems, this.pageSize)
            this.pageCount = _.size(this.allRecordsItems)
            this.recordsSubarray = this.allRecordsItems[this.page - 1] || this.allRecordsItems[0]
        },
        pageChangeHandler(page){
            this.recordsSubarray = this.allRecordsItems[page - 1] || this.allRecordsItems[0]
        },
    }
}