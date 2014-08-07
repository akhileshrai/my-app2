
var HomeView = function (service) {
    var employeeListView;
    HomeView.prototype.template = Handlebars.compile($("#home-tpl").html());
    
    this.render = function() {
		this.$el.html(this.template());
   		$('.content', this.$el).html(employeeListView.$el);
    	return this;
	};
	this.findByName = function() {
    	service.findByName($('.search-key').val()).done(function(employees) {
    	    employeeListView.setEmployees(employees);
    	});
	};
    this.initialize = function () {
        // Define a div wrapper for the view (used to attach events)
        this.$el = $('<div/>');
        this.$el.on('keyup', '.search-key', this.findByName);
        employeeListView = new EmployeeListView();
        this.render();
    };

    this.initialize();
    
    
};


