Basic popup instantiation:

	<div class="pop-up">
		<btn class="btn pop-up-trigger">Trigger</btn>
		<div class="pop-up-content">Content that I want copied to the popup</div>
	</div>

	<script>
		AUI().ready(
		'pop-up',
		function(A) {
			new A.PopUp().render();
		}
	);
	</script>

Popup for video:
<script>
	AUI().ready(
	'pop-up',
	function(A) {
		new A.PopUp(
			{
				overlayCssClass: 'video-overlay'
			}
		).render();
	}
);
</script>

Custom class names:

	<div class="video-pop-up">
		<btn class="btn video-pop-up-trigger">Trigger</btn>
		<div class="video-pop-up-content">Content that I want copied to the popup</div>
	</div>

	<script>
		AUI().ready(
		'pop-up',
		function(A) {
			new A.PopUp(
				{
					baseClassName: 'video-pop-up',
					trigger: '.video-pop-up-trigger'
				}
			).render();
		}
	);
	</script>
