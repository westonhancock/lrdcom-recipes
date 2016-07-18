<script>
AUI().use('panel', function (A) {

	var panel = new A.Panel({
		srcNode: '#recap-popup',
		zIndex: 1000,
		id: "recappanel",
		centered: true,
		/* hey buddy, we are going to stay in the viewport */
		constrain: true,
		modal: true,
		visible: false,
		render: true,
		headerContent: "Events Newsletter",
		buttons: [
			{
                value: " ",
                action: function (e) {
                    e.preventDefault();
                    panel.hide();
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
			panel.centered = true;
		}
	);

	A.all('.register-button .btn').on('click', function () {
        panel.show();
    });
});
</script>