var API_BASE = location.protocol+'//'+location.hostname+":"+(location.port!=""?location.port:80);

$(document).ready(function(){

    // 添加新的cloud
    $('#addNewIdcForm').bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            inputIdcname: {
                trigger: 'blur',
                validators: {
                    notEmpty: {
                        message: '机房名称不能为空'
                    }
                }
            }
        }
    }) //end bootstrapValidator
    .on('success.form.bv', function(e) {
        e.preventDefault();

        var $form = $(e.target);
        console.log(e)
        console.log($form.serialize());
        $.ajax({
            url: '/api/addIdc',
            type: 'post',
            data: $form.serialize(),
            dateType: 'json',
            success: function(data) {
                switch (data['status']) {
                    case 0:
                        alert(data['message']);
                        $('#newIdc').modal('hide');
                        window.location.href='/idc';
                        break;
                    case 1:
                        alert(data['message']);
                        break;
                    case "-1":
                        alert(data['message']);
                        break;
                }
            }
        })
    }) //end on

    // 添加新的产品
    $('#addNewProductForm').bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            inputProductname: {
                trigger: 'blur',
                validators: {
                    notEmpty: {
                        message: '产品名称不能为空'
                    }
                }
            }
        }
    }) //end bootstrapValidator
    .on('success.form.bv', function(e) {
        e.preventDefault();

        var $form = $(e.target);
        console.log($form.serialize());
        $.ajax({
            url: '/api/addProduct',
            type: 'post',
            data: $form.serialize(),
            dateType: 'json',
            success: function(data) {
                switch (data['status']) {
                    case 0:
                        alert(data['message']);
                        $('#newProduct').modal('hide');
                        window.location.href='/product';
                        break;
                    case 1:
                        alert(data['message']);
                        $('#newProduct').modal('hide');
                        window.location.href='/product';
                        break;
                    case "-1":
                        alert(data['message']);
                        break;
                }
            }
        })
    }) //end on

    // 添加新主机
    $('#addNewServerForm').bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            inputServerIp: {
                trigger: 'blur',
                validators: {
                    notEmpty: {
                        message: 'ip地址不能为空'
                    },
                    ip: {
                        message: '请输入合法的ip地址'
                    }
                }
            }
        }
    }) //end bootstrapValidator
    .on('success.form.bv', function(e) {
        e.preventDefault();

        var $form = $(e.target);
        console.log($form.serialize());
        $.ajax({
            url: '/api/addServer',
            type: 'post',
            data: $form.serialize(),
            dateType: 'json',
            success: function(data) {
                switch (data['status']) {
                    case 0:
                        alert(data['message']);
                        $('#newServer').modal('hide');
                        window.location.href='/server';
                        break;
                    case 1:
                        alert(data['message']);
                        $('#newServer').modal('hide');
                        window.location.href='/server';
                        break;
                    case "-1":
                        alert(data['message']);
                        break;
                }
            }
        })
    }) //end on

    // 主机列表datatable
    $('#serverList').dataTable();


/*
    $("#inputIdcContractStartTime").datetimepicker({
        format: "yyyy-mm-dd",
        autoclose: true,
        todayBtn: true,
        //pickerPosition: "bottom-left",
        startView: 3,
        minView: "2",
    });

    $("#inputIdcContractEndTime").datetimepicker({
        format: "yyyy-mm-dd",
        autoclose: true,
        todayBtn: true,
        //pickerPosition: "bottom-left",
        startView: 3,
        minView: "2",
    });
*/

    $('#addNewWanIpForm').bootstrapValidator({
        //container: 'tooltip',
        trigger: 'blur',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            inputStartWanIp: {
                group: '.inputStartWanIp',
                validators: {
                    notEmpty: {
                        message: '外网起始ip不能为空'
                    },
                    regexp: {
                        enabled: true,
                        regexp: /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])(\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])){3}$/,
                        message: "请输入正确的ip地址"
                    }
                }
            },
            inputEndWanIp: {
                group: '.inputEndWanIp',
                validators: {
                    regexp: {
                        enabled: true,
                        regexp: /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])(\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])){3}$/,
                        message: "请输入正确的ip地址"
                    }
                    /*
                    callback: {
                        callback: function(value, validator, $field) {
                            if(value) {
                                if($('#inputEndLanIp').attr('disabled') == 'disabled') {
                                    $('#inputEndLanIp').attr('disabled',false);
                                }
                            } else {
                                $('#inputEndLanIp').attr('disabled',true);
                            }
                            return true
                        }
                    }
                    */
                }
            },
            inputWanNetmask: {
                validators: {
                    notEmpty: {
                        message: "外网掩码不能为空"
                    },
                    regexp: {
                        enabled: true,
                        regexp: /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])(\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])){3}$/,
                        message: "请输入正确的外网掩码"
                    }
                }
            },
            inputWanGateway: {
                validators: {
                    notEmpty: {
                        message: "外网网关不能为空"
                    },
                    regexp: {
                        enabled: true,
                        regexp: /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])(\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])){3}$/,
                        message: "请输入正确的外网网关"
                    }
                }
            },
            inputWanDnsone: {
                validators: {
                    notEmpty: {
                        message: "外网主DNS不能为空"
                    },
                    regexp: {
                        enabled: true,
                        regexp: /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])(\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])){3}$/,
                        message: "请输入正确的ip地址"
                    }
                }
            },
            inputWanDnstwo: {
                validators: {
                    regexp: {
                        enabled: true,
                        regexp: /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])(\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])){3}$/,
                        message: "请输入正确的ip地址"
                    }
                }
            },
        }
    }) //end bootstrapValidator
    .on('success.form.bv', function(e) {
        e.preventDefault();

        var $form = $(e.target);
        console.log($form.serialize());
        $.ajax({
            url: '/api/addWanIp',
            type: 'post',
            data: $form.serialize(),
            dateType: 'json',
            success: function(data) {
                switch (data['status']) {
                    case 0:
                        alert(data['message']);
                        $('#newWanIp').modal('hide');
                        window.location.href='/assetsmanager/ippools';
                        break;
                    default:
                        alert(data['message']);
                        break;
                }
            }
        })
    }) //end on

    $('#addNewLanIpForm').bootstrapValidator({
        //container: 'tooltip',
        trigger: 'blur',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            inputStartLanIp: {
                validators: {
                    notEmpty: {
                        message: '内网起始ip不能为空'
                    },
                    regexp: {
                        enabled: true,
                        regexp: /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])(\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])){3}$/,
                        message: "请输入正确的ip地址"
                    }
                }
            },
            inputEndLanIp: {
                validators: {
                    regexp: {
                        enabled: true,
                        regexp: /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])(\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])){3}$/,
                        message: "请输入正确的ip地址"
                    }
                }
            },
            inputLanNetmask: {
                validators: {
                    notEmpty: {
                        message: "内网掩码不能为空"
                    },
                    regexp: {
                        enabled: true,
                        regexp: /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])(\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])){3}$/,
                        message: "请输入正确的内网掩码"
                    }
                }
            },
            inputLanGateway: {
                validators: {
                    notEmpty: {
                        message: "内网网关不能为空"
                    },
                    regexp: {
                        enabled: true,
                        regexp: /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])(\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])){3}$/,
                        message: "请输入正确的内网网关"
                    }
                }
            },
        }
    }) //end bootstrapValidator
    .on('success.form.bv', function(e) {
        e.preventDefault();

        var $form = $(e.target);
        console.log($form.serialize());
        $.ajax({
            url: '/api/addLanIp',
            type: 'post',
            data: $form.serialize(),
            dateType: 'json',
            success: function(data) {
                switch (data['status']) {
                    case 0:
                        alert(data['message']);
                        $('#newLanIp').modal('hide');
                        window.location.href='/assetsmanager/ippools#lanIp';
                        break;
                    case 1:
                        alert(data['message']);
                        break;
                    case "-1":
                        alert(data['message']);
                        break;
                }
            }
        })
    }) //end on

    $('#addNewInnerIpForm').bootstrapValidator({
        //container: 'tooltip',
        trigger: 'blur',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            inputStartInnerIp: {
                validators: {
                    notEmpty: {
                        message: '管理网起始ip不能为空'
                    },
                    regexp: {
                        enabled: true,
                        regexp: /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])(\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])){3}$/,
                        message: "请输入正确的ip地址"
                    }
                }
            },
            inputEndInnerIp: {
                validators: {
                    regexp: {
                        enabled: true,
                        regexp: /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])(\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])){3}$/,
                        message: "请输入正确的ip地址"
                    }
                }
            },
            inputInnerNetmask: {
                validators: {
                    notEmpty: {
                        message: "管理网掩码不能为空"
                    },
                    regexp: {
                        enabled: true,
                        regexp: /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])(\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])){3}$/,
                        message: "请输入正确的管理网掩码"
                    }
                }
            },
            inputInnerGateway: {
                validators: {
                    notEmpty: {
                        message: "管理网网关不能为空"
                    },
                    regexp: {
                        enabled: true,
                        regexp: /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])(\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])){3}$/,
                        message: "请输入正确的管理网网关"
                    }
                }
            },
        }
    }) //end bootstrapValidator
    .on('success.form.bv', function(e) {
        e.preventDefault();

        var $form = $(e.target);
        console.log($form.serialize());
        $.ajax({
            url: '/api/addInnerIp',
            type: 'post',
            data: $form.serialize(),
            dateType: 'json',
            success: function(data) {
                switch (data['status']) {
                    case 0:
                        alert(data['message']);
                        $('#newInnerIp').modal('hide');
                        window.location.href='/assetsmanager/ippools#innerIp';
                        break;
                    default:
                        alert(data['message']);
                        break;
                }
            }
        })
    }) //end on


    // wanIp tab
    $('#wanIp').on('click',function(e) {
        window.location.hash = e.target.hash.split('2')[0];
    })

    // lanIp tab
    $('#lanIp').on('click',function(e) {
        window.location.hash = e.target.hash.split('2')[0];

        var LANIP_WITH_DATA_TEMPLATE = '<table class="table table-condensed table-striped" id="tableLanIp"><thead><tr><th>#</th><th>内网ip</th><th>内网掩码</th><th>内网网关</th><th>所属机房</th><th>机房位置缩写</th><th>是否可用</th></tr></thead></table>'
        var LANIP_WITHOUT_DATA_TEMPLATE = '<div><h3>还没有添加任何管理网IP</h3></div>'

        $('#canvasInnerIp').html('<div id="loading">loading.....</div>');

        $.ajax({
            url: '/api/getIpLists/lanIp',
            type: 'get',
            dateType: 'json',
            success: function(data) {
                switch (data['status']) {
                    case 0:
                        $('#canvasLanIp').html('')
                        $('#canvasLanIp').append(_.template(LANIP_WITH_DATA_TEMPLATE));
                        $('#tableLanIp').dataTable({
                            "processing": true,
                            "data": data['data'],
                            "destroy": true,
                            //"retrieve": true,
                            //"bFilter": false,
                            //"bInfo": false,
                            //"bPaginate": false,
                            //"bLengthChange":false,
                            "pageLength": 25,
                            "columns": [
                                {"data":"pk"},
                                {"data":"fields.lanIp"},
                                {"data":"fields.lanNetmask"},
                                {"data":"fields.lanGateway"},
                                {"data":"fields.idc.fields.idcName"},
                                {"data":"fields.idc.fields.idcShortName"},
                                {"data":"fields.isAvailable"},
                            ],
                            /*"aoColumns": [
                                null,
                                {"sTitle":"Usage Space", "sClass": "textright"},
                                {"sTitle":"Cost/Month", "sClass": "textright"},
                            ],*/
                            //"dom": '<"bottom"i><"clear">rt<"mt-15"<"right"l><"left"p>><"clear">',
                            "dom": 'lrft<"bottom"i><"bottom"p><"clear">'
                        });
                        break;
                    default:
                        $('#canvasLanIp').html(_.template(LANIP_WITHOUT_DATA_TEMPLATE));
                        break;
                }
            }
        })
    });

    // innerIp tab
    $('#innerIp').on('click',function(e) {
        window.location.hash = e.target.hash.split('2')[0];

        var INNERIP_WITH_DATA_TEMPLATE = '<table class="table table-condensed table-striped" id="tableInnerIp"><thead><tr><th>#</th><th>管理网ip</th><th>管理网掩码</th><th>管理网网关</th><th>所属机房</th><th>机房位置缩写</th><th>是否可用</th></tr></thead></table>'
        var INNERIP_WITHOUT_DATA_TEMPLATE = '<div><h3>还没有添加任何管理网IP</h3></div>'

        $('#canvasInnerIp').html('<div id="loading">loading.....</div>');
        $.ajax({
            url: '/api/getIpLists/innerIp',
            type: 'get',
            dateType: 'json',
            success: function(data) {
                switch (data['status']) {
                    case 0:
                        $('#canvasInnerIp').html('')
                        $('#canvasInnerIp').append(_.template(INNERIP_WITH_DATA_TEMPLATE));
                        $('#tableInnerIp').dataTable({
                            //"processing": true,
                            "data": data['data'],
                            "destroy": true,
                            "pageLength": 25,
                            "columns": [
                                {"data":"pk"},
                                {"data":"fields.innerIp"},
                                {"data":"fields.innerNetmask"},
                                {"data":"fields.innerGateway"},
                                {"data":"fields.idc.fields.idcName"},
                                {"data":"fields.idc.fields.idcShortName"},
                                {"data":"fields.isAvailable"},
                            ],
                            "dom": 'lrft<"bottom"i><"bottom"p><"clear">'
                        });
                        break;
                    default:
                        $('#canvasInnerIp').html(_.template(INNERIP_WITHOUT_DATA_TEMPLATE));
                        break;
                }
            }
        })
        $('#loading').remove();
    });

    var url = document.location.toString();
    console.log(url);
    if (url.match('#')) {
        console.log(url.split('#')[1]);
        $('#'+url.split('#')[1]).trigger('click');
    }
}); //end document

// 显示主机详细信息
function show_server_detail(server_id){ // = function(server_id) {
    $('#serverDetail').modal("show")
    $('#tb-sd').dataTable({
        "processing": true,
        "destroy": true,
        "bFilter": false,
        "bInfo": false,
        "paging": false,
        "bLengthChange":false,
        "iDisplayLength": 10,
        "sAjaxSource": API_BASE+"/api/sd/"+server_id,
        "sDom": 'rt<"left"p>'
    });
};

// 产品，主机，idc删除操作
function del(action, action_id, action_name) {
    switch(action) {
        case "delServer":
            r = confirm("确认删除"+action_name+"的主机")
            if (r == true) {
                $.ajax({
                    url: '/api/'+action+'/'+action_id,
                    type: 'get',
                    dateType: 'json',
                    success: function(data) {
                        console.log(data)
                        switch (data[0]) {
                            case 1:
                                alert("删除主机成功");
                                window.location.href='/server';
                                break;
                        }
                    }
                })
            }
            break;
        case "delProduct":
            r = confirm("确认删除\""+action_name+"\"产品？？")
            if (r == true) {
                $.ajax({
                    url: '/api/'+action+'/'+action_id,
                    type: 'get',
                    dateType: 'json',
                    success: function(data) {
                        console.log(data)
                        switch (data[0]) {
                            case 1:
                                alert("删除产品成功");
                                window.location.href='/product';
                                break;
                        }
                    }
                })
            }
            break;
        case "delIdc":
            r = confirm("确认删除\""+action_name+"??")
            if (r == true) {
                $.ajax({
                    url: '/api/'+action+'/'+action_id,
                    type: 'get',
                    dateType: 'json',
                    success: function(data) {
                        console.log(data)
                        switch (data[0]) {
                            case 1:
                                alert("删除IDC成功");
                                window.location.href='/idc';
                                break;
                        }
                    }
                })
            }
            break;
    }
}


// 删除主机信息
function delete_server(server_id, public_ip) {
    r = confirm("确认删除"+public_ip+"的主机")
    if (r == true) {
        $.ajax({
            url: '/api/delServer/'+server_id,
            type: 'get',
            dateType: 'json',
            success: function(data) {
                console.log(data)
                switch (data[0]) {
                    case 1:
                        alert("删除主机成功");
                        window.location.href='/server';
                        break;
                }
            }
        })
    }
}

// 删除产品信息
function del_product(product_id, product_name) {
    r = confirm("确认删除\""+product_name+"\"产品？？")
    if (r == true) {
        $.ajax({
            url: '/api/delProduct/'+product_id,
            type: 'get',
            dateType: 'json',
            success: function(data) {
                console.log(data)
                switch (data[0]) {
                    case 1:
                        alert("删除产品成功");
                        window.location.href='/product';
                        break;
                }
            }
        })
    }
}

// 删除IDC信息
function del_idc(idc_id, idc_name) {
    r = confirm("确认删除\""+idc_name+"??")
    if (r == true) {
        $.ajax({
            url: '/api/delIdc/'+idc_id,
            type: 'get',
            dateType: 'json',
            success: function(data) {
                console.log(data)
                switch (data[0]) {
                    case 1:
                        alert("删除产品成功");
                        window.location.href='/product';
                        break;
                }
            }
        })
    }
}