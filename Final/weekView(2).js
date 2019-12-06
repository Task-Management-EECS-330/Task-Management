$("td").click(function(){
    var tr = $(this).parents("tr");
    var td = tr.children("td");
    var i = 0;
    for(;i < td.length; i++){
        if(td[i] == this) break;
    }
    var j = 0;
    var today = $(".today");
    for(;j < td.length; j++){
        if(td[j] == today[0]) break;
    }
    if (j == i) return;
    var weeks = $(".weekCalender");
    var p = 0;
    for (; p < weeks.length; p++){
        if(!weeks[p].hasAttribute("hidden")) break;
    }
    var newDay = $(weeks[p]).find("td").eq(i+7);
    switchDay(today,newDay);
});

$(".task-today .task").click(function(){
    var from = $(this).attr("from");
    var to = $(this).attr("to");
    var name = $(this).attr("name");
    var location = $(this).attr("location");
    var note = $(this).attr("note");
    var type = $(this).attr("type");
    var id = $(this).attr("id");
    var start_date = $(this).attr("start_date");
    var repeat = $(this).attr("repeat");
    var alert = $(this).attr("alert");
    var Class = GetQueryString("class");
    var defaultTime = GetQueryString("defaultTime");
    var user  = GetQueryString("user");
    var tel = GetQueryString("tel");
    var email = GetQueryString("email");
    debugger
    var text ="editTask.html?class=" + Class + "&&defaultTime=" + defaultTime + "&&user=" + user + "&&tel=" + tel + "&&email=" + email +
        "&&title=" + name + "&&location=" + location + "&&start_date=" + start_date + "&&from=" + from + "&&to=" + to + "&&note=" + note+ 
        "&&type=" + type+"&&repeat=" + repeat + "&&alert=" + alert + "&&id=" + id;

    window.location.href = text;
})

function switchDay(today, newDay) {
    today.animate({width:'145.7px'});
    today.removeClass("today");
    newDay.animate({width:'340px'});
    newDay.addClass("today");

    var newTaskList = newDay.children(".task"); //get all tasks from clicked day
    var newTasks = new Array(newTaskList.length);
    for (var i = 0; i < newTaskList.length; i++) {
        newTasks[i]={
            from: $(newTaskList[i]).attr("from"),
            to: $(newTaskList[i]).attr("to"),
            name: $(newTaskList[i]).attr("name"),
            loca: $(newTaskList[i]).attr("location"),
            note: $(newTaskList[i]).attr("note"),
            type: $(newTaskList[i]).attr("type"),
            id: $(newTaskList[i]).attr("id"),
            start_date: $(newTaskList[i]).attr("start_date"),
            repeat: $(newTaskList[i]).attr("repeat"),
            alert: $(newTaskList[i]).attr("alert")
        }
        
    }

    var todayTaskList = $(".task-today").children(".task"); //get all tasks from today
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

    rewriteNewDay(newDay, newTasks);
    rewriteToday(today, todayTasks);
}

function rewriteNewDay(newDay, newTasks) {
    var text = '<div class = "up-block"><i class = "material-icons">keyboard_arrow_up</i></div><div class = "scroller"><div class = "task-today">';
    for (var i = 0; i < newTasks.length; i++){
        text += '<div class="type' + newTasks[i].type + ' time from">'+
        'From: ' + newTasks[i].from + '</div>' +
        '<div class="task type'+newTasks[i].type+'"id="'+newTasks[i].id+'"start_date="'+newTasks[i].start_date+'"repeat="'+newTasks[i].repeat+'"alert="'+newTasks[i].alert+'"from="'+newTasks[i].from +'"to="'+newTasks[i].to+'"name="'+newTasks[i].name+'"location="'+newTasks[i].loca+'"note="'+newTasks[i].note+'"type='+newTasks[i].type+'>'+
        '<i class = "material-icons">bookmark_border</i>Title: ' + newTasks[i].name +
        '<br><i class = "material-icons">room</i>Location: ' + newTasks[i].loca +
        '<div class = "divider"></div><i class = "material-icons">insert_drive_file</i>Note: ' + newTasks[i].note +
        '</div><div class="type' + newTasks[i].type + ' time to">To: ' + newTasks[i].to +
        '</div>'
    }
    text += '</div></div><div class = "down-block"><i class = "material-icons">keyboard_arrow_down</i></div>';
    $(newDay).html(text);
    $(".task-today .task").click(function(){
        var from = $(this).attr("from");
        var to = $(this).attr("to");
        var name = $(this).attr("name");
        var location = $(this).attr("location");
        var note = $(this).attr("note");
        var type = $(this).attr("type");
        var id = $(this).attr("id");
        var start_date = $(this).attr("start_date");
        var repeat = $(this).attr("repeat");
        var alert = $(this).attr("alert");
        var Class = GetQueryString("class");
        var defaultTime = GetQueryString("defaultTime");
        var user  = GetQueryString("user");
        var tel = GetQueryString("tel");
        var email = GetQueryString("email");
        var text ="editTask.html?class=" + Class + "&&defaultTime=" + defaultTime + "&&user=" + user + "&&tel=" + tel + "&&email=" + email + 
            "&&title=" + name + "&&location=" + location + "&&start_date=" + start_date + "&&from=" + from + "&&to=" + to + "&&note=" +note
            + "&&type=" + type+  "&&repeat=" + repeat + "&&alert=" + alert +"&&id=" + id;
        window.location.href = text;
    })
}

function rewriteToday(today, todayTasks) {
    var taskTime = new Array(todayTasks.length);
    for (var i = 0; i < todayTasks.length; i++) {// get task time from today
        var tempFrom = todayTasks[i].from.split(":");
        taskTime[i] = {
            fromHour: tempFrom[0]
        };
        tempFrom = tempFrom[1].split(" ");
        taskTime[i].fromMin = tempFrom[0];
        taskTime[i].fromP = tempFrom[1];
    }

    var unit = 23.74;// height of a task block

    var text = '';

    for (var i = 0; i < todayTasks.length; i++) {
        var time = 0;
        if (i == 0) {
            time = taskTime[i].fromHour-0 + (taskTime[i].fromMin-0)/60;
            if(taskTime[i].fromHour == "12" && taskTime[i].fromP == "AM")
                time -= 12;
            else if(taskTime[i].fromHour != "12" && taskTime[i].fromP == "PM")
                time += 12;
        }
        else{
            time = taskTime[i].fromHour-0 + (taskTime[i].fromMin-0)/60;
            if(taskTime[i].fromHour == "12" && taskTime[i].fromP == "AM")
                time -= 12;
            else if(taskTime[i].fromHour != "12" && taskTime[i].fromP == "PM")
                time += 12;

            var previousTime = taskTime[i-1].fromHour-0 + (taskTime[i-1].fromMin-0)/60;
            if(taskTime[i-1].fromHour == "12" && taskTime[i-1].fromP == "AM")
                previousTime -= 12;
            else if(taskTime[i-1].fromHour != "12" && taskTime[i-1].fromP == "PM")
                previousTime += 12;

            time -= (previousTime + 1);
            if (time < 0) time = 0;
        }
        var margin = unit * time + "px";// distance to previous task

        text += '<div class="task type' + todayTasks[i].type + '" start_date="'+ todayTasks[i].start_date + '" repeat="'+ todayTasks[i].repeat +'" alert="'+ todayTasks[i].alert +'" id="'+ todayTasks[i].id +'" style="margin-top:' + margin + ';" from="' + todayTasks[i].from + '" to="' + todayTasks[i].to + '" name="' + todayTasks[i].name + '" location="' + todayTasks[i].loca + '" note="' + todayTasks[i].note + '" type=' + todayTasks[i].type + 
                '>' + todayTasks[i].from + ' ' + todayTasks[i].name + '</div>';
    }
    $(today).html(text);
}

function addTask() {
    var Class = GetQueryString("class");
    var defaultTime = GetQueryString("defaultTime");
    var user  = GetQueryString("user");
    var tel = GetQueryString("tel");
    var email = GetQueryString("email");
    window.location.href="addTask.html?class=" + Class + "&&defaultTime=" + defaultTime + "&&user=" + user + "&&tel=" + tel + "&&email=" + email;
}

function profile() {
    var href = window.location.href.split("?");
    if (href.length == 2)
        window.location.href="profile.html"+"?"+href[1];
    else
        window.location.href="profile.html";
}

function monthview() {
    var href = window.location.href.split("?");
    if (href.length == 2)
        window.location.href="calendar.html"+"?"+href[1];
    else
        window.location.href="calendar.html";
}

$(document).ready(function(){
    var method=GetQueryString("method");
    var weekNo=GetQueryString("weekNo");
    if (method == "edit"){
        var repeat = GetQueryString("repeat");
        var day = GetQueryString("start_date").split("/")[2]-0;
        var week = 0;
        if (1 <= day && day <= 7) {
            week = 0;
        }
        else if (8 <= day && day <= 14) {
            week = 1;
        }
        else if (15 <= day && day <= 21) {
            week = 2;
        }
        if (repeat == "None"){
            editTaskToCalendar(0);
        }
        else if (repeat == "Weekly") {
            if (week == 0) {
                editTaskToCalendar(0);
                editTaskToCalendar(1);
                editTaskToCalendar(2);
            }
            else if (week == 1) {
                editTaskToCalendar(0)
                editTaskToCalendar(1)
            }
            else if (week == 2) {
                editTaskToCalendar(0)
            }
        }
    }
    else if (method == "add"){
        addTaskToCalendar();}
    else if (method == "delete"){
        deleteTaskToCalendar();
    }
    var defaultDay = $("#week1 .schedule").children().eq(3);
    var newTaskList = defaultDay.children(".task"); //get all tasks from clicked day
    var newTasks = new Array(newTaskList.length);
    for (var i = 0; i < newTaskList.length; i++) {
        newTasks[i]={
            from: $(newTaskList[i]).attr("from"),
            to: $(newTaskList[i]).attr("to"),
            name: $(newTaskList[i]).attr("name"),
            loca: $(newTaskList[i]).attr("location"),
            note: $(newTaskList[i]).attr("note"),
            type: $(newTaskList[i]).attr("type"),
            id: $(newTaskList[i]).attr("id"),
            start_date: $(newTaskList[i]).attr("start_date"),
            repeat: $(newTaskList[i]).attr("repeat"),
            alert: $(newTaskList[i]).attr("alert")
        }
    }
    defaultDay.animate({width:'340px'});
    defaultDay.addClass("today");
    rewriteNewDay(defaultDay,newTasks);
    if (weekNo == "0") weekChange(0);
    else if (weekNo == "2") weekChange(1);
})

function GetQueryString(name)
{
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}

function addTaskToCalendar(){
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
    

    var newAddedTask = new Object();
    newAddedTask.start_date = sd;
    newAddedTask.from = sh+':'+sm+' '+sampm;
    newAddedTask.to = eh+':'+em+' '+eampm;
    newAddedTask.name = title;
    newAddedTask.loca = location;
    newAddedTask.note = '';
    newAddedTask.type = type;
    newAddedTask.id = 'task100';
    newAddedTask.repeat = repeat;
    newAddedTask.alert = alert;

    var day = new Date(Date.parse(sd));
    i = day.getDay();
    var weekNumber = 0;
    var dayNumber = sd.split("/");
    var dateNumber = dayNumber[2]-0;
    if(dateNumber>=1 && dateNumber <=7){
        weekNumber = 0;
    }
    else if(dateNumber>=8 && dateNumber <=14){
        weekNumber = 1;
    }
    else if(dateNumber>=15 && dateNumber <=21){
        weekNumber = 2;
    }

    var newDay = $("#week"+weekNumber).find("td").eq(i+7);
    var newTaskList = newDay.children(".task");

    var newTasks = new Array(newTaskList.length);
    
    for (var i = 0; i < newTaskList.length; i++) {
        newTasks[i]={
            from: $(newTaskList[i]).attr("from"),
            to: $(newTaskList[i]).attr("to"),
            name: $(newTaskList[i]).attr("name"),
            loca: $(newTaskList[i]).attr("location"),
            note: $(newTaskList[i]).attr("note"),
            type: $(newTaskList[i]).attr("type"),
            id: $(newTaskList[i]).attr("id"),
            start_date: $(newTaskList[i]).attr("start_date"),
            repeat: $(newTaskList[i]).attr("repeat"),
            alert: $(newTaskList[i]).attr("alert")
        }
    }
    
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
    for (var i = 0; i < newTaskList.length; i++) {
        start_time = newTasks[i].from;
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
    newTasks.splice(k, 0, newAddedTask);
    rewriteToday(newDay, newTasks);
}


function editTaskToCalendar(argu){
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
    var id=GetQueryString("id");
    var repeat = GetQueryString("repeat");
    var alert = GetQueryString("alert");
    
    var tempId = id.split("task")[1]-0+argu*100;

    var newAddedTask = new Object();
    newAddedTask.from = sh+':'+sm+' '+sampm;
    newAddedTask.start_date = sd;
    newAddedTask.to = eh+':'+em+' '+eampm;
    newAddedTask.name = title;
    newAddedTask.loca = location;
    newAddedTask.note = '';
    newAddedTask.type = type;
    if(argu != 0) newAddedTask.id = "task"+tempId;
    else newAddedTask.id = id;
    newAddedTask.repeat = repeat;
    newAddedTask.alert = alert;

    var day = new Date(Date.parse(sd));
    i = day.getDay();
    var weekNumber = 0;
    var dayNumber = sd.split("/");
    var dateNumber = dayNumber[2]-0;
    if(dateNumber>=1 && dateNumber <=7){
        weekNumber = 0;
    }
    else if(dateNumber>=8 && dateNumber <=14){
        weekNumber = 1;
    }
    else if(dateNumber>=15 && dateNumber <=21){
        weekNumber = 2;
    }

    var newDay = $("#week"+(weekNumber+argu)).find("td").eq(i+7);
    var previousDay = $("#"+id).parent();
    var previousList = previousDay.children(".task");

    var previousTasks = new Array(previousList.length);
    for (var i = 0; i < previousList.length; i++) {
        previousTasks[i]={
            from: $(previousList[i]).attr("from"),
            to: $(previousList[i]).attr("to"),
            name: $(previousList[i]).attr("name"),
            loca: $(previousList[i]).attr("location"),
            note: $(previousList[i]).attr("note"),
            type: $(previousList[i]).attr("type"),
            id: $(previousList[i]).attr("id"),
            start_date: $(previousList[i]).attr("start_date"),
            repeat: $(previousList[i]).attr("repeat"),
            alert: $(previousList[i]).attr("alert")
        }
    }
     var t = 0;

    for (; t < previousList.length; t++) {
        if (previousTasks[t].id == newAddedTask.id) break;
    }
    if (t < previousList.length)
        previousTasks.splice(t, 1);

    rewriteToday(previousDay, previousTasks);

    var newTaskList = newDay.children(".task");

    var newTasks = new Array(newTaskList.length);
    
    for (var i = 0; i < newTaskList.length; i++) {
        newTasks[i]={
            from: $(newTaskList[i]).attr("from"),
            to: $(newTaskList[i]).attr("to"),
            name: $(newTaskList[i]).attr("name"),
            loca: $(newTaskList[i]).attr("location"),
            note: $(newTaskList[i]).attr("note"),
            type: $(newTaskList[i]).attr("type"),
            id: $(newTaskList[i]).attr("id"),
            start_date: $(newTaskList[i]).attr("start_date"),
            repeat: $(newTaskList[i]).attr("repeat"),
            alert: $(newTaskList[i]).attr("alert")
        }
    }

    
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

    newAddedTime = parseInt(sh)*60 + parseInt(sm);

    var k = 0;
    for (var i = 0; i < newTasks.length; i++) {
        start_time = newTasks[i].from;
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
    newTasks.splice(k, 0, newAddedTask);
    rewriteToday(newDay, newTasks);
}

function weekChange(PN) {
    var weeks = $(".weekCalender");
    var i = 0;
    for (; i < weeks.length; i++){
        if(!weeks[i].hasAttribute("hidden")) break;
    }
    var id = weeks[i].id;   
    if (PN == 0){
        switch(id){
            case "week1":
                $("#week0").removeAttr("hidden");
                $("#week1").attr("hidden",true);
                break;
            case "week2":
                $("#week1").removeAttr("hidden");
                $("#week2").attr("hidden",true);
                break;
        }
    }
    
    if (PN == 1){
        switch(id){
            case "week1":
                $("#week2").removeAttr("hidden");
                $("#week1").attr("hidden",true);
                break;
            case "week0":
                $("#week1").removeAttr("hidden");
                $("#week0").attr("hidden",true);
                break;
        }
    }
}

function deleteTaskToCalendar(){
    var id = GetQueryString("id");
    $("#"+id).remove();
}