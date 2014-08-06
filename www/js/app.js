// We use an "Immediate Function" to initialize the application to avoid leaving anything behind in the global scope
(function () {

    /* ---------------------------------- Local Variables ---------------------------------- */
	var homeTpl = Handlebars.compile($("#home-tpl").html());
	var employeeListTpl = Handlebars.compile($("#employee-list-tpl").html());
    var service = new EmployeeService();
    service.initialize().done(function () {
	    renderHomeView();
    });

    /* --------------------------------- Event Registration -------------------------------- */


    /* ---------------------------------- Local Functions ---------------------------------- */
    function findByName() {
    service.findByName($('.search-key').val()).done(function (employees) {
        $('.content').html(employeeListTpl(employees));
    });
}
    function renderHomeView() {
    	$('body').html(homeTpl());
    	$('.search-key').on('keyup', findByName);
	}

}());