module.exports = {
  serviceLocator: {
    findService: function (a){ return this.__findServiceReturn },
    __findServiceReturn: {
      getRecords: function (a){ return this.__getRecordsReturn },
      __getRecordsReturn: [
        {
          getFieldValue: function (a){ return this.__getFieldValueReturn },
          __getFieldValueReturn: 'Home'
        }
      ]
    }
  },
  getterUtil: {
    getLong: function (a){ return this.__getLongReturn },
    __getLongReturn: ''
  },
  record_set_id: {
    data: ''
  },
  portal: {
    class: {
      forName: function (a){ return this.__forNameReturn },
      __forNameReturn: {
        newInstance: function (){ return this.__newInstanceReturn },
        __newInstanceReturn: {
          put: function (a, b){ return this.__putReturn },
          __putReturn: ''
        }
      }
    }
  },
  logo_image: {
    data: '/images/16%20LDSF%20Logo%20-%20no%20text.svg',
    logo_text_image: {
      data: ''
    }
  },
  background_image: {
    data: '/images/16-LDSF-Recap-Header-Image-1920x1080.jpg',
    background_image_mobile: {
      data: '/images/16-LDSF-Recap-Header-Image-600x960.jpg'
    }
  },
  banner_color: {
    data: '#f3f3f3'
  },
  button_text: {
    button_url: {
      data: 'javascript:;'
    },
    button_new_window: {
      data: {
        equalsIgnoreCase: function (a){ return this.__equalsIgnoreCaseReturn },
        __equalsIgnoreCaseReturn: ''
      }
    },
    data: 'Hier anmelden!'
  },
  event_text: {
    siblings: [
      {
        data: 'VIELEN DANK FÜR IHREN BESUCH AUF DEM LIFERAY PORTAL SOLUTIONS FORUM 2016 IN DARMSTADT'
      },
         {
        data: ''
      },   {
        data: 'Gerne halten wir Sie auch zukünftig zu wichtigen Liferay Events und Webinaren auf dem Laufenden. Melden Sie sich einfach für unseren Events Newsletter an.'
      },

    ]
  }
}
