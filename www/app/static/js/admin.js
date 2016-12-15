var admin = {
    lists: null,
    pagination: null,
    types: {
        users: {
            ths: '<tr><th>用户名</th><th>邮箱</th><th>注册时间</th></tr>' ,
            tds: ['name','email','regTime']
        },
        blogs: {
            ths: '<tr><th>标题</th><th>作者</th><th>发布时间</th></tr>' ,
            tds: ['title','author','pubTime']
        }

    },
    init: function(type, page, size) {
        this.type = type || 'users';
        this.page = page || 1;
        this.size = size || 10;
        this.getData(() => {
            this.paintTable.call(this);
            this.paintPagination.call(this);
        });
        $("#pagination").on('click', 'a', (e) => {
            e.preventDefault();
            var $a = $(e.target);
            this.page = $a.html();
            this.getData(this.paintTable.bind(this));
            $a.parent().addClass('active').siblings('.active').removeClass('active');  
        });
        $(".breadcrumb").on('click', 'a', (e) => {
            e.preventDefault();
            var $a = $(e.target);
            this.type = $a.html();
            this.page = 1;
            this.getData(() => {
                this.paintTable.call(this);
                this.paintPagination.call(this);
            });
        })
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
        $('#pagination').html(getPaginationString(this.pagination.currentPage, this.pagination.totalPage));
    },
    paintTable: function() {
        let $table = $('<table class="table table-striped table-hover">');
        let str = this.types[this.type].ths;
        for (let i = 0; i < this.lists.length; i++) {
            let item = this.lists[i];
            let td = this.types[this.type].tds;
            // debugger;
            str += `<tr><td>${item[td[0]]}</td><td>${item[td[1]]}</td><td>${item[td[2]].toDateTime()}</td></tr>`;           
        }
        $table.html(str);
        $('.table-responsive').html($table);
    }
}

let qso = queryStringObj();
admin.init(null, qso.page, qso.size);
