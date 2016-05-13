'use strict';
step1view = Object.create(null);
step1view['view.html'] = '<div class="page step1 page-current" data-step="1">\n	<div class="centered">\n		<h1>Hubspot Interactions Import Tool</h1>\n		<p>Marketing interaction data describes who did what and when, in instances where this data isn\'t natively tracked by HubSpot. Take for example a list of industry event booth scans: the data in the list describes who was scanned at the industry event, and when they were scanned.</p>\n		<p>This tool makes it easy to take the Marketing interaction data in whatever format it exists and record it in HubSpot where it can be blended with our other touchpoint data.</p>\n		\n		<p><strong>Step 1:</strong> Use the <a href="https://docs.google.com/a/liferay.com/spreadsheets/d/1Blb9yvoaaZFR8Az2PnZflC1hHvC5DTpz1BhF8vXrsak/edit?usp=sharing" target="_blank">HubSpot List and Interaction Import Worksheet</a> to generate two files: a list to upload directly to HubSpot and a list to upload here.</p>\n		\n		<p><strong>Step 2:</strong> <a href="https://app.hubspot.com/contacts/252686/import/" target="_blank">Upload the HubSpot List to HubSpot first</a>. Then return to this page.</p>\n		\n		<p><strong>Step 3:</strong> Upload the Interactions list below.</p>\n\n		<div class="file-drag">\n			<div class="icons-container">\n				<article class="upload-icon-container">\n					<svg height="32" viewBox="0 0 32 32" width="32" xmlns="http://www.w3.org/2000/svg"><title/><path d="M16 16l-3.25 3.25-.75-.75 4.5-4.5 4.5 4.5-.75.75L17 16v11h-1V16zm-1 5H8.003C5.798 21 4 19.21 4 17c0-1.895 1.325-3.488 3.1-3.898-.065-.357-.1-.726-.1-1.102 0-3.314 2.686-6 6-6 2.615 0 4.84 1.673 5.66 4.008C19.437 9.378 20.425 9 21.5 9c2.358 0 4.293 1.814 4.484 4.123C27.714 13.563 29 15.133 29 17c0 2.205-1.792 4-4.003 4H18v1h7c2.762 0 5-2.244 5-5 0-2.096-1.287-3.89-3.117-4.634C26.36 9.872 24.15 8 21.5 8c-.863 0-1.68.2-2.406.553C17.89 6.43 15.614 5 13 5c-3.866 0-7 3.134-7 7 0 .138.004.275.012.412C4.24 13.182 3 14.95 3 17c0 2.76 2.232 5 5 5h7v-1z" fill="#333" fill-rule="evenodd"/></svg>\n				</article>\n				<article class="check-icon-container">\n					<svg height="128" viewBox="0 0 128 128" width="128" xmlns="http://www.w3.org/2000/svg"><path d="M85.263 46.49L54.485 77.267l-11.68-11.683c-.782-.782-2.048-.782-2.83-.002-.78.782-.78 2.048 0 2.83l14.51 14.512 33.606-33.607c.782-.78.782-2.046 0-2.827-.78-.782-2.046-.782-2.827 0zm-21.23-32.62c-27.643 0-50.13 22.49-50.13 50.127.002 27.642 22.49 50.13 50.13 50.13h.005c27.638 0 50.123-22.488 50.123-50.13 0-27.64-22.486-50.126-50.128-50.126zm.005 96.258h-.004c-25.435 0-46.13-20.694-46.13-46.13 0-25.435 20.692-46.127 46.128-46.127s46.13 20.694 46.13 46.127c0 25.437-20.69 46.13-46.124 46.13z"/></svg>\n				</article>\n				<article class="error-icon-container">\n					<svg height="512" viewBox="0 0 512 512" width="512" xmlns="http://www.w3.org/2000/svg"><path d="M256 7C118.467 7 7 118.468 7 256.002 7 393.532 118.467 505 256 505s249-111.467 249-248.998C505 118.468 393.533 7 256 7zm0 478.08c-126.31 0-229.08-102.77-229.08-229.078C26.92 129.692 129.69 26.92 256 26.92c126.31 0 229.08 102.77 229.08 229.082C485.08 382.31 382.31 485.08 256 485.08z" fill="#f33"/><path fill="#f33" d="M368.545 157.073l-14.084-14.085-98.597 98.6-98.13-98.132-14.085 14.084 98.132 98.132-98.132 98.137 14.085 14.083 98.13-98.143 98.598 98.61 14.085-14.085-98.598-98.603"/></svg>\n				</article>\n			</div>\n			<div class="file-drop-text">Drop CSV Files Here!</div>\n		</div>\n		<div class="file-info"></div>\n	</div>\n</div>';
