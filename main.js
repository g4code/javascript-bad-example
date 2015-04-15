

function loadData(){
	var tasks = localStorage.getItem("tasks");

	if(tasks != null){
		var tasks = $.parseJSON(tasks);
		createTasksHtml(tasks);
	}
	else{
		$.ajax({
			dataType: "json",
			url: "data.json",
			success: function(data){
				localStorage.setItem("tasks", JSON.stringify(data));
				$("#tasks_list").html("");
				createTasksHtml(data);
			}
		});
	}
}

function createTasksHtml(tasks){
	$("#tasks_list").html("");
		$.each(tasks, function( index, task ) {
		  	var html = "<tr>"+
				"<td><a ng-href=\"{{project.site}}\" target=\"_blank\">"+task.task_id+"</a></td>"+
				"<td>"+task.subject+"</td>"+
				"<td>"+task.text+"</td>"+
				"<td>"+task.user.first_name+ " "+ task.user.last_name +"</td>"+
				"<td><a  onclick=\"editTask(this)\" data-task-id=\""+task.task_id+"\" href=\"#\"><i class=\"glyphicon glyphicon-pencil\"></i></a></td>"+
				"<td><a  onclick=\"deleteTask(this)\" data-task-id=\""+task.task_id+"\" href=\"#\"><i class=\"glyphicon glyphicon-remove\"></i></a></td>"+
				"</tr>";
			$("#tasks_list").append(html);
		});
}


function editTask(task){
	var taskId = $(task).data("task-id");
	var tasks = localStorage.getItem("tasks");
	tasks = $.parseJSON(tasks);

	$.each(tasks, function( index, task ) {
		if(taskId == task.task_id){
			$("#subject").val(task.subject);
			$("#text").val(task.text);
			$("#task_id").val(task.task_id);
			$(".modal-box, .fader").show();
		}
	});

}

function closeEdit(){
	$(".modal-box, .fader").hide();
	$("#subject").val("");
	$("#text").val("");
}


function saveTask(task){
	var taskId = $("#task_id").val();
	if(taskId != ""){
		var tasks = localStorage.getItem("tasks");
		tasks = $.parseJSON(tasks);

		var tmpTasks = [];
		$.each(tasks, function( index, task ) {
			if(taskId == task.task_id){
				task.subject =	$("#subject").val();
				task.text = $("#text").val();
				task.task_id = $("#task_id").val();
			}
			tmpTasks.push(task);
		});
	}
	else{
		var task = {
			subject:$("#subject").val(),
			text:$("#text").val(),
			task_id:$.now(),
			user:{
				user_id:"1",
				first_name:"John",
				last_name:"Smith"
			}
		}
		var tmpTasks = $.parseJSON(localStorage.getItem("tasks"));
		tmpTasks.push(task);
	}

	localStorage.setItem("tasks", JSON.stringify(tmpTasks));
	closeEdit();
	createTasksHtml(tmpTasks);

}

function deleteTask(task){
	var taskId = $(task).data("task-id");
	var conf = confirm("Are you sure");
	if (conf == true) {
	    var tasks = $.parseJSON(localStorage.getItem("tasks"));
	    var tmpTasks = [];
		$.each(tasks, function( index, task ) {
			if(taskId != task.task_id){
				tmpTasks.push(task);
			}
		});
		localStorage.setItem("tasks", JSON.stringify(tmpTasks));
		createTasksHtml(tmpTasks);
	}
}

function addTask(task){

	$(".modal-box, .fader").show();

}

$(function() {
    loadData();
});