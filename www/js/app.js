// We use an "Immediate Function" to initialize the application to avoid leaving anything behind in the global scope
(function () {

    /* ---------------------------------- Local Variables ---------------------------------- */
	//var homeTpl = Handlebars.compile($("#home-tpl").html());
	//var employeeListTpl = Handlebars.compile($("#employee-list-tpl").html());
    var service = new EmployeeService();
    HomeView.prototype.template = Handlebars.compile($("#home-tpl").html());
	EmployeeView.prototype.template = Handlebars.compile($("#employee-tpl").html());
    EmployeeListView.prototype.template = Handlebars.compile($("#employee-list-tpl").html());


    service.initialize().done(function () {
  		router.addRoute('', function() {
      		$('body').html(new HomeView(service).render().$el);
 		});

  		router.addRoute('employees/:id', function(id) {
											    	   	service.findById(parseInt(id)).done(function(employee) {
											        		$('body').html(new EmployeeView(employee).render().$el);
											      		});
  		});

  		router.start();
	});

    /* --------------------------------- Event Registration -------------------------------- */


    /* ---------------------------------- Local Functions ---------------------------------- */
/*
    function findByName() {
    service.findByName($('.search-key').val()).done(function (employees) {
        $('.content').html(employeeListTpl(employees));
    });
}
    function renderHomeView() {
    	$('body').html(homeTpl());
    	$('.search-key').on('keyup', findByName);
	}*/


}());