<script>
AUI().ready(
  'aui-overlay-mask',
  'aui-tabs',
  'node',
  'substitute',
  function(A) {
    var WIN = A.getWin();
    var popUps = A.all('.pop-up');
    var classToggleNodes = A.all('.class-toggle.section-1');

    var createOverlayMask = function() {
      var bindUI = function() {
        var overlayMask = A.one('.aui-overlaymask');

        if (overlayMask) {
          var closePopUpContent = A.all('.close-popup-content');

          overlayMask.on(
            'click',
            function() {
              overlayMask.remove(true);
              popUps.each(function(node){
                node.removeClass('class-toggle-active');
              });
            }
          );

          closePopUpContent.each(function(node) {
            node.on('click', function() {
              overlayMask.remove(true);
            });
          });
        }
      }

      var init = function() {
        if (A.one('.aui-overlaymask')) {
          return
        }

        var overlay = new A.OverlayMask().render();

        overlay.set('z-index', 20);
        overlay.show();

        bindUI();
      }

      return init();
    }

    classToggleNodes.each(function(node) {
      node.on('click', function() {
        createOverlayMask();
      });
    });

    var tabs2 = new A.TabView(
      {
        boundingBox: '#landingPulseTab',
        listNode: '#pulseList',
        contentNode: '#pulseTabContent'
      }
    );

    tabs2.render();
    tabs2.show();

    var showPopUp = function(tabObject, popupNode, tabIndex) {
        tabObject.selectTab(tabIndex);
        popupNode.addClass('class-toggle-active');

        createOverlayMask();
    }

    A.on('load', function(event) {
        var popup2 = A.one('#cfpPopUp');
        var successNode2 = popup2.one('.portlet-msg-success');
        var urlString = location.href;

        if (successNode2){
            successNode2.set('innerHTML', '<h2>Thank you for your submission!</h2><p>If chosen, you will be contacted through the email address provided.</p><p"><a class="btn" href="/web/events2016/northamerica/home?cfp">Submit another proposal!</a></p>');

            var ddlForm = popup2.one('.lfr-dynamic-form');

            ddlForm.addClass('aui-helper-hidden');

            showPopUp(tabs2, popup2, 2);
        }

        if (urlString.indexOf('?cfp') > 0){
            showPopUp(tabs2, popup2, 0);
        }
    });
  }
);
</script>