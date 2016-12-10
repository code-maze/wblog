var admin = {
    lists: null,
    pagination: null,
    init: function(type, page, size) {
        this.type = type || 'users';
        this.page = page || 1;
        this.size = size || 10;
        this.getData(() => {
            this.paintTable.call(this);
            this.paintPagination.call(this);
        });
    },
    getData: function (callback) {
        $.ajax({
            url: `api/v1.0/${this.type}?page=${this.page}&size=${this.size}`,
            success: (data) => { 
                this.lists = data[this.type];
                this.pagination = data.pagination;
                callback();
            }
        });
    },
    paintPagination: function () {
        let $pages = $('<ul class="pagination">');
        for (var i = 1, str = ''; i <= this.pagination.totalPage; i++) {
            if (i == this.pagination.currentPage) {
                str += `<li class="active"><a href="#">${i}</a></li>`;
            } else {
                str += `<li><a href="#">${i}</a></li>`;
            }
        }
        $pages.html(str);
        $('#pagination').html($pages);
    },
    paintTable: function() {
        let $table = $('<table class="table table-striped table-hover">');
        let str = '<tr><th>用户名</th><th>邮箱</th><th>注册时间</th></tr>';
        for (let i = 0; i < this.lists.length; i++) {
            let item = this.lists[i];
            str += `<tr><td>${item["name"]}</td><td>${item["email"]}</td><td>${item["regTime"].toDateTime()}</td></tr>`;           
        }
        $table.html(str);
        $('.table-responsive').html($table);
    }
}

let qso = queryStringObj();
admin.init(null, qso.page, qso.size);
