/**
 * @author Akhilesh
 */
var EmployeeView = function(employee) {
	
	EmployeeView.prototype.template = Handlebars.compile($("#employee-tpl").html());

	this.initialize = function() {
    	this.$el = $('<div/>');
  	};

  	this.render = function() {
    	this.$el.html(this.template(employee));
      	return this;
  	};

  	this.initialize();

};