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
            type: $(newTaskList[i]).attr("type")
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
            type: $(todayTaskList[i]).attr("type")
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
        '<div class="task type' + newTasks[i].type + '" from="'+ newTasks[i].from +'" to="' + newTasks[i].to + '" name="' + newTasks[i].name + '" location="' + newTasks[i].loca + '" note="' + newTasks[i].note + '" type=' + newTasks[i].type + '>'+
        '<i class = "material-icons">bookmark_border</i>Title: ' + newTasks[i].name +
        '<br><i class = "material-icons">room</i>Location: ' + newTasks[i].loca +
        '<div class = "divider"></div><i class = "material-icons">insert_drive_file</i>Note: ' + newTasks[i].note +
        '</div><div class="type' + newTasks[i].type + ' time to">To: ' + newTasks[i].to +
        '</div>'
    }
    text += '</div></div><div class = "down-block"><i class = "material-icons">keyboard_arrow_down</i></div>';
    $(newDay).html(text);
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

        text += '<div class="task type' + todayTasks[i].type + '" style="margin-top:' + margin + ';" from="' + todayTasks[i].from + '" to="' + todayTasks[i].to + '" name="' + todayTasks[i].name + '" location="' + todayTasks[i].loca + '" note="' + todayTasks[i].note + '" type=' + todayTasks[i].type + 
                '>' + todayTasks[i].from + ' ' + todayTasks[i].name + '</div>';
    }
    $(today).html(text);
}

function addTask() {
    window.location.href="addTask.html";
}

$(document).ready(function(){
    addTaskToCalendar()
})

function GetQueryString(name)
{
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}

function addTaskToCalendar(){
    var sd = GetQueryString("start_date");
    var sh=GetQueryString("start_hour");
    var sampm=GetQueryString("start_ampm");
    var sm=GetQueryString("start_min");
    var eh=GetQueryString("end_hour");
    var eampm=GetQueryString("end_ampm");
    var em=GetQueryString("end_min");
    
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
            type: $(newTaskList[i]).attr("type")
        }
    }

    newTasks
    debugger;
}