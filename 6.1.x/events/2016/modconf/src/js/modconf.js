AUI().use('panel', function (A) {

	var hotelPanel = new A.Panel({
		srcNode: '#hotelPop',
		zIndex: 250,
		id: "hotelpanel",
		centered: true,
		/* hey buddy, we are going to stay in the viewport */
		constrain: true,
		modal: true,
		visible: false,
		render: true,
		buttons: [
			{
                value: " ",
                action: function (e) {
                    e.preventDefault();
                    hotelPanel.hide();
                },
                section: A.WidgetStdMod.HEADER,
				classNames: "close-popup-content"
			}
		],
		hideOn: [
            {
				eventName: 'clickoutside'
            }]
	});
	A.one('window').on(
		'resize',
		function () {
            hotelPanel.centered();
		}
	);

	A.one('.js-viewhotels').on('click', function () {
        hotelPanel.show();
    });
    
});