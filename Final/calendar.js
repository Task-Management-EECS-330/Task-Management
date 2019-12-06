$(".schedule").find("td").click(function(){
    var date = $(this).find(".date").attr("value")
    var week = 1;
    if (date < 8) {
        week = 0;
    }
    else if (date > 14) {
        week = 2;
    }
    var url = window.location.href;
    var temp = url.split("?")[1]
    var temp2 = temp.split("&&weekNo=");
    if(temp2.length > 1){
        var temp3 = temp2[1].split("&&");
        if (temp3.length > 1){
            url = "weekView.html?" + temp2[0] + "&&weekNo=" + week;
            for(var i = 1; i < temp3.length; i++){
                url += "&&" + temp3[i];
            } 
        }
        else {
            url = "weekView.html?" + temp2[0] + "&&weekNo=" + week;
        }
    }
    else{
        url = "weekView.html?" + temp + "&&weekNo=" + week;
    }
    if (date < 22) {
        window.location.href = url;
    }
})

$(document).ready(function(){
    var title = GetQueryString("title");
    var location = GetQueryString("location");
    var sd = GetQueryString("start_date");
    var sh=GetQueryString("start_hour");
    var sampm=GetQueryString("start_ampm");
    var sm=GetQueryString("start_min");
    var eh=GetQueryString("end_hour");
    var eampm=GetQueryString("end_ampm");
    var em=GetQueryString("end_min");
    var type=GetQueryString("type");
    var repeat = GetQueryString("repeat");
    var alert = GetQueryString("alert");

    if(sd != null){
        var dayNumber = sd.split("/");
    var dateNumber = dayNumber[2]-0;

    
    var todayTaskList = $("#"+dateNumber).children(".task");
    var todayTasks = new Array(todayTaskList.length);
    for (var i = 0; i < todayTaskList.length; i++) {
        todayTasks[i]={
            from: $(todayTaskList[i]).attr("from"),
            to: $(todayTaskList[i]).attr("to"),
            name: $(todayTaskList[i]).attr("name"),
            loca: $(todayTaskList[i]).attr("location"),
            note: $(todayTaskList[i]).attr("note"),
            type: $(todayTaskList[i]).attr("type"),
            id: $(todayTaskList[i]).attr("id"),
            start_date: $(todayTaskList[i]).attr("start_date"),
            repeat: $(todayTaskList[i]).attr("repeat"),
            alert: $(todayTaskList[i]).attr("alert")
        }
    }

    var newAddedTask = new Object();
    newAddedTask.from = sh+':'+sm+' '+sampm;
    newAddedTask.to = eh+':'+em+' '+eampm;
    newAddedTask.name = title;
    newAddedTask.loca = location;
    newAddedTask.start_date = sd;
    newAddedTask.note = '';
    newAddedTask.type = type;
    newAddedTask.id = 'task100';
    newAddedTask.repeat = repeat;
    newAddedTask.alert = alert;

    if(sampm == 'AM' && parseInt(sh) == 12){
        sh = 0;
    }
    else if(sampm == 'AM' && parseInt(sh) != 12){
        sh = sh;
    }
    else if(sampm == 'PM' && parseInt(sh) == 12){
        sh = sh;
    }
    else if(sampm == 'PM' && parseInt(sh) != 12){
        sh = parseInt(sh) + 12;
    }

    var k = 0;
    newAddedTime = parseInt(sh)*60 + parseInt(sm);
    for (var i = 0; i < todayTaskList.length; i++) {
        start_time = todayTasks[i].from;
        start_time = start_time.split(' ');
        ampm = start_time[1];
        start_hhmm = start_time[0].split(':');
        start_hour = start_hhmm[0];
        start_min = start_hhmm[1];
        
        if(ampm == 'AM' && parseInt(start_hour) == 12){
            start_hour = 0;
        }
        else if(ampm == 'AM' && parseInt(start_hour) != 12){
            start_hour = start_hour;
        }
        else if(ampm == 'PM' && parseInt(start_hour) == 12){
            start_hour = start_hour;
        }
        else if(ampm == 'PM' && parseInt(start_hour) != 12){
            start_hour = parseInt(start_hour) + 12;
        }

        currentTaskTime = parseInt(start_hour)*60 + parseInt(start_min);

        if(newAddedTime<currentTaskTime){
           k = i;
           break;
        }
        else{
            k++;
        }
    }
    todayTasks.splice(k, 0, newAddedTask);
    rewriteToday(todayTasks,dateNumber)
    }
})

function GetQueryString(name)
{
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}

function rewriteToday(todayTasks,dateNumber) {
    text = '<div class="date"> '+ dateNumber + ' </div>'
    for (var i = 0; i < todayTasks.length; i++){
        text += '<div class="task type' + todayTasks[i].type + '" start_date="'+ todayTasks[i].start_date + '" repeat="'+ todayTasks[i].repeat +'" alert="'+ todayTasks[i].alert +'" id="'+ todayTasks[i].id +'" from="' + todayTasks[i].from + '" to="' + todayTasks[i].to + '" name="' + todayTasks[i].name + '" location="' + todayTasks[i].loca + '" note="' + todayTasks[i].note + '" type=' + todayTasks[i].type + 
        '>' + todayTasks[i].from + ' ' + todayTasks[i].name + '</div>';
    }
    $("#"+dateNumber).html(text);
}