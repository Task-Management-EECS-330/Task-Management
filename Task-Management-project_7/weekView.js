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
    var newDay = $(".schedule").children().eq(i);
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

    window.location.href = "editTask.html?title="+name+"&&location=" + location + "&&from=" + from + "&&to=" + to + "&&note=" +note+"&&type=" + type+"&&id=" + id;
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
            id: $(newTaskList[i]).attr("id")
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
            id: $(todayTaskList[i]).attr("id")
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
        '<div class="task type' + newTasks[i].type + '" id="'+ newTasks[i].id +'" from="'+ newTasks[i].from +'" to="' + newTasks[i].to + '" name="' + newTasks[i].name + '" location="' + newTasks[i].loca + '" note="' + newTasks[i].note + '" type=' + newTasks[i].type + '>'+
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

        window.location.href = "editTask.html?title="+name+"&&location=" + location + "&&from=" + from + "&&to=" + to + "&&note=" +note+"&&type=" + type+"&&id=" + id;
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

        text += '<div class="task type' + todayTasks[i].type + '" id="'+ todayTasks[i].id +'" style="margin-top:' + margin + ';" from="' + todayTasks[i].from + '" to="' + todayTasks[i].to + '" name="' + todayTasks[i].name + '" location="' + todayTasks[i].loca + '" note="' + todayTasks[i].note + '" type=' + todayTasks[i].type + 
                '>' + todayTasks[i].from + ' ' + todayTasks[i].name + '</div>';
    }
    $(today).html(text);
}

function addTask() {
    window.location.href="addTask.html";
}

$(document).ready(function(){
    var method=GetQueryString("method");
    if (method == "edit"){
        editTaskToCalendar()}
    else if (method == "add"){
        addTaskToCalendar();}
    var defaultDay = $(".schedule").children().eq(3);
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
            id: $(newTaskList[i]).attr("id")
        }
    }
    defaultDay.animate({width:'340px'});
    defaultDay.addClass("today");
    rewriteNewDay(defaultDay,newTasks);
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
    

    var newAddedTask = new Object();
    newAddedTask.from = sh+':'+sm+' '+sampm;
    newAddedTask.to = eh+':'+em+' '+eampm;
    newAddedTask.name = title;
    newAddedTask.loca = location;
    newAddedTask.note = '';
    newAddedTask.type = type;
    newAddedTask.id = 'task100';

    var day = new Date(Date.parse(sd));
    i = day.getDay();
    var newDay = $(".schedule").children().eq(i);
    
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
            id: $(newTaskList[i]).attr("id")
        }
    }
    debugger;
    
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

    debugger;

    newTasks.splice(k, 0, newAddedTask);
    debugger;
    rewriteToday(newDay, newTasks);
}


function editTaskToCalendar(){
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


    var newAddedTask = new Object();
    newAddedTask.from = sh+':'+sm+' '+sampm;
    newAddedTask.to = eh+':'+em+' '+eampm;
    newAddedTask.name = title;
    newAddedTask.loca = location;
    newAddedTask.note = '';
    newAddedTask.type = type;
    newAddedTask.id = id;

    var day = new Date(Date.parse(sd));
    i = day.getDay();
    var newDay = $(".schedule").children().eq(i);
    
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
            id: $(newTaskList[i]).attr("id")
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
    
    var t = 0;

    for (; t < newTaskList.length; t++) {
        if (newTasks[t].id == newAddedTask.id) break;
    }
    if (t < newTaskList.length)
        newTasks.splice(t, 1);
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
    debugger
    newTasks.splice(k, 0, newAddedTask);
    rewriteToday(newDay, newTasks);
}
